import { useEffect, useRef, useState } from "react"
import { useUserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { FaAngleDown, FaAngleUp, FaAlignJustify, FaTimes } from "react-icons/fa"

export const Header = () => {
    const { user } = useUserContext()
    const [isSubMenuOpen, setSubMenuOpen] = useState()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef(null)
    const navLinkClass = () => "nav-link"

    const HandleSubMenu = () => {
        setSubMenuOpen((open) => (!open))
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen((open) => !open)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
        setSubMenuOpen(false)
    }

    useEffect(() => {
        if (!isMobileMenuOpen) return

        const handlePointerDown = (event) => {
            if (!mobileMenuRef.current) return
            if (mobileMenuRef.current.contains(event.target)) return
            closeMobileMenu()
        }

        document.addEventListener("pointerdown", handlePointerDown)
        return () => document.removeEventListener("pointerdown", handlePointerDown)
    }, [isMobileMenuOpen])
    return (
        <nav className="relative flex bg-slate-950/80 backdrop-blur-md justify-between px-6 md:px-15 border-b border-white/10 max-w-screen">
            <NavLink to="/DashBoard" className="flex gap-4 md:gap-10 items-center">
                <img src="/images/logo.png" className="image-rounder" alt="logo site" width={64} />
                <div className="hidden md:flex flex-col items-center">
                    <h1 className="title-primary ">
                        Storage App
                    </h1>
                    <code className="text-white font-bold ">
                        Fast and secure
                    </code>
                </div>
            </NavLink>

            <button
                type="button"
                onClick={toggleMobileMenu}
                className="md:hidden text-white text-2xl p-3 rounded-xl hover:bg-white/10 transition"
                aria-label="Ouvrir le menu"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaAlignJustify />}
            </button>

            <ul className="hidden md:flex items-center gap-10">
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 z-20"
                    >
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"
                            onClick={closeMobileMenu}
                        />
                        <motion.ul
                            initial={{ opacity: 0, y: -16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute right-4 top-16 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-slate-950/98 border border-white/15 shadow-2xl shadow-black/50 p-4 text-white z-10"
                            ref={mobileMenuRef}
                        >
                            <li>
                                <NavLink to="/DashBoard" onClick={closeMobileMenu} className={`${navLinkClass()} block px-4 py-3 rounded-xl hover:bg-white/5`}>
                                    DashBoard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/DashBoard" onClick={closeMobileMenu} className={`${navLinkClass()} block px-4 py-3 rounded-xl hover:bg-white/5`}>
                                    Files
                                </NavLink>
                            </li>
                            <li className="border-t border-white/15 mt-3 pt-3">
                                <div className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                                    {user.identifiant}
                                </div>
                            </li>
                            <li>
                                <NavLink to="/DashBoard" onClick={closeMobileMenu} className={`${navLinkClass()} block px-4 py-3 rounded-xl hover:bg-white/5`}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/DashBoard" onClick={closeMobileMenu} className={`${navLinkClass()} block px-4 py-3 rounded-xl hover:bg-white/5`}>
                                    Setting
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" onClick={closeMobileMenu} className={`${navLinkClass()} block px-4 py-3 rounded-xl hover:bg-white/5`}>
                                    Se deconnecter
                                </NavLink>
                            </li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
