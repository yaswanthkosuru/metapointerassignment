import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { ConnectToDB } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
    const d = await getServerSession(handler);
    const data = await req.json();
    const { Amount } = data;
    const database = await ConnectToDB();
    const users = database?.collection('users');
    const result = await users?.updateOne(
        { phonenumber: d?.user.name },
        { $set: { amount: Amount } }
    );
    console.log(result);


    return NextResponse.json({ result }, { status: 200 })
}