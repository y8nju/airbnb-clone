
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
	const {data: session, status} = useSession();
  return (<>
    <Head>
      <title>여행은 살아보는 거야 - 에어비앤비</title>
    </Head>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>
        {status} - {JSON.stringify(session)}</p>
      </main>
    </div>
  </>)
}
Home.layout = "default";