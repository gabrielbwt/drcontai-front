"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60 * 5,
                staleTime: 1000 * 60 * 5,
            }
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

export default ReactQueryProvider;