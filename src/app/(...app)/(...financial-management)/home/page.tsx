"use client"

import { useGetOwnUser } from "@/services/hooks/users";
import { useEffect } from "react";
import { useUser } from "@/store/user"
import { useGetSummaryInternalInformations } from "@/services/hooks/summary-internal";
import { BarChartLabelUsers } from "@/components/(...app)/(...financial-management)/charts/BarChartLabelUsers";
// import { BarChartLabelBanks } from "@/components/(...app)/(...financial-management)/charts/BarChartLabelBanks";


export default function Home() {

    const { setUser } = useUser();
    const { data } = useGetOwnUser();
    const { data: internalInformations } = useGetSummaryInternalInformations();

    console.log(internalInformations)

    useEffect(() => {
        if (data?.user) {
            setUser(data.user);
        }
    }, [data?.user, setUser]);


    return (
        <div className=" pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold font-sans text-gray-800">Dashboard Inicial</h1>
                    <p className="text-xs text-gray-500">Informações sobre a Pluggy</p>
                </div>
            </div>
            <div className="flex items-start justify-center gap-8">
                <div className="w-full">
                    <BarChartLabelUsers usersByDay={internalInformations?.users_by_day} />
                </div>
                <div className="mt-8">
                    {/* <BarChartLabelBanks banksByDay={internalInformations?.banks_count} /> */}
                </div>
            </div>
        </div>
    )
}
