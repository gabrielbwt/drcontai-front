import { Transaction } from "@/@types/transaction";
import { useState } from "react";
import ModalEditTransaction from "./ModalEditTransaction";
import EditSVG from '@/assets/svg/icons/edit.svg'
import Image from "next/image";

interface LineProps {
    transaction: Transaction
}

export default function Line({ transaction }: LineProps) {

    const [showModal, setShowModal] = useState(false)

    return (
        <li className="odd:bg-gray-100 even:bg-white p-4" key={transaction.id}>
            {showModal && <ModalEditTransaction setShow={setShowModal} transactionId={transaction.id} categoryId={transaction.categoryId} />}
            <div className="flex items-center justify-between gap-4">
                <div className="font-bold text-xs w-64">{transaction.description}</div>

                <div className={`text-sm w-32 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {transaction.amount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: transaction.currencyCode
                    })}
                </div>

                <div className="text-sm text-gray-500 w-64">{transaction.category}</div>

                <div className="text-sm w-32 text-gray-500 flex justify-between">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    <div className="mr-4">
                        <button onClick={() => setShowModal(true)} className=""><Image src={EditSVG} alt='Icone de Edição' width={500} height={500} style={{ width: '1rem' }} /></button>
                    </div>
                </div>
            </div>
        </li>
    );
}
