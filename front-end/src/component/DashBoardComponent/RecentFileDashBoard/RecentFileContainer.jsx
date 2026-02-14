import { Link } from "react-router-dom"
import { FileRecentRow } from "./FileRecentRow"

export const RecentFileContainer = ({ files }) => {
    return (
        <div className="dashboard-left color-primary-container" name="content-gauche">
            <div className="flex justify-between px-8 pt-6">
                <h1 className="font-bold text-2xl">
                    Recent Files
                </h1>
                <Link to="/Files" className="relative inline-block text-blue-400/80 active:text-white group">
                    View ALL
                    <span className="absolute left-0 -bottom-0 h-[2px] active:bg-white w-0 bg-blue-400/80 transition-all duration-150 group-hover:w-full" />
                </Link>
            </div>
            <ul className="p-5">
                {files?.slice(0, 15).map((file) => <FileRecentRow key={file.id || `${file.name}-${file.updatedAt}`} file={file} />)}
            </ul>
        </div>
    )
}

