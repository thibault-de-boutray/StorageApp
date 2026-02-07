import { FileSearchBarComponent } from "./FileSearchBarComponent"

export const FileExplorerTop = ({ name }) => {
    return (
        <div className="flex items-center gap-6">
            <p className="truncate w-30 hidden md:block text-white/80">{name}</p>
            <div className="flex flex-1 items-center gap-4">
                <FileSearchBarComponent />
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-300/40 bg-gradient-to-b from-blue-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_10px_rgba(30,64,175,0.35)] transition hover:from-blue-300 hover:to-blue-500 active:translate-y-[1px]"
                >
                    <span className="text-base hidden md:block leading-none">+</span>
                    Upload Files
                </button>
            </div>
        </div>
    )
}

