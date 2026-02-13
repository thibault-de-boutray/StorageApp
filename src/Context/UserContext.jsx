import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const UserContext = createContext(null)
export const useUserContext = () => {
    const ctx = useContext(UserContext)
    if (!ctx) {
        throw new Error("useUserContext must be used within ContextUserProvider")
    }
    return ctx
}

export const ContextUserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        let isMounted = true

        const restoreSession = async () => {
            try {
                const response = await axios.get("/api/users/me", {
                    withCredentials: true
                })

                if (isMounted) {
                    setUser(response.data.user)
                }
            } catch {
                if (isMounted) {
                    setUser(null)
                }
            } finally {
                if (isMounted) {
                    setAuthReady(true)
                }
            }
        }

        restoreSession()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, authReady }}>
            {children}
        </UserContext.Provider>
    )
}
