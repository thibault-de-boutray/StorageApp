export const FilesFolderRow = ({ label, onClick, isActive }) => {
    const imageName = label?.toLowerCase().replace(/\s+/g, "-")
    const handleClick = () => {
        onClick?.()
        const container = document.getElementById("file-explorer")
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" })
        }
    }
    return (
        <button type="button" onClick={handleClick} className={`file-row w-full text-left ${isActive ? "bg-white/10" : ""}`}>
            <div className="flex items-center gap-3">
                <img
                    src={`/images/${imageName}.png`}
                    className="w-6 h-6 object-contain"
                    alt={label}
                />
                <p>{label}</p>
            </div>
        </button>
    )
}
