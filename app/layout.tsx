import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Authprovider from '@/components/Authprovider'
import { roboto, robotoslab } from '@/components/fonts'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'metapointer',
  description: ' metapointer assignment ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`${inter.className} w-[90%] mx-auto`}>
        <Authprovider>
          {children}
        </Authprovider>
      </body>
    </html>
  )
}
