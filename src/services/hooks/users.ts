import { getUsers, getOwnUser } from "../api-users";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
    return useQuery({
        queryFn: async () => await getUsers(),
        queryKey: ["users"],
        retry: false, // Evita retries automáticos em caso de erro de autenticação
    });
}

export function useGetOwnUser() {
    return useQuery({
        queryFn: async () => await getOwnUser(),
        queryKey: ["own-user"],
        retry: false, // Evita retries automáticos em caso de erro de autenticação
    });
}