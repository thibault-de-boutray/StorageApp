import { useState } from "react"
import { useUserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

export const Header = () => {
    const { user } = useUserContext()
    const [isSubMenuOpen, setSubMenuOpen] = useState()
    const navLinkClass = () => "nav-link"

    const HandleSubMenu = () => {
        setSubMenuOpen((open) => (!open))
    }
    return (
        <nav className="flex bg-slate-950/80 backdrop-blur-md justify-between px-15 border-b border-white/10 max-w-screen">
            <NavLink to="/DashBoard" className="flex gap-10  items-center">
                <img src="/images/logo.png" className="image-rounder" alt="logo site" width={80} />
                <div className="flex flex-col items-center">
                    <h1 className="title-primary ">
                        Storage App
                    </h1>
                    <code className="text-white font-bold ">
                        Fast and secure
                    </code>
                </div>
            </NavLink>
            <ul className="flex items-center gap-10">
                <li><NavLink to="/DashBoard" className={navLinkClass}>DashBoard</NavLink></li>
                <li><NavLink to="/DashBoard" className={navLinkClass}>Files</NavLink></li>
                <li className="relative">
                    <NavLink
                        onClick={HandleSubMenu}
                        className={`${navLinkClass()} flex items-center gap-2`}
                    >
                        <span>{user.identifiant}</span>
                        {isSubMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </NavLink>
                    <AnimatePresence>
                        {isSubMenuOpen && (
                            <motion.ul
                                onMouseLeave={() => setSubMenuOpen(false)}
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="sub-menu absolute text-white -right-10 top-full mt-3 min-w-[200px] bg-gray-700 border border-white/10 rounded-2xl z-10 p-2 shadow-xl shadow-black/30 backdrop-blur-md"
                            >
                                <li><NavLink to="/DashBoard" className={`${navLinkClass()} block px-3 py-2 rounded-xl hover:bg-white/5`}>Profile</NavLink></li>
                                <li><NavLink to="/DashBoard" className={`${navLinkClass()} block px-3 py-2 rounded-xl hover:bg-white/5`}>Setting</NavLink></li>
                                <li><NavLink to="/login" className={`${navLinkClass()} block px-3 py-2 rounded-xl hover:bg-white/5`}>Se deconnecter</NavLink></li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </li>
            </ul>
        </nav>
    )
}
