import { FileIcon } from "react-file-icon"
import { getFileExtension, getFileIconStyle, getLastModif } from "../../../utils/fileUtils"

export const FileShareRow = ({ file }) => {
    return (
        <li>
            <div className="flex items-center justify-between py-3 border-b border-gray-400/80">
                <div className="flex gap-3 items-center">
                    <div className="w-7 h-7">
                        <FileIcon extension={getFileExtension(file.name)} {...getFileIconStyle(file.name)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">{file.name}</p>
                        <p className="text-gray-400 text-xs">{file.sharedBy}</p>
                    </div>
                </div>
                <p className="text-gray-200/80 text-xs">{getLastModif(file.updatedAt)}</p>
            </div>
        </li>
    )
}
