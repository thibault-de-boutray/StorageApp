import { Link } from "react-router-dom"

export const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen max-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
            <div className="absolute inset-x-0 top-6 sm:top-10 px-4 sm:px-10">
                <div className="flex w-full flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.2] pb-1 bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                        Storage App
                    </h2>
                    <div className="flex items-center gap-5">
                        <Link
                            className="button-secondary w-auto px-6 py-4 text-base sm:px-5 sm:py-3 sm:text-sm"
                            to="/login"
                        >
                            Se connecter
                        </Link>
                        <div className="bg-white w-[0.5px] opacity-45 h-10"></div>
                        <Link
                            className="button-secondary w-auto px-6 py-4 text-base sm:px-5 sm:py-3 sm:text-sm"
                            to="/register"
                        >
                            Inscription
                        </Link>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
