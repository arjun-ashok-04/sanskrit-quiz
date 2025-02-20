import {checkAnswers, randomizeQuestions, totalQuestions} from "@/server/util";
import {NextResponse} from "next/server";
import {status} from "@/server/httpResponse";
import {PersistedSession, Session} from "@/common/storageHelper";
import {setEntry} from "@/server/cacheStorage";

const _GET = async () => {
    return NextResponse.json(
        { success: true, data: randomizeQuestions() },
        status.OK,
    );
};

const _POST = async (req: Request) => {
    const { session } = await req.json()
    const { answers } = session as Session;
    const score = answers ? checkAnswers(answers) : 0;
    const total = totalQuestions();
    const time = (answers ?? [{time: total}]).reduce((acc, a) => acc + a.time, 0)

    const persistedSession: PersistedSession = {
        ...session,
        score,
        total,
        time,
    }

    if (persistedSession.email) {
        const emailKey = `email>${persistedSession.email}`;
        await setEntry(emailKey, persistedSession);
    }

    return NextResponse.json(
        { success: true, data: { total, score} },
        status.OK,
    );
};

export const GET = _GET;
export const POST = _POST;