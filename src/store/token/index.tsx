import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Token = {
    token: string
    setToken: (value: string) => void
    refreshToken: string
    setRefreshToken: (value: string) => void
}

export const useToken = create<Token>()(
    persist(
        (set) => ({
            token: '',
            setToken: (value: string) => set({ token: value }),
            refreshToken: '',
            setRefreshToken: (value: string) => set({ refreshToken: value }),
        }),
        {
            name: 'token-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
