import {Question} from "@/common/constants";
import {Answer} from "@/common/storageHelper";
import url from "url";


const defaultQuestions: Question[] = [
    { id: 1, text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"] },
    { id: 2, text: "What is the square root of 64?", options: ["6", "8", "10"] },
    { id: 3, text: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific"] },
    { id: 4, text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain"] },
    { id: 5, text: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2"] }
];

const defaultAnswers: Record<number, string> = {
    1: "Mars",
    2: "8",
    3: "Pacific",
    4: "William Shakespeare",
    5: "H2O"
};

const getQuestions = (): Question[] => {
    const envQuestions = process.env.QUESTIONS;
    if (envQuestions) {
        return JSON.parse(envQuestions) ?? defaultQuestions;
    }
    return defaultQuestions;
}

const getAnswers = (): Record<number, string> => {
    const envAnswers = process.env.ANSWERS;
    if (envAnswers) {
        return JSON.parse(envAnswers) ?? defaultAnswers;
    }
    return defaultAnswers;
}

export const randomizeQuestions = () => {
    return getQuestions().sort(() => Math.random() - 0.5);
}

export const totalQuestions = () => {
    return getQuestions().length;
}

export const checkAnswers = (sessionAnswers: Answer[]) => {
    const answers = getAnswers();
    return sessionAnswers.reduce((correct, { questionId, answer }) => {
        return correct + (answers[questionId] === answer ? 1 : 0);
    }, 0);
}

export const isValidEmail = async (email: string): Promise<boolean> => {
    process.env.EMAIL_VALIDATION_KEY = "private_c986a0243276ed3790c1628b80e1dd75"
    process.env.EMAIL_VALIDATION_URL = "https://api.neverbounce.com/v4/single/check"
    if(process.env.EMAIL_VALIDATION_KEY && process.env.EMAIL_VALIDATION_URL) {
        const key = `${process.env.EMAIL_VALIDATION_KEY}`;
        const url = `${process.env.EMAIL_VALIDATION_URL}`;
        const urlQueryParams = new URLSearchParams({key, email});
        const modifiedUrl = url + "?" + urlQueryParams.toString();
        const response = await fetch(modifiedUrl, {
            method: "POST"
        });

        const jsonResponse = await response.json();

        console.log(JSON.stringify({...jsonResponse}));

        return !(jsonResponse.status !== "success" || jsonResponse.result !== "valid");
    }
    return true;
};