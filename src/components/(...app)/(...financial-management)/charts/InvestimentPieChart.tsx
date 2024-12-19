"use client"

import { Pie, PieChart } from "recharts"
import { Investment } from "@/@types/investiments"

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

const chartConfig = {

} satisfies ChartConfig

interface InvestimentPieChartProps {
    investments: Investment[]
    isLoading: boolean
}

type MapColorEntry = {
    color: string;
    name: string;
};


export function InvestimentPieChart({ investments }: InvestimentPieChartProps) {



    const MAP_COLORS: Record<string, MapColorEntry> = {
        FIXED_INCOME: {
            color: "#00008B",
            name: "Renda Fixa",
        },
        MUTUAL_FUND: {
            color: "#00BFFF",
            name: "Fundos de Investimentos",
        },
        SECURITY: {
            color: "#4682B4",
            name: "Seguros",
        },
        EQUITY: {
            color: "#FF4500",
            name: "Renda Variável",
        },
        ETF: {
            color: "#FFD700",
            name: "ETF",
        },
        COE: {
            color: "#32CD32",
            name: "COE",
        },
    };

    const chartData = investments?.length > 0 ? investments.map((investment) => {
        return {
            investment: MAP_COLORS[investment.type].name,
            value: investment.amount_withdrawal ?? 0,
            fill: MAP_COLORS[investment.type].color,
        }
    }) : [{
        investments: "Sem investimentos",
        value: 0,
        fill: "#00008b"
    }]


    return (
        <Card className="flex flex-col bg-inherit border-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distribuição de Investimentos</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={({ payload, active }) => {
                                if (active && payload && payload.length) {
                                    const { value, fill, investment } = payload[0].payload; // Acessa o valor, cor e nome corretamente
                                    return (
                                        <div className="custom-tooltip rounded-md" style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: fill, // Define a cor usando o `fill`
                                                        marginRight: 8,
                                                    }}
                                                ></span>
                                                <p className="m-0 text-sm font-medium">{investment}</p>
                                            </div>
                                            <p className="m-0 text-sm">{`Total: R$ ${value?.toLocaleString('pt-br', {
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            })}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="investment"
                            innerRadius={42}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total value for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
