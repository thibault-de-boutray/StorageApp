import { useCallback, useState } from "react";
import axios from "axios";

export function useFetch(defaultConfig = {}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const request = useCallback(
        async (config = {}) => {
            setLoading(true);
            setError("");

            try {
                const response = await axios({
                    withCredentials: true,
                    ...defaultConfig,
                    ...config
                });
                setData(response.data);
                return response.data;
            } catch (err) {
                const message = err?.response?.data?.message || "une erreur est survenue";
                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [defaultConfig]
    );

    return { loading, data, error, request, setError };
}
