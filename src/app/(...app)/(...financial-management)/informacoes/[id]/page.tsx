"use client"

// import { useGetInvestiments } from "@/services/hooks/investiments";
// import { useGetLoans } from "@/services/hooks/loans";
import { useMedic } from "@/store/medic";
import { Investment } from '@/@types/investiments';
import InvestimentList from "@/components/(...app)/(...financial-management)/informacoes/InvestimentList";
import { InvestimentPieChart } from "@/components/(...app)/(...financial-management)/charts/InvestimentPieChart";
import InvestimentSummary from "@/components/(...app)/(...financial-management)/informacoes/InvestimentSummary";
import InvestimentInfo from "@/components/(...app)/(...financial-management)/informacoes/InvestmentInfo";
import { usePathname } from "next/navigation";
import { useGetInvestiments } from "@/services/hooks/investiments";
import Link from "next/link";


export default function Informations() {

    const { medic } = useMedic()

    const { data, isLoading } = useGetInvestiments(medic.cpf)

    const investiments = data?.investiments || []

    const pathname = usePathname()





    return (

        <div className="pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold font-sans text-gray-800">Informações de Investimentos</h1>
                    <p className="text-sm text-gray-500">{medic.name}</p>
                </div>
                <div className='flex gap-4'>
                    <Link
                        href={`/usuarios/${medic.id}`}
                        className={`flex transition-colors duration-200 items-center justify-center rounded-lg ${pathname === `/usuarios/${medic.id}` ? 'bg-green-700' : 'bg-vibrant-green-dark '} px-3 h-8 text-sm font-medium font-sans text-white hover:bg-primary-dark/90`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={`/transacoes/${medic.id}`}
                        className={`flex transition-colors duration-200 items-center justify-center rounded-lg ${pathname === `/transacoes/${medic.id}` ? 'bg-green-700' : 'bg-vibrant-green-dark '} px-3 h-8 text-sm font-medium font-sans text-white hover:bg-primary-dark/90`}
                    >
                        Transações
                    </Link>
                    <Link
                        href={`/informacoes/${medic.id}`}
                        className={`flex transition-colors duration-200 items-center justify-center rounded-lg ${pathname === `/informacoes/${medic.id}` ? 'bg-green-700' : 'bg-vibrant-green-dark '} px-3 h-8 text-sm font-medium font-sans text-white hover:bg-primary-dark/90`}
                    >
                        Mais informações

                    </Link>
                </div>

            </div>
            <div>
                <div className="flex items-center justify-center gap-8">
                    <div>
                        <InvestimentInfo investments={investiments as Investment[]} isLoading={isLoading} />
                    </div>
                    <div>
                        <InvestimentPieChart investments={investiments as Investment[]} isLoading={isLoading} />
                    </div>
                    <div>
                        <InvestimentSummary investments={investiments as Investment[]} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <div>
                <InvestimentList investments={investiments as Investment[]} isLoading={isLoading} />
            </div>
        </div>






    )
}