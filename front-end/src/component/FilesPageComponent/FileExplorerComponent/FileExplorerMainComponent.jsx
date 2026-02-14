import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleUp, FaEllipsisVertical, FaFolder } from "react-icons/fa6"
import { FileIcon } from "react-file-icon"
import { FileSortSelect } from "./FileSortSelect"
import { getFileExtension, getFileIconStyle, getFileTypeLabel, getLastModif } from "../../../utils/fileUtils"
import { FilePathContainer } from "./FilePathContainer"

export const FileExplorerMainComponent = ({
    filteredFolder = [],
    filter = "",
    path = [],
    onSelectPath,
    onOpenFolder,
    onRenameItem,
    onDeleteItem
}) => {
    const [sortBy, setSortBy] = useState("lastModif")
    const [sortDir, setSortDir] = useState("desc")
    const [openedActionsId, setOpenedActionsId] = useState(null)
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
        if (sortBy === "type") {
            const aIsFolder = a?.type === "folder" || a?.isFolder
            const bIsFolder = b?.type === "folder" || b?.isFolder
            if (aIsFolder !== bIsFolder) {
                return sortDir === "asc"
                    ? (aIsFolder ? -1 : 1)
                    : (aIsFolder ? 1 : -1)
            }
        }
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
    useEffect(() => {
        const container = document.getElementById("file-explorer")
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" })
        }
    }, [filter, sortBy, sortDir])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!openedActionsId) return
            if (event.target.closest?.("[data-file-actions]")) return
            setOpenedActionsId(null)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openedActionsId])

    const handleRenameClick = async (file) => {
        setOpenedActionsId(null)
        await onRenameItem?.(file)
    }

    const handleDeleteClick = async (file) => {
        setOpenedActionsId(null)
        await onDeleteItem?.(file)
    }

    return (
        <div>
            <div className="sticky top-[72px] z-20 flex items-center justify-end gap-4 border-b border-white/10 bg-gray-900/95 p-4 pt-5 md:p-3 md:pt-4 backdrop-blur">

                <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-3 md:py-2">
                    <div className="w-full md:w-auto mb-2 md:mb-0">
                        <FilePathContainer path={path} onSelectPath={onSelectPath} />
                    </div>
                    <div className="flex w-full justify-end gap-2 md:w-auto">
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
                            <tr key={file.id || `${file.name}-${index}`} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-2 py-2 md:px-4 md:py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 shrink-0">
                                            {file?.type === "folder" || file?.isFolder ? (
                                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-blue-200">
                                                    <FaFolder />
                                                </div>
                                            ) : (
                                                <FileIcon extension={getFileExtension(file.name)} {...getFileIconStyle(file.name)} />
                                            )}
                                        </div>
                                        {file?.type === "folder" || file?.isFolder ? (
                                            <button
                                                type="button"
                                                onClick={() => onOpenFolder?.(file)}
                                                className="truncate cursor-pointer text-xs text-left text-blue-200 hover:text-blue-100 md:text-sm"
                                            >
                                                {file.name}
                                            </button>
                                        ) : (
                                            <span className="truncate text-xs md:text-sm">{file.name}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-2 py-2 text-left text-white/70 md:hidden">
                                    {sortBy === "type" ? (
                                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/75">
                                            {file?.type === "folder" || file?.isFolder ? "FOLDER" : GetSelectedValue(file)}
                                        </span>
                                    ) : (
                                        <span className="truncate text-xs">{GetSelectedValue(file)}</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-left text-white/70 hidden md:table-cell">
                                    <span className="truncate">{file?.type === "folder" || file?.isFolder ? "--" : (file.size || "--")}</span>
                                </td>
                                <td className="px-4 py-3 text-white/70 hidden md:table-cell">
                                    <span className="truncate">{getLastModif(file.lastModif)}</span>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/75">
                                        {file?.type === "folder" || file?.isFolder ? "FOLDER" : getFileTypeLabel(file.name)}
                                    </span>
                                </td>
                                <td className="px-2 py-2 md:px-4 md:py-3">
                                    <div data-file-actions className="relative flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setOpenedActionsId((current) => current === file.id ? null : file.id)}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:border-white/30 hover:bg-white/10"
                                            aria-label={`Actions for ${file.name}`}
                                        >
                                            <FaEllipsisVertical />
                                        </button>
                                        {openedActionsId === file.id ? (
                                            <div className="absolute right-0 top-full z-30 mt-2 w-40 rounded-xl border border-white/15 bg-slate-900/95 p-1 shadow-xl backdrop-blur">
                                                {!file?.isFolder && file.downloadUrl ? (
                                                    <a
                                                        href={file.downloadUrl}
                                                        className="block w-full rounded-lg px-3 py-2 text-left text-xs text-emerald-200 transition hover:bg-white/10"
                                                    >
                                                        Download
                                                    </a>
                                                ) : null}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRenameClick(file)}
                                                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-white/85 transition hover:bg-white/10"
                                                >
                                                    Renommer
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteClick(file)}
                                                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-rose-300 transition hover:bg-rose-500/20"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div >
    )
}
