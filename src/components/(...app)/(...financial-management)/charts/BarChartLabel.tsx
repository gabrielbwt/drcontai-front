"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"
import { TransactionSummary } from "@/@types/transaction"

export const description = "A bar chart with a label"


const chartConfig = {
    value: {
        label: "R$:" + "  ",
        color: "#00bf63",
    },
} satisfies ChartConfig

interface BarChartLabelProps {
    transactions: TransactionSummary[]
    range: string
}

export function BarChartLabel({ transactions, range }: BarChartLabelProps) {

    const hasTransactions = transactions.length > 0

    const generateCategory = () => {
        const categories = [
            "Alimentação",
            "Transporte",
            "Educação",
            "Saúde",
            "Lazer",
            "Moradia",
            "Outros",
        ]

        return categories.map((name) => {
            return {
                name,
                monthly_average: 0,
            }
        })
    }

    const chartData = hasTransactions ? transactions : generateCategory();

    console.log('CHART', chartData)

    return (
        <Card className="w-full h-[24rem]">
            <CardHeader className="">
                <CardTitle className="text-xl font-sans">Distribuição média de Gastos</CardTitle>
                <CardDescription className="text-xs">Últimos 6 meses ({range})</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[16rem] w-full  mx-auto">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            className="text-xs"
                            dataKey="name"
                            tickLine={false}
                            tickMargin={28}
                            axisLine={false}

                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ payload, active }) => {
                                if (active && payload && payload.length) {
                                    const { value, color } = payload[0]; // Acessa o valor e a cor da série de dados
                                    return (
                                        <div className="custom-tooltip rounded-md" style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: color,
                                                        marginRight: 8,
                                                    }}
                                                ></span>
                                                <p className="m-0 text-sm">{`Saldo: R$ ${value?.toLocaleString('pt-br', {
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 2
                                                })}`}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />


                        <Bar dataKey="monthly_average" fill="#00bf6395" radius={8}>
                            <LabelList
                                valueAccessor={
                                    (data: { value: number }) => `R$ ${data.value.toLocaleString('pt-br', {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2
                                    })}`
                                }
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
