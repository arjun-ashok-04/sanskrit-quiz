"use client";

import { useRouter } from "next/navigation";
import {useMemo, useState} from "react";
import { Button, TextField, Card, Flex, Callout,  } from "@radix-ui/themes";
import {validateRegistration} from "@/common/validator";

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

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleStart = () => {
        let validationErrors = validateRegistration(name, email);
        if(!validationErrors) {
            const lEmail = localStorage.getItem("email");
            if(!lEmail || lEmail !== email) {
                localStorage.setItem("username", name);
                localStorage.setItem("email", email);
                router.push("/quiz/1");
            }else{
                validationErrors = []
                validationErrors.push("You have already registered with this email");
            }
        }
        setErrors(validationErrors ?? []);
    };

    const errorsComp = useMemo(() => {
        return errors ? <ErrorCallout errors={errors} /> : null;
    }, [errors]);

    return (
        <Flex justify="center" align="center" height="100vh">
            <Card className="w-96 p-6 shadow-lg">
                {errorsComp}
                <div>
                <h1 className="text-xl font-semibold mb-2">Name</h1>
                <TextField.Root
                    placeholder="Your name is required"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4"
                />
                <h1 className="text-xl font-semibold mb-2">Email</h1>

                <TextField.Root
                    placeholder="Your email is required"
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
    );
}
