'use client'
import Nav from '@/components/Nav';
import { playfairdisplay, ptserif, roboto } from '@/components/fonts';
import Loading from '@/components/loading';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const { touser } = useParams();
    const [amount, setamount] = useState<number>();
    const [loading, setloading] = useState<boolean>(true);
    const [reload, setreload] = useState<boolean>();
    const [t, sett] = useState<{ from?: string, to: string, amount: number, time: Date }[]>();
    useEffect(() => {
        async function gett() {
            console.log('gett');
            const res = await axios.post('/api/transactions', { touser: touser });
            const { transactions } = res.data;
            sett(transactions);
            console.log(transactions, 'transactions');
            setloading(false);
        }
        gett();
    }, [reload]);
    const sendmoney = async () => {
        setloading(true);

        try {
            await axios.post('/api/addtransaction', {
                toUser: touser,
                amount: amount
            })
            setloading(false);
            setreload(prev => !prev);
        } catch (error) {

            setloading(false);
        }

    }

    return (
        <div>
            <Nav />
            {loading && <Loading />}
            <div className='sm:w-1/2 mx-auto border-blue-600 border-2 p-2 rounded-xl '>
                <div className={`${ptserif.className} text-2xl`}>Send To {touser}</div>
                <hr className='bg-blue-200 h-[2px]' />
                <div className='font-bold text-center flex justify-center items-center text-xl '>Recent transactions</div>
                {
                    t?.map((each) => {
                        const dateObject = new Date(each.time);
                        console.log();



                        if (!each.from) {

                            return <div className='flex mb-4 justify-start'>
                                <div className='px-12 py-8 bg-blue-50/80 shadow-md'>
                                    <div className='text-5xl'>&#8377;{each.amount}</div>
                                    <hr />
                                    <div>Received Instantly</div>
                                    <div>{dateObject.toDateString()}</div>

                                </div>

                            </div>
                        }
                        return <div className='flex mb-4 justify-end'>
                            <div className='px-12 py-8 bg-blue-50/80 shadow-md'>
                                <div className='text-5xl'>&#8377;{each.amount}</div>
                                <div>Sent Succesfully </div>
                                <div>At {dateObject.toDateString()}</div>
                            </div>

                        </div>
                    })
                }
                <div className='flex'>
                    <input
                        onChange={(e) => setamount(+e.target.value)}
                        type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg  focus:ouline-none block w-full p-2.5 " placeholder="enter amount to send" required>

                    </input>
                    <button
                        onClick={sendmoney}
                        className='px-4  py-2 rounded-r-md bg-blue-600 text-white' >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth=""
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                        Send
                    </button>
                </div>
            </div>
        </div>

    )
}

export default page