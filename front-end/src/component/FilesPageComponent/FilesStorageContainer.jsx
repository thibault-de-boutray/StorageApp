const formatSize = (value) => {
    if (value >= 1024) {
        return `${(value / 1024).toFixed(1)} GB`
    }
    return `${value.toFixed(1)} MB`
}

export const FilesStorageContainer = ({ size, maxSize }) => {
    const safeMax = Math.max(maxSize || 0, 0)
    const safeSize = Math.max(size || 0, 0)
    const percent = safeMax > 0 ? Math.min((safeSize / safeMax) * 100, 100) : 0

    return (
        <div className="file-storage-section px-2 pb-6">
            <p className="text-2xl text-gray-300 ">Storage</p>
            <div className="flex items-center gap-2 py-2 mt-2 text-xm text-gray-200">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
                <p>
                    {formatSize(safeSize)} of {formatSize(safeMax)} used
                </p>
            </div>
            <progress className="progress-bar" value={percent} max={100} />
            <button type="button" className="button-secondary w-full mt-8 md:mt-4.5 text-sm py-2">
                Upgrade Storage
            </button>
        </div>
    )
}
