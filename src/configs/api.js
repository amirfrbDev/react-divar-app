import axios from "axios";
import { getNewTokens } from "services/token";
import { setCookie } from "src/utils/cookie";
import { getCookie } from "utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})





api.interceptors.request.use(request => {
    const accessToken = getCookie("accessToken")

    if (accessToken) {
        request.headers["Authorization"] = `bearer ${accessToken}`
    }
    return request
}, (error) => {
    return Promise.reject(error)
});


api.interceptors.response.use(response => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const res = await getNewTokens()
        if (!res?.response) return;
        setCookie(res.response.data)

        return api(originalRequest)
    }
})

export { api }