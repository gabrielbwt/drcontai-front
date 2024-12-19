import { Investment } from "@/@types/investiments";

interface InvestmentInfoProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function InvestimentInfo({ investments, isLoading }: InvestmentInfoProps) {

    const total = investments?.reduce((acc, investment) => {
        const value = investment.type !== "COE"
            ? (investment.balance ?? 0)
            : (investment.amount_withdrawal ?? 0);
        return acc + value;
    }, 0);

    const initialInvestiment = investments?.reduce((acc, investment) => {
        const value = investment.type !== "SECURITY"
            ? (investment.amount_original ?? 0)
            : (investment.balance - (investment.amount_profit ?? 0));
        return acc + value;
    }
        , 0);


    const hasInvestments = investments.length > 0;



    return (
        <div className="flex flex-col items-start">
            <div>
                <div className="text-sm">Valor Investido:</div>
                <div className="text-xl">{!isLoading ?
                    total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })
                    : <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>}</div>
            </div>
            <div className="mt-4">
                <div className="text-sm">
                    Rentabilidade Atual da Carteira:
                </div>
                <div className="text-xl">

                    {!isLoading ? (hasInvestments ?
                        ((total - initialInvestiment) / initialInvestiment * 100).toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        }) ?? "N/A"
                        : '0,00') : <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>}

                    {isLoading ? "" : "%"}
                </div>
            </div>
        </div>
    )
}