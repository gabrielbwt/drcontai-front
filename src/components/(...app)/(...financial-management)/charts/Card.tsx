import balanceSVG from '../../../../assets/svg/icons/balance.svg';
import minusSVG from '../../../../assets/svg/icons/minus.svg';
import paymentSVG from '../../../../assets/svg/icons/payments.svg';
import Image from 'next/image';
import { TrendingUp } from "lucide-react"

interface CardProps {
    title: string;
    value: number;
    lastMonthValue: number;
}

export default function Card({ title, value, lastMonthValue }: CardProps) {

    const hasData = !!value && !!lastMonthValue

    const percentage = !hasData ? 0 : (100 * ((value - lastMonthValue) / Math.abs(lastMonthValue)))

    const valueVariation = percentage > 0 ? 'Aumentou' : 'Diminuiu'

    {
        return (
            <div className="bg-white border rounded-lg shadow-sm h-28 w-72 relative flex items-center flex-1">
                <div className="absolute right-4 top-4">
                    {title === 'Saldo' ? <Image priority src={balanceSVG} alt="Dashboard SVG" width={500} height={500} style={{ width: '1.3rem', height: 'auto' }} /> : null}
                    {title === 'Faturamento' ? <Image priority src={paymentSVG} alt="Dashboard SVG" width={500} height={500} style={{ width: '1.3rem', height: 'auto' }} /> : null}
                    {title === 'Despesas' ? <Image priority src={minusSVG} alt="Dashboard SVG" width={500} height={500} style={{ width: '1.3rem', height: 'auto' }} /> : null}
                </div>
                <div className="flex items-start justify-between py-4 pl-6 flex-col gap-2">
                    <div className="text-md font-semibold text-gray-700">{title}</div>
                    <div className="text-2xl font-semibold font-sans text-gray-800">
                        R$ {value ? value.toLocaleString('pt-br', {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        }) : '0,00'}</div>
                    <div className="flex gap-2 leading-none text-xs text-gray-500">
                        {percentage === 0 ? 'Não houve alteração em relação ao último mês' : `${valueVariation} de ${percentage.toFixed(0)}% em relação ao último mês (R$ ${lastMonthValue ? lastMonthValue.toLocaleString('pt-br', {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        }) : '0,00'})`}
                        {percentage === 0 ? null : percentage > 0 ? <TrendingUp className="h-4 w-4 text-dark-green-main" /> : <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />}
                    </div>
                </div>
            </div>
        )
    }
}