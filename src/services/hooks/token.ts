import { useQuery } from "@tanstack/react-query";
import { getConnectToken } from "../api";

export function useGetToken() {
    return useQuery({
        queryFn: async () => await getConnectToken(),
        queryKey: ["token"],
        enabled: true,
    });
}