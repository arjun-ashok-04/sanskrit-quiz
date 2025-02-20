import {Question} from "@/common/constants";

export type PersistedSession = {
    score: number;
    total: number;
    time: number;
} & Session;

export type Session = {
    username: string;
    email: string;
    questions: Question[];
    answers?: Answer[];
}

export type Answer = {
    questionId: number;
    answer: string;
    time: number;
}

const sessionKey = (email: string) => {
    const sanitizedEmail = email.replaceAll(" ", "+");
    return `session-${sanitizedEmail}`;
}

const saveToStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getSession = (email: string): Session|null => {
    if(!email || email?.trim() === "") {
        return null;
    }
    const session = localStorage.getItem(sessionKey(email));
    return session ? JSON.parse(session) as Session: null;
}

export const hasAnExistingSession = (email: string) => {
    return !!getSession(email);
}

export const startSession = (username: string, email: string, questions: Question[]) => {
    const session: Session = {
        username,
        email,
        questions
    }
    saveToStorage(sessionKey(email), session);
    return getSession(email);
}

export const saveAnswer = (email: string, questionId: number, answer: string, time: number) => {
    const session = getSession(email);
    if(!session) {
        throw new Error("No session found for email");
    }

    session.answers = [
        ...(session.answers ?? []),
        {
            questionId,
            answer,
            time,
        },
    ]

    saveToStorage(sessionKey(email), session);
}
