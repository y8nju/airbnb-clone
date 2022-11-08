import {useEffect} from 'react'
import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { useCtx } from '../context/context';
import styles from '../styles/Home.module.css'
import { findEmail } from '../lib/api/accountApi';

export default function Home() {
  const ctx = useCtx();
  const { mode, setMode, userEmail, loginDate} = ctx!
  
	const {data: session, status} = useSession();
  
  console.log('loginDate: ', loginDate)
  useEffect(()=> {
    console.log('loginDate: ', loginDate)
    if(session) {
        (async () => {
            let resp = await findEmail(session.user!.email as string);
            if(resp.data.visible == null) {
              setMode('Commitment');
            }
        })();
    }
    // loginDate로 받으면, google 로그인은 mode를 넘기지 못하므로 작동이 안함 해당부분 수정하기
}, [loginDate])
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>
        {status} - {JSON.stringify(session)}</p>
      </main>

    </div>
  )
}

Home.isLayout = true;