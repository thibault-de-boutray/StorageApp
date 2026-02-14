export const ProfileInfoCard = ({
    initials,
    username,
    email,
    language,
    onUsernameChange,
    onEmailChange,
    onSave,
    status,
}) => {
    return (
        <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/40 to-indigo-500/40 text-lg font-semibold text-white shadow-[0_0_18px_rgba(56,189,248,0.3)]">
                    {initials}
                </div>
                <div>
                    <p className="text-lg font-semibold text-white">{username || "User"}</p>
                    <p className="text-xs text-white/50">Personal account</p>
                </div>
            </div>

            <form onSubmit={onSave} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm text-white/70">
                        Username
                        <input
                            value={username}
                            onChange={onUsernameChange}
                            className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                            placeholder="Your name"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-white/70">
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={onEmailChange}
                            className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                            placeholder="you@example.com"
                        />
                    </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-white/70">
                    Language
                    <select
                        value={language}
                        disabled
                        className="h-11 cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 text-white/50"
                    >
                        <option value="Francais">French</option>
                        <option value="English">English</option>
                    </select>
                </label>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="submit"
                        className="rounded-xl bg-sky-500/90 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(56,189,248,0.35)] transition hover:bg-sky-400"
                    >
                        Save changes
                    </button>
                    {status && (
                        <span className="text-xs text-emerald-300">{status}</span>
                    )}
                </div>
            </form>
        </section>
    )
}
