import {Question} from "@/common/constants";

const questions: Question[] = [
    { id: 1, text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"] },
    { id: 2, text: "What is the square root of 64?", options: ["6", "8", "10"] },
    { id: 3, text: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific"] },
    { id: 4, text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain"] },
    { id: 5, text: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2"] }
];

const answers: Record<number, string> = {
    1: "Mars",
    2: "8",
    3: "Pacific",
    4: "William Shakespeare",
    5: "H2O"
};

export const randomizeQuestions = () => {
    return questions.sort(() => Math.random() - 0.5);
}

export const totalQuestions = () => {
    return questions.length;
}

export const checkAnswers = (submittedAnswers: Record<number, string>) => {
    let correct = 0;
    for (const [questionId, answer] of Object.entries(submittedAnswers)) {
        if (answers[Number(questionId)] === answer) {
            correct++;
        }
    }
    return correct;
}