import { useQuery } from "@tanstack/react-query";
import { getSummaryTransactions } from "../api-summary-transactions";

export function useGetSummaryTransactions(cpf: string) {
    return useQuery({
        queryFn: async () => await getSummaryTransactions(cpf),
        queryKey: ["summary-transactions", cpf],
        enabled: cpf !== '',
    });
}