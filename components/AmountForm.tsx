import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

const AmountForm = ({ setfirstlogin }: { setfirstlogin: Dispatch<SetStateAction<boolean>> }) => {
    const [amount, setamount] = useState<number>();
    const Addamount = async () => {
        if (amount && amount > 0) {
            await axios.post('/api/addmoney', { Amount: amount })
            setfirstlogin(false);
        }
    }
    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-10'>
            <div>please add money</div>
            <input
                type='number'
                placeholder='enter amount'
                className='mt-1 mb-4 p-2 w-full border rounded-md'
                onChange={(e) => setamount(+e.target.value)}
            />
            <button
                onClick={Addamount}
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>Add money</button>
        </div>
    )
}

export default AmountForm