import { Investment } from "@/@types/investiments";

interface FixedIncomeProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function FixedIncome({ investments, isLoading }: FixedIncomeProps) {
    const subtypes = [
        { key: "CRI", label: "Investimentos CRI" },
        { key: "CRA", label: "Investimentos CRA" },
        { key: "LCI", label: "Investimentos LCI" },
        { key: "LCA", label: "Investimentos LCA" },
        { key: "LC", label: "Investimentos LC" },
        { key: "TREASURY", label: "Investimentos Tesouro" },
        { key: "DEBENTURES", label: "Investimentos Debêntures" },
        { key: "CDB", label: "Investimentos CDB" },
    ];

    const fixedIncomeInvestment = investments.filter(
        (investment) => investment.type === "FIXED_INCOME"
    );

    const groupedInvestments = subtypes.map(({ key, label }) => ({
        label,
        investments: fixedIncomeInvestment.filter((investment) => investment.subtype === key),
    }));


    if (fixedIncomeInvestment.length === 0) {
        return (
            <>
                <h2 className="mt-4 text-md font-semibold">Renda Fixa</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">Nome</div>
                        <div className="text-sm w-40">Instituição Emissora</div>
                        <div className="text-sm w-40">Saldo</div>
                        <div className="text-sm w-40">Taxa Fixa Anual</div>
                        <div className="text-sm w-40">Percentual do CDI</div>
                        <div className="text-sm w-40">Vencimento</div>
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
                    <h2 className="mt-4 text-md font-semibold font-san">{label}</h2>
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">Nome</div>
                        <div className="text-sm w-40">Instituição Emissora</div>
                        <div className="text-sm w-40">Saldo</div>
                        <div className="text-sm w-40">Taxa Fixa Anual</div>
                        <div className="text-sm w-40">Percentual do CDI</div>
                        <div className="text-sm w-40">Vencimento</div>
                        <div className="text-sm w-40">Valor Investido</div>
                        <div className="text-sm w-40">Valor para Retirada</div>
                    </div>
                    {investments.length > 0 ? (
                        investments.map((investment) => (
                            <div key={investment.id}>
                                <div

                                    className="flex items-center justify-between bg-white h-10 border-b"
                                >
                                    <div className="text-sm text-gray-600 w-80">{investment.name}</div>
                                    <div className="text-sm text-gray-600 w-40">{investment.issuer}</div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.balance.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currencyCode ?? "BRL",
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.fixedAnnualRate ? `${investment.fixedAnnualRate}%` : 'ABC'}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {(investment.rate && investment.rateType) ? `${investment.rate}% ${investment.rateType}` : "ABC"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.dueDate ? new Date(investment.dueDate).toLocaleDateString("pt-BR") : "N/A"}
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
                    ) : (
                        <div className="text-sm text-gray-500">
                            Nenhum investimento encontrado.
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
