import { Investment } from "@/@types/investiments";

interface MutualFundProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function MutualFund({ investments, isLoading }: MutualFundProps) {
    const subtypes = [
        { key: "INVESTMENT_FUND", label: "Fundo de Investimento" },
        { key: "STOCK_FUND", label: "Fundo de Ações" },
        { key: "MULTIMARKET_FUND", label: "Fundo Multimercado" },
        { key: "EXCHANGE_FUND", label: "Fundo Cambial" },
        { key: "FIXED_INCOME_FUND", label: "Fundo de Renda Fixa" },
        { key: "FIP_FUND", label: "Fundo de Investimento em Participações" },
        { key: "OFFSHORE_FUND", label: "Fundo Offshore" },
        { key: "ETF_FUND", label: "Fundo de ETFs" },
    ];

    const mutualFundInvestments = investments.filter(
        (investment) => investment.type === "MUTUAL_FUND"
    );

    const groupedInvestments = subtypes.map(({ key, label }) => ({
        label,
        investments: mutualFundInvestments.filter(
            (investment) => investment.subtype === key
        ),
    }));

    if (mutualFundInvestments.length === 0) {
        return (
            <>
                <h2 className="mt-4 text-md font-semibold">Fundos de Investimentos</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">Nome</div>
                        <div className="text-sm w-40">Saldo Líquido</div>
                        <div className="text-sm w-40">Rentabilidade Último Mês</div>
                        <div className="text-sm w-40">Rentabilidade Anual</div>
                        <div className="text-sm w-40">Rentabilidade 12 Meses</div>
                        <div className="text-sm w-40">Valor Atual da Cota</div>
                        <div className="text-sm w-40">Valor Investido</div>
                        <div className="text-sm w-40">Valor para Retirada</div>
                    </div>
                    {isLoading ? <div className="flex items-center justify-between font-bold pb-2 pt-2 mt-2">
                        <div className="w-80 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>

                    </div> : <div className="mt-2 text-sm text-gray-500">Nenhum investimento encontrado.</div>}
                </div>
            </>
        );
    }

    return (
        <>
            {groupedInvestments.map(({ label, investments }) => (
                investments.length > 0 && <div key={label}>
                    <h2 className="mt-4 text-md font-semibold">{label}</h2>
                    {investments.length > 0 ? (
                        investments.map((investment) => (
                            <div key={investment.id}>
                                <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                                    <div className="text-sm w-80">Nome</div>
                                    <div className="text-sm w-40">Saldo Líquido</div>
                                    <div className="text-sm w-40">Rentabilidade Último Mês</div>
                                    <div className="text-sm w-40">Rentabilidade Anual</div>
                                    <div className="text-sm w-40">Rentabilidade 12 Meses</div>
                                    <div className="text-sm w-40">Valor Atual da Cota</div>
                                    <div className="text-sm w-40">Valor Investido</div>
                                    <div className="text-sm w-40">Valor para Retirada</div>
                                </div>
                                <div
                                    key={investment.name}
                                    className="flex items-center justify-between bg-white h-10 border-b"
                                >
                                    <div className="text-sm text-gray-600 w-80">{investment.name}</div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.balance.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currencyCode ?? "BRL",
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.annualRate ?? "N/A"}%
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.lastMonthRate ?? "N/A"}%
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.lastTwelveMonthsRate ?? "N/A"}%
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.value?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currencyCode ?? "BRL",
                                        }) ?? "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.amountOriginal?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currencyCode ?? "BRL",
                                        }) ?? "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.amountWithdrawal?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currencyCode ?? "BRL",
                                        }) ?? "N/A"}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            ))}
        </>
    );
}