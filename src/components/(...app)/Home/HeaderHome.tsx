"use client"

import { useState } from "react"
import Pluggy from "@/components/pluggy/Pluggy"

interface HeaderHomeProps {
    token: string
}

export default function HeaderHome({ token }: HeaderHomeProps) {

    const [showPluggy, setShowPluggy] = useState(false)

    return (
        <div className="mb-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold font-sans text-gray-800">Dashboard</h1>
                <p className="text-xs text-gray-500">Resumo do seu negócio</p>
            </div>
            <div>
                <button
                    onClick={() => setShowPluggy(!showPluggy)}
                    className="flex transition-colors duration-200 items-center justify-center rounded-lg bg-primary-main px-5 h-9 text-sm font-medium font-sans text-white hover:bg-primary-dark/90"
                >
                    Conectar sua conta
                </button>
                {showPluggy && (<Pluggy token={token} setShowPluggy={setShowPluggy} />)}
            </div>
        </div>
    )
}