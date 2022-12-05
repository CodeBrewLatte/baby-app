import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {

  

  const submitPassword = async(e: any) => {
    e.preventDefault();
    console.log(e.target)

    const userInputValue: string = e.target.elements.user.value;
    const passInputValue: string = e.target.elements.pass.value;

    const data = {
      username: userInputValue,
      password: passInputValue
    }

    const response = await fetch('/api/userhandler', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  })
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

        <p className={styles.description}>
          Sign In or Sign Up
        </p>

        <form onSubmit={submitPassword}>
          <input type='text' name="user" placeholder='Username' />
          <input type='password' name="pass" placeholder='Password'/>
          <button type='submit'>Submit</button>
        </form>

       
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
