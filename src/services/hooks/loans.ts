import { useQuery } from "@tanstack/react-query";
import { getLoans } from "../api-loans";

export function useGetLoans(cpf: string) {
    return useQuery({
        queryFn: async () => await getLoans(cpf),
        queryKey: ["loans", cpf],
        enabled: cpf !== '',
    });
}