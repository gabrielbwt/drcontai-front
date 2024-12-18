"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { SummaryFinancial } from "@/@types/transaction"


const chartConfig = {

} satisfies ChartConfig

interface BarChartMultipleProps {
    financialSummary: SummaryFinancial
}

export function BarChartMultiple({ financialSummary }: BarChartMultipleProps) {

    const months = financialSummary?.months
    const income = financialSummary?.income
    const expenses = financialSummary?.expenses

    const transactions = months?.map((month, index) => ({
        month,
        income: income[index],
        expenses: expenses[index]
    }));

    const hasTransactions = transactions?.length > 0

    const generateMonths = () => {
        const today = new Date();
        const months = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i);
            const year = date.getFullYear();
            const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
            months.push({
                month: `${formattedMonth}/${year}`,
                income: 0,
                expenses: 0,
            });
        }

        return months;
    };

    const chartData = hasTransactions ? transactions : generateMonths();

    return (
        <Card className="w-full h-[24rem]">
            <CardHeader>
                <CardTitle className="text-xl font-sans">Entradas e saídas dos últimos 6 meses</CardTitle>
                <CardDescription className="text-xs">Últimos 6 meses ({financialSummary?.date_range})</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[16rem] w-full mx-auto">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            bottom: 20,
                            left: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            className="text-xs"
                            dataKey="month"
                            tickLine={false}
                            tickMargin={28}
                            axisLine={false}

                        />
                        <YAxis
                            className="text-xs"
                            tickFormatter={(value) => `R$ ${value.toLocaleString("pt-br", {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2
                            })}`}
                            tickLine={false}
                            axisLine={false}
                            width={80}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ payload, active }) => {
                                if (active && payload && payload.length > 1) {
                                    const { value: valueReceived, color: colorReceived } = payload[0];
                                    const { value: valueDebited, color: colorDebited } = payload[1];
                                    return (
                                        <div
                                            className="custom-tooltip rounded-md"
                                            style={{
                                                backgroundColor: "#fff",
                                                padding: "10px",
                                                border: "1px solid #ccc",
                                            }}
                                        >
                                            <div>
                                                <p className="m-0 text-sm mx-auto">Mês: {payload[0].payload.month}</p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: colorReceived,
                                                        marginRight: 8,
                                                    }}
                                                ></span>
                                                <p className="m-0 text-sm">{`Recebido: R$ ${valueReceived?.toLocaleString(
                                                    "pt-br",
                                                    {
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}`}</p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: colorDebited,
                                                        marginRight: 8,
                                                    }}
                                                ></span>
                                                <p className="m-0 text-sm">{`Debitado: R$ ${valueDebited?.toLocaleString(
                                                    "pt-br",
                                                    {
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}`}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />

                        <Bar dataKey="income" fill="#00bf6395" radius={4} />
                        <Bar dataKey="expenses" fill="#006635" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
        </Card>
    )
}
