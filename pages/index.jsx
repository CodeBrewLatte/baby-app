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

  const toggleSignUp = () => {
    const signInGone = document.getElementById('signinpre')
    signInGone.style.display = 'none'
    setSignUp(current => !current)
    setGoBack(false)
  }

  const toggleSignIn = () => {
     const signUpGone = document.getElementById('signuppre')
    signUpGone.style.display = 'none';
    setSignIn(current => !current)
    setGoBack(false)
  }

  const goBackFunc = () => {
    //check which button has a style of none
    const signUpGone = document.getElementById('signuppre')
    const signInGone = document.getElementById('signinpre')

    if(signUpGone){
      if(signUpGone.style.display === 'none'){
        signUpGone.style.display = 'flex'
        setGoBack(true)
        setSignIn(true)
      }
    }
    if(signInGone){
      if(signInGone.style.display === 'none'){
        signInGone.style.display = 'flex'
        setGoBack(true)
        setSignUp(true)
      }
    }

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
          <button id ='signinpre' className='flex p-4 px-8 rounded-full w-48 shadow-lg bg-midnight duration-200 hover:opacity-80 text-center justify-center my-4' onClick={toggleSignIn}>Sign In</button>  
          </>: <SignIn></SignIn>}
       

        {signUp ?  <>
          <button id='signuppre' className='flex p-4 px-8 w-48 rounded-full shadow-lg bg-midnight duration-200 hover:opacity-80 justify-center' onClick={toggleSignUp}>Sign Up</button>
         </>: <SignUp></SignUp>}
         
          <span></span>

          {goBack ? '' : <button className='rounded-full shadow-lg p-4 px-8 bg-yellow' onClick={goBackFunc}>Go Back</button>}

          <span></span>
         
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
