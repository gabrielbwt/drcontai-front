// import { useQuery } from "@tanstack/react-query";
// import { getInformations } from "../api";

// export interface InformationProps {
//     id: string;
//     from: string;
//     to: string;
// }

// export function useGetInformations(body: InformationProps) {
//     return useQuery({
//         queryFn: async () => await getInformations(body),
//         queryKey: ["informations"],
//         enabled: body.id !== '',
//     });
// }