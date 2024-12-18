import { useMutation } from "@tanstack/react-query";
import { getLogin } from "../api-auth";

export interface LoginProps {
    email: string;
    password: string;
}

export function useLogin(body: LoginProps) {
    return useMutation({
        mutationFn: async () => await getLogin(body),
    });
}