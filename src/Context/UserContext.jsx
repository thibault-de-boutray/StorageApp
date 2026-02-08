import { createContext, useContext, useState } from "react"

const UserContext = createContext(null)
export const useUserContext = () => {
    const ctx = useContext(UserContext)
    if (!ctx) {
        throw new Error("useUserContext must be used within ContextUserProvider")
    }
    return ctx
}

export const ContextUserProvider = ({ children }) => {
    const [user, setUser] = useState({
        identifiant: "",
        email: "user@example.com",
        language: "Francais",
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
