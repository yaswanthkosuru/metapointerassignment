import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { ConnectToDB } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
    const d = await getServerSession(handler);
    const database = await ConnectToDB();
    const users = database?.collection('users');
    const currentuser = await users?.findOne(
        { phonenumber: d?.user.name }
    )
    console.log(currentuser, 'post');

    return NextResponse.json({ addedmoney: currentuser?.amount }, { status: 200 })
}