import { baseUrl } from "./api";
import { useToken } from "@/store/token";

export async function getSummaryInternalInformations() {
    const { token } = useToken.getState()

    const response = await fetch(`${baseUrl}/internal/list-internal-informations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    const data = await response.json()

    return data
}