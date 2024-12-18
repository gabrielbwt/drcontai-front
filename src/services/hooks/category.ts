// import { useMutation, useQuery } from "@tanstack/react-query";
// import { updateCategory, getCategories } from "../api";

// export interface CategoryUpdate {
//     transactionId: string
//     categoryId: string
// }

// export function useUpdateCategory(body: CategoryUpdate) {
//     return useMutation({
//         mutationFn: async () => await updateCategory(body),
//     });
// }

// export function useGetCategories() {
//     return useQuery({
//         queryFn: async () => await getCategories(),
//         queryKey: ["categories"],
//     });
// }