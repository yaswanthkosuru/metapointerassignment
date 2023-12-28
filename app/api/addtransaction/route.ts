import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { ConnectToDB } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest, res: NextResponse) {
    const d = await getServerSession(handler);
    if (!d?.user.name) {
        return NextResponse.json({ msg: 'you are not allowed' }, { status: 500 })
    }
    const from = d.user.name;
    const { toUser, amount } = await req.json();
    console.log(toUser, amount, 'from user', d.user.name);
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const tamount = +amount;
    await client.connect();
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            const transCollection = client.db('assignment').collection('transaction');
            const usersCollection = client.db('assignment').collection('users');
            const usersdb = await usersCollection.findOne({
                phonenumber: d.user.name
            })
            const userbalance = usersdb?.amount;
            console.log(tamount, userbalance, 'balance');

            if (tamount > userbalance) {
                throw new Error('amount must be greater than balance');
            }
            //ok deduct amount from session users db 
            await usersCollection.updateOne({
                phonenumber: d.user.name
            }, {
                $inc: { amount: -tamount }
            }, { session });
            //increment amount to user
            await usersCollection.updateOne({
                phonenumber: toUser
            }, {
                $inc: { amount: tamount }
            }, { session });
            //store as transaction
            await transCollection.insertOne({
                from: d.user.name,
                to: toUser,
                amount: amount,
                time: new Date(),
            }, { session });
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json({ 'trans': 'unsuceess' }, { status: 500 })
    }
    finally {
        await session.endSession();
        await client.close();
    }


    return NextResponse.json({ s: 'a' }, { status: 200 })
}