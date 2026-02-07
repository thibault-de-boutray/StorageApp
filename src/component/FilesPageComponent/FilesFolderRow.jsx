export const FilesFolderRow = ({ label, number }) => {
    const imageName = label?.toLowerCase().replace(/\s+/g, "-")
    const handleDesktopClick = (event) => {
        if (window.innerWidth >= 768) {
            event.preventDefault()
        }
    }
    return (
        <a href="#file-explorer" onClick={handleDesktopClick} className="file-row md:cursor-default">
            <div className="flex items-center gap-3">
                <img
                    src={`/images/${imageName}.png`}
                    className="w-6 h-6 object-contain"
                    alt={label}
                />
                <p>{label}</p>
            </div>
            <span className="text-white">{number}</span>
        </a>
    )
}
