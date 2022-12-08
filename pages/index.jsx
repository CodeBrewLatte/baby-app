import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import SignUp from '../components/signUp'

export default function Home() {
  useEffect(() => setSignUp(true),[])

  const [signUp,setSignUp] = useState(true)

  const toggleSignUp = () => {
    setSignUp(current => !current)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Baby-Up</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Baby App
        </h1>

       

        {signUp ?  <div className={styles.description}>
          <button>Sign In</button>  
          <p>or</p> 
          <button onClick={toggleSignUp}>Sign Up</button>
          </div> : <SignUp></SignUp>}

       

       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         An App by Steve & Ethan
        </a>
      </footer>
    </div>
  )
}
