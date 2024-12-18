import { useToken } from "@/store/token";
import { baseUrl } from "./api"


export async function getLoans(cpf: string) {
    const { token } = useToken.getState()

    const response = await fetch(`${baseUrl}/internal/list-laons?cpf=${cpf}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    const data = await response.json()

    return data
}