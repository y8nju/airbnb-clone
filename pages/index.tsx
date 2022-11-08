import {useEffect, useState} from 'react'
import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { useCtx } from '../context/context';
import styles from '../styles/Home.module.css'
import { findEmail } from '../lib/api/accountApi';

export default function Home() {
	const {data: session, status} = useSession();
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