import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import * as React from "react";

type ScoreChartProps = {
    correct: number;
    total: number;
}

const COLORS = ["#4CAF50", "#F44336"];

export default function ScoreChart({correct, total}: ScoreChartProps) {
    const data = [
        { name: "Correct", value: correct },
        { name: "Incorrect", value: total - correct },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
