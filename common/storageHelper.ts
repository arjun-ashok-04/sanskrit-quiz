import {Question} from "@/common/constants";

type Session = {
    username: string;
    email: string;
    questions: Question[];
    answers?: Record<number,string>;
}

const sessionKey = (email: string) => {
    const sanitizedEmail = email.replaceAll(" ", "+");
    return `session-${sanitizedEmail}`;
}

const saveToStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getSession = (email: string) => {
    if(!email || email?.trim() === "") {
        return null;
    }
    const session = localStorage.getItem(sessionKey(email));
    return session ? JSON.parse(session) : null;
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

export const saveAnswer = (email: string, questionId: number, answer: string) => {
    const session: Session = getSession(email);
    if(!session) {
        throw new Error("No session found for email");
    }

    session.answers = {
        ...session.answers,
        [questionId]: answer,
    }
    saveToStorage(sessionKey(email), session);
}
