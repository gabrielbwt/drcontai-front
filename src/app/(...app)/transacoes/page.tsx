"use client"

import Line from '@/components/(...app)/transacoes/Line'
import { Transaction } from '@/@types/transaction'
import { useItem } from '@/store/transactions';
import { useGetTransactions } from '@/services/hooks/transactions';


export default function Transactions() {

    const { itemId } = useItem()

    const final_date = new Date();
    final_date.setDate(final_date.getDate() + 1);

    const body = {
        itemId,
        from: '2024-01-01',
        to: final_date.toISOString().split('T')[0]
    }

    const { data: transactions, isLoading } = useGetTransactions(body)

    return (
        <div className="pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold font-sans text-gray-800">Transações</h1>
                    <p className="text-xs text-gray-500">Lista das suas transações</p>
                </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md shadow border mb-4">
                <div className='text-xs'>
                    Seção de filtros disponível na próxima atualização
                </div>
            </div>

            <div className="gap-[2rem] flex-1 max-h-[40rem] overflow-scroll border rounded-md shadow">
                <ul className="bg-white divide-y divide-gray-200 border rounded-md">
                    {isLoading && (
                        <li className="p-4 text-gray-500">Carregando...</li>
                    )}
                    {!isLoading && (transactions?.length > 0 ? (
                        transactions?.map((transaction: Transaction) => (
                            <Line key={transaction.id} transaction={transaction} />
                        ))
                    ) : (
                        <li className="p-4 text-gray-500">Nenhuma transação encontrada.</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
