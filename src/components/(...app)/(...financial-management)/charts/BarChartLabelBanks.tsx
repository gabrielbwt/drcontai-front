"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartConfig = {
    value: {
        label: "R$: " + "  ",
        color: "#00bf63",
    },
} satisfies ChartConfig;

interface BarChartLabelUsersProps {
    usersByBank: Record<string, number>;
}

export function BarChartLabelBanks({ usersByBank }: BarChartLabelUsersProps) {
    // Verifica se os dados estão disponíveis, caso contrário, retorna um estado intermediário
    if (!usersByBank || Object.keys(usersByBank).length === 0) {
        return (
            <Card className="w-full h-[24rem]">
                <CardHeader>
                    <CardTitle className="text-xl font-sans">
                        Distribuição de Usuários por Banco
                    </CardTitle>
                    <CardDescription className="text-xs">
                        {`Carregando dados...`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-[16rem]">
                    <p className="text-sm text-muted-foreground">Nenhum dado disponível no momento.</p>
                </CardContent>
            </Card>
        );
    }

    const chartData = Object.entries(usersByBank).map(([bank, users]) => ({
        name: bank,
        users,
    }));

    return (
        <Card className="w-full h-[24rem]">
            <CardHeader>
                <CardTitle className="text-xl font-sans">
                    Distribuição de Usuários por Banco
                </CardTitle>
                <CardDescription className="text-xs">
                    Número de usuários que realizaram a conexão com a Pluggy
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[16rem] w-full mx-auto"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20, bottom: 20 }}
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
                                    const { name, users } = payload[0].payload;
                                    return (
                                        <div
                                            className="custom-tooltip rounded-md"
                                            style={{
                                                backgroundColor: "#fff",
                                                padding: "10px",
                                                border: "1px solid #ccc",
                                            }}
                                        >
                                            <p className="m-0 text-sm">{`Banco: ${name}`}</p>
                                            <p className="m-0 text-sm">{`Usuários: ${users}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="users" fill="#00bf6395" radius={8}>
                            <LabelList
                                valueAccessor={(data: { value: number }) =>
                                    data.value.toFixed(0)
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
    );
}
