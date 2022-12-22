import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useRef, useState, useEffect } from 'react';

const SignUp = () => {

  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [baby,setBaby] = useState('')
  const [errorLog, setErrorLog] = useState([])
  let errorDom;

  //log elements to the DOM
  if(errorLog.length > 0) {errorDom = errorLog[0].map((element,i) => <li key={i} style={{color: "red"}}>{element}</li>)}



  //function to check common errors and return errors to screen
  const validateEntries = (email,username,password,baby) => {
    if(errorLog.length > 0) setErrorLog([])
    const errors = [];

  if (username.length === 0) {
    errors.push("Username can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 characters long");
  }
  if (email.split("").filter((x) => x === "@").length !== 1) {
    errors.push("Email should contain an @ symbol");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  if(errors.length === 0) return setErrorLog([])

  return setErrorLog(old => [...old, errors])
  }

  
  const userSignUp = async (e) => {
    e.preventDefault()
    //first we check the passed in values to confirm no errors
    const errorHolder = validateEntries(email,username,password,baby)
    if(errorLog.length > 0) return console.log('error hit ->', errorLog)
    //if no errors were ok to proceed
    const data = {email: email, username : username, password: password, baby:baby}
    console.log('the string!!', JSON.stringify(email))
    //make a POST request to /api/userhandler
    const response = await fetch('/api/userhandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Router.push('/');
        } else {
          console.log('error --> ', data)
        }
      });
    //make cookies for the user to post as their sessionId
    
  }

  return (
    <Container style={{backgroundColor: "white"}} maxWidth="sm">
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' }
    }}
    noValidate
    autoComplete="off"
   onSubmit={userSignUp}
    >
    <Grid container spacing={2} sx={{textAlign: 'center', padding: '20px'}}>
    <Grid item xs = {12}>
    <TextField sx={{input: {color: 'black'}}} onChange={e => setEmail(e.target.value)} id="standard-basic" label="email" type="email" variant="standard" />
    </Grid>
      <Grid item xs = {12}>
    <TextField sx={{input: {color: 'black'}}} onChange={e => setUsername(e.target.value)} id="standard-basic" label="username" variant="standard" />
    </Grid>
    <Grid item xs = {12}>
    <TextField sx={{input: {color: 'black'}}} onChange={e => setPassword(e.target.value)} id="standard-basic" label="password" type="password" variant="standard" />
    </Grid>
    <Grid item xs = {12}>
    <TextField sx={{input: {color: 'black'}}} onChange={e => setBaby(e.target.value)} id="standard-basic" label="baby" variant="standard" />
    </Grid>
    <Grid item xs = {12}>
    <Button type ='submit' variant="contained">Sign Up</Button>
    </Grid>
    </Grid>
      </Box>
      {<ul>{errorDom}</ul>}
    </Container>
    // <div className={styles.flexcl}>
    // <form onSubmit={submitPassword} className={styles.flexcl}>
    //   <input type="text" name="user" placeholder="Username" />
    //   <input type="password" name="pass" placeholder="Password" />
    //   <button type="submit">Submit</button>
    // </form>
    // </div>
  );
};

export default SignUp;
