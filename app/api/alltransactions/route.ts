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
    const transCollection = database?.collection('transaction');

    const transactions = await transCollection?.find({
        $or: [
            {
                from: d.user.name,
            },
            {
                to: d.user.name
            }
        ]
    }).toArray();
    console.log(transactions);



    return NextResponse.json({ transactions }, { status: 200 })
}