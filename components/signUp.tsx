import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SignUp = () => {
  const submitPassword = async (e: any) => {
    e.preventDefault();
    console.log(e.target);

    const userInputValue: string = e.target.elements.user.value;
    const passInputValue: string = e.target.elements.pass.value;

    const data = {
      username: userInputValue,
      password: passInputValue,
    };

    const response = await fetch("/api/userhandler", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
    <div>
    <TextField id="standard-basic" label="Standard" variant="standard" />
      </div>
      </Box>



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
