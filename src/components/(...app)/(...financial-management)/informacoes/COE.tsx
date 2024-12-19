import { Investment } from "@/@types/investiments";
import { truncateString } from "@/utils";
import dayjs from "dayjs";

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
                        <div className="text-sm w-60">Nome</div>
                        <div className="text-sm w-40">Emissora</div>
                        <div className="text-sm w-40">Saldo Líquido</div>
                        <div className="text-sm w-40">Valor Original Investido</div>
                        <div className="text-sm w-40">Valor Bruto</div>
                        <div className="text-sm w-40">Rentabilidade Acumulada</div>
                        <div className="text-sm w-40">Data de Emissão</div>
                        <div className="text-sm w-40">Data de Vencimento</div>
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
            <h2 className="text-md font-semibold mt-4">Certificados de Operações Estruturadas (COE)</h2>
            {COEInvestments.length > 0 ? <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                <div className="text-sm w-60">Nome</div>
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
                        <div className="text-sm text-gray-600 w-60">{truncateString(investment.name, 30)}</div>
                        <div className="text-sm text-gray-600 w-40">{investment.issuer ? truncateString(investment.issuer ?? '', 20) : 'Não Informado'}</div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.balance.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currency_code ?? "BRL",
                            })}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.amount_original?.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currency_code ?? "BRL",
                            }) ?? "Não Informado"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.amount?.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: investment.currency_code ?? "BRL",
                            }) ?? "Não Informado"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.last_twelve_months_rate ?? "Não Informado"}%
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.issue_date
                                ? dayjs(investment?.issue_date).format("DD/MM/YYYY")
                                : "Não Informado"}
                        </div>
                        <div className="text-sm text-gray-600 w-40">
                            {investment.due_date ? dayjs(investment?.due_date).format("DD/MM/YYYY") : "Não Informado"}
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
