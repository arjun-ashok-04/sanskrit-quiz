import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type DataPoint = {
    name: string;
    value: number;
}

type QuestionTimeChartProps = {
    data: DataPoint[];
}

export default function QuestionTimeChart({data}: QuestionTimeChartProps) {
    if(data.length === 0) {
        return null;
    }
    return (
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis
                    label={{ value: "Time", angle: -90, position: "insideLeft" }}
                />

                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}
