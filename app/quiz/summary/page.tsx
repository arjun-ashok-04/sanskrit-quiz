"use client";

import {Suspense, useEffect, useState} from "react";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import {makeCall} from "@/common/apiCaller";
import {useRouter, useSearchParams} from "next/navigation";
import * as React from "react";
import Image from 'next/image'
import {getSession} from "@/common/storageHelper";
import ScoreChart from "@/components/scoreChart";

const verifyAnswers = async (answers: Record<number, string>) =>{
    const res = await makeCall(`/api/question`,{}, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({answers}),
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
        }

        setUsername(session.username);
        const { answers } = session;
        verifyAnswers(answers).then((data) => {
            const { total, correct } = data;
            setTotal(total);
            setCorrect(correct);
            setLoading(false);
        })

    }, [email, router]);

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
        <Flex justify="center" align="center" height="100vh">
            <Card className="w-96 p-6 shadow-lg">
                <Heading as="h2">Quiz Completed!</Heading>
                <Text className="mt-2">{username} ({email}), your score is {correct}/{total}.</Text>
                <ScoreChart correct={correct} total={total} />
                <Button className="mt-4 w-full" onClick={() => {
                    window.location.href = "/";
                }}>
                    Restart Quiz
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