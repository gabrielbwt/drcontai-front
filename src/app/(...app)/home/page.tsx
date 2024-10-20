"use client"

import HeaderHome from "@/components/(...app)/Home/HeaderHome"
import { BarChartLabel } from "@/components/charts/BarChartLabel"
import Card from "@/components/charts/Card"
import { useGetToken } from "@/services/hooks/token"
import { useGetInformations } from "@/services/hooks/informations"
import { useItem } from "@/store/transactions"
import { BarChartMultiple } from "@/components/charts/BarChartMultiple"
import { BarChartRecurring } from "@/components/charts/BarChartRecurring"


export default function Home() {

    const { itemId } = useItem()

    const { data: token } = useGetToken()

    const body = {
        id: itemId,
        from: '2024-01-01',
        to: '2024-10-19'
    }

    const { data: informations } = useGetInformations(body)

    const monthlyTransactions = informations ? informations['monthly_transactions'] : []

    const thisMonth = monthlyTransactions[monthlyTransactions?.length - 1]
    const lastMonth = monthlyTransactions[monthlyTransactions?.length - 2]

    const recurringTransactionsDebited = informations ? informations['recurring_transactions']['recurring_transactions_debited'] : []

    const transactionsSummary = informations ? informations['transactions_summary'] : []

    return (
        <div className=" pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <HeaderHome token={token} />
            <div className="flex gap-[2rem] mb-6 flex-1">
                <Card title='Saldo' value={thisMonth?.received - thisMonth?.debited} lastMonthValue={lastMonth?.received - lastMonth?.debited} />
                <Card title='Faturamento' value={thisMonth?.received} lastMonthValue={lastMonth?.received} />
                <Card title='Despesas' value={thisMonth?.debited} lastMonthValue={lastMonth?.debited} />
            </div>
            <div className="flex items-start justify-center gap-8">
                <div className="w-full">
                    <BarChartMultiple transactions={monthlyTransactions} />
                </div>
                <div className="max-xl:w-full  mb-6">
                    <BarChartRecurring transactions={recurringTransactionsDebited} />
                </div>
            </div>
            <div>
                <BarChartLabel transactions={transactionsSummary} />
            </div>
        </div>
    )
}