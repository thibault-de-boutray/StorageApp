

export const Footer = () => {
    return (
        <footer className="mt-12 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between text-slate-300">
                <div className="flex flex-col gap-1">
                    <span className="title-primary text-xl sm:text-2xl">Storage App</span>
                    <span className="text-base text-slate-400">Fast and secure cloud storage</span>
                </div>
                <div className="flex flex-wrap gap-5 text-base">
                    <a className="nav-link text-base" href="#">Aide</a>
                    <a className="nav-link text-base" href="#">Support</a>
                    <a className="nav-link text-base" href="#">Privacy</a>
                    <a className="nav-link text-base" href="#">Terms</a>
                </div>
                <div className="text-sm text-slate-500">© 2026 Storage App</div>
            </div>
        </footer>
    )
}

