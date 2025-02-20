"use client";

import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import {LeaderboardEntry} from "@/common/constants";

type ToolTipInput = { active : boolean, payload?: { payload: LeaderboardEntry}[]}

const CustomTooltip = ({ active, payload }: ToolTipInput) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded shadow-md">
                <p className="text-sm font-bold">{payload[0].payload.name}</p>
                <p>Time: {payload[0].payload.time}s</p>
                <p>Score: {payload[0].payload.score}/10</p>
            </div>
        );
    }
    return null;
};

type QuizScatterChartProps ={
    data: LeaderboardEntry[]
}

const QuizScatterChart = ({data}:QuizScatterChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="number"
                    dataKey="time"
                    name="Time (seconds)"
                    reversed
                    label={{ value: "Time Taken (s)", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                    type="number"
                    dataKey="score"
                    name="Score"
                    label={{ value: "Quiz Score", angle: -90, position: "insideLeft" }}
                />

                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip  active/>} />
                <Scatter name="Participants" data={data} fill="#007BFF">
                    <LabelList dataKey="name" position="top" />
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default QuizScatterChart;
