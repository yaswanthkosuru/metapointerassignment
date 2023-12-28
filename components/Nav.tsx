import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import Home_icon from './icon';
const Section = () => {
    const { data: session, status } = useSession();
    if (status === 'authenticated') {
        return <div className='flex justify-between'>

            <button className='w-20 rounded-md flex items-center justify-center bg-red-600 text-white p-2' onClick={() => signOut()}>signout</button>
        </div>
    }
    return <div className=' p-2 w-20 rounded-md flex items-center justify-center bg-blue-600 text-white'>
        <button onClick={() => signIn()}>sigin</button></div>


}
const Nav = () => {

    return (
        <div className='flex justify-between items-center py-4 sm:px-10'>
            <div className='inline-block'><Home_icon /></div>
            <Section />
        </div>
    )
}

export default Nav