import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { FileIcon } from "react-file-icon"
import { FileSortSelect } from "./FileSortSelect"
import { getFileExtension, getFileIconStyle, getFileTypeLabel, getLastModif } from "../../../utils/fileUtils"

export const FileExplorerMainComponent = ({ filteredFolder = [], filter = "" }) => {
    const [sortBy, setSortBy] = useState("lastModif")
    const [sortDir, setSortDir] = useState("desc")
    const FolderList = filteredFolder.map((item) =>
        typeof item === "string" ? { name: item } : item
    )
    const filterValue = filter.trim().toLowerCase()
    const FilterFilesInFolder = filterValue
        ? FolderList.filter((file) => file.name?.toLowerCase().includes(filterValue))
        : FolderList
    const ConvertSizeToKb = (value) => {
        if (!value) return 0
        const raw = String(value).replace(",", ".").toLowerCase().trim()
        const num = parseFloat(raw)
        if (Number.isNaN(num)) return 0
        if (raw.includes("mo") || raw.includes("mb")) return num * 1024
        if (raw.includes("go") || raw.includes("gb")) return num * 1024 * 1024
        return num
    }
    const GetSortValue = (file) => {
        if (sortBy === "size") return ConvertSizeToKb(file.size)
        if (sortBy === "type") return getFileTypeLabel(file.name)
        return new Date(file.lastModif || 0).getTime()
    }
    const SortFilesInFolder = [...FilterFilesInFolder].sort((a, b) => {
        const aVal = GetSortValue(a)
        const bVal = GetSortValue(b)
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1
        return 0
    })
    const GetSelectedLabel = () => {
        if (sortBy === "size") return "Size"
        if (sortBy === "type") return "Type"
        return "Modified"
    }
    const GetSelectedValue = (file) => {
        if (sortBy === "size") return file.size || "--"
        if (sortBy === "type") return getFileTypeLabel(file.name)
        return getLastModif(file.lastModif)
    }

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
            <table className="w-full text-left text-sm text-white/85 table-fixed">
                <thead className="text-[10px] uppercase tracking-wide text-white/60 md:text-xs">
                    <tr className="border-b border-white/10">
                        <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Name</th>
                        <th scope="col" className="px-2 py-2 md:hidden">{GetSelectedLabel()}</th>
                        <th scope="col" className="px-4 py-3 hidden md:table-cell">Size</th>
                        <th scope="col" className="px-4 py-3 hidden md:table-cell">Modified</th>
                        <th scope="col" className="px-4 py-3 hidden md:table-cell">Type</th>
                        <th scope="col" className="px-2 py-2 text-center md:px-4 md:py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {SortFilesInFolder.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-14 text-center">
                                <div className="mx-auto max-w-sm rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-white/80 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                                    <p className="text-lg font-semibold">No files found</p>
                                    <p className="mt-1 text-sm text-white/60">Try another search or upload a file.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        SortFilesInFolder.map((file, index) => (
                            <tr key={`${file.name}-${index}`} className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-2 py-2 md:px-4 md:py-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 shrink-0">
                                        <FileIcon extension={getFileExtension(file.name)} {...getFileIconStyle(file.name)} />
                                    </div>
                                    <span className="truncate text-xs md:text-sm">{file.name}</span>
                                </div>
                            </td>
                            <td className="px-2 py-2 text-left text-white/70 md:hidden">
                                {sortBy === "type" ? (
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/75">
                                        {GetSelectedValue(file)}
                                    </span>
                                ) : (
                                    <span className="truncate text-xs">{GetSelectedValue(file)}</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-left text-white/70 hidden md:table-cell">
                                <span className="truncate">{file.size || "--"}</span>
                            </td>
                            <td className="px-4 py-3 text-white/70 hidden md:table-cell">
                                <span className="truncate">{getLastModif(file.lastModif)}</span>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/75">
                                    {getFileTypeLabel(file.name)}
                                </span>
                            </td>
                            <td className="px-2 py-2 flex items-center justify-center md:px-4 md:py-3">
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-2xl font-semibold leading-none text-white/80 transition hover:text-white active:scale-90 active:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                                    >
                                        ...
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div >
    )
}
