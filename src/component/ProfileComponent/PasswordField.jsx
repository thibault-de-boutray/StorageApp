import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const PasswordField = ({ label, value, onChange, tone = "indigo" }) => {
    const [show, setShow] = useState(false)
    const borderClass = tone === "sky"
        ? "focus:border-sky-400/60 focus:ring-sky-400/20"
        : "focus:border-indigo-400/60 focus:ring-indigo-400/20"

    return (
        <label className="flex flex-col gap-2 text-sm text-white/70">
            {label}
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className={`h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-11 text-white outline-none transition focus:ring-2 ${borderClass}`}
                />
                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/60 transition hover:text-white"
                    aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </label>
    )
}
