// Interceptor
import axios from "axios"
import { ACCESS_TOKEN } from "./constands"

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=> {
        return Promise.reject(error)
    }
)

// api.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;