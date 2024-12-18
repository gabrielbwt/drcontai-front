export interface Transaction {
    id: string
    cpf: string
    description: string
    amount: number
    date: string
    operationType: string
    parentCategory: string
    categoryId: string
}

export interface RecurringTransaction {
    description: string
    total_amount: number
    ids: [
        string
    ]
}

export interface TransactionSummary {
    name: string
    monthly_average: number
}


export interface SummaryFinancial {
    months: string[]
    income: number[]
    expenses: number[]
    date_range: string
}