import { useToken } from "@/store/token";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export async function revalidateToken() {

    const refreshToken = useToken.getState().refreshToken;

    if (!refreshToken) {
        throw new Error("Refresh token missing");
    }

    const response = await fetch(`${baseUrl}/internal/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "refresh_token": refreshToken }),
    });

    console.log(response)

    if (!response.ok) {
        throw new Error("Failed to revalidate token");
    }

    const { token } = await response.json();


    useToken.getState().setToken(token);

    return token;
}

function isTokenExpired(token: string): boolean {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
}

export async function ensureValidToken(): Promise<string> {
    const { token } = useToken.getState();

    if (isTokenExpired(token)) {
        try {
            const newToken = await revalidateToken();
            return newToken;
        } catch (error) {
            console.error(error);
            // window.location.href = "/";
            // setToken("");
            // setRefreshToken("");
            // throw new Error("Failed to refresh token");
        }
    }

    return token;
}