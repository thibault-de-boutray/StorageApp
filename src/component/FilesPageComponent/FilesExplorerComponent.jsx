import { useState } from "react"
import { FileExplorerMainComponent } from "./FileExplorerComponent/FileExplorerMainComponent"
import { FileExplorerTop } from "./FileExplorerComponent/FileExplorerTop"

export const FilesExplorerComponent = ({ folder }) => {
    const [filter, setFilter] = useState("")
    const filteredFolder = folder.listeChild.filter((element) =>
        element.name.toLowerCase().includes(filter.toLowerCase())
    )
    return (
        <div className="color-primary-container w-full">
            <FileExplorerTop name={folder.name} setFilter={setFilter} />
            <FileExplorerMainComponent filteredFolder={filteredFolder} />

        </div>
    )
}
