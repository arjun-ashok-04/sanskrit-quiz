"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

const questions = [
    { id: 1, answer: "4" },
    { id: 2, answer: "Paris" },
];

export default function Summary() {
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "Guest");
        let totalScore = 0;
        questions.forEach(({ id, answer }) => {
            if (localStorage.getItem(`question_${id}`) === answer) {
                totalScore++;
            }
        });
        setScore(totalScore);
    }, []);

    return (
        <Flex justify="center" align="center" height="100vh">
            <Card className="w-96 p-6 shadow-lg">
                <Heading as="h2">Quiz Completed!</Heading>
                <Text className="mt-2">{username}, your score is {score}/{questions.length}.</Text>
                <Button className="mt-4 w-full" onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                }}>
                    Restart Quiz
                </Button>
            </Card>
        </Flex>
    );
}
