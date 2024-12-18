import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
    name: string
    email: string;
    cpf: string;
}

type UserProps = {
    user: User
    setUser: (value: User) => void
}

export const useUser = create<UserProps>()(
    persist(
        (set) => ({
            user: {
                name: '',
                email: '',
                cpf: ''
            },
            setUser: (value: User) => set({ user: value })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)