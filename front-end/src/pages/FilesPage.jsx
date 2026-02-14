import { useCallback, useEffect, useMemo, useState } from "react"
import { FilesExplorerComponent } from "../component/FilesPageComponent/FilesExplorerComponent"
import { FilesFolderContainer } from "../component/FilesPageComponent/FilesFolderContainer"
import { useUserContext } from "../Context/UserContext"
import { useFetch } from "../hooks/useFetch"
import { useUpload } from "../hooks/useUpload"

const SIDEBAR_LABELS = ["All Files", "Documents", "Photos", "Videos", "Music", "Archives"]

const bytesToMo = (bytes) => (Number(bytes) || 0) / (1024 * 1024)

const getCategoryIndex = (fileName = "") => {
    const ext = String(fileName).split(".").at(-1)?.toLowerCase() || ""
    const docs = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "md", "csv"]
    const photos = ["jpg", "jpeg", "png", "svg", "gif", "webp"]
    const videos = ["mp4", "mov", "avi", "mkv", "webm"]
    const music = ["mp3", "wav", "flac", "aac"]
    const archives = ["zip", "rar", "7z", "tar", "gz"]

    if (docs.includes(ext)) return 1
    if (photos.includes(ext)) return 2
    if (videos.includes(ext)) return 3
    if (music.includes(ext)) return 4
    if (archives.includes(ext)) return 5
    return 0
}

const bytesToMoLabel = (bytes) => {
    const value = Number(bytes) || 0
    if (value <= 0) return "0 Mo"
    return `${(value / (1024 * 1024)).toFixed(1)} Mo`
}

export const FilesPage = () => {
    const { user } = useUserContext()
    const { request } = useFetch()
    const { uploadFiles, loading: uploadLoading, error: uploadError } = useUpload()

    const [sidebarLabel, setSidebarLabel] = useState("All Files")
    const [currentFolderId, setCurrentFolderId] = useState(null)
    const [path, setPath] = useState([])
    const [rootFolders, setRootFolders] = useState([])
    const [currentItems, setCurrentItems] = useState([])
    const [allOwnedFiles, setAllOwnedFiles] = useState([])

    const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0])
    const [size, setSize] = useState(0)
    const [maxSize, setMaxSize] = useState(0)
    const [error, setError] = useState("")

    const getRequestErrorMessage = (err) => {
        return err?.response?.data?.message || "impossible de charger les fichiers"
    }

    const refreshCountsAndStorage = useCallback(async () => {
        if (!user?.id) return

        const [filesResult, stockageResult] = await Promise.allSettled([
            request({ method: "GET", url: "/api/users/me/files?scope=owned" }),
            request({ method: "GET", url: `/api/users/${user.id}/stockage` })
        ])

        if (filesResult.status === "fulfilled") {
            const files = Array.isArray(filesResult.value?.files) ? filesResult.value.files : []
            setAllOwnedFiles(files)

            const computedNumbers = [files.length, 0, 0, 0, 0, 0]
            files.forEach((file) => {
                const index = getCategoryIndex(file.name)
                computedNumbers[index] += 1
            })
            setNumbers(computedNumbers)
        } else {
            throw filesResult.reason
        }

        if (stockageResult.status === "fulfilled") {
            setSize(bytesToMo(stockageResult.value?.tailleUtilisee))
            setMaxSize(bytesToMo(stockageResult.value?.tailleMax))
        }
    }, [request, user?.id])

    const loadFolder = useCallback(async (folderId) => {
        const parentValue = folderId === null ? "null" : String(folderId)
        const payload = await request({ method: "GET", url: `/api/users/me/files?parentId=${parentValue}` })
        const items = Array.isArray(payload?.files) ? payload.files : []
        setCurrentItems(items)
        return items
    }, [request])

    const loadRootFolders = useCallback(async () => {
        const rootItems = await loadFolder(null)
        const folders = rootItems.filter((item) => item.itemType === "folder")
        setRootFolders(folders)
        return folders
    }, [loadFolder])

    const initialLoad = useCallback(async () => {
        if (!user?.id) return
        try {
            await refreshCountsAndStorage()
            const folders = await loadRootFolders()

            if (sidebarLabel === "All Files") {
                setCurrentFolderId(null)
                setPath([])
                await loadFolder(null)
                setError("")
                return
            }

            const selectedRootFolder = folders.find((folder) => folder.name === sidebarLabel)
            if (!selectedRootFolder) {
                setSidebarLabel("All Files")
                setCurrentFolderId(null)
                setPath([])
                await loadFolder(null)
                setError("")
                return
            }

            setCurrentFolderId(selectedRootFolder.id)
            setPath([{ id: selectedRootFolder.id, name: selectedRootFolder.name }])
            await loadFolder(selectedRootFolder.id)
            setError("")
        } catch (err) {
            setError(getRequestErrorMessage(err))
        }
    }, [loadFolder, loadRootFolders, refreshCountsAndStorage, sidebarLabel, user?.id])

    useEffect(() => {
        initialLoad()
    }, [initialLoad])

    const handleSelectSidebar = async (label) => {
        setSidebarLabel(label)
        if (label === "All Files") {
            setCurrentFolderId(null)
            setPath([])
            await loadFolder(null)
            setError("")
            return
        }

        const selected = rootFolders.find((folder) => folder.name === label)
        if (!selected) {
            setError("dossier introuvable")
            return
        }

        setCurrentFolderId(selected.id)
        setPath([{ id: selected.id, name: selected.name }])
        await loadFolder(selected.id)
        setError("")
    }

    const handleOpenFolder = async (folder) => {
        if (!folder?.isFolder) return
        setCurrentFolderId(folder.id)
        setPath((prev) => [...prev, { id: folder.id, name: folder.name }])
        await loadFolder(folder.id)
        setError("")
    }

    const handleSelectPath = async (index) => {
        if (index === -1) {
            setCurrentFolderId(null)
            setPath([])
            setSidebarLabel("All Files")
            await loadFolder(null)
            setError("")
            return
        }

        const nextPath = path.slice(0, index + 1)
        const target = nextPath[nextPath.length - 1]
        setPath(nextPath)
        setCurrentFolderId(target?.id ?? null)
        await loadFolder(target?.id ?? null)
        setError("")
    }

    const handleCreateFolder = async (folderName, parentFolderId) => {
        try {
            await request({
                method: "POST",
                url: "/api/users/me/folders",
                data: { name: folderName, parentId: parentFolderId ?? null }
            })
            await loadRootFolders()
            await loadFolder(parentFolderId ?? null)
        } catch (err) {
            setError(getRequestErrorMessage(err))
        }
    }

    const handleUploadFiles = async (selectedFiles, parentFolderId) => {
        if (!selectedFiles || selectedFiles.length === 0) return
        try {
            await uploadFiles(selectedFiles, { parentId: parentFolderId ?? null })
            await refreshCountsAndStorage()
            await loadFolder(parentFolderId ?? null)
        } catch {
            // error displayed by uploadError
        }
    }

    const folder = useMemo(() => ({
        name: path.length > 0 ? path[path.length - 1].name : "My files",
        listeChild: currentItems.map((item) => ({
            id: item.id,
            name: item.name,
            isFolder: item.isFolder,
            type: item.isFolder ? "folder" : "file",
            size: item.isFolder ? "--" : bytesToMoLabel(item.sizeBytes),
            lastModif: item.updatedAt,
            downloadUrl: item.downloadUrl
        }))
    }), [currentItems, path])

    return (
        <div className=" mx-auto w-[90vw] mt-15">
            <h1 className="mb-6">My Files</h1>
            {error && <p className="mb-4 text-sm text-rose-300">{error}</p>}
            {uploadError && <p className="mb-4 text-sm text-rose-300">{uploadError}</p>}
            <div name="container files" className="flex flex-col gap-6 md:flex-row md:gap-10">
                <FilesFolderContainer
                    numbers={numbers}
                    size={size}
                    maxSize={maxSize}
                    selectedLabel={sidebarLabel}
                    onSelectLabel={handleSelectSidebar}
                />
                <FilesExplorerComponent
                    folder={folder}
                    onUploadFiles={handleUploadFiles}
                    uploadLoading={uploadLoading}
                    onCreateFolder={handleCreateFolder}
                    currentFolderId={currentFolderId}
                    path={path}
                    onSelectPath={handleSelectPath}
                    onOpenFolder={handleOpenFolder}
                />
            </div>
        </div>
    )
}
