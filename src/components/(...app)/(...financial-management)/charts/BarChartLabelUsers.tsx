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
import dayjs from "dayjs";

export const description = "A bar chart with a label";

const chartConfig = {
    value: {
        label: "R$: " + "  ",
        color: "#00bf63",
    },
} satisfies ChartConfig;

interface BarChartLabelUsersProps {
    usersByDay?: Record<string, number>;
}

const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

const generateDateRange = (start: Date, end: Date): string[] => {
    const dates = [];
    const current = new Date(start);
    while (current <= end) {
        dates.push(formatDate(current));
        current.setDate(current.getDate() + 1);
    }
    return dates;
};

const aggregateData = (
    data: Record<string, number>,
    start: Date,
    end: Date
): { name: string; monthly_average: number }[] => {
    const dateRange = generateDateRange(start, end);
    const aggregatedData = dateRange.map((date) => ({
        name: dayjs(date).format("DD/MM/YYYY"),
        monthly_average: data[date] || 0,
    }));

    // Dynamically group data if necessary
    const totalDays = dateRange.length;

    if (totalDays > 30) {
        const weeks = [];
        for (let i = 0; i < aggregatedData.length; i += 7) {
            const weekSlice = aggregatedData.slice(i, i + 7);
            const weekName = `${weekSlice[0].name} - ${weekSlice[weekSlice.length - 1]?.name
                }`;
            const weeklyAverage =
                weekSlice.reduce((sum, entry) => sum + entry.monthly_average, 0) /
                weekSlice.length;

            weeks.push({
                name: weekName,
                monthly_average: parseFloat(weeklyAverage.toFixed(2)),
            });
        }
        return weeks;
    }

    return aggregatedData;
};

export function BarChartLabelUsers({ usersByDay }: BarChartLabelUsersProps) {
    const today = new Date();

    // Verifica se os dados estão disponíveis, caso contrário, retorna um estado intermediário
    if (!usersByDay || Object.keys(usersByDay).length === 0) {
        return (
            <Card className="w-full h-[24rem]">
                <CardHeader>
                    <CardTitle className="text-xl font-sans">
                        Distribuição de Usuários
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

    const firstDay = new Date(Object.keys(usersByDay).sort()[0]);

    const chartData = aggregateData(usersByDay, firstDay, today);

    return (
        <Card className="w-full h-[24rem]">
            <CardHeader>
                <CardTitle className="text-xl font-sans">
                    Distribuição de Usuários
                </CardTitle>
                <CardDescription className="text-xs">
                    Número de usuários que realizaram a conexão com a pluggy
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
                                    const { name, monthly_average } = payload[0].payload;
                                    return (
                                        <div
                                            className="custom-tooltip rounded-md"
                                            style={{
                                                backgroundColor: "#fff",
                                                padding: "10px",
                                                border: "1px solid #ccc",
                                            }}
                                        >
                                            <p className="m-0 text-sm">{`Período: ${name}`}</p>
                                            <p className="m-0 text-sm">{`Usuários: ${monthly_average}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="monthly_average" fill="#00bf6395" radius={8}>
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
