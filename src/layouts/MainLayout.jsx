import { Outlet } from "react-router-dom";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
export function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
