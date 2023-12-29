'use client'
import Nav from '@/components/Nav';
import Loading from '@/components/loading';
import { cashbackdb } from '@/models/cashback';
import axios from 'axios';
import { channel } from 'diagnostics_channel';
import React, { useEffect, useState } from 'react'

const CashbackPage = () => {
    const [cashbacks, setcashbacks] = useState<cashbackdb[]>();
    const [loading, setloading] = useState<boolean>(true);
    useEffect(() => {
        async function getcb() {
            setloading(true)
            const response = await axios.get('api/getcashbacks');
            const { cashbacks } = response.data;
            setcashbacks(cashbacks);
            setloading(false);
        } getcb();
    }, []);
    return (
        <div>
            <Nav />
            {loading && <Loading />}
            <div className="grid grid-cols-1 gap-4 w-1/2 mx-auto">

                {cashbacks?.map((cashback, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-xl font-bold text-gray-800">&#8377;{cashback.amount} received </p>
                        <hr className="my-2 border-gray-300" />
                        <p className="text-gray-600">For:Transaction to {cashback.to}</p>
                        <p className="text-blue-500">Cashback Type: {cashback.cashbacktype}</p>
                        <p className="text-blue-500">Time: {new Date(cashback.time).toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CashbackPage