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
    const transCollection = database?.collection('transaction');
    const { touser } = await req.json();
    console.log(d.user.name, touser, 'post');

    const outgoing = await transCollection?.find({
        from: d.user.name.toString(),
        to: touser.toString(),
    }).toArray();
    const incoming = await transCollection?.find(
        {
            from: touser,
            to: d.user.name,
        },
        {
            projection: {
                from: 0,
            },
        }
    ).toArray();
    var transactions: any[] = [];

    if (incoming) {
        transactions = transactions.concat(incoming);
    }

    if (outgoing) {
        transactions = transactions.concat(outgoing);
    }
    console.log(incoming, outgoing, 'post');


    transactions.sort(function (a, b) {
        var keyA = new Date(a.time),
            keyB = new Date(b.time);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    console.log(transactions, 'f');


    return NextResponse.json({ transactions }, { status: 200 })
}