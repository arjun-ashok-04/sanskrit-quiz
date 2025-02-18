"use client";

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useState, useEffect, useMemo} from "react";
import {Button, Card, Flex, Heading, Text, Theme} from "@radix-ui/themes";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {saveAnswer, getSession} from "@/common/storageHelper";
import {Question} from "@/common/constants";

type QuestionItemProps = {
    option: string;
    key: string;
}

const QuestionItem = ({option, key}: QuestionItemProps) => (
    <div className="flex items-center" key={key}>
        <RadioGroup.Item
            className="size-[25px] cursor-pointer rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={option}
            key={key}
            id={key}
        >
            <RadioGroup.Indicator key={key}
                className="relative flex size-full items-center justify-center rounded-full bg-transparent">
                <div className="w-3 h-3 rounded-full bg-blue-500"/>
            </RadioGroup.Indicator>
        </RadioGroup.Item>
        <Text className="pl-[15px] text-[15px] leading-none" htmlFor={key} key={key}>
            {option}
        </Text>
    </div>
)

export default function Quiz() {
    const router = useRouter();
    const params = useParams()
    const searchParams = useSearchParams()
    const email = searchParams.get("email");
    const [selected, setSelected] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const randomizeOptions = useMemo( () => currentQuestion?.options?.sort(() => Math.random() - 0.5) ?? [], [currentQuestion]);

    useEffect(() => {
        const session = getSession(email || "");
        if(!session) {
            router.push("/quiz");
        }

        const sessionQs = session.questions
        setQuestions(sessionQs);
        const questionIndex = parseInt(params?.id?.toString() ?? "1") - 1
        const question: Question = sessionQs[questionIndex] as Question;
        if(question) {
            setCurrentQuestion(question);
            const answer = session.answers ? session.answers[question.id] : "";
            setSelected(answer || "");
        }
    }, [email, params?.id, router]);


    const handleNext = () => {
        if (!selected || !email) return;

        const session = getSession(email || "");
        if(!session || !currentQuestion?.id) {
            router.push("/quiz");
            return;
        }

        const questionIndex = parseInt(params?.id?.toString() ?? "1") - 1
        saveAnswer(email, currentQuestion.id, selected);
        if (questionIndex + 1 < questions.length) {
            router.push(`/quiz/${questionIndex + 2}?${searchParams}`);
        } else {
            router.push(`/quiz/summary?${searchParams}`);
        }
    };

    if (!email) {
        return router.push("/quiz");
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <Theme accentColor="blue" grayColor="gray" panelBackground="solid" radius="full">
        <Flex justify="center" align="center" height="100vh">
            <Card className="w-96 p-6 shadow-lg">
                <Heading as="h2">{currentQuestion.text}</Heading>
                <RadioGroup.Root
                    className="mt-4 space-y-2"
                    value={selected}
                    onValueChange={setSelected}
                >
                    {randomizeOptions.map((option, index) =>
                        <QuestionItem option={option} key={`q-${index}`} />
                    )}
                </RadioGroup.Root>
                <Button className="mt-4 w-full" onClick={handleNext} disabled={!selected}>
                    Next
                </Button>
            </Card>
        </Flex>
        </Theme>
    );
}
