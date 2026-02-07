import { FilesExplorerComponent } from "../component/FilesPageComponent/FilesExplorerComponent"
import { FilesFolderContainer } from "../component/FilesPageComponent/FilesFolderContainer"



export const FilesPage = () => {
    const numbers = [10, 20, 30, 10, 20, 15]
    const size = 2.1
    const maxSize = 193.2
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
        ],
    }

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

