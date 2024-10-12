import axios from "axios";

const baseUrl = (): string => {
    let url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PATH}/api`;
    if (typeof window !== 'undefined' && import.meta.env.VITE_ENV !== "DEV") {
        url = `${location.protocol}//${location.host}${import.meta.env.VITE_API_BASE_PATH}/api`;
    }
    return url;
}

export const useAxiosClient = () => {
    return axios.create({
        withCredentials: true,
        baseURL:         baseUrl()
    });
}
