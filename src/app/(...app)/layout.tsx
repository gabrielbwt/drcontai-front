"use client"

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [showSidebar, setShowSidebar] = useState(false)
    const [showMenuOptions, setShowMenuOptions] = useState(false)

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
                <div>
                    <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} showMenuOptions={showMenuOptions} setShowMenuOptions={setShowMenuOptions} />
                </div>
                <div className="">
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