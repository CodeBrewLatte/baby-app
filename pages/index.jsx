import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import SignUp from '../components/SignNew'
import SignIn from '../components/SignOn'

export default function Home() {
  useEffect(() => setSignUp(true),[])

  const [signUp,setSignUp] = useState(true)
  const [signIn,setSignIn] = useState(true)
  const [goBack,setGoBack] = useState(true)
  let buttonStyle

  const toggleSignUp = () => {
    setSignUp(current => !current)
  }

  const toggleSignIn = () => {
     const signUpGone = document.getElementById('signuppre')
    buttonStyle = signUpGone.style.display
    signUpGone.style.display = 'none';


    setSignIn(current => !current)
    setGoBack(false)
  }

  const goBackFunc = () => {
    //const signUpGone = document.getElementById('signuppre')
    setGoBack(false)
    setSignIn(false)
    //signUpGone.style.display = buttonStyle
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Baby-Up - Homepage</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* Hero Section */}
      <main className='max-w-6xl mx-auto text-center mb-40 px-10 pt-16'>
        <h2 className='text-4xl font-sans '>
          Baby App
        </h2>
        <p className='font-sans pt-10'> A simple way to keep track of daily baby activites </p>

        <div className='flex flex-col justify-center w-full text-xl text-white items-center pt-10'>

        {signIn ? <>
          <button className='flex p-4 px-8 rounded-full w-48 shadow-lg bg-midnight duration-200 hover:opacity-80 text-center justify-center my-4' onClick={toggleSignIn}>Sign In</button>  
          </>: <SignIn></SignIn>}
       
          <span></span>

          {goBack ? '' : <button className='rounded-full shadow-lg p-4 px-8 bg-yellow' onClick={goBackFunc}>Go Back</button>}

          <span></span>

        {signUp ?  <>
          <button id='signuppre' className='flex p-4 px-8 w-48 rounded-full shadow-lg bg-midnight duration-200 hover:opacity-80 justify-center' onClick={toggleSignUp}>Sign Up</button>
         </>: <SignUp></SignUp>}
         
         
         </div>

       

       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         An App by Steve Benner
        </a>
      </footer>
    </div>
  )
}
