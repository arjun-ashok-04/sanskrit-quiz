import {NextRequest, NextResponse} from "next/server";
import {status} from "@/server/httpResponse";
import {isValidEmail} from "@/server/util";

const _GET = async (req: NextRequest) => {
    const { nextUrl } = req;
    const queryParams = Object.fromEntries(nextUrl.searchParams);
    const email = queryParams["email"];

    const validEmail = await isValidEmail(email);
    console.log(JSON.stringify({ op: "validateEmail", email, validEmail }));

    return NextResponse.json(
        { success: validEmail, data: [] },
        status.OK,
    );
};

export const GET = _GET;
