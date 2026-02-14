import { FaExclamationTriangle } from "react-icons/fa"

export const ErrorMessage = ({ message = "" }) => {
    if (!message) return null

    return (
        <div
            className="mt-2 flex items-start gap-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 shadow-[0_0_0_1px_rgba(244,63,94,0.08)] backdrop-blur"
            role="alert"
            aria-live="polite"
        >
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-rose-300" />
            <span>{message}</span>
        </div>
    )
}
