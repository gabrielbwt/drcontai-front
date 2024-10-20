import { CategoryUpdate } from "./hooks/category";
import { InformationProps } from "./hooks/informations";

const baseUrl = 'http://localhost:8000/pluggy'

export async function getConnectToken() {
    const response = await fetch(`${baseUrl}/connect`, {
        cache: 'no-cache',
        next: {
            tags: ['get-connect-token'],
        }
    })

    const data = await response.json()

    const { token } = data

    return token
}


export async function getTransactions(id: string) {

    if (id === '') {
        return []
    }


    const response = await fetch(`${baseUrl}/transactions/${id}`)

    const transactions = await response.json()

    return transactions
}



export async function getInformations(body: InformationProps) {

    const response = await fetch(`${baseUrl}/informations/${body.id}?from=${body.from}&to=${body.to}`)

    const informations = await response.json()

    return informations
}

export async function updateCategory(body: CategoryUpdate) {

    const newBody = {
        transaction_id: body.transactionId,
        category_id: body.categoryId
    }

    const response = await fetch(`${baseUrl}/update-category`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBody)
    })

    const data = await response.json()

    return data
}

export async function getCategories() {

    const response = await fetch(`${baseUrl}/categories`, {
        cache: 'force-cache',
    })

    const categories = await response.json()

    return categories
}
