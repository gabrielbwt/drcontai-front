import { useQuery } from "@tanstack/react-query";
import { getInvestiments } from "../api-investiments";

export function useGetInvestiments(cpf: string) {
    return useQuery({
        queryFn: async () => await getInvestiments(cpf),
        queryKey: ["investiments", cpf],
        enabled: cpf !== '',
    });
}