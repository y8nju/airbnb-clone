import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  
	const {data, status} = useSession();
  console.log(data)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>
        {status} - {JSON.stringify(data)}</p>
      </main>

    </div>
  )
}

Home.isLayout = true;