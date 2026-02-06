import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../Context/UserContext"

export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const submitLogin = ({ identifiant }) => {
        setLoading(true)
        setError("")
        setTimeout(() => {
            setUser({ ...user, identifiant })
            setLoading(false)
            navigate("/dashboard")
        }, 900)
    }

    const submitRegister = ({ identifiant, email }) => {
        setLoading(true)
        setError("")
        setTimeout(() => {
            setUser({ ...user, identifiant, email })
            setLoading(false)
            navigate("/dashboard")
        }, 900)
    }

    return { loading, error, submitLogin, submitRegister }
}
