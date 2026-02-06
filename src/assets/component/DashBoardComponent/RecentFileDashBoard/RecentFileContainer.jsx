import { FileRecentRow } from "./FileRecentRow"

export const RecentFileContainer = ({ files }) => {
    return (
        <div className="dashboard-left" name="content-gauche">
            <ul className="p-5">
                {files?.map((file) => <FileRecentRow key={file.name} file={file} />)}
            </ul>
        </div>
    )
}

