import { Investment } from "@/@types/investiments";
interface SecurityProps {
    investments: Investment[];
    isLoading: boolean;
}
export default function Equity({ investments, isLoading }: SecurityProps) {
    const subtypes = [
        { key: "STOCK", label: "Ações" },
        { key: "BDR", label: "Brazilian Depositary Receipt" },
        { key: "REAL_ESTATE_FUND", label: "Fundos Imobiliários" },
        { key: "DERIVATIVES", label: "Derivativos" },
        { key: "OPTION", label: "Opções" },
    ];
    const equityInvestments = investments.filter(
        (investment) => investment.type === "EQUITY"
    );
    const groupedInvestments = subtypes.map(({ key, label }) => ({
        label,
        investments: equityInvestments.filter(
            (investment) => investment.subtype === key
        ),
    }));

    if (equityInvestments.length === 0) {
        return (
            <>
                <h2 className="mt-4 text-md font-semibold">Renda Variável</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">
                            Nome
                        </div>
                        <div className="text-sm w-40">
                            Código
                        </div>
                        <div className="text-sm w-40">
                            Emissora
                        </div>
                        <div className="text-sm w-40">
                            Saldo Líquido
                        </div>
                        <div className="text-sm w-40">
                            Valor Atual da Cota
                        </div>
                        <div className="text-sm w-40">
                            Quantidade
                        </div>
                        <div className="text-sm w-40">
                            Valor Investido
                        </div>
                        <div className="text-sm w-40">
                            Valor para Retirada
                        </div>

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
                    {investments.length > 0 ? <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">
                            Nome
                        </div>
                        <div className="text-sm w-40">
                            Código
                        </div>
                        <div className="text-sm w-40">
                            Emissora
                        </div>
                        <div className="text-sm w-40">
                            Saldo Líquido
                        </div>
                        <div className="text-sm w-40">
                            Valor Atual da Cota
                        </div>
                        <div className="text-sm w-40">
                            Quantidade
                        </div>
                        <div className="text-sm w-40">
                            Valor Investido
                        </div>
                        <div className="text-sm w-40">
                            Valor para Retirada
                        </div>

                    </div> : null}
                    {investments.length > 0 ? (
                        investments.map((investment) => (
                            <div key={investment.id} className="flex items-center justify-between bg-white h-10 border-b">
                                <div className="text-sm text-gray-600 w-80">{investment.name}</div>
                                <div className="text-sm text-gray-600 w-40">{investment.code}</div>
                                <div className="text-xs text-gray-600 w-40">{investment.issuer}</div>
                                <div className="text-sm text-gray-600 w-40">{investment.balance.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: investment.currencyCode ?? undefined,
                                })}</div>
                                <div className="text-sm text-gray-600 w-40">
                                    {investment.value?.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: investment.currencyCode ?? "BRL",
                                    }) ?? "N/A"}
                                </div>
                                <div className="text-sm text-gray-600 w-40">{investment.quantity ?? "N/A"}</div>
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