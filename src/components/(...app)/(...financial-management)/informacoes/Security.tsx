import { Investment } from "@/@types/investiments";
import { truncateString } from "@/utils";

interface SecurityProps {
    investments: Investment[];
    isLoading: boolean;
}

export default function Security({ investments, isLoading }: SecurityProps) {
    const subtypes = [
        { key: "RETIREMENT", label: "Previdência Privada" },
        { key: "PGBL", label: "Plano Gerador de Benefício Livre" },
        { key: "VGBL", label: "Vida Gerador de Benefício Livre" },
    ];

    const securityInvestments = investments.filter(
        (investment) => (investment.type === "SECURITY") && (investment.status === "ACTIVE")
    );

    const groupedInvestments = subtypes.map(({ key, label }) => ({
        label,
        investments: securityInvestments.filter(
            (investment) => investment.subtype === key
        ),
    }));

    if (securityInvestments.length === 0) {
        return (
            <>
                <h2 className="mt-4 text-md font-semibold">Seguros</h2>
                <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-60">Nome</div>
                        <div className="text-sm w-40">Saldo Líquido</div>
                        <div className="text-sm w-40">Rendimento Anual</div>
                        <div className="text-sm w-40">Instituição</div>
                        <div className="text-sm w-40">Valor Cota Atual</div>
                        <div className="text-sm w-40">Quantidade</div>
                        <div className="text-sm w-40">Lucro Líquido Acumulado</div>
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
                    <h2 className="mt-4 text-md font-semibold">{label}</h2>
                    {investments.length > 0 ? <div className="flex items-center justify-between font-bold border-b pb-2 border-t pt-2 mt-2">
                        <div className="text-sm w-60">Nome</div>
                        <div className="text-sm w-40">Saldo Líquido</div>
                        <div className="text-sm w-40">Rendimento Anual</div>
                        <div className="text-sm w-40">Instituição</div>
                        <div className="text-sm w-40">Valor Cota Atual</div>
                        <div className="text-sm w-40">Quantidade</div>
                        <div className="text-sm w-40">Lucro Líquido Acumulado</div>
                        <div className="text-sm w-40">Valor para Retirada</div>
                    </div> : null}
                    {investments.length > 0 ? (
                        investments.map((investment) => (
                            <div key={investment.id}>

                                <div

                                    className="flex items-center justify-between bg-white h-10 border-b"
                                >
                                    <div className="text-sm text-gray-600 w-60">{truncateString(investment.name, 30)}</div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.balance.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currency_code ?? "BRL",
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment?.annual_rate ? `${investment.annual_rate?.toLocaleString("pt-BR", {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        })}%` : "Não Informado"}
                                    </div>
                                    {investment.institution && (
                                        <div className="text-xs text-gray-600 w-40">
                                            {truncateString(investment.institution.name ?? '', 20)}
                                        </div>

                                    )}
                                    <div className="text-sm text-gray-600 w-40">
                                        {investment.value?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: investment.currency_code ?? "BRL",
                                        }) ?? "Não Informado"}
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 w-40">
                                            {investment.quantity ?? 0}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 w-40">
                                            {investment.amount_profit?.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: investment.currency_code ?? "BRL",
                                            }) ?? "Não Informado"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 w-40">
                                            {investment.amount_withdrawal?.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: investment.currency_code ?? "BRL",
                                            }) ?? "Não Informado"}
                                        </div>
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
