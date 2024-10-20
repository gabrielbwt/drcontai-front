import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Item = {
    itemId: string
    setItemId: (value: string) => void
}

export const useItem = create<Item>()(
    persist(
        (set) => ({
            itemId: '',
            setItemId: (value) => set({ itemId: value }),
        }),
        {
            name: 'item-id-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

