import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { ConnectToDB } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    const d = await getServerSession(handler);
    if (!d?.user.name) {
        return NextResponse.json({ msg: 'you are not allowed' }, { status: 500 })
    }
    const database = await ConnectToDB();
    const cbCollection = database?.collection('cashbacks');

    const cashbacks = await cbCollection?.find({
        from: d.user.name.toString(),
    }).toArray();

    return NextResponse.json({ cashbacks }, { status: 200 })
}