import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { ConnectToDB } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
    const d = await getServerSession(handler);
    if (!d?.user.name) {
        return NextResponse.json({ msg: 'you are not allowed' }, { status: 500 })
    }
    const database = await ConnectToDB();
    const users = database?.collection('users');
    const users_list = await users?.find({
        phonenumber: { $ne: d.user.name }
    }).toArray();

    console.log(users_list);

    return NextResponse.json({ users_list }, { status: 200 })
}