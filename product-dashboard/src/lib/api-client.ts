import axios from "axios"
import { authStore } from "../stores/auth.store"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    
    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = authStore.getState().refreshToken

        
        if (!refreshToken) {
          authStore.getState().logout()
          window.location.href = "/login"
          return Promise.reject(error)
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken, expiresInMins: 1 }
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data

        
        authStore.getState().setTokens(accessToken, newRefreshToken)

        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return api(originalRequest)

      } catch (refreshError) {
        authStore.getState().logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)


export default api
