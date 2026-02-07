import { FaAngleDown } from "react-icons/fa6"

const SORT_OPTIONS = [
    { value: "date", label: "Date" },
    { value: "type", label: "Type" },
    { value: "lastModif", label: "Last Modif" },
    { value: "size", label: "Size" },
]

export const FileSortSelect = ({ value, onChange }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none rounded-lg border border-blue-300/30 bg-[#0f1a3b] px-4 py-2 pr-9 text-sm text-white shadow-[0_6px_16px_rgba(15,23,42,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <SortCaret />
        </div>
    )
}

export const SortCaret = () => (
    <FaAngleDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70" />
)
