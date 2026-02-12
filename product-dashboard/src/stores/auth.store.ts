import { create } from "zustand"

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: any
  setTokens: (access: string, refresh: string) => void
  logout: () => void
}

export const authStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,

  setTokens: (access, refresh) => {
    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)
    set({ accessToken: access, refreshToken: refresh })
  },

  logout: () => {
    
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
    })
  }
}))
