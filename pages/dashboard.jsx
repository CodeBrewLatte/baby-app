import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Router, { useRouter } from "next/router";


export default function Home() {

  const [user,setUser] = useState(null)
  const [baby,setBaby] = useState(null)
  const router = useRouter()
  
  fetch('./api/userdata').then(
    response => response.json()
  ).then(
    data => {
      console.log(data)
      if(data.error == "undefined") router.push("/")
      setUser(data.name.username)
      setBaby(data.name.baby)
    }
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
      

        <div className='rounded shadow-md p-2 bg-white flex flex-row'>
        <div>
          <img className='w-20 p-2' src='/bottle.png' alt='poop'/>
        </div>
        <div>
          <img className='w-20 p-2' src='/poop.png' alt='poop'/>
        </div>
        <div>
          <img className='w-20 p-2' src='/sleep.png' alt='poop'/>
        </div>
        <div>
          <img className='w-20 p-2' src='/change.png' alt='poop'/>
        </div>
        </div>


        <div className='py-5'>
          <h2 className='text-center py-5'>History for Baby {baby} </h2>
          <table class="w-full">
  <thead className='bg-gray-50 border-b-2 border-gray-200'>
    <tr>
      <th>Event</th>
      <th>Last Time</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr className='bg-white-50'>
      <td>Poop</td>
      <td>December 30th, 2022</td>
      <td>Little bit runny</td>
    </tr>
    <tr className='bg-gray-50'>
      <td>Poop</td>
      <td>December 30th, 2022</td>
      <td>Little bit runny</td>
    </tr>
  </tbody>
</table>
        </div>

        


      



       
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
