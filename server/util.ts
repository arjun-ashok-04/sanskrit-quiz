import {Question} from "@/common/constants";
import {Answer} from "@/common/storageHelper";

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