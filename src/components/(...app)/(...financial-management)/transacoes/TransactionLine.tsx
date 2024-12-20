// import { TypeUser } from "@/@types/user";
// import { useMedic } from "@/store/medic";
// import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import EditSVG from '@/assets/svg/icons/edit.svg'
import Image from "next/image";

import { Transaction } from "@/@types/transaction"
import { useState } from "react";
import ModalEditTransaction from "./ModalEditTransaction";
import { truncateString } from "@/utils";

interface TransactionLineProps {
    transaction: Transaction
    index: number;
    isLoading: boolean;
}


export default function TransactionLine({ transaction, index, isLoading }: TransactionLineProps) {

    const [showModal, setShowModal] = useState(false)

    const data = dayjs(transaction?.date).format("DD/MM/YYYY - HH:mm");

    const MAP_OPERATION_TYPE = {
        "PIX": "Pix",
        "CARTAO": "Cartão",
        "BOLETO": "Boleto",
        "TRANSFERENCIA_MESMA_INSTITUICAO": "Transferência mesma instituição",
        "RESGATE_APLIC_FINANCEIRA": "Resgate aplicação financeira",
        "CONVENIO_ARRECADACAO": "Débito Automático",
        "PACOTE_TARIFA_SERVICOS": "Débito Automático",
        "OPERACAO_CREDITO": "Cheque Especial",
        "OUTROS": "Outros",
    }

    const operationType = transaction?.operationType in MAP_OPERATION_TYPE ? MAP_OPERATION_TYPE[transaction?.operationType as keyof typeof MAP_OPERATION_TYPE] : "Outros"

    //function that add ... when the description is too long


    // const router = useRouter()

    const hasTransaction = transaction?.description ? true : false;

    // const hasUser = user?.name ? true : false;

    // const date = dayjs(user?.createdAt).format("DD/MM/YYYY");

    // const { setMedic } = useMedic()

    // function redirectToUser() {
    //     setMedic({ name: user.name, cpf: user.cpf, id: user.id })
    //     router.push(`/usuarios/${user.id}`)
    // }

    if (isLoading) {
        return (
            <div
                key={index}
                className={`flex items-center justify-between gap-4 p-4 bg-white text-gray-900 text-sm cursor-pointer hover:bg-gray-200/50 h-14 place-items-center border-b-[1px] mx-4`}
            >
                <div className="font-medium flex items-center justify-center text-sm text-dark-green-main">
                    <div className="w-[15rem] h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-64 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-6 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        )
    }

    else if (!hasTransaction) {
        return (
            <div
                key={`empty-${index}`}
                className={`flex items-center justify-between gap-4 p-4 bg-white text-gray-900 text-sm hover:bg-gray-200/50 h-14 place-items-center  border-b-[1px] mx-4 cursor-not-allowed`
                }
            >
                <div className="font-medium text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
            </div >
        )
    }

    return (
        <>
            {showModal && <ModalEditTransaction show={showModal} setShow={setShowModal} transactionId={transaction.id} categoryId={transaction.categoryId} />}
            <div
                key={transaction?.id}
                className={`flex items-center justify-between gap-4 p-4 bg-white text-gray-900 text-sm hover:bg-gray-200/50 h-14 place-items-center  border-b-[1px] mx-4 font-normal font-sans`
                }
            >
                <div className="font-medium flex items-center justify-start text-sm w-[15rem] text-dark-green-main">{truncateString(transaction?.description)}</div>
                <div className={`text-sm flex items-center justify-center w-32 ${((transaction?.amount > 0)) ? 'text-vibrant-green-dark' : 'text-red-500'}`}>{`R$ ${transaction?.amount?.toLocaleString("pt-br", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                })}`}</div>
                <div className="text-sm flex items-center justify-center w-40 text-dark-green-main">{data}</div>
                <div className="text-sm flex items-center justify-center w-64 text-dark-green-main">{transaction?.parentCategory}</div>
                <div className="text-sm flex items-center justify-center w-32 text-dark-green-main text-center">{operationType}</div>
                <div className="flex items-center w-6 justify-center">
                    <div className="" onClick={() => { setShowModal(true) }}>
                        <button className="cursor-pointer"><Image src={EditSVG} alt='Icone de Edição' width={500} height={500} style={{ width: '1rem' }} /></button>
                    </div>
                </div>
            </div >
        </>
    )
}


