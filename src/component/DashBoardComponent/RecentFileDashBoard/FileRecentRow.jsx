
import { FileIcon } from "react-file-icon"
import { getFileExtension, getFileIconStyle, getLastModif } from "../../../utils/fileUtils"


export const FileRecentRow = ({ file }) => {
    const handleDownload = (event) => {
        event.preventDefault()
        // TODO: remplacer par l'appel API backend
        const a = document.createElement("a")
        a.href = `/files/${file.name}`
        a.download = file.name
        a.click()
    }
    return (
        <li>
            <div className="flex items-center justify-between py-3 border-b border-gray-400/80">
                <div className="flex gap-3 items-center">
                    <div className="w-7 h-7">
                        <FileIcon extension={getFileExtension(file.name)} {...getFileIconStyle(file.name)} />
                    </div>
                    <p className="text-sm">{file.name}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-gray-200/80 text-xs">{getLastModif(file.updatedAt)}</p>
                    <a
                        href={`/files/${file.name}`}
                        onClick={handleDownload}
                        className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors underline underline-offset-4 decoration-emerald-400/40 hover:decoration-emerald-300/80"
                    >
                        Télécharger
                    </a>
                </div>
            </div>
        </li>
    )
}

