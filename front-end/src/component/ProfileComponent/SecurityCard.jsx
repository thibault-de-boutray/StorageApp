import { PasswordField } from "./PasswordField"

export const SecurityCard = ({
    oldPwd,
    newPwd,
    confirmPwd,
    onOldPwdChange,
    onNewPwdChange,
    onConfirmPwdChange,
    onSave,
    status,
}) => {
    return (
        <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur">
            <h2 className="mb-2 text-lg font-semibold text-white">Security</h2>
            <p className="mb-5 text-xs text-white/60">
                Change your password by confirming the current one.
            </p>
            <form onSubmit={onSave} className="space-y-4">
                <PasswordField
                    label="Current password"
                    value={oldPwd}
                    onChange={onOldPwdChange}
                />
                <PasswordField
                    label="New password"
                    value={newPwd}
                    onChange={onNewPwdChange}
                />
                <PasswordField
                    label="Confirm password"
                    value={confirmPwd}
                    onChange={onConfirmPwdChange}
                />

                <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                        type="submit"
                        className="rounded-xl border border-indigo-400/40 bg-indigo-500/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-indigo-300/70 hover:bg-indigo-500/30"
                    >
                        Update password
                    </button>
                    {status && (
                        <span className={`text-xs ${status.includes("updated") ? "text-emerald-300" : "text-rose-300"}`}>
                            {status}
                        </span>
                    )}
                </div>
            </form>
        </section>
    )
}
