import { useState } from "react"
import { FileExplorerMainComponent } from "./FileExplorerComponent/FileExplorerMainComponent"
import { FileExplorerTop } from "./FileExplorerComponent/FileExplorerTop"

export const FilesExplorerComponent = ({ folder }) => {
    const [filter, setFilter] = useState("")
    return (
        <div id="file-explorer" className="color-primary-container file-container w-full">
            <FileExplorerTop name={folder.name} setFilter={setFilter} />
            <FileExplorerMainComponent filteredFolder={folder.listeChild} filter={filter} />

        </div>
    )
}
