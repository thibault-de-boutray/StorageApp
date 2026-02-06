import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../Context/UserContext"

export const ProtectedRoute = () => {
    const { user } = useUserContext()
    const isAuthed = Boolean(user?.identifiant)

    if (!isAuthed) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
