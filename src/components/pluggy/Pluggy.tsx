"use client"

import { useItem } from '@/store/transactions'
import dynamic from 'next/dynamic'
import { Item } from 'pluggy-js'

const PluggyConnect = dynamic(() => import('react-pluggy-connect').then(mod => mod.PluggyConnect), { ssr: false })

interface PluggyProps {
    token: string
    setShowPluggy: (showPluggy: boolean) => void
}

interface ItemProps {
    item: Item
}

export default function Pluggy({ token, setShowPluggy }: PluggyProps) {

    const { setItemId } = useItem()

    const onSuccess = ({ item }: ItemProps) => {

        setItemId(item.id)
    };

    const onError = () => {

    };


    return (
        <PluggyConnect
            connectToken={token}
            onSuccess={onSuccess}
            onError={onError}
            onClose={() => setShowPluggy(false)}
        />
    )
} 