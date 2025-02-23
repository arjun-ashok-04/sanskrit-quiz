"use client";

import {Suspense, useEffect, useMemo, useState} from "react";
import {Button, Card, Flex, Heading, Spinner, Text} from "@radix-ui/themes";
import {makeCall} from "@/common/apiCaller";
import {useRouter, useSearchParams} from "next/navigation";
import * as React from "react";
import Image from 'next/image'
import {getSession, Session} from "@/common/storageHelper";
import ScoreChart from "@/components/chart/scoreChart";
import QuestionTimeChart from "@/components/chart/questionTimeChart";

const submitSession = async (session: Session) =>{
    const res = await makeCall(`/api/question`,{}, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({session}),
    });

    if (res.status === 200) {
        const response = await res.json();
        return response["data"];
    } else {
        console.error("Failed to fetch data, status code:", res.status);
    }
}

function SummaryContent() {
    const [total, setTotal] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [time, setTime] = useState(0);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const router = useRouter();

    const email = searchParams.get("email");

    useEffect(() => {
        setLoading(true);
        const session = getSession(email || "");
        if(!session) {
            router.push("/");
            return;
        }

        setUsername(session.username);
        submitSession(session).then((data) => {
            const { total, score, time } = data;
            setTotal(total);
            setCorrect(score);
            setTime(time);
            setLoading(false);
        })

    }, [correct, email, router]);


    const chartData = useMemo(() => {
        const session = getSession(email || "");
        if(!session) {
            return [];
        }

        return session?.answers?.map((q, i) => {
            return {
                name: `Q-${i+1}`,
                value: q.time
            }
        }) ?? [];
    },[email])

    if(loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Card className="p-6 shadow-lg">
                    <Text className="text-lg font-semibold"> Checking your answers, please wait!</Text>
                    <div className="items-center w-full pl-20">
                        <div className="text-center pl-11">
                            <Spinner className="p-4" size="lg"/>
                        </div>
                        <br/>
                        <Image src="/png/thinking.png" alt="loading" width="128" height="128"/>
                    </div>
                </Card>
            </Flex>
        )
    }


    return (
        <Flex justify="center" align="center" height="88vh">
            <Card className="p-6 shadow-lg w-full max-w-2xl">
                <Heading as="h2">अङ्क पर्यप्तं! (Quiz Completed!)</Heading>
                <hr className="my-4 border-gray-300"/>
                <Text className="text-lg font-semibold">धन्यवादः (Thank you) {username} ({email}).</Text>

                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <tbody>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 font-medium">भवतः अङ्क (Your score)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{correct} / {total}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">कालः (Total time)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{Math.ceil(time * 1000) / 1000} seconds</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 font-medium">सामान्यत कालः (Average time)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{Math.ceil((time / correct) * 1000) / 1000} seconds</td>
                    </tr>
                    </tbody>
                </table>

                <hr className="my-4 border-gray-300"/>

                <div className="flex space-x-4">
                    <ScoreChart correct={correct} total={total}/>
                    <QuestionTimeChart data={chartData}/>
                </div>
                <Button className="mt-4 w-full" onClick={() => {
                    window.location.href = "/";
                }}>
                    पुनः आरम्भं कुर्मः (Restart)
                </Button>
            </Card>
        </Flex>
    );
}

export default function QuizSummary() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SummaryContent/>
        </Suspense>
    );
}