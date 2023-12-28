'use client'
import Nav from '@/components/Nav'
import Recipients from '@/components/recipients'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SendMoney = () => {

    return (
        <div>
            <Nav />
            <Recipients />
        </div>
    )
}

export default SendMoney