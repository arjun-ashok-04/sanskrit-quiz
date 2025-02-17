"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import * as RadioGroup from "@radix-ui/react-radio-group";

const questions = [
    { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { id: 2, text: "What is the capital of France?", options: ["Berlin", "Paris", "Rome"], answer: "Paris" },
];

export default function Quiz({ params }: { params: { id: string } }) {
    const router = useRouter();
    const questionIndex = parseInt(params.id) - 1;
    const question = questions[questionIndex];

    const [selected, setSelected] = useState("");

    useEffect(() => {
        setSelected(localStorage.getItem(`question_${params.id}`) || "");
    }, [params.id]);

    const handleNext = () => {
        if (!selected) return;
        localStorage.setItem(`question_${params.id}`, selected);
        if (questionIndex + 1 < questions.length) {
            router.push(`/quiz/${questionIndex + 2}`);
        } else {
            router.push("/quiz/summary");
        }
    };

    if (!question) return <div>Loading...</div>;

    return (
        <Flex justify="center" align="center" height="100vh">
            <Card className="w-96 p-6 shadow-lg">
                <Heading as="h2">{question.text}</Heading>
                <RadioGroup.Root
                    className="mt-4 space-y-2"
                    value={selected}
                    onValueChange={setSelected}
                >
                    {question.options.map((option) => (
                        <RadioGroup.Item key={option} value={option} className="flex items-center space-x-2">
                            <RadioGroup.Indicator className="w-4 h-4 border rounded-full" />
                            <Text>{option}</Text>
                        </RadioGroup.Item>
                    ))}
                </RadioGroup.Root>
                <Button className="mt-4 w-full" onClick={handleNext} disabled={!selected}>
                    Next
                </Button>
            </Card>
        </Flex>
    );
}
