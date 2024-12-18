"use client"

import Modal from "@/components/modal/Modal"
import CloseSVG from "@/assets/svg/icons/close.svg"
import Image from "next/image"
import Input from "@/components/input/Input"
import InputWithOptions from "@/components/input/InputWithOptions"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useGetCategories, useUpdateCategory } from "@/services/hooks/transactions"
import Loading from "@/components/utils/Loading"
import { useMedic } from "@/store/medic"

interface ModalEditTransactionProps {
    transactionId: string
    categoryId: string
    setShow: (value: boolean) => void
}

interface Category {
    id: string
    description: string
    descriptionTranslated: string
}

export default function ModalEditTransaction({ setShow, transactionId, categoryId }: ModalEditTransactionProps) {

    const { data, isLoading: isLoadingGetCategories } = useGetCategories()

    const [newCategoryId, setNewCategoryId] = useState('')

    const queryClient = useQueryClient()

    const { medic } = useMedic()

    const body = {
        "transactionId": transactionId,
        "categoryId": newCategoryId
    }

    const { mutate, isLoading } = useUpdateCategory(body)

    function handleChangeCategory() {
        mutate(void 0, {
            onSuccess: () => {
                setShow(false)
                queryClient.invalidateQueries(['transactions', medic.cpf])
                queryClient.invalidateQueries(["summary-transactions", medic.cpf])
            }
        })
    }

    const currentCategory = data?.categories?.find((category: Category) => category.id === categoryId)



    return (
        <Modal show={true} setShow={setShow}>
            <div className="w-[20rem] min-h-64 h-auto rounded-lg bg-white p-4 shadow-lg relative">

                {isLoadingGetCategories && <div className="flex items-center justify-center"><Loading size={320} /></div>}

                {!isLoadingGetCategories && isLoading && <div className="absolute top-2 left-2 text-vibrant-green-main"><Loading /></div>}
                {!isLoadingGetCategories && !isLoading && <>

                    <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setShow(false)}>
                        <Image src={CloseSVG} alt="Ícone de Fechar" width={500} height={500} style={{ width: '1.3rem' }} />
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="text-sm font-md font-sans text-gray-700">
                            Altere a categoria da transação
                        </div>

                        <div className="text-sm font-bold text-gray-900">
                            <Input id='currentCategory' placeholder='Categoria Atual' value={currentCategory?.descriptionTranslated} disabled textSize="text-sm" setInput={setNewCategoryId} />
                        </div>

                        <div className="text-sm font-semibold text-gray-700">
                            Selecione a nova categoria:
                        </div>

                        <div>
                            <InputWithOptions id='newCategory' placeholder='Nova Categoria' listOptions={data?.categories} setValueId={setNewCategoryId} />
                        </div>
                    </div>

                    <button className="w-full duration-200 transition-colors bg-vibrant-green-dark text-white rounded-lg p-2 mt-4 hover:bg-primary-dark/90" onClick={handleChangeCategory}>
                        Salvar
                    </button>
                </>}



            </div>

        </Modal>
    )
}