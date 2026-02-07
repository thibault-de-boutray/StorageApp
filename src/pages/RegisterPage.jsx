import { RegisterForm } from "../component/RegisterForm"
import { AuthLayout } from "../layouts/AuthLayout"

export const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}
