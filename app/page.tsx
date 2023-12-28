'use client'
import Image from 'next/image'
import SignInForm from '@/components/signinform'
import { signIn, useSession } from 'next-auth/react'
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import banner from '@/public/banner.png'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AmountForm from '@/components/AmountForm';
import Wallet from '@/components/wallet';
import Loading from '@/components/loading';
import Recipients from '@/components/recipients';
import Services from '@/components/services';
import { stat } from 'fs';
export default function Home() {
  const { data: session, status } = useSession();
  const [firstlogin, setfirstlogin] = useState(false);
  const [walletmoney, setwalletmoney] = useState<number>();
  const [isloading, setisloading] = useState<boolean>(true);
  console.log(session?.user, status);
  const router = useRouter();
  const [pagefullyloaded, setpagefullyloaded] = useState(false);
  useEffect(() => {
    async function check() {
      const res = await axios.post('/api/getmoney');
      const { addedmoney } = res.data;
      setwalletmoney(addedmoney);
      console.log(res.data, 'res.data');
      setfirstlogin(!addedmoney);
      setpagefullyloaded(true);
      setisloading(false);
    }

    check();

  }, []);
  if (status === 'unauthenticated') {
    return <Nav />
  }
  return (
    <div className=''>
      {isloading && !pagefullyloaded && <Loading />}
      <Nav />
      {
        status === 'authenticated' && <div className='flex justify-center items-center   text-3xl'>
          WELCOME {session?.user.name}
        </div>
      }

      {
        firstlogin && status === 'authenticated' && <AmountForm setfirstlogin={setfirstlogin} />
      }


      <div className='mt-10'>   <Wallet /></div>

      <div className='mt-10'> <Services /></div>
    </div>
  )
}
