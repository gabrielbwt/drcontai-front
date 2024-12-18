import FixedIncome from "@/components/(...app)/(...financial-management)/informacoes/FixedIncome";
import MutualFund from "@/components/(...app)/(...financial-management)/informacoes/MutualFund";
import Security from "@/components/(...app)/(...financial-management)/informacoes/Security";
import COE from "@/components/(...app)/(...financial-management)/informacoes/COE";
import ETF from "@/components/(...app)/(...financial-management)/informacoes/ETF";
import Equity from "@/components/(...app)/(...financial-management)/informacoes/Equity";
import { Investment } from "@/@types/investiments";

interface InvestimentListProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function InvestimentList({ investments, isLoading }: InvestimentListProps) {

    // function categorizeInvestments(
    //     investments: Investment[]
    // ): Record<string, Record<string, Investment[]>> {
    //     const categorized: Record<string, Record<string, Investment[]>> = {};

    //     investments.forEach((investment) => {
    //         const { type, subtype } = investment;

    //         if (!categorized[type]) {
    //             categorized[type] = {};
    //         }
    //         const categoryKey = subtype ? subtype : 'Outros';

    //         if (!categorized[type][categoryKey]) {
    //             categorized[type][categoryKey] = [];
    //         }

    //         categorized[type][categoryKey].push(investment);
    //     });

    //     return categorized;
    // }


    // const categorizedInvestments = categorizeInvestments(investments);

    return (
        <>
            <div className="mb-8">
                <FixedIncome investments={investments} isLoading={isLoading} />
            </div>
            <div className="mb-8">
                <MutualFund investments={investments} isLoading={isLoading} />
            </div>
            <div className="mb-8">
                <Security investments={investments} isLoading={isLoading} />
            </div>
            <div className="mb-8">
                <Equity investments={investments} isLoading={isLoading} />
            </div>
            <div className="mb-8">
                <ETF investments={investments} isLoading={isLoading} />
            </div>
            <div className="mb-8">
                <COE investments={investments} isLoading={isLoading} />
            </div>



            {/* {Object.keys(investmentMap).map((category) => {
                const { name, data } = investmentMap[category];
                const subcategories = categorizedInvestments[category] || {};

                return (
                    <div key={category} className="mb-6">
                        <div className="font-bold text-xl text-gray-800">{name}</div>
                        {Object.keys(data).map((subtype) => {
                            const investments = subcategories[subtype] || [];
                            return (
                                <div className="mt-6" key={`${category}-${subtype}`}>
                                    <div className="font-semibold text-lg text-gray-700">{data[subtype]}</div>
                                    {investments.length > 0 ? (
                                        investments.map((investment) => {
                                            const commonFields = (
                                                <>
                                                    <div className="text-sm text-gray-600">Nome: {investment.name}</div>
                                                    <div className="text-sm text-gray-600">Saldo: {investment.balance.toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: investment.currencyCode ?? undefined,
                                                    })}</div>
                                                    {investment.date && (
                                                        <div className="text-sm text-gray-600">Data: {new Date(investment.date).toLocaleDateString("pt-BR")}</div>
                                                    )}
                                                </>
                                            );

                                            const typeSpecificFields = (() => {
                                                switch (investment.type) {
                                                    case "FIXED_INCOME":
                                                        return (
                                                            <FixedIncome investment={investment} />
                                                        );
                                                    case "MUTUAL_FUND":
                                                        return (
                                                            <MutualFund investment={investment} />
                                                        );
                                                    case "SECURITY":
                                                        return (
                                                            <Security investment={investment} />
                                                        );
                                                    case "EQUITY":
                                                        return (
                                                            <Equity investment={investment} />
                                                        )
                                                    case "ETF":
                                                        return (
                                                            <ETF investment={investment} />
                                                        );
                                                    case "COE":
                                                        return (
                                                            <COE investment={investment} />
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })();

                                            return (
                                                <div key={investment.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                                                    {commonFields}
                                                    {typeSpecificFields}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-gray-500 text-sm mt-2">
                                            Nenhum investimento nesta subcategoria.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })} */}
        </>
    )
}