import { useUserContext } from "../Context/UserContext"

export const DashboardPage = () => {
    const { user } = useUserContext()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-950 text-white">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-white">Bienvenue {user.identifiant}</p>
        </div>
    )
}
