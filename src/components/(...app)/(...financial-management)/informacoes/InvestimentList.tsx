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
        </>
    )
}