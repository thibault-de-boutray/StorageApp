import { useCallback, useState } from "react"
import axios from "axios"

export const useUpload = (defaultConfig = {}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [progress, setProgress] = useState(0)
    const [uploaded, setUploaded] = useState([])

    const reset = useCallback(() => {
        setError("")
        setProgress(0)
        setUploaded([])
    }, [])

    const uploadFiles = useCallback(
        async (files, extraFields = {}) => {
            const fileList = Array.from(files || [])
            if (fileList.length === 0) {
                setError("aucun fichier selectionne")
                return null
            }

            setLoading(true)
            setError("")
            setProgress(0)

            const formData = new FormData()
            fileList.forEach((file) => formData.append("files", file))
            Object.entries(extraFields).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value))
                }
            })

            try {
                const response = await axios.post("/api/users/me/files", formData, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (event) => {
                        if (!event.total) return
                        setProgress(Math.round((event.loaded * 100) / event.total))
                    },
                    ...defaultConfig
                })

                const uploadedFiles = response?.data?.files || []
                setUploaded(uploadedFiles)
                return response.data
            } catch (err) {
                const message = err?.response?.data?.message || "echec upload"
                setError(message)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [defaultConfig]
    )

    return { uploadFiles, loading, error, progress, uploaded, reset, setError }
}
