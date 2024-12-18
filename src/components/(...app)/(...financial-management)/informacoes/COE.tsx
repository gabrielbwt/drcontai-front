import { Investment } from "@/@types/investiments";

interface COEProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function COE({ investments, isLoading }: COEProps) {
    const COEInvestments = investments.filter(
        (investment) => investment.type === "COE"
    );

    if (COEInvestments.length === 0) {
        return (
            <>
                <h2 className="text-md font-semibold mt-4">Certificados de Operações Estruturadas (COE)</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-80">Nome</div>
                        <div className="text-sm w-40">Emissora</div>
                        <div className="text-sm w-40">Saldo Líquido</div>
                        <div className="text-sm w-40">Valor Original Investido</div>
                        <div className="text-sm w-40">Valor Bruto</div>
                        <div className="text-sm w-40">Rentabilidade Acumulada</div>
                        <div className="text-sm w-40">Data de Emissão</div>
                        <div className="text-sm w-40">Data de Vencimento</div>
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
            <h2 className="text-md font-semibold mt-4">Certificados de Operações Estruturadas (COE)</h2>
            {COEInvestments.length > 0 ? <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                <div className="text-sm w-80">Nome</div>
                <div className="text-sm w-40">Emissora</div>
                <div className="text-sm w-40">Saldo Líquido</div>
                <div className="text-sm w-40">Valor Original Investido</div>
                <div className="text-sm w-40">Valor Bruto</div>
                <div className="text-sm w-40">Rentabilidade Acumulada</div>
                <div className="text-sm w-40">Data de Emissão</div>
                <div className="text-sm w-40">Data de Vencimento</div>
            </div> : null}

            {COEInvestments.length > 0 ? (
                COEInvestments.map((investment) => (
                    <div
                        key={investment.id}
                        className="flex items-center justify-between bg-white h-10 border-b"
                    >
                        <div className="text-sm text-gray-600 w-80">{investment.name}</div>
                        <div className="text-sm text-gray-600 w-40">{investment.issuer ?? 'Não Informado'}</div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.balance.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currencyCode ?? "BRL",
                            })}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.amountOriginal?.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currencyCode ?? "BRL",
                            }) ?? "N/A"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.amount?.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currencyCode ?? "BRL",
                            }) ?? "N/A"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.lastTwelveMonthsRate ?? "N/A"}%
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.issueDate
                                ? new Date(investment.issueDate).toLocaleDateString("pt-BR")
                                : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.dueDate ? new Date(investment.dueDate).toLocaleDateString("pt-BR") : "N/A"}
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
