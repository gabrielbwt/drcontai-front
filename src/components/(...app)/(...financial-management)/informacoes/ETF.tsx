import { Investment } from "@/@types/investiments";
import { truncateString } from "@/utils";

export interface ETFProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function ETF({ investments, isLoading }: ETFProps) {
    const etfInvestments = investments.filter(
        (investment) => investment.type === "ETF"
    );

    if (etfInvestments.length === 0) {
        return (
            <>
                <h2 className="text-md font-semibold mt-4">Fundo de Índice (ETF)</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-60">Nome</div>
                        <div className="text-sm w-40">Código</div>
                        <div className="text-sm w-40">Emissora</div>
                        <div className="text-sm w-40">ISIN</div>
                        <div className="text-sm w-40">Saldo Líquido</div>

                        <div className="text-sm w-40">Rentabilidade Último Mes</div>
                        <div className="text-sm w-40">
                            Valor Investido
                        </div>
                        <div className="text-sm w-40">
                            Valor para Retirada
                        </div>


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
        )
    }

    return (
        <>
            <h2 className="text-md font-semibold mt-4">Fundo de Índice (ETF)</h2>
            {etfInvestments.length > 0 ?
                <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                    <div className="text-sm w-60">Nome</div>
                    <div className="text-sm w-40">Código</div>
                    <div className="text-sm w-40">Emissora</div>
                    <div className="text-sm w-40">ISIN</div>
                    <div className="text-sm w-40">Saldo Líquido</div>

                    <div className="text-sm w-40">Rentabilidade Último Mes</div>
                    <div className="text-sm w-40">
                        Valor Investido
                    </div>
                    <div className="text-sm w-40">
                        Valor para Retirada
                    </div>


                </div> : null
            }

            {etfInvestments.length > 0 ? (
                etfInvestments.map((investment) => (
                    <div key={investment.id}>
                        <div
                            className="flex items-center justify-between bg-white h-10 border-b"
                        >
                            <div className="text-sm text-gray-600 w-60">{truncateString(investment.name, 30)}</div>
                            <div className="text-sm text-gray-600 w-40">{investment.code}</div>
                            <div className="text-xs text-gray-600 w-40">{truncateString(investment.issuer ?? '', 20)}</div>
                            <div className="text-xs text-gray-600 w-40">{investment.isin}</div>
                            <div className="text-sm text-gray-600 w-40">
                                {investment.balance.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: investment.currency_code ?? "BRL",
                                })}
                            </div>
                            <div className="text-sm text-gray-600 w-40">
                                {investment?.last_month_rate ? `${investment.last_month_rate}%` : "Não Informado"}
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
                    {isLoading ? <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div> : "Nenhum investimento encontrado."}
                </div>
            )}
        </>
    );
}
