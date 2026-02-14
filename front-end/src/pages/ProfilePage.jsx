import { useEffect, useMemo, useState } from "react"
import { useUserContext } from "../Context/UserContext"
import { ProfileInfoCard } from "../component/ProfileComponent/ProfileInfoCard"
import { SecurityCard } from "../component/ProfileComponent/SecurityCard"

export const ProfilePage = () => {
    const { user, setUser } = useUserContext()
    const [username, setUsername] = useState(user?.identifiant || "")
    const [email, setEmail] = useState(user?.email || "")
    const [language] = useState(user?.language || "Francais")
    const [profileStatus, setProfileStatus] = useState("")
    const [pwdStatus, setPwdStatus] = useState("")
    const [oldPwd, setOldPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")

    useEffect(() => {
        setUsername(user?.identifiant || "")
        setEmail(user?.email || "")
    }, [user?.identifiant, user?.email])

    const initials = useMemo(() => {
        const base = (username || "User").trim()
        return base
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("") || "U"
    }, [username])

    const handleProfileSave = (e) => {
        e.preventDefault()
        setUser((prev) => ({
            ...prev,
            email: email.trim(),
        }))
        setProfileStatus("Profile updated.")
        setTimeout(() => setProfileStatus(""), 2500)
    }

    const validatePasswords = () => {
        if (!oldPwd || !newPwd || !confirmPwd) {
            return "All fields are required."
        }
        if (newPwd !== confirmPwd) {
            return "Passwords do not match."
        }
        return ""
    }

    const handlePasswordSave = (e) => {
        e.preventDefault()
        const error = validatePasswords()
        if (error) {
            setPwdStatus(error)
            return
        }
        setPwdStatus("Password updated.")
        setOldPwd("")
        setNewPwd("")
        setConfirmPwd("")
        setTimeout(() => setPwdStatus(""), 2500)
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-10">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold text-white">My profile</h1>
                <p className="text-sm text-white/60">
                    Manage your personal information and account security.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <ProfileInfoCard
                    initials={initials}
                    username={username}
                    email={email}
                    language={language}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onSave={handleProfileSave}
                    status={profileStatus}
                />
                <SecurityCard
                    oldPwd={oldPwd}
                    newPwd={newPwd}
                    confirmPwd={confirmPwd}
                    onOldPwdChange={(e) => setOldPwd(e.target.value)}
                    onNewPwdChange={(e) => setNewPwd(e.target.value)}
                    onConfirmPwdChange={(e) => setConfirmPwd(e.target.value)}
                    onSave={handlePasswordSave}
                    status={pwdStatus}
                />
            </div>
        </div>
    )
}
