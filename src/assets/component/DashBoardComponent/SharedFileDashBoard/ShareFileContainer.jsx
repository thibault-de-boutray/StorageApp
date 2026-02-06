import { useRef } from "react"
import { Plus } from "lucide-react"
import { FileShareRow } from "./FileShareRow"

export const ShareFileContainer = ({ files, onUpload }) => {
    const fileInputRef = useRef(null)

    const handleClickUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files || [])
        if (selectedFiles.length === 0) return
        selectedFiles.forEach((file) => onUpload?.(file))
        event.target.value = ""
    }

    return (
        <div className="dashboard-right-bottom" name="content-shared-files">
            <div className="flex items-center justify-between px-8 pt-6">
                <h1 className="font-bold text-2xl">
                    Shared Files
                </h1>
                <button type="button" onClick={handleClickUpload} className="button-secondary px-4 py-2 text-xs sm:text-sm">
                    <Plus className="w-4 h-4" />
                    Upload File
                </button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />
            <ul className="p-5">
                {files?.slice(0, 15).map((file) => <FileShareRow key={file.name} file={file} />)}
            </ul>
        </div>
    )
}

