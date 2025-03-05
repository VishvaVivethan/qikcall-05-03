import React, { useState, useEffect } from 'react';
import {Button,Grid,Card,Typography,TextField,Link,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Cookies from 'js-cookie';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffe0',
    ...theme.typography.body2,
    border:"1px solid #2d2859  ",
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#000",
    width:"100%",
   
  }));

export default function LoginDialog() {

    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const [registeropen, setRegisteropen] = React.useState(false);
    const navigate = useNavigate();

    const navigateuser = () => {
        navigate("/registeruser");
      };
    
      const navigatebusiness = () => {
        navigate("/registerbusiness");
      };
    
      const navigatefreelancer = () => {
        navigate("/registerfreelancer");
      };

      const handleRegisterOpen = () => {
        setRegisteropen(true);
      };
    
      const handleRegisterClose = () => {
        setRegisteropen(false);
      };
    
  


    const handlesignin = () =>{
        try{
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          const raw = JSON.stringify({
            "phonenumber": number,
            "password": password
          });
          
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };
          
          fetch("/api/login", requestOptions)
          .then(async (response) => {
            if (response.status === 200 || response.status === 400) {
                return { status_code: response.status, data: await response.json() };
            } else {
                return { status_code: response.status, data: { msg: 'Unexpected Error' } };
            }
        })
        .then((result) => {
            if (result.status_code === 200) {
                console.log(result.data.token, " Sign in Token stored");
                const token = result.data.token;
                Cookies.set('token', token, { expires: 7, secure: true });
                window.location.reload()
                // setOpen(true);
                // setColor('success');
                // setMsg(result.data.msg || "Register Success");
                // setTimeout(() => {
                //   navigate('/');
                // }, "1000");
    
            } else if (result.status_code === 400) {
                // setOpen(true);
                // setColor('error');
                // setMsg(result.data.msg);
    
            } else if (result.status_code === 401) {
                // Handle unauthorized access
                // setOpen(true);
                // setColor('error');
                // setMsg("Unauthorized access");
            }
        })
          .catch(error => console.log('error', error));
          
            }catch(error){
              console.error(error)
            //   setOpen(true);
            //   setColor('error');
            //   setMsg(error.response.data.message||'An Error Occured');
            }
      }
      

  return (
    <React.Fragment>
      <Grid>
       
      <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
  sx={{
    backgroundColor: "#f7f8fc",
    borderRadius: 2,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    margin: "auto"
  }}
>
  <Grid item>
    <Typography sx={{ fontSize: "24px", color: "#333", fontWeight: "bold", textAlign: "center", mb: 3 }}>
      Welcome Back
    </Typography>
  </Grid>

  <Grid item>
    <TextField
      placeholder="Phone Number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      variant="outlined"
      sx={{
        width: "100%",
        marginBottom: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ddd",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aaa",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#333",
        },
      }}
    />
  </Grid>

  <Grid item>
    <TextField
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      variant="outlined"
      sx={{
        width: "100%",
        marginBottom: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ddd",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aaa",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#333",
        },
      }}
    />
  </Grid>

  <Grid item>
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "100%",
        height: "50px",
        borderRadius: "8px",
        backgroundColor: "#4CAF50",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: "#43A047",
        }
      }}
      onClick={handlesignin}
    >
      Log In
    </Button>
  </Grid>

  <Grid item>
    <Typography
      sx={{
        fontSize: "14px",
        color: "#FF5252",
        textAlign: "center",
        marginTop: "15px",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      // onClick={handlePasswordReset}
    >
      Forgot your password?
    </Typography>
  </Grid>

  <Grid item>
    <Typography sx={{ fontSize: "14px", color: "#555", textAlign: "center", mt: 2 }}>
      Don't have an account?
      <Link
        onClick={handleRegisterOpen}
        sx={{
          color: "#4CAF50",
          textDecoration: "none",
          fontWeight: "bold",
          marginLeft: "5px",
          cursor: "pointer",
        }}
      >
        Register here
      </Link>
    </Typography>
  </Grid>
</Grid>

       
          <Dialog
          open={registeropen}
          onClose={handleRegisterClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" sx={{backgroundColor:"#2d2859"}}>
            <Typography sx={{fontSize:"30px",color:"#fff"}}>Register Here !</Typography>
            <Typography sx={{fontSize:"10px",color:"#fff"}}>click your role</Typography>
          </DialogTitle>
          <DialogContent sx={{width:"600px",backgroundColor:"#2d2859"}} >
            <DialogContentText>
             <Grid container direction="column" justifyContent="center" alignItems="center">
             <Item onClick={navigateuser} className='mb-3 mt-4'>
              <Typography  sx={{fontSize:"22px"}}><PersonIcon sx={{fontSize:"25px"}}/> User Registration </Typography>
             </Item>
             <Item onClick={navigatebusiness} className='mb-3'>
              <Typography  sx={{fontSize:"22px"}}><StoreIcon sx={{fontSize:"25px"}}/> Business Registration </Typography>
             </Item>
             <Item onClick={navigatefreelancer} className='mb-3'>
              <Typography   sx={{fontSize:"22px"}}><PersonOutlineIcon sx={{fontSize:"25px"}}/> Freelancer Registration </Typography>
             </Item>
             </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{backgroundColor:"#2d2859"}}>
            {/* <Button autoFocus onClick={handleRegisterClose}>
              Disagree
            </Button> */}
            <Button sx={{color:"#fff"}} onClick={handleRegisterClose} >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}