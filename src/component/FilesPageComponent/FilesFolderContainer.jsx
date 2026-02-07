import { FilesFolderRow } from "./FilesFolderRow";
import { FilesStorageContainer } from "./FilesStorageContainer";



export const FilesFolderContainer = ({ numbers, size, maxSize }) => {
    const buildFolderList = (numbers) => {
        const labels = ["All Files", "Documents", "Photos", "Videos", "Music", "Archives"];
        return numbers.map((num, index) => {
            return (
                <FilesFolderRow label={labels[index]} number={num} />
            )
        });
    };
    return (
        <div className="color-primary-container file-container px-3 w-[20%]">
            <div className="flex items-center">
                <img src="/images/folderOpen.png" width={60} alt="all files icon" />
                <h1 className="text-2xl">
                    All Files
                </h1>
            </div>
            <div className="pb-5">
                {buildFolderList(numbers)}
            </div>
            <FilesStorageContainer size={size} maxSize={maxSize} />
        </div>
    )
}
