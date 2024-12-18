import { ensureValidToken } from "./api";
import { baseUrl } from "./api";

export async function getUsers() {
    const accessToken = await ensureValidToken();

    const response = await fetch(`${baseUrl}/internal/list-users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
}


export async function getOwnUser() {
    const accessToken = await ensureValidToken();

    const response = await fetch(`${baseUrl}/internal/own-user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch own user");
    }

    return await response.json();
}