import { Investment } from "@/@types/investiments";

interface InvestimentSummaryProps {
    investments: Investment[];
    isLoading: boolean;
}

type MapColorEntry = {
    color: string;
    name: string;
};

export default function InvestimentSummary({ investments, isLoading }: InvestimentSummaryProps) {
    const MAP_COLORS: Record<string, MapColorEntry> = {
        FIXED_INCOME: {
            color: "#00008B",
            name: "Renda Fixa",
        },
        MUTUAL_FUND: {
            color: "#00BFFF",
            name: "Fundos de Investimentos",
        },
        SECURITY: {
            color: "#4682B4",
            name: "Seguros",
        },
        EQUITY: {
            color: "#FF4500",
            name: "Renda Variável",
        },
        ETF: {
            color: "#FFD700",
            name: "ETF",
        },
        COE: {
            color: "#32CD32",
            name: "COE",
        },
    };

    // Calcula o total geral dos investimentos
    const total = investments?.reduce((acc, investment) => {
        const value = investment.type !== "COE"
            ? (investment.balance ?? 0)
            : (investment.amount_withdrawal ?? 0);
        return acc + value;
    }, 0);

    // Calcula o total por categoria
    const data = Object.entries(MAP_COLORS).map(([key, { name, color }]) => {
        const categoryInvestments = investments?.filter((inv) => inv.type === key) || [];
        const categoryTotal = categoryInvestments.reduce((acc, investment) => {
            const value = key !== "COE"
                ? (investment.balance ?? 0)
                : (investment.amount_withdrawal ?? 0);
            return acc + value;
        }, 0);

        return {
            category: name,
            color: color,
            value: `R$ ${categoryTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            percentage: total > 0 ? `${((categoryTotal / total) * 100).toFixed(1)}%` : "0.0%",
        };
    });

    return (
        <div className="w-[40rem] p-4 border rounded-lg bg-white">
            <ul className="space-y-4">
                {data.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-sm font-semibold w-40">{item.category}</span>
                        </div>
                        <div className="mr-4 w-32 text-sm font-medium text-gray-700">
                            {isLoading ? <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div> : item.value}
                        </div>
                        <div className="w-34 flex items-center justify-between text-sm font-medium text-gray-700">
                            <div className="w-10 text-center text-sm mx-1">{isLoading ? <div className="w-10 h-6 bg-gray-200 animate-pulse rounded"></div> : item.percentage}</div>
                            <div className="ml-2 text-sm">da carteira</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
