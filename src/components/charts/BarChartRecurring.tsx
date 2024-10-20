"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"
import { RecurringTransaction } from "@/@types/transaction"

export const description = "A mixed bar chart"

const chartConfig = {

} satisfies ChartConfig;

interface BarChartRecurringProps {
    transactions: RecurringTransaction[]
}

export function BarChartRecurring({ transactions }: BarChartRecurringProps) {

    const hasTransactions = transactions.length > 0

    const generateRecurring = () => {
        const recurring = [
            {
                description: "Alimentação",
                total_amount: 0,
                ids: []
            },
            {
                description: "Straming",
                total_amount: 0,
                ids: []
            },
            {
                description: "Transporte",
                total_amount: 0,
                ids: []
            }
        ]

        return recurring;
    }

    const chartData = hasTransactions ? transactions?.map((transaction) => {
        return {
            ...transaction,
            total_amount: transaction?.total_amount / (transaction?.ids?.length || 1),
        }
    }) : generateRecurring();

    return (
        <Card className="w-full h-[24rem]">
            <CardHeader>
                <CardTitle className="text-xl font-sans">Gasto recorrente médio</CardTitle>
                <CardDescription className="text-xs">Últimos 10 meses</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[16rem] w-full  mx-auto">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 20,
                        }}
                    >
                        <YAxis
                            className="text-xs"
                            dataKey="description"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}

                        />
                        <XAxis dataKey="total_amount" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={({ payload, active }) => {
                                if (active && payload && payload.length) {
                                    const { value, color } = payload[0];
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
                                                <p className="m-0 text-sm">{`Gasto médio mensal: R$ ${value?.toLocaleString('pt-br', {
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
                        <Bar dataKey="total_amount" radius={5} fill="#00bf6395" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
