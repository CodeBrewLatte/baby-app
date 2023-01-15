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

const SignIn = () => {
    //declare variables

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loginError, setLoginError] = useState('')
    const router = useRouter()

    const loginAttempt = async (e) =>{
        e.preventDefault()
        setIsSubmitting(true)
        console.log('email is', email)
        console.log('password is', password)
        const data = {email: email, password: password}
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                console.log('success should reroute to dash', data)
                router.push('/dashboard')
              } else {
                setLoginError('the username/password is incorrect')
                setIsSubmitting(false)
                console.log(data)
              }
            })
    }

    return(
        <Container style={{backgroundColor: "white"}} maxWidth="sm">
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
       onSubmit={loginAttempt}
        >
        <Grid container spacing={2} sx={{textAlign: 'center', padding: '20px'}}>
        <Grid item xs = {12}>
        <TextField sx={{input: {color: 'black'}}} onChange={e => setEmail(e.target.value)} id="standard-basic" label="email" variant="standard" />
        </Grid>
        <Grid item xs = {12}>
        <TextField sx={{input: {color: 'black'}}} onChange={e => setPassword(e.target.value)} id="standard-basic" label="password" type="password" variant="standard" />
        </Grid>
        <Grid item xs = {12}>
          {isSubmitting ? <BeatLoader></BeatLoader> :  <Button type ='submit' variant="contained">Sign In</Button>}
          <div className=' text-bubble-gum'>{loginError}</div>
        </Grid>
        </Grid>
          </Box>
        </Container>
    )
}

export default SignIn