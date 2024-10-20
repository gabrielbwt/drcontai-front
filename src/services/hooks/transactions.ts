import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api";

export function useGetTransactions(itemId: string) {
    return useQuery({
        queryFn: async () => await getTransactions(itemId),
        queryKey: ["transactions"],
        enabled: itemId !== '',
    });
}