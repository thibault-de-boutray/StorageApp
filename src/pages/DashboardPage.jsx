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
    { name: "projet-client.pptx", size: "6.8 MB", updatedAt: "2026-01-29T16:20:00Z" },
    { name: "budget-2026.xlsx", size: "980 KB", updatedAt: "2026-01-28T11:10:00Z" },
    { name: "contrat-signature.pdf", size: "1.4 MB", updatedAt: "2026-01-27T08:05:00Z" },
    { name: "roadmap-q1.docx", size: "230 KB", updatedAt: "2026-01-26T13:40:00Z" },
    { name: "export-data.csv", size: "12.3 MB", updatedAt: "2026-01-25T19:55:00Z" },
    { name: "maquette-home.fig", size: "24 MB", updatedAt: "2026-01-24T09:25:00Z" },
    { name: "script-backup.sh", size: "8 KB", updatedAt: "2026-01-23T21:10:00Z" },
    { name: "planning-hebdo.xlsx", size: "310 KB", updatedAt: "2026-01-22T07:35:00Z" },
    { name: "rapport-analytics.pdf", size: "3.2 MB", updatedAt: "2026-01-21T17:05:00Z" },
    { name: "brief-campagne.docx", size: "120 KB", updatedAt: "2026-01-20T10:00:00Z" },
    { name: "assets-pack.zip", size: "58 MB", updatedAt: "2026-01-19T15:30:00Z" },
    { name: "mockup-mobile.psd", size: "74 MB", updatedAt: "2026-01-18T12:15:00Z" },
    { name: "spec-technique.md", size: "32 KB", updatedAt: "2026-01-17T08:45:00Z" },
    { name: "diagramme-archi.png", size: "2.9 MB", updatedAt: "2026-01-16T20:05:00Z" },
    { name: "liste-taches.txt", size: "6 KB", updatedAt: "2026-01-15T06:50:00Z" },
    { name: "rapport-qualite.pdf", size: "1.9 MB", updatedAt: "2026-01-14T14:10:00Z" },
    { name: "presentation-sprint.pptx", size: "5.2 MB", updatedAt: "2026-01-13T09:35:00Z" },
    { name: "facture-fevrier.xlsx", size: "410 KB", updatedAt: "2026-01-12T18:25:00Z" },
    { name: "planning-release.docx", size: "150 KB", updatedAt: "2026-01-11T11:45:00Z" },
    { name: "readme-projet.md", size: "14 KB", updatedAt: "2026-01-10T07:20:00Z" },
]

const testSharedFiles = [
    { name: "Client_Proposal.pdf", sharedBy: "john_dam", updatedAt: "2026-02-05T10:10:00Z" },
    { name: "Project_Plan.xlsx", sharedBy: "jane_smith", updatedAt: "2026-02-04T14:30:00Z" },
    { name: "Marketing_Brief.docx", sharedBy: "alex_t", updatedAt: "2026-02-03T08:20:00Z" },
    { name: "Brand_Guidelines.pdf", sharedBy: "emma_r", updatedAt: "2026-02-02T16:45:00Z" },
    { name: "Sprint_Notes.txt", sharedBy: "lucas_m", updatedAt: "2026-02-01T09:05:00Z" },
    { name: "Roadmap_2026.pptx", sharedBy: "sofia_k", updatedAt: "2026-01-31T13:15:00Z" },
    { name: "Budget_Update.xlsx", sharedBy: "nina_p", updatedAt: "2026-01-30T07:55:00Z" },
    { name: "Release_Checklist.md", sharedBy: "tom_y", updatedAt: "2026-01-29T18:40:00Z" },
    { name: "UX_Wireframes.fig", sharedBy: "zoe_l", updatedAt: "2026-01-28T11:25:00Z" },
    { name: "Stakeholder_Review.pdf", sharedBy: "mike_q", updatedAt: "2026-01-27T15:00:00Z" },
]

const storageUsageSourceFiles = [
    ...testRecentFiles,
    ...testSharedFiles,
]

const buildStorageUsage = (files) => {
    const categories = {
        Documents: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "md", "csv"],
        Photos: ["jpg", "jpeg", "png", "svg", "gif", "webp"],
        Videos: ["mp4", "mov", "avi", "mkv", "webm"],
    }

    const counts = {
        Documents: 0,
        Photos: 0,
        Videos: 0,
        Other: 0,
    }

    const getCategory = (filename) => {
        const ext = filename.split(".").at(-1)?.toLowerCase()
        if (!ext) return "Other"
        if (categories.Documents.includes(ext)) return "Documents"
        if (categories.Photos.includes(ext)) return "Photos"
        if (categories.Videos.includes(ext)) return "Videos"
        return "Other"
    }

    files.forEach((file) => {
        const category = getCategory(file.name)
        counts[category] += 1
    })

    const total = Object.values(counts).reduce((sum, val) => sum + val, 0) || 1

    return [
        { name: "Documents", value: Math.round((counts.Documents / total) * 100) },
        { name: "Photos", value: Math.round((counts.Photos / total) * 100) },
        { name: "Videos", value: Math.round((counts.Videos / total) * 100) },
        { name: "Other", value: Math.round((counts.Other / total) * 100) },
    ]
}

export const DashboardPage = () => {
    const { user } = useUserContext()

    const [recentFiles, setRecentFiles] = useState([])
    const [sharedFiles, setSharedFiles] = useState([])
    const [storageUsage, setStorageUsage] = useState([])

    // (test)
    useEffect(() => {
        setRecentFiles(testRecentFiles)
        setSharedFiles(testSharedFiles)
        setStorageUsage(buildStorageUsage(storageUsageSourceFiles))
    }, [])


    const addRecentFile = (file) => {
        setRecentFiles(prev => [file, ...prev])
    }

    const addSharedFile = (file) => {
        const sharedFile = {
            name: file.name,
            sharedBy: user?.identifiant || "unknown",
            updatedAt: new Date().toISOString(),
        }
        setSharedFiles(prev => [sharedFile, ...prev])
    }

    return (
        <div className="flex flex-col mt-10 mx-auto w-[80vw] space-y-12">
            <h1 className="block text-4xl">
                Welcome {user.identifiant}
            </h1>

            <DashBoardTopContainer />

            <DashBoardMainContainer
                recentFiles={recentFiles}
                sharedFiles={sharedFiles}
                storageUsage={storageUsage}
                addSharedFile={addSharedFile}
                addRecentFile={addRecentFile}
            />
        </div>
    )
}
