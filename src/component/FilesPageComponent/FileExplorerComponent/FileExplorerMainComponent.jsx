import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { FileSortSelect } from "./FileSortSelect"

export const FileExplorerMainComponent = ({ filteredFolder }) => {
    const [sortBy, setSortBy] = useState("lastModif")
    const [sortDir, setSortDir] = useState("desc")

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
            <div name="container des fichier">

            </div>
        </div>
    )
}
