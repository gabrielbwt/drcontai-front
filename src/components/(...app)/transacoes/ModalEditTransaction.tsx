import Modal from "@/components/modal/Modal"
import CloseSVG from "@/assets/svg/icons/close.svg"
import Image from "next/image"
import { useGetCategories, useUpdateCategory } from "@/services/hooks/category"
import Input from "@/components/input/Input"
import InputWithOptions from "@/components/input/InputWithOptions"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface ModalEditTransactionProps {
    transactionId: string
    categoryId: string
    setShow: (value: boolean) => void
}

export default function ModalEditTransaction({ setShow, transactionId, categoryId }: ModalEditTransactionProps) {

    const { data } = useGetCategories()

    const [newCategoryId, setNewCategoryId] = useState('')

    const queryClient = useQueryClient()

    const body = {
        "transactionId": transactionId,
        "categoryId": newCategoryId
    }

    const { mutate, isLoading, isSuccess } = useUpdateCategory(body)

    function handleChangeCategory() {
        mutate(void 0, {
            onSuccess: () => {
                setShow(false)
                queryClient.invalidateQueries(['transactions'])
            }
        })
    }

    const currentCategory = data?.find((category: any) => category.id === categoryId)

    return (
        <Modal show={true} setShow={setShow}>
            <div className="w-[20rem] min-h-64 h-auto rounded-lg bg-white p-4 shadow-lg relative">

                {isLoading && <div className="absolute top-2 left-2 text-primary-main">Alterando categoria...</div>}
                {!isLoading && <>

                    <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setShow(false)}>
                        <Image src={CloseSVG} alt="Ícone de Fechar" width={500} height={500} style={{ width: '1.3rem' }} />
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="text-sm font-md font-sans text-gray-700">
                            Altere a categoria da transação
                        </div>

                        <div className="text-sm font-bold text-gray-900">
                            <Input id='currentCategory' placeholder='Categoria Atual' value={currentCategory?.descriptionTranslated} disabled textSize="text-sm" />
                        </div>

                        <div className="text-sm font-semibold text-gray-700">
                            Selecione a nova categoria:
                        </div>

                        <div>
                            <InputWithOptions id='newCategory' placeholder='Nova Categoria' listOptions={data} setValueId={setNewCategoryId} />
                        </div>
                    </div>

                    <button className="w-full duration-200 transition-colors bg-primary-main text-white rounded-lg p-2 mt-4 hover:bg-primary-dark/90" onClick={handleChangeCategory}>
                        Salvar
                    </button>
                </>}



            </div>

        </Modal>
    )
}