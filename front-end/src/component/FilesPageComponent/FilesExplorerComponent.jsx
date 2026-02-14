import { useState } from "react"
import { FileExplorerMainComponent } from "./FileExplorerComponent/FileExplorerMainComponent"
import { FileExplorerTop } from "./FileExplorerComponent/FileExplorerTop"

export const FilesExplorerComponent = ({ folder, onUploadFiles, uploadLoading, onCreateFolder, currentFolderId, path, onSelectPath, onOpenFolder }) => {
    const [filter, setFilter] = useState("")
    return (
        <div id="file-explorer" className="color-primary-container file-container w-full max-h-[95vh] overflow-y-auto overscroll-auto scroll-smooth md:overscroll-auto">
            <FileExplorerTop
                name={folder.name}
                setFilter={setFilter}
                onUploadFiles={onUploadFiles}
                uploadLoading={uploadLoading}
                onCreateFolder={onCreateFolder}
                currentFolderId={currentFolderId}
            />
            <FileExplorerMainComponent
                filteredFolder={folder.listeChild}
                filter={filter}
                path={path}
                onSelectPath={onSelectPath}
                onOpenFolder={onOpenFolder}
            />

        </div>
    )
}
