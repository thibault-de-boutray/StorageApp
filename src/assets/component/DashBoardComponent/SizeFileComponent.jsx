

export const SizeFileComponent = ({ maxSize, size }) => {
    const formatSize = (bytes) => {
        if (bytes < 1e6) return `${(bytes / 1e3).toFixed(1)} KB`
        if (bytes < 1e9) return `${(bytes / 1e6).toFixed(1)} MB`
        return `${(bytes / 1e9).toFixed(2)} GB`
    }
    return (
        <div className="container-secondary pl-0">
            <img src="/images/cloud.png" alt="image stockage" width={90} />
            <div className="flex flex-col gap-2.5">
                <p className="text-2xl"> {formatSize(size)} / {formatSize(maxSize)}</p>
                <progress className="progress-bar" max={maxSize} value={size} />
            </div>

        </div>
    )
}
