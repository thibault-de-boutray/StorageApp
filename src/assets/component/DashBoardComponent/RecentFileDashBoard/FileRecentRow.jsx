
import { FileIcon, defaultStyles } from "react-file-icon";


export const FileRecentRow = ({ file }) => {
    const handleDownload = (event) => {
        event.preventDefault()
        // TODO: remplacer par l'appel API backend
        const a = document.createElement("a")
        a.href = `/files/${file.name}`
        a.download = file.name
        a.click()
    }
    const getExtension = (filename) => {
        return filename.split(".").at(-1);
    }
    const getLastModif = (isoDate) => {
        const now = new Date();
        const past = new Date(isoDate);

        const diffMs = now - past;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return `il y a ${seconds} secondes`;
        }

        if (minutes < 60) {
            return `il y a ${minutes} minutes`;
        }

        if (hours < 24) {
            return `il y a ${hours} heures`;
        }

        if (days < 7) {
            return `il y a ${days} jours`;
        }
        return `Le ${past.toLocaleDateString("fr-FR")}`;
    };
    return (
        <li>
            <div className="flex items-center justify-between py-3 border-b border-gray-400/80">
                <div className="flex gap-3 items-center">
                    <div className="w-7 h-7">
                        <FileIcon extension={getExtension(file.name)} {...(defaultStyles[getExtension(file.name)] || defaultStyles.txt)} />
                    </div>
                    <p className="text-sm">{file.name}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-gray-200/80 text-xs">{getLastModif(file.updatedAt)}</p>
                    <a
                        href={`/files/${file.name}`}
                        onClick={handleDownload}
                        className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors underline underline-offset-4 decoration-emerald-400/40 hover:decoration-emerald-300/80"
                    >
                        Télécharger
                    </a>
                </div>
            </div>
        </li>
    )
}

