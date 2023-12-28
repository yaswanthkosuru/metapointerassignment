// SignInForm.js

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const SignInForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [err, seterr] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        // Prevent the default form submission
        e.preventDefault();
        const indianPhoneNumberRegex = /^[2-9]\d{9}$/;
        // Handle sign-in logic here
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);
        if (phoneNumber.length != 10 && !phoneNumber.match(indianPhoneNumberRegex)) {
            seterr('please add correct phonenumber');
            setPhoneNumber('');
            return;
        }
        else if (password.length < 6) {
            seterr('password contain atleast 6 characters');
            setPassword('');
            return;
        }
        else {
            try {
                seterr('')
                // Use await to ensure signIn completes before moving on
                const result = await signIn('credentials', {
                    redirect: true,
                    callbackUrl: '/',
                    phoneNumber,
                    password,
                })
                console.log(result);
                if (result?.error) {
                    seterr(result.error);
                }

                // You can add any logic here to run after successful authentication
            } catch (error) {
                console.error('Authentication failed:', error);

                // Handle authentication failure if needed
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <span className='text-sm font-thin'>make sure you remember password </span>
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <span className='text-red-600'>{err}</span>
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Sign In / create account
                    </button>
                </div>


            </form>
        </div>
    );
};

export default SignInForm;
