
import { baseUrl } from "./api"
import { LoginProps } from "./hooks/auth"

export async function getLogin(body: LoginProps) {

    const response = await fetch(`${baseUrl}/internal/login-platform`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    return data
}