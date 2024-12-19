export interface Investment {
    id: string;
    name: string;
    code?: string | null;
    isin?: string | null;
    number?: string | null;
    owner?: string | null;
    currency_code?: string | null;
    type: string;
    subtype?: string | null;
    last_month_rate?: number | null;
    last_twelve_months_rate?: number | null;
    annual_rate?: number | null;
    date?: string | null;
    value?: number | null;
    quantity?: number | null;
    amount: number;
    income_taxes?: number | null;
    financial_taxes?: number | null;
    balance: number;
    due_date?: string | null;
    rate?: number | null;
    rate_type?: string | null;
    fixed_annual_rate?: number | null;
    issuer?: string | null;
    issue_date?: string | null;
    amount_profit?: number | null;
    amount_withdrawal: number;
    amount_original?: number | null;
    status?: string | null;
    institution?: Institution | null;
    transactions?: [] | null;
    provider_id?: string | null;
}

interface Institution {
    name: string;
    number: string;
    insurer?: Insurer | null;
}

interface Insurer {
    cnpj: string;
    name: string;
}


type InvestmentData = Record<string, string>;

interface InvestmentCategory {
    name: string;
    data: InvestmentData;
}

export const investmentMap: Record<string, InvestmentCategory> = {
    FIXED_INCOME: {
        name: "Renda Fixa",
        data: {
            CRI: "Certificado de Recebíveis Imobiliários",
            CRA: "Certificado de Recebíveis do Agronegócio",
            LCI: "Letra de Crédito Imobiliário",
            LCA: "Letra de Crédito do Agronegócio",
            LC: "Letra de Câmbio",
            TREASURY: "Tesouro Nacional",
            DEBENTURES: "Dívida Corporativa",
            CDB: "Certificado de Depósito Bancário",
        },
    },
    SECURITY: {
        name: "Seguros",
        data: {
            RETIREMENT: "Previdência Privada",
            PGBL: "Plano Gerador de Benefício Livre",
            VGBL: "Vida Gerador de Benefício Livre",
        },
    },
    MUTUAL_FUND: {
        name: "Fundos de Investimento",
        data: {
            INVESTMENT_FUND: "Fundo de Investimento",
            STOCK_FUND: "Fundo de Ações",
            MULTIMARKET_FUND: "Fundo Multimercado",
            EXCHANGE_FUND: "Fundo Cambial",
            FIXED_INCOME_FUND: "Fundo de Renda Fixa",
            FIP_FUND: "Fundo de Investimento em Participações",
            OFFSHORE_FUND: "Fundo Offshore",
            ETF_FUND: "Fundo de ETFs",
        },
    },
    EQUITY: {
        name: "Renda Variável",
        data: {
            STOCK: "Ações",
            BDR: "Brazilian Depositary Receipt",
            REAL_ESTATE_FUND: "Fundos Imobiliários",
            DERIVATIVES: "Derivativos",
            OPTION: "Opções",
        },
    },
    ETF: {
        name: "Fundos de Índice",
        data: {
            ETF: "Fundos de Índice",
        },
    },
    COE: {
        name: "Certificados de Operações Estruturadas",
        data: {
            STRUCTURED_NOTE: "Certificados de Operações Estruturadas",
        },
    },
};