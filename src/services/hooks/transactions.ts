import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, getTransactions, updateCategory } from "../api-transactions";
import { updateCategoryProps } from "../api-transactions";


export function useGetTransactions(cpf: string) {
    return useQuery({
        queryFn: async () => await getTransactions(cpf),
        queryKey: ["transactions", cpf],
        enabled: cpf !== '',
    });
}


export function useGetCategories() {
    return useQuery({
        queryFn: async () => await getCategories(),
        queryKey: ["categories"],
        retry: false
    })
}


export function useUpdateCategory(body: updateCategoryProps) {
    return useMutation({
        mutationFn: async () => await updateCategory(body),
        retry: false
    })
}