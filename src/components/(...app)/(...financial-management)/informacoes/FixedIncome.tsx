import { Investment } from "@/@types/investiments";
import { truncateString } from "@/utils";
import dayjs from "dayjs";

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
        (investment) => (investment.type === "FIXED_INCOME") && (investment.status === "ACTIVE")
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
                        <div className="text-sm w-60">Nome</div>
                        <div className="text-sm w-40">Instituição Emissora</div>
                        <div className="text-sm w-40">Saldo</div>
                        <div className="text-sm w-40">Taxa Fixa Anual</div>
                        <div className="text-sm w-40">Percentual do CDI</div>
                        <div className="text-sm w-40">Vencimento</div>
                        <div className="text-sm w-40">Valor Investido</div>
                        <div className="text-sm w-40">Valor para Retirada</div>
                    </div>
                    {isLoading ? <div className="flex items-center justify-between font-bold pb-2 pt-2 mt-2">
                        <div className="w-60 h-4 bg-gray-200 animate-pulse rounded"></div>
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
                        <div className="text-sm w-60">Nome</div>
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
                                    <div className="text-xs text-gray-600 w-60">{truncateString(investment.name, 30)}</div>
                                    <div className="text-xs text-gray-600 w-40">{truncateString(investment.issuer ?? '', 20)}</div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.balance.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currency_code ?? "BRL",
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.fixed_annual_rate ? `${investment.fixed_annual_rate}%` : 'Não Informado'}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {(investment.rate && investment.rate_type) ? `${investment.rate}% ${investment.rate_type}` : "Não Informado"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.due_date ? dayjs(investment?.due_date).format("DD/MM/YYYY") : "Não Informado"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.amount_original?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currency_code ?? "BRL",
                                        }) ?? "Não Informado"}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.amount_withdrawal?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currency_code ?? "BRL",
                                        }) ?? "Não Informado"}
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
