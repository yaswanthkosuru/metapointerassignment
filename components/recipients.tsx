import { userdb } from '@/models/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './loading';
import Link from 'next/link';

const Recipients = () => {
    const [users, setusers] = useState<userdb[]>([]);
    const [selectedusers, setselectedusers] = useState<string>();
    const [loading, setloading] = useState<boolean>(true);
    useEffect(() => {
        async function getusers() {
            const res = await axios.post('/api/getusers');
            const { users_list } = res.data;
            setusers(users_list);
            setloading(false);
        } getusers();
    }, []);
    console.log(users, 'users');
    function handleSendMoney(phoneNumber: string | undefined) {
        // Implement your logic to handle sending money
        console.log(`Sending money to ${phoneNumber}`);
    }
    const handleSelectChange = (e: React.SyntheticEvent) => {
        const val = (e.target as HTMLInputElement).value;
        console.log(val, 'val');

        setselectedusers(val);
    };
    console.log(selectedusers, 'selectedusers');
    if (loading) {
        return <Loading />
    }
    return (
        <div className='sm:w-1/2 mx-auto'>
            <p className='text-xl'>please choose any contact</p>

            <div className='flex items-center justify-center flex-col'>
                <select
                    value={selectedusers}
                    onChange={handleSelectChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">please select any one user</option>
                    {
                        users.map((user) => {
                            return <option key={user.phonenumber} className='text-xl' value={user.phonenumber}>{user.phonenumber}</option>
                        })
                    }
                </select>

                <div className='flex'>
                    <Link
                        href={selectedusers ? `/sendmoney/${selectedusers}` : `/sendmoney/`}
                        className=' mt-1 px-4 py-2 rounded-md bg-blue-600 text-white' >
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
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Recipients