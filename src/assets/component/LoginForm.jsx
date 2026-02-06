import { useState } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import { ErrorMessage } from "./ErrorMessage"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

export const LoginForm = () => {
    const [identifiant, setIdentifiant] = useState("")
    const [passWord, setPassWord] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error, submitLogin } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        submitLogin({ identifiant, passWord })
    }

    return (
        <form
            className="w-full max-w-sm mt-[2.25rem] sm:mt-[1rem] rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur space-y-6"
            onSubmit={handleSubmit}
        >
            <h1 className="mx-auto text-center text-3xl font-semibold tracking-tight text-white">
                Se connecter
            </h1>
            <Input
                placeholder="Identifiant"
                value={identifiant}
                type="text"
                onChange={(e) => setIdentifiant(e.target.value)}
                className="input"
                required
            />

            <div className="relative">
                <Input
                    placeholder="Mot de passe"
                    value={passWord}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassWord(e.target.value)}
                    className="input pr-12"
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <Button
                className="button-primary mx-auto block w-3/5 px-6 py-4 text-base"
                type="submit"
                disabled={loading}
            >
                {loading ? "Chargement..." : "se connecter"}
            </Button>
            <ErrorMessage message={error} />
        </form>
    )
}
