import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


type MedicInfo = {
    id: string
    name: string
    cpf: string
}

type Medic = {
    medic: MedicInfo
    setMedic: (value: MedicInfo) => void

}

export const useMedic = create<Medic>()(
    persist(
        (set) => ({
            medic: {
                name: '',
                cpf: '',
                id: ''
            },
            setMedic: (value: MedicInfo) => set({ medic: value }),
        }),
        {
            name: 'medic-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
