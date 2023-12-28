'use client'
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

export default function Authprovider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
