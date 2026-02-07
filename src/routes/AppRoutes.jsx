import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { FilesPage } from "../pages/FilesPage"

const LoginPage = lazy(() => import("../pages/LoginPage").then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import("../pages/RegisterPage").then((m) => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import("../pages/DashboardPage").then((m) => ({ default: m.DashboardPage })))
const MainLayout = lazy(() => import("../layouts/mainLayout").then((m) => ({ default: m.MainLayout })))

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="p-6 text-sm text-slate-300">Chargement...</div>}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/Files" element={<FilesPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Suspense>
    )
}
