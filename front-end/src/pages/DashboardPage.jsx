import { useCallback, useEffect, useMemo, useState } from "react"
import { DashBoardTopContainer } from "../component/DashBoardComponent/DashBoadTopContainer"
import { DashBoardMainContainer } from "../component/DashBoardComponent/DashBoardMainContainer"
import { useUserContext } from "../Context/UserContext"
import { useFetch } from "../hooks/useFetch"
import { useUpload } from "../hooks/useUpload"

const getCategoryByName = (fileName = "") => {
    const ext = String(fileName).split(".").at(-1)?.toLowerCase() || ""
    const docs = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "md", "csv"]
    const photos = ["jpg", "jpeg", "png", "svg", "gif", "webp"]
    const videos = ["mp4", "mov", "avi", "mkv", "webm"]

    if (docs.includes(ext)) return "Documents"
    if (photos.includes(ext)) return "Photos"
    if (videos.includes(ext)) return "Videos"
    return "Other"
}

const buildStorageUsage = (files) => {
    const counts = { Documents: 0, Photos: 0, Videos: 0, Other: 0 }
    files.forEach((file) => {
        const category = getCategoryByName(file.name)
        counts[category] += 1
    })

    const total = Object.values(counts).reduce((sum, value) => sum + value, 0) || 1
    return [
        { name: "Documents", value: Math.round((counts.Documents / total) * 100) },
        { name: "Photos", value: Math.round((counts.Photos / total) * 100) },
        { name: "Videos", value: Math.round((counts.Videos / total) * 100) },
        { name: "Other", value: Math.round((counts.Other / total) * 100) }
    ]
}

export const DashboardPage = () => {
    const { user } = useUserContext()
    const { request } = useFetch()
    const { uploadFiles, loading: uploadLoading, error: uploadError, setError: setUploadError } = useUpload()

    const [recentFiles, setRecentFiles] = useState([])
    const [sharedFiles, setSharedFiles] = useState([])
    const [storageUsage, setStorageUsage] = useState([])
    const [stockage, setStockage] = useState({
        nombreFichiers: 0,
        tailleUtilisee: 0,
        tailleMax: Number(user?.stockage) || 0
    })
    const [loadError, setLoadError] = useState("")

    const fetchDashboardData = useCallback(async () => {
        if (!user?.id) return

        try {
            const [allFilesPayload, uploadedFilesPayload, stockagePayload] = await Promise.all([
                request({ method: "GET", url: "/api/users/me/files?scope=all" }),
                request({ method: "GET", url: "/api/users/me/files?scope=owned" }),
                request({ method: "GET", url: `/api/users/${user.id}/stockage` })
            ])

            const allFiles = Array.isArray(allFilesPayload?.files) ? allFilesPayload.files : []
            const uploadedFiles = Array.isArray(uploadedFilesPayload?.files) ? uploadedFilesPayload.files : []

            setRecentFiles(allFiles.slice(0, 15))
            setSharedFiles(uploadedFiles.slice(0, 15))
            setStorageUsage(buildStorageUsage(allFiles))
            setStockage({
                nombreFichiers: Number(stockagePayload?.nombreFichiers) || 0,
                tailleUtilisee: Number(stockagePayload?.tailleUtilisee) || 0,
                tailleMax: Number(stockagePayload?.tailleMax) || 0
            })
            setLoadError("")
        } catch {
            setLoadError("impossible de charger les fichiers")
        }
    }, [request, user?.id])

    useEffect(() => {
        fetchDashboardData()
    }, [fetchDashboardData])

    const handleUploadFiles = async (files) => {
        if (!files || files.length === 0) return

        try {
            await uploadFiles(files)
            await fetchDashboardData()
        } catch {
            // error handled in hook state
        }
    }

    const globalError = useMemo(() => uploadError || loadError, [uploadError, loadError])

    useEffect(() => {
        if (!globalError) return
        const timer = setTimeout(() => {
            setLoadError("")
            setUploadError("")
        }, 3000)
        return () => clearTimeout(timer)
    }, [globalError, setUploadError])

    return (
        <div className="flex flex-col mt-10 mx-auto w-[80vw] space-y-12">
            <h1 className="block text-4xl">
                Welcome {user.identifiant}
            </h1>

            {globalError && (
                <p className="text-sm text-rose-300">{globalError}</p>
            )}

            {uploadLoading && (
                <p className="text-sm text-blue-200">upload en cours...</p>
            )}

            <DashBoardTopContainer stockage={stockage} sharedCount={sharedFiles.length} />

            <DashBoardMainContainer
                recentFiles={recentFiles}
                sharedFiles={sharedFiles}
                storageUsage={storageUsage}
                addSharedFile={handleUploadFiles}
            />
        </div>
    )
}
