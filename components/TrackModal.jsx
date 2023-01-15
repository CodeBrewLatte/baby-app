import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useRef, useState, useEffect, use } from 'react';
import Router, { useRouter } from "next/router";
import { BeatLoader } from 'react-spinners';

const TrackModal = (props) => {
    //declare variables
    const [note, setNote] = useState('')

    const updateLog = (e) => {
      e.preventDefault()
      const payload = {
        click : props.buttonType.click,
        note : note
      }

      console.log('payload is', payload)

      fetch('/api/createlog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(response => console.log(response));

    }

    

    return(
       // <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
  
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <img src='close.png' alt='close' className='w-4 absolute top-2 right-2 cursor-pointer' onClick={props.removeModal}/>
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{props.buttonType.click}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Optional: Add Note Below</p>
                
                <input type='text'></input>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
       onSubmit={updateLog}
        >
                <TextField sx={{input: {color: 'black'}}} id="standard-basic" label="note(optional)" variant="standard" onChange={e => setNote(e.target.value)} />
          <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Track</button>
         </Box>
        </div>
      </div>
    </div>
  </div>
    )
}

export default TrackModal