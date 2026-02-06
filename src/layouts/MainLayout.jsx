import { Outlet } from "react-router-dom";
import { Header } from "../assets/component/Header";
import { Footer } from "../assets/component/Footer";
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
