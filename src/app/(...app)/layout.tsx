"use client"

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useToken } from "@/store/token";
import { useState } from "react";
import { redirect } from 'next/navigation'

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [showSidebar, setShowSidebar] = useState(false)
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const { token } = useToken()

    if (!token) {
        redirect(`/`)
    }


    return (
        <div className="flex">
            {showMenuOptions && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenuOptions(false)}
                ></div>
            )}
            <div>
                <Sidebar showSidebar={showSidebar} />
            </div>
            <div className="flex-1">
                <div className="fixed top-0 right-0 z-50 min-[1110px]:w-[calc(100%-16rem)] w-full">
                    <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} showMenuOptions={showMenuOptions} setShowMenuOptions={setShowMenuOptions} />
                </div>
                <div className="mt-[3.5rem]">
                    {showSidebar && (
                        <div
                            className="fixed inset-0 bg-black opacity-50 min-[1110px]:hidden z-40"
                            onClick={() => setShowSidebar(false)}
                        ></div>
                    )}
                    <div className={`ml-0 min-[1110px]:ml-[16rem] transition-all z-30 duration-300 ${showSidebar ? 'pointer-events-none' : ''}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}