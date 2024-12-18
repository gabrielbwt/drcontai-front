"use client"

// import Line from '@/components/(...app)/transacoes/Line'
// import { Transaction } from '@/@types/transaction'
import { useMedic } from '@/store/medic'
import { useGetTransactions } from '@/services/hooks/transactions'
import TransactionLine from '@/components/(...app)/(...financial-management)/transacoes/TransactionLine'
import { Transaction } from '@/@types/transaction'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useItem } from '@/store/transactions';
// import { useGetTransactions } from '@/services/hooks/transactions';


export default function Transactions() {

    const { medic } = useMedic()

    const pathname = usePathname()

    const cpf = medic?.cpf

    const { data, isLoading: isLoadingForGetTransactions, isFetching: isFetchingForGetTransactions } = useGetTransactions(cpf);

    console.log(data)

    const transactions = data?.transactions || []

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const filteredTransactions = transactions.filter(
        (transaction: Transaction) =>
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.parentCategory.toLowerCase().includes(search.toLowerCase())
    );

    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    return (
        <div className="pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-gray-50 gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold font-sans text-gray-800">Transações do usuário</h1>
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
            <div className="flex-1 mb-4">
                <input
                    type="text"
                    placeholder="Busque pela Descrição ou pela Categoria."
                    className="p-2 border border-gray-300 rounded-md w-1/3 placeholder:text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border mt-8 pb-6">
                <div className="flex items-center justify-between gap-4 p-4 rounded-t-lg font-semibold text-sm text-dark-green-main mx-4 border-b-[1px]">
                    <div className="flex items-center w-[15rem] justify-center">Descrição</div>
                    <div className="flex items-center w-32 justify-center">Valor</div>
                    <div className="flex items-center w-40 justify-center">Data e Hora</div>
                    <div className="flex items-center w-64 justify-center">Categoria</div>
                    <div className="flex items-center w-32 justify-center">Tipo de Operação</div>
                    <div className="flex items-center w-6 justify-center"></div>
                </div>
                <div>
                    {Array.from({ length: itemsPerPage }).map((_, index) => {
                        const transaction = currentTransactions[index];
                        const key = transaction ? transaction.id : `transaction-${index}`;

                        return (
                            <TransactionLine
                                key={key}
                                transaction={transaction}
                                index={index}
                                isLoading={isLoadingForGetTransactions || isFetchingForGetTransactions}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-center space-x-4 mt-6 items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </div>



            {/* <div>
                {transactions.map((transaction: any) => {
                    return (
                        <div key={transaction.id}>
                            <TransactionLine transaction={transaction} />
                        </div>
                    )
                })}
            </div> */}



            {/* 
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
            </div> */}
        </div>
    )
}
