"use client";

import { useRouter } from "next/navigation";
import {useCallback, useEffect, useMemo, useState} from "react";
import { Button, TextField, Card, Flex, Callout, Theme,  } from "@radix-ui/themes";
import {validateRegistration} from "@/common/validator";
import {makeCall} from "@/common/apiCaller";
import {hasAnExistingSession,startSession} from "@/common/storageHelper";

const ErrorCallout = ({ errors } : {errors : string[]}) => {
    const errorsList = errors.map((error: string, index: number) => (
        <Callout.Text key={index} color="red">
            {error}
        </Callout.Text>
    ));

    if(errors.length === 0) {
        return null;
    }
    return <Callout.Root> {errorsList} </Callout.Root>
}

const InfoCallout = ({ messages } : {messages : string[]}) => {
    const messagesList = messages.map((error: string, index: number) => (
        <Callout.Text key={index} color="gray">
            {error}
        </Callout.Text>
    ));

    if(messages.length === 0) {
        return null;
    }
    return <Callout.Root> {messagesList} </Callout.Root>
}

const fetchQuestions = async () =>{
    const res = await makeCall(`/api/question`,{}, {
        method: "GET",
        cache: "no-store",
    });

    if (res.status === 200) {
        const response = await res.json();
        return response["data"];
    } else {
        console.error("Failed to fetch data, status code:", res.status);
    }
}

const messages = [
    "You can only use one email once to register.",
    "You email cannot use subaddressing (using +).",
    "Each question has a 30-second time limit.",
    "Do not go back to previous questions, as it may unset your answer and you will lose the score!",
]

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [questions, setQuestions] = useState([]);

    const handleStart = useCallback( async () => {
        let validationErrors = await validateRegistration(name, email);
        if(!validationErrors) {
            const existingSession = hasAnExistingSession(email);
            if(!existingSession) {
                const session = startSession(name, email, questions);
                if(session) {
                    router.push("/quiz/1?email=" + email);
                }else{
                    validationErrors = []
                    validationErrors.push("आरम्भं असफलं !(Failed to start session, contact Arjun!)");
                }
            }else{
                validationErrors = []
                validationErrors.push("भवान् पूर्वमेव अस्मिन् ईमेलद्वारा पञ्जीकरणं कृतवान्!");
            }
        }
        setErrors(validationErrors ?? []);
    }, [email, name, questions, router]);

    useEffect(() => {
        fetchQuestions().then((data) => {
            setQuestions(data);
        });
    },[]);

    const errorsComp = useMemo(() => {
        return errors ? <><br/><ErrorCallout errors={errors} /> </>: null;
    }, [errors]);

    return (
        <Theme accentColor="blue" grayColor="gray" panelBackground="solid" radius="full">
                <h1 className="text-2xl font-bold text-center mx-auto"> प्रश्नोत्तरे स्वागतम् ! (Welcome to the
                    quiz!)</h1>
            <Flex justify="center" align="center" height="88vh">
                <Card className="w-196 shadow-lg">
                    <InfoCallout messages={messages}/>
                    {errorsComp}
                    <br/>
                    <div>
                        <h1 className="text-xl font-semibold mb-2">नामः (Name)</h1>
                        <TextField.Root
                            placeholder="भवतः नाम आवश्यकम् (Your name is required)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-4"
                        />
                        <h1 className="text-xl font-semibold mb-2">ईमेल (Email)</h1>

                        <TextField.Root
                            placeholder="भवतः ईमेल आवश्यकम् (Your email is required)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                        />
                        <Button className="mt-4 w-full" onClick={handleStart}>
                            Start Quiz
                        </Button>
                    </div>
                </Card>
            </Flex>
        </Theme>
    );
}
