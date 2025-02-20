"use client";

import {Suspense, useEffect, useMemo, useState} from "react";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
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
            const { total, score } = data;
            setTotal(total);
            setCorrect(score);
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
                    <Image src="/png/thinking.png" alt="loading" width="128" height="128"/>
                </Card>
            </Flex>
        )
    }


    return (
        <Flex justify="center" align="center" height="100vh" as="div" direction="column">
            <Card className="w-96 p-6 shadow-lg">
                <Heading as="h2">अङ्क पर्यप्तं! (Quiz Completed!)</Heading>
                <Text className="mt-2">{username} ({email}), भवतः अङ्क : {correct}/{total}.</Text>
                <ScoreChart correct={correct} total={total}/>
                <QuestionTimeChart data={chartData}/>
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
            <SummaryContent />
        </Suspense>
    );
}