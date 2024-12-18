"use client"

import { BarChartLabel } from '@/components/(...app)/(...financial-management)/charts/BarChartLabel';
import { BarChartMultiple } from '@/components/(...app)/(...financial-management)/charts/BarChartMultiple';
import { useGetSummaryTransactions } from '@/services/hooks/summary-transactions';
import { useMedic } from '@/store/medic';
import Card from "@/components/(...app)/(...financial-management)/charts/Card"
import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default function UserInfo() {

    const { medic } = useMedic()

    const cpf_user = medic?.cpf

    const pathname = usePathname()

    console.log(pathname)

    const { data } = useGetSummaryTransactions(cpf_user);

    const financialSummary = data?.financial_summary || []
    const categoriesTransactions = financialSummary?.categories || []

    const thisMonthIncome = financialSummary?.income?.[financialSummary?.income?.length - 1]
    const thisMonthExpenses = financialSummary?.expenses?.[financialSummary?.expenses?.length - 1]
    const lastMonthIncome = financialSummary?.income?.[financialSummary?.income?.length - 2]
    const lastMonthExpenses = financialSummary?.expenses?.[financialSummary?.expenses?.length - 2]

    return (
        <div className=" pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold font-sans text-gray-800">Informações sobre o usuário</h1>
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
            <div className="flex gap-[2rem] mb-6 flex-1">
                <Card title='Saldo' value={thisMonthIncome - thisMonthExpenses} lastMonthValue={lastMonthIncome - lastMonthExpenses} />
                <Card title='Faturamento' value={thisMonthIncome} lastMonthValue={lastMonthIncome} />
                <Card title='Despesas' value={thisMonthExpenses} lastMonthValue={lastMonthExpenses} />
            </div>
            <div className="flex items-start justify-center gap-8">
                <div className="w-full">
                    <BarChartMultiple financialSummary={financialSummary} />
                </div>
                {/* <div className="max-xl:w-full  mb-6">
                    <BarChartRecurring transactions={recurringTransactionsDebited} />
                </div> */}
            </div>
            <div className='mt-8'>
                <BarChartLabel transactions={categoriesTransactions} range={financialSummary?.date_range} />
            </div>
        </div>
    )
}