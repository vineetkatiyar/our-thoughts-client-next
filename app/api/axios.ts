"use client"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"

export const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

axiosApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axiosApi