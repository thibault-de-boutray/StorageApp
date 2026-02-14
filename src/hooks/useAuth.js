import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import { useFetch } from "./useFetch";

export const useAuth = () => {
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const { loading, error, request, setError } = useFetch();

    const submitLogin = async ({ identifiant, passWord }) => {
        try {
            const payload = await request({
                method: "POST",
                url: "/api/users/login",
                data: {
                    login: identifiant,
                    passWord
                }
            });

            setUser(payload.user);
            navigate("/dashboard");
        } catch {
            // déjà gérer par le useFetch
        }
    };

    const submitRegister = async ({ identifiant, email, passWord }) => {
        try {
            const payload = await request({
                method: "POST",
                url: "/api/users/register",
                data: { identifiant, email, passWord }
            });

            setUser(payload.user);
            navigate("/dashboard");
        } catch {
            // déjà gérer par le useFetch
        }
    };

    return { loading, error, setError, submitLogin, submitRegister };
};
