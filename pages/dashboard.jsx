import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Router, { useRouter } from "next/router";


export default function Home() {

  const [user,setUser] = useState(null)
  const router = useRouter()
  
  fetch('./api/userdata').then(
    response => response.json()
  ).then(
    data => {
      console.log(data)
      if(data.error == "undefined") router.push("/")
      setUser(data.name.username)}
    //data => setUser(data)
  ).catch(
    error => console.log(error)
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>About Us</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       
          {user ? <p>Hello there {user}</p> : <p>Loading...</p>}
      

        <div className='rounded shadow p-2 bg-white'>
        Create New Baby Log
        </div>

        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

        <div className='bg-red-500'>
          test
        </div>

        <div>
          <img className='w-96' src='/poop.png' alt='poop'/>
        </div>


<figure className="max-w-lg">
  <img className="max-w-full h-auto rounded-lg" src="/poop.png" alt="image description"/>
  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image caption</figcaption>
</figure>



       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         An App by Steve
        </a>
      </footer>
    </div>
  )
}
