import { defaultStyles } from "react-file-icon"

export const getFileExtension = (filename = "") => {
    const parts = String(filename).split(".")
    if (parts.length < 2) return "txt"
    return parts[parts.length - 1].toLowerCase()
}

export const getFileIconStyle = (filename = "") => {
    const ext = getFileExtension(filename)
    return defaultStyles[ext] || defaultStyles.txt
}

export const getFileTypeLabel = (filename = "") => {
    const ext = getFileExtension(filename)
    return ext.toUpperCase()
}

export const getLastModif = (isoDate) => {
    const past = new Date(isoDate)
    if (Number.isNaN(past.getTime())) return "--"

    const now = new Date()
    const diffMs = now - past

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return `il y a ${seconds} secondes`
    if (minutes < 60) return `il y a ${minutes} minutes`
    if (hours < 24) return `il y a ${hours} heures`
    if (days < 7) return `il y a ${days} jours`

    return `Le ${past.toLocaleDateString("fr-FR")}`
}
