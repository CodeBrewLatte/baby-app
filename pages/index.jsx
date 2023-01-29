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

      <section class="w-full flex items-center justify-center bg-purple-500 sm:h-72 h-auto sm:flex-row flex-col py-6">
  <span class="w-56 bg-white rounded-lg p-6 text-center items-center h-64 flex flex-col sm:mx-4 sm:my-5 py-2 my-3">
    <img id="bottle" class="w-20 p-2" src="/report.png" alt="graph"/>
    <h3 class="font-bold text-xl">Track Baby Activities</h3>
    <p class="text-base">Our app allows you to track common activities like poop, feeding, and more</p>
  </span>

  <span class="w-56 bg-white rounded-lg p-6 text-center items-center h-64 flex flex-col sm:mx-4 sm:my-5 py-2 my-3">
    <img id="bottle" class="w-20 p-2" src="/pencil.png" alt="pencil"/>
    <h3 class="font-bold text-xl">Add notes to events</h3>
    <p class="text-base">You can keep notes on activities, for example if your baby had a runny poop</p>
  </span>

  <span class="w-56 bg-white rounded-lg p-6 text-center items-center h-64 flex flex-col sm:mx-4 sm:my-5 py-2 my-3">
    <img id="bottle" class="w-20 p-2" src="/bottle.png" alt="bottle"/>
    <h3 class="font-bold text-xl">Search for activities</h3>
    <p class="text-base">Use a search function to find specific events</p>
  </span>
</section>

<div className="flex p-6 h-auto rounded-md bg-tahiti ">
  <img src="cute.jpg" alt="example" className="w-64 sm:w-96 h-96 m-6 sm:m-0"/>
  <div className="text-left sm:text-center ml-6">
    <section className=' bg-white shadow-lg z-10 rounded p-5'>
    <h3 className="text-2xl font-bold">Tracking made easy</h3>
    <p className="text-lg mt-2 text-left">
    Welcome to our baby tracking web app! This app is designed to make life easier for new parents by allowing you to keep track of all your babys important activities such as when they poop, eat, sleep, and more. With just a few clicks, you can easily track and monitor your babys growth and development. Whether you are on the go or at home, you can access our app from any device.
</p>
<br></br>
<p className="text-lg mt-2 text-left">
Our user-friendly interface makes it easy to add new events and view past ones, so you will never forget a single detail about your babys day. Plus, with the option to add notes to each event, you can keep a running log of important information that you may need later.
</p>
<br></br>
<p className="text-lg mt-2 text-left">
Don't wait, sign up today to start taking advantage of our baby tracking app and simplify your life as a new parent. Start tracking your babys progress and enjoy peace of mind knowing you have all their important information in one place!
    </p>
    </section>
  </div>
</div>


       
         <h4 className='text-white text-center py-5'>An App by Steve Benner</h4>

       
     
    </div>
  )
}
