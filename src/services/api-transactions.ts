import { baseUrl, ensureValidToken } from "./api";

export async function getTransactions(cpf: string) {
    const accessToken = await ensureValidToken();

    const response = await fetch(`${baseUrl}/internal/list-transactions?cpf=${cpf}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch transactions')
    }

    const data = await response.json()

    return data
}


export async function getCategories() {
    const accessToken = await ensureValidToken();

    const response = await fetch(`${baseUrl}/internal/list-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }

    const data = await response.json()

    return data
}

export interface updateCategoryProps {
    categoryId: string
    transactionId: string
}

export async function updateCategory(body: updateCategoryProps) {
    const accessToken = await ensureValidToken();

    const newBody = {
        "transaction_id": body.transactionId,
        "category_id": body.categoryId
    }

    const response = await fetch(`${baseUrl}/internal/update-transaction-category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newBody)
    })

    if (!response.ok) {
        throw new Error('Failed to update category')
    }

    const data = await response.json()

    return data
}