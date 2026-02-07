import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { FileIcon } from "react-file-icon"
import { FileSortSelect } from "./FileSortSelect"
import { getFileExtension, getFileIconStyle, getFileTypeLabel, getLastModif } from "../../../utils/fileUtils"

export const FileExplorerMainComponent = ({ filteredFolder = [] }) => {
    const [sortBy, setSortBy] = useState("lastModif")
    const [sortDir, setSortDir] = useState("desc")
    const rows = filteredFolder.map((item) =>
        typeof item === "string" ? { name: item } : item
    )

    return (
        <div>
            <div className="flex items-center justify-end gap-4 p-4">

                <div className="flex items-center gap-2">
                    <FileSortSelect value={sortBy} onChange={setSortBy} />

                    <button
                        type="button"
                        onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-300/30 bg-[#0f1a3b] text-white shadow-[0_6px_16px_rgba(15,23,42,0.35)] transition hover:border-blue-300/60"
                        aria-label="Toggle sort direction"
                    >
                        {sortDir === "asc" ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                </div>
            </div>
            <table className="w-full text-left text-sm text-white/85">
                <thead className="text-xs uppercase tracking-wide text-white/60">
                    <tr className="border-b border-white/10">
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Size</th>
                        <th scope="col" className="px-4 py-3">Type</th>
                        <th scope="col" className="px-4 py-3">Modified</th>
                        <th scope="col" className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((file, index) => (
                        <tr key={`${file.name}-${index}`} className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7">
                                        <FileIcon extension={getFileExtension(file.name)} {...getFileIconStyle(file.name)} />
                                    </div>
                                    <span className="truncate">{file.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-white/70">{file.size || "--"}</td>
                            <td className="px-4 py-3">
                                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/75">
                                    {getFileTypeLabel(file.name)}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-white/70">
                                {getLastModif(file.lastModif)}
                            </td>
                            <td className="px-4 py-3 text-right text-white/60">...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
