'use client'
import Nav from '@/components/Nav'
import Loading from '@/components/loading';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const transactionpage = () => {
    const [loading, setloading] = useState<boolean>(true);
    const [t, sett] = useState<{ from: string, to: string, amount: number, time: Date }[]>();
    const { data: session, status } = useSession();
    useEffect(() => {
        async function gettransaction() {
            setloading(true)
            const res = await axios.get('/api/alltransactions');
            const { transactions } = res.data;
            console.log(transactions);

            sett(transactions);
            setloading(false);
        } gettransaction();
    }, [])
    return (
        <div>
            <Nav />
            {loading && <Loading />}
            <div className='sm:w-1/2 mx-auto'>
                {
                    t?.map((trans, index) => {
                        const { from, to, amount, time } = trans;
                        const isSent = from === session?.user.name;
                        const timestamp = new Date(time);

                        if (isSent) {

                            return <div key={index} className="border p-4 my-4 bg-red-50 text-red-600">
                                <p className="font-bold">
                                    <p>Sent to {to}</p>
                                </p>
                                <hr className="my-2" />
                                <p className="text-lg">&#8377;{amount}</p>
                                <p>at {timestamp.toDateString()}</p>
                            </div>
                        }
                        return (
                            <div key={index} className="border p-4 my-4 bg-green-50 text-green-600">
                                <p className="font-bold">
                                    Received From {from}
                                </p>
                                <hr className="my-2" />
                                <p className="text-lg">&#8377;{amount}</p>
                                <p>at {timestamp.toDateString()}</p>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default transactionpage