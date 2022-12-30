import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [user,setUser] = useState('')
  
  fetch('./api/userdata').then(
    response => response.json()
  ).then(
    data => {
      console.log(data.name.username)
      setUser(data.name.username)}
    //data => setUser(data)
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>About Us</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello there {user}
        </h1>

        <p className={styles.description}>
          Sign In or Sign Up
  
        </p>

       
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
