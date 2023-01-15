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
    <div className=' bg-metal'>
      <Head>
        <title>Baby-Up - Homepage</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* Hero Section */}
      <main className=' flex justify-center max-w-8xl mx-auto text-center px-10 pt-16 bg-baby-bg'>
        <section className='shadow-lg bg-white w-11/12 sm:w-6/12 h-150 rounded-lg py-7 mb-12'>
          
        <h2 className='text-4xl font-sans '>
          Baby App
        </h2>
        <p className='font-sans pt-10 px-5'> A simple way to keep track of daily baby activites. </p>

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

       
        </section>

       
      </main>

     <section className=' w-full flex h-auto sm:h-96 items-center justify-between bg-purple flex-col sm:flex-row'>

      <span className='flex flex-col w-56 bg-white rounded-md p-2 mx-4 my-5 text-center items-center'>
      <img id='bottle' className='w-20 p-2' src='/report.png' alt='graph'/>
        <h3 className=' flex font-bold'>Track Baby Activities</h3>
        <p> Our application allows you to track common activites like poop, feeding and more </p>
      </span>

      <span className='flex flex-col w-56 bg-white rounded-md p-2 mx-4 my-5 text-center items-center'>
      <img id='bottle' className='w-20 p-2' src='/pencil.png' alt='pencil'/>
      <h3 className=' font-bold'>Add notes to events</h3>
      <p className=' font-light'>In addition to tracking, you can keep notes on certain activites, so if your baby had a runny poop you can document that for example</p>
      </span>

      <span className='flex flex-col w-56 bg-white rounded-md p-2 mx-4 my-5 text-center items-center'>
      <img id='bottle' className='w-20 p-2' src='/bottle.png' alt='bottle'/>
      <h3 className=' font-bold'>Search for activites </h3>
      <p> In the event that you need to search for a certain event you can use a search functionality to check on certain types of events</p>
      </span>


     </section>
       
         <h4 className='text-white text-center py-5'>An App by Steve Benner</h4>

       
     
    </div>
  )
}
