export interface Transaction {
    id: string
    description: string
    currencyCode: string
    amount: number
    date: string
    balance: number
    category: string
    categoryId: string
    accountId: string
    status: string
    type: string
}

export interface RecurringTransaction {
    description: string
    total_amount: number
    ids: [
        string
    ]
}

export interface TransactionSummary {
    category: string
    debited: number
    received: number
}
