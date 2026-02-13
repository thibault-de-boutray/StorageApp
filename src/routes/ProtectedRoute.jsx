import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../Context/UserContext"

export const ProtectedRoute = () => {
    const { user, authReady } = useUserContext()
    const isAuthed = Boolean(user?.identifiant)

    if (!authReady) {
        return <div className="p-6 text-sm text-slate-300">Chargement...</div>
    }

    if (!isAuthed) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
