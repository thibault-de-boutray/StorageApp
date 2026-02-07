import { FileExplorerTop } from "./FileExplorerComponent/FileExplorerTop"


export const FilesExplorerComponent = ({ folder }) => {
    return (
        <div className="color-primary-container w-full p-6">
            <FileExplorerTop name={folder.name} />
        </div>
    )
}
