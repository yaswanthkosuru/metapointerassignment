import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './loading';

const Wallet = () => {
    const [walletmoney, setwalletmoney] = useState<number>();
    const [showbal, setshowbalance] = useState<boolean>();
    const [isloading, setisloading] = useState<boolean>(true);
    useEffect(() => {
        async function getmoney() {
            setisloading(true);
            const res = await axios.post('/api/getmoney');
            const { addedmoney } = res.data;
            setwalletmoney(addedmoney);
            setisloading(false);

        }
        getmoney();
    }, [showbal]);

    return (

        <div className='p-8 rounded-xl flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-50 text-gray-900 text-3xl sm:w-1/2  mx-auto'>
            {isloading && <Loading />}

            <div className=' font-base flex items-center'>
                <span className=''>Account Balance:</span> <div className=' font-extrabold  text-4xl'>&#8377;{walletmoney} rupees</div>
                <button className='active:bg-blue-200 ml-2' onClick={() => setshowbalance(prev => !prev)}>
                    <svg fill="black" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 383.748 383.748" >
                        <g>
                            <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
		C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
		L2.081,34.641v113.365h113.91L62.772,95.042z"/>
                            <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
		c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
		c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/>
                        </g>
                    </svg>
                </button>

            </div>

        </div>
    )
}

export default Wallet