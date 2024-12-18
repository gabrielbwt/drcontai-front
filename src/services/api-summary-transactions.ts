import { baseUrl } from "./api";
import { useToken } from "@/store/token";

export async function getSummaryTransactions(cpf: string) {

    const { token } = useToken.getState()

    const response = await fetch(`${baseUrl}/internal/list-summary-transactions?cpf=${cpf}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    const data = await response.json()

    return data
}