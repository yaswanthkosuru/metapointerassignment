import Link from 'next/link'
import React from 'react'

const Services = () => {
    return (
        <div className='sm:w-1/2 mx-auto'>
            <div className='flex sm:gap-10'>
                <Link href='/sendmoney' className='flex flex-col items-center justify-center'>
                    <svg width="80px" height="80px" viewBox="-9.98 0 48.891 48.891" xmlns="http://www.w3.org/2000/svg">
                        <g id="reciept_money" data-name="reciept money" transform="translate(-236.032 -321.837)">
                            <path id="Path_118" data-name="Path 118" d="M264.468,322.337H236.532v47.891h27.937V322.337Z" fill="#f2f7fd" fill-rule="evenodd" />
                            <path id="Path_119" data-name="Path 119" d="M264.468,366.237H236.532v3.991h27.937v-3.991Z" fill="#354077" fill-rule="evenodd" />
                            <path id="Path_120" data-name="Path 120" d="M254.491,322.337h-7.982v0a3.988,3.988,0,0,0,3.987,3.987h0a3.99,3.99,0,0,0,3.991-3.991Z" fill="#354077" fill-rule="evenodd" />
                            <path id="Path_121" data-name="Path 121" d="M250.5,338.3a7.982,7.982,0,1,1-7.982,7.981A7.984,7.984,0,0,1,250.5,338.3Z" fill="#ffe959" fill-rule="evenodd" />
                            <path id="Path_122" data-name="Path 122" d="M242.518,358.255h15.964M242.518,334.31h15.964m-3.991-11.973h-7.982v0a3.988,3.988,0,0,0,3.987,3.987h0a3.99,3.99,0,0,0,3.991-3.991Zm9.977,43.9h0Zm-9.977,3.991h9.977V322.337H236.532v47.891h9.977m3.492,0h1m-.5-31.927a7.982,7.982,0,1,1-7.982,7.981A7.984,7.984,0,0,1,250.5,338.3Zm0,11.972v1m0-9.977v1m-2,5.986a2,2,0,1,0,2-2m1.995-2a2,2,0,1,0-1.995,2" fill="none" stroke="#0f0e0b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                        </g>
                    </svg>
                    <span>Send Money</span>
                </Link>
                <Link href='/transactions' className='flex flex-col items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="80" height="80">
                        <circle cx="32" cy="32" r="30" fill="#3498db" />
                        <polygon points="20,32 28,24 28,28 38,28 38,32 28,32" fill="#fff" />
                        <polygon points="44,32 36,40 36,36 26,36 26,32 36,32" fill="#fff" />
                    </svg>

                    <span>Transactions</span>
                </Link>

            </div>

        </div>
    )
}

export default Services