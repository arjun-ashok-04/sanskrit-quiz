import {checkAnswers, randomizeQuestions, totalQuestions} from "@/server/util";
import {NextResponse} from "next/server";
import {status} from "@/server/httpResponse";

const _GET = async () => {
    return NextResponse.json(
        { success: true, data: randomizeQuestions() },
        status.OK,
    );
};

const _POST = async (req: Request) => {
    const { answers } = await req.json()
    const correct = checkAnswers(answers);
    const total = totalQuestions();
    return NextResponse.json(
        { success: true, data: { total, correct} },
        status.OK,
    );
};

export const GET = _GET;
export const POST = _POST;