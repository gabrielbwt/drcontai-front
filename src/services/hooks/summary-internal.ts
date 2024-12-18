import { useQuery } from "@tanstack/react-query";
import { getSummaryInternalInformations } from "../api-summary-internal";

export function useGetSummaryInternalInformations() {
    return useQuery({
        queryFn: async () => await getSummaryInternalInformations(),
        queryKey: ["summary-internal"],
    });
}