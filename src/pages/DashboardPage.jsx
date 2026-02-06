import { useState, useEffect } from "react"

import { DashBoardTopContainer } from "../assets/component/DashBoardComponent/DashBoadTopContainer"
import { DashBoardMainContainer } from "../assets/component/DashBoardComponent/DashBoardMainContainer"
import { useUserContext } from "../Context/UserContext"

const testRecentFiles = [
    { name: "rapport.pdf", size: "2.1 MB", updatedAt: "2026-02-04T10:15:00Z" },
    { name: "photos.zip", size: "312 MB", updatedAt: "2026-02-03T18:05:00Z" },
    { name: "facture-janvier.xlsx", size: "420 KB", updatedAt: "2026-02-02T09:00:00Z" },
    { name: "logo-final.svg", size: "86 KB", updatedAt: "2026-02-01T14:30:00Z" },
    { name: "notes.txt", size: "4 KB", updatedAt: "2026-01-30T07:45:00Z" },
]

export const DashboardPage = () => {
    const { user } = useUserContext()

    const [recentFiles, setRecentFiles] = useState([])

    // (test)
    useEffect(() => {
        setRecentFiles(testRecentFiles)
    }, [])


    const addRecentFile = (file) => {
        setRecentFiles(prev => [file, ...prev])
    }

    return (
        <div className="flex flex-col mt-10 mx-auto w-[80vw] space-y-12">
            <h1 className="block text-4xl">
                Welcome {user.identifiant}
            </h1>

            <DashBoardTopContainer />

            <DashBoardMainContainer
                recentFiles={recentFiles}
                addRecentFile={addRecentFile}
            />
        </div>
    )
}
