import { FileIcon, defaultStyles } from "react-file-icon"

export const FileShareRow = ({ file }) => {
    const getExtension = (filename) => {
        return filename.split(".").at(-1)
    }

    const getLastModif = (isoDate) => {
        const now = new Date()
        const past = new Date(isoDate)

        const diffMs = now - past

        const seconds = Math.floor(diffMs / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (seconds < 60) {
            return `il y a ${seconds} secondes`
        }

        if (minutes < 60) {
            return `il y a ${minutes} minutes`
        }

        if (hours < 24) {
            return `il y a ${hours} heures`
        }

        if (days < 7) {
            return `il y a ${days} jours`
        }
        return `Le ${past.toLocaleDateString("fr-FR")}`
    }

    return (
        <li>
            <div className="flex items-center justify-between py-3 border-b border-gray-400/80">
                <div className="flex gap-3 items-center">
                    <div className="w-7 h-7">
                        <FileIcon extension={getExtension(file.name)} {...(defaultStyles[getExtension(file.name)] || defaultStyles.txt)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">{file.name}</p>
                        <p className="text-gray-400 text-xs">{file.sharedBy}</p>
                    </div>
                </div>
                <p className="text-gray-200/80 text-xs">{getLastModif(file.updatedAt)}</p>
            </div>
        </li>
    )
}
