import {NextResponse} from "next/server";
import {status} from "@/server/httpResponse";
import {getByPrefix} from "@/server/cacheStorage";

const _GET = async () => {
    const allSessions = await getByPrefix("email>");
    return NextResponse.json(
        { success: true, data: Object.values(allSessions) },
        status.OK,
    );
};

export const GET = _GET;
