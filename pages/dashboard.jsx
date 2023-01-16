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
  const [identifier,setIdentifier] = useState([])
  let trashCans = useRef(null)
  let passedValue = useRef(null)
  let count = 0

  const dropPopup = () => {
    setPopUp(false)
  }

  useEffect(() => {
    const buttons = document.querySelectorAll('img.mainimg');

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
      const newitems = []
      if(!added){
      const table = document.querySelector('table');
      const reversed = final.name.entries.reverse()
        reversed.forEach(item => {
          newitems.push(item)
          
          const row = document.createElement('tr');
          
          const dateString = item.date
          const year = dateString.slice(0, 4);
          const month = dateString.slice(5, 7);
          const day = dateString.slice(8, 10);
          
          // Create a new Date object from the date string
          const date = new Date(dateString);
          
          // Get the hour from the Date object
          const hour = date.getHours();
          
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
          <td> <img class="w-6 cursor-pointer trash" id='${count}' src="trash.png"></td>
          `;
          count++
          table.appendChild(row);
        });
        console.log('new items', newitems)
        setIdentifier([...newitems])
        setAdded(true)
      }
     
    }).then(async trashed => {
      trashCans = document.querySelectorAll('img.trash')
      trashCans.forEach(trash => {
        trash.addEventListener('click', event => {
          let arrayId = trash.id
          let verifiedDate = { date: identifier[arrayId]}
          console.log('hi im ', trash)
          console.log(identifier)
          console.log('the date should be', identifier[arrayId])

          try {
            fetch(`/api/createlog`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(verifiedDate)
            }).then(response => response.json())
            .then(data => location.reload())
          } catch (error) {
            
          }

        })
      })
    })
    .catch(
      error => console.log(error)
    )
    
   

  }, [identifier]);

 
  
  

  return (
    <div className={styles.container}>
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
          <img id='bottle' className='w-20 p-2 cursor-pointer mainimg' src='/bottle.png' alt='bottle'/>
        </div>
        <div>
          <img id='poop' className='w-20 p-2 cursor-pointer mainimg' src='/poop.png' alt='poop'/>
        </div>
        <div>
          <img id='sleep' className='w-20 p-2 cursor-pointer mainimg' src='/sleep.png' alt='sleep'/>
        </div>
        <div>
          <img id='change'  className='w-20 p-2 cursor-pointer mainimg' src='/change.png' alt='change'/>
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
      <th>Delete</th>
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