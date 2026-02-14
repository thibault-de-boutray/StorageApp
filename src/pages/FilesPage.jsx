import { useEffect, useState } from "react"
import { FilesExplorerComponent } from "../component/FilesPageComponent/FilesExplorerComponent"
import { FilesFolderContainer } from "../component/FilesPageComponent/FilesFolderContainer"
import { useUserContext } from "../Context/UserContext"
import { useFetch } from "../hooks/useFetch"



export const FilesPage = () => {
    const { user } = useUserContext()
    const { request } = useFetch()
    const [numbers, setNumbers] = useState([10, 20, 30, 10, 20, 15])
    const [size, setSize] = useState(2.1)
    const [maxSize, setMaxSize] = useState(193.2)
    const folderTest = {
        name: "test filDSFSDFDSFSDFDSe",
        listeChild: [
            { name: "fichier.txt", size: "18ko", lastModif: "2025-12-03 14:22" },
            { name: "rapport-2024.pdf", size: "2.3Mo", lastModif: "2025-11-28 09:05" },
            { name: "photo-vacances.jpg", size: "1.8Mo", lastModif: "2025-10-12 18:40" },
            { name: "notes.txt", size: "6ko", lastModif: "2025-09-30 22:11" },
            { name: "design-system.fig", size: "12.4Mo", lastModif: "2025-08-21 16:03" },
            { name: "presentation.pptx", size: "4.7Mo", lastModif: "2025-07-02 11:55" },
            { name: "budget-2025.xlsx", size: "980ko", lastModif: "2025-06-18 08:27" },
            { name: "contrat-client.docx", size: "420ko", lastModif: "2025-05-09 13:14" },
            { name: "archive.zip", size: "25.1Mo", lastModif: "2025-04-01 19:02" },
            { name: "logo.svg", size: "48ko", lastModif: "2025-03-26 10:47" },
            { name: "readme.md", size: "9ko", lastModif: "2025-02-14 07:30" },
            { name: "fichier2.txt", size: "3ko", lastModif: "2025-01-05 17:09" },
            { name: "Projects", type: "folder", lastModif: "2026-01-19 12:20" },
            { name: "Clients", type: "folder", lastModif: "2026-01-16 09:10" },
            { name: "Archives", type: "folder", lastModif: "2026-01-10 17:45" },
            { name: "Invoices", type: "folder", lastModif: "2025-12-22 08:05" },
            { name: "Releases", type: "folder", lastModif: "2025-12-01 18:50" },
            { name: "mockup-home.png", size: "2.1Mo", lastModif: "2025-11-25 10:12" },
            { name: "mockup-dashboard.png", size: "2.6Mo", lastModif: "2025-11-24 15:44" },
            { name: "icons.zip", size: "54.2Mo", lastModif: "2025-11-20 19:40" },
            { name: "brand-guidelines.pdf", size: "6.8Mo", lastModif: "2025-11-18 13:05" },
            { name: "roadmap-2026.xlsx", size: "1.1Mo", lastModif: "2025-11-10 09:30" },
            { name: "meeting-notes-11-03.txt", size: "14ko", lastModif: "2025-11-03 16:22" },
            { name: "meeting-notes-11-10.txt", size: "11ko", lastModif: "2025-11-10 16:50" },
            { name: "specs-v2.docx", size: "520ko", lastModif: "2025-10-29 14:03" },
            { name: "database-schema.png", size: "820ko", lastModif: "2025-10-18 11:07" },
            { name: "wireframes.sketch", size: "9.3Mo", lastModif: "2025-10-05 08:55" },
            { name: "deployment-guide.md", size: "22ko", lastModif: "2025-09-21 20:04" },
            { name: "api-collection.json", size: "140ko", lastModif: "2025-09-14 12:39" },
            { name: "snapshot-2025-09-01.zip", size: "1.2Go", lastModif: "2025-09-01 23:58" },
            { name: "screenshot-1.png", size: "740ko", lastModif: "2025-08-28 10:11" },
            { name: "screenshot-2.png", size: "680ko", lastModif: "2025-08-28 10:12" },
            { name: "screenshot-3.png", size: "690ko", lastModif: "2025-08-28 10:13" },
            { name: "contract-v3.pdf", size: "1.9Mo", lastModif: "2025-08-15 09:41" },
            { name: "invoice-2025-07.pdf", size: "210ko", lastModif: "2025-07-31 18:00" },
            { name: "invoice-2025-08.pdf", size: "225ko", lastModif: "2025-08-31 18:00" },
            { name: "invoice-2025-09.pdf", size: "230ko", lastModif: "2025-09-30 18:00" },
            { name: "backup-2025-06.zip", size: "3.4Go", lastModif: "2025-06-30 23:40" },
            { name: "backup-2025-07.zip", size: "3.1Go", lastModif: "2025-07-31 23:40" },
            { name: "backup-2025-08.zip", size: "3.3Go", lastModif: "2025-08-31 23:40" },
            { name: "design-brief.txt", size: "7ko", lastModif: "2025-06-11 11:25" },
            { name: "onboarding.pdf", size: "1.4Mo", lastModif: "2025-05-27 15:12" },
            { name: "pricing.xlsx", size: "320ko", lastModif: "2025-05-18 10:08" },
            { name: "product-tour.mp4", size: "220Mo", lastModif: "2025-05-05 21:20" },
            { name: "landing-copy.docx", size: "110ko", lastModif: "2025-04-20 09:09" },
            { name: "feature-list.md", size: "12ko", lastModif: "2025-04-03 07:30" },
            { name: "board-2025.q3.pdf", size: "5.2Mo", lastModif: "2025-03-20 12:10" },
            { name: "marketing-plan.pdf", size: "3.6Mo", lastModif: "2025-03-10 16:42" },
            { name: "press-kit.zip", size: "780Mo", lastModif: "2025-02-21 13:33" },
            { name: "analytics-export.csv", size: "68ko", lastModif: "2025-02-01 06:55" },
            { name: "logo-legacy.ai", size: "28Mo", lastModif: "2025-01-20 19:15" },
        ],
    }

    useEffect(() => {
        let isCancelled = false

        const fetchStockage = async () => {
            if (!user?.id) return
            try {
                const data = await request({
                    method: "GET",
                    url: `/api/users/${user.id}/stockage`
                })
                if (!isCancelled) {
                    const fileCount = Number(data?.nombreFichiers) || 0
                    const usedMb = (Number(data?.tailleUtilisee) || 0) / (1024 * 1024)
                    const maxMb = (Number(data?.tailleMax) || 0) / (1024 * 1024)

                    setNumbers((prev) => [fileCount, ...prev.slice(1)])
                    setSize(usedMb)
                    setMaxSize(maxMb)
                }
            } catch {
                if (!isCancelled) {
                    setNumbers((prev) => [0, ...prev.slice(1)])
                }
            }
        }

        fetchStockage()

        return () => {
            isCancelled = true
        }
    }, [user?.id])

    return (
        <div className=" mx-auto w-[90vw] mt-15">
            <h1 className="mb-6">My Files</h1>
            <div name="container files" className="flex flex-col gap-6 md:flex-row md:gap-10">
                <FilesFolderContainer numbers={numbers} size={size} maxSize={maxSize} />
                <FilesExplorerComponent folder={folderTest} />
            </div>
        </div>
    )
}

