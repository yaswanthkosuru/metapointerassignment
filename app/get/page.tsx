import { getServerSession } from 'next-auth'
import { getServerActionDispatcher } from 'next/dist/client/components/app-router'
import React from 'react'
import { handler } from '../api/auth/[...nextauth]/route'

const page = async () => {
    const d = await getServerSession(handler);
    console.log(d, 'server');
    return (
        <div>page</div>
    )
}

export default page