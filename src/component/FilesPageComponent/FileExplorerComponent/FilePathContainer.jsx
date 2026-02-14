
export const FilePathContainer = () => {
    const segments = ["fichier 1", "fichier 2", "fichier 3", "fichier 4"]
    const last = segments[segments.length - 1]
    const lastThree = segments.slice(-3)
    const maxRootCount = 6
    const showDots = segments.length > maxRootCount
    const linkClass =
        "inline-block max-w-[60px] md:max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer text-white/90 hover:text-white hover:underline transition-all duration-150 hover:scale-[1.05] hover:-translate-y-[1px] active:scale-95"
    const rootNode = showDots ? (
        <span>...</span>
    ) : (
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-widest text-white/70">
            root
        </span>
    )

    return (
        <div className="text-white/80">
            <div className="block md:hidden">
                <div className="inline-flex items-center gap-0.5">
                    {rootNode}
                    <span className="leading-none">/</span>
                    {lastThree.map((seg, i) => (
                        <span key={seg} className="inline-flex items-center">
                            {i > 0 && <span className="mx-0.5 leading-none">/</span>}
                            <a className={linkClass}>{seg}</a>
                        </span>
                    ))}
                </div>
            </div>
            <div className="hidden md:block">
                <span className="inline-flex items-center">
                    {rootNode}
                    <span className="mx-0.5">/</span>
                    {segments.map((seg, i) => (
                        <span key={seg} className="inline-flex items-center">
                            {i > 0 && <span className="mx-0.5">/</span>}
                            <a className={linkClass}>{seg}</a>
                        </span>
                    ))}
                </span>
            </div>
        </div>
    )
}
