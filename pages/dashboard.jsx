import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import Router, { useRouter } from "next/router";
import TrackModal from '../components/TrackModal';


export default function Home() {

  const [user,setUser] = useState(null)
  const [baby,setBaby] = useState(null)
  const [added, setAdded] = useState(false)
  const router = useRouter()
  const [popUp, setPopUp] = useState(false)
  let passedValue = useRef(null)

  const dropPopup = () => {
    setPopUp(false)
  }

  useEffect(() => {
    const buttons = document.querySelectorAll('img');

    buttons.forEach(button => {
      button.addEventListener('click', event => {
        setPopUp(true)
        const clickedButton = event.target.id
        const payload = {click: clickedButton}
        passedValue.current = payload
        console.log('button click', payload)
        console.log(`Button with ID ${clickedButton} was clicked`);
      });
    });
  }, []);

 
  
  fetch('./api/userdata').then(
    response => response.json()
  ).then(
    data => {
      if(data.error == "undefined") router.push("/")
      setUser(data.name.username)
      setBaby(data.name.baby)
      return data
    }
    //data => setUser(data)
  ).then(final => {
    console.log('final data', final)
    if(!added){
    const table = document.querySelector('table');

      final.name.entries.forEach(item => {
        const row = document.createElement('tr');
        
        const dateString = item.date
        const year = dateString.slice(0, 4);
        const month = dateString.slice(5, 7);
        const day = dateString.slice(8, 10);
        
        // Create a new Date object from the date string
        const date = new Date(dateString);
        
        // Get the hour from the Date object
        const hour = date.getHours();

        console.log('im getting hours of', hour)
        
        let hour12;
        let ampm;
        
        // Determine whether the time is AM or PM
        if (hour < 12) {
          hour12 = hour;
          ampm = 'AM';
        } else {
          if(hour === 12) hour12 = hour
          else hour12 = hour - 12;
          ampm = 'PM';
        }
        
        const minute = dateString.slice(14, 16);
        
        const formattedDate = `${month}/${day}/${year} ${hour12}:${minute} ${ampm}`;


        // const hour = date.slice(11, 13);
        // const minute = date.slice(14, 16);    
        // const formattedDate = `${month}/${day}/${year} ${hour}:${minute}`;

        row.innerHTML = `
          <td class="w-32">${item.value}</td>
          <td class="w-40">${formattedDate}</td>
          <td class="w-32">${item.note || ""}</td>
        `;
        table.appendChild(row);
      });
      setAdded(true)
    }
  })
  .catch(
    error => console.log(error)
  )
  
  

  return (
    <div className={popUp ?  'bg-black opacity-50': styles.container}>
      <Head>
        <title>About Us</title>
       
        <meta name="description" content="Baby Living Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       
          {user ? <p>Hello there {user}</p> : <p>Loading...</p>}
          {popUp ? <TrackModal removeModal={dropPopup} buttonType={passedValue.current}/> : <div></div> }
      

        <div className='rounded shadow-md p-2 bg-white flex flex-row'>
        <div>
          <img id='bottle' className='w-20 p-2 cursor-pointer' src='/bottle.png' alt='bottle'/>
        </div>
        <div>
          <img id='poop' className='w-20 p-2 cursor-pointer' src='/poop.png' alt='poop'/>
        </div>
        <div>
          <img id='sleep' className='w-20 p-2 cursor-pointer' src='/sleep.png' alt='sleep'/>
        </div>
        <div>
          <img id='change'  className='w-20 p-2 cursor-pointer' src='/change.png' alt='change'/>
        </div>
        </div>


        <div className='py-5'>
          <h2 className='text-center py-5'>History for Baby {baby} </h2>
          <table className="w-full">
  <thead className='bg-gray-50 border-b-2 border-gray-200'>
    <tr>
      <th>Event</th>
      <th>Last Time</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    {/* insert here */}
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