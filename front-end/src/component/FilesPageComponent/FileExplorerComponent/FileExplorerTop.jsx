import { useRef } from "react"
import { FaFolderPlus, FaUpload } from "react-icons/fa6"
import { FileSearchBarComponent } from "./FileSearchBarComponent"

export const FileExplorerTop = ({ name, setFilter, onUploadFiles, uploadLoading, onCreateFolder, currentFolderId }) => {
    const inputRef = useRef(null)

    const handleClickUpload = () => {
        inputRef.current?.click()
    }

    const handleSelectFiles = (event) => {
        const selectedFiles = Array.from(event.target.files || [])
        if (selectedFiles.length === 0) return
        onUploadFiles?.(selectedFiles, currentFolderId)
        event.target.value = ""
    }

    const handleCreateFolder = () => {
        const folderName = window.prompt("Folder name")
        if (!folderName) return
        onCreateFolder?.(folderName, currentFolderId)
    }

    return (
        <div className="sticky top-0 z-30 flex items-center gap-8 border-b border-white/20 bg-gray-900/95 py-5 px-6 backdrop-blur">
            <p className="truncate w-30 hidden md:block text-xl text-white/80">{name}</p>
            <div className="flex flex-1 items-center gap-4">
                <FileSearchBarComponent setFilter={setFilter} />
                <button
                    type="button"
                    onClick={handleClickUpload}
                    disabled={Boolean(uploadLoading)}
                    className="ml-6 inline-flex h-11 w-12 items-center justify-center gap-2 rounded-lg border border-blue-300/40 bg-gradient-to-b from-blue-400 to-blue-600 text-sm font-semibold text-white shadow-[0_4px_10px_rgba(30,64,175,0.35)] transition hover:from-blue-300 hover:to-blue-500 active:translate-y-[1px] md:ml-12 md:h-auto md:w-auto md:px-4 md:py-2"
                >
                    <FaUpload className="text-base md:text-base" />
                    <span className="hidden md:inline">{uploadLoading ? "Uploading..." : "Upload Files"}</span>
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleSelectFiles}
                />
                <button
                    type="button"
                    onClick={handleCreateFolder}
                    className="inline-flex h-11 w-12 items-center justify-center gap-2 rounded-lg border border-blue-300/40 bg-gradient-to-b from-blue-400 to-blue-600 text-sm font-semibold text-white shadow-[0_4px_10px_rgba(30,64,175,0.35)] transition hover:from-blue-300 hover:to-blue-500 active:translate-y-[1px] md:h-auto md:w-auto md:px-4 md:py-2"
                >
                    <FaFolderPlus className="text-base md:text-base" />
                    <span className="hidden md:inline">New Folder</span>
                </button>

            </div>
        </div>
    )
}
