
export const FilePathContainer = ({ path = [], onSelectPath }) => {
    const rootNode = (
        <button
            type="button"
            onClick={() => onSelectPath?.(-1)}
            className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-widest text-white/70"
        >
            root
        </button>
    )

    const visiblePath = path.slice(-3)

    return (
        <div className="text-white/80">
            <div className="block md:hidden">
                <div className="inline-flex items-center gap-0.5">
                    {rootNode}
                    {visiblePath.length > 0 && <span className="leading-none">/</span>}
                    {visiblePath.map((segment, index) => (
                        <button
                            key={`${segment.id}-${segment.name}`}
                            type="button"
                            onClick={() => onSelectPath?.(path.length - visiblePath.length + index)}
                            className="max-w-[90px] truncate text-xs text-white/85 hover:text-white"
                        >
                            {segment.name}
                            {index < visiblePath.length - 1 ? " / " : ""}
                        </button>
                    ))}
                </div>
            </div>
            <div className="hidden md:block">
                <span className="inline-flex items-center gap-1">
                    {rootNode}
                    {path.map((segment, index) => (
                        <span key={`${segment.id}-${segment.name}`} className="inline-flex items-center gap-1">
                            <span>/</span>
                            <button
                                type="button"
                                onClick={() => onSelectPath?.(index)}
                                className="max-w-[140px] truncate text-sm text-white/85 hover:text-white hover:underline"
                            >
                                {segment.name}
                            </button>
                        </span>
                    ))}
                </span>
            </div>
        </div>
    )
}
