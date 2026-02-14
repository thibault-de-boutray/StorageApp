import { useCallback, useRef, useState } from "react";
import axios from "axios";

export function useFetch(defaultConfig = {}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const defaultConfigRef = useRef(defaultConfig);

    const request = useCallback(
        async (config = {}) => {
            setLoading(true);
            setError("");

            try {
                const response = await axios({
                    withCredentials: true,
                    ...defaultConfigRef.current,
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
        []
    );

    return { loading, data, error, request, setError };
}
