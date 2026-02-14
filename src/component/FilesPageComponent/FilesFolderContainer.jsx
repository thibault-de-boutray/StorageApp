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
        <div className="color-primary-container file-container px-3 md:w-[20%]">
            <div className="flex items-center gap-3 pl-2.5 my-3">
                <img src="/images/all-files.png" width={29} alt="all files icon" />
                <h1 className="text-1.5xl">
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
