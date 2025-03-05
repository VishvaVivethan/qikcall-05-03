import { Container, Typography, Box, Grid, IconButton, Button, Divider, Link, TextField, Snackbar, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Cookies from 'js-cookie';
import Sign from '../../assets/img/image5.jpeg'
import Footer from '../footer';
import  Navbar  from '../navbar';













function Signin() {

  // const [value, setValue] = useState('');
  const [open, setOpen] = React.useState(false);
  const [clickOpen, setClickOpen] = React.useState(false);
  const [registeropen, setRegisteropen] = React.useState(false);
  // const [validated, setValidated] = useState(false);
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();





  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlesignin = () => {
    try {
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

            setOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");
            setTimeout(() => {
              navigate('/');
            }, "1000");

          } else if (result.status_code === 400) {
            setOpen(true);
            setColor('error');
            setMsg(result.data.msg);

          } else if (result.status_code === 401) {
            // Handle unauthorized access
            setOpen(true);
            setColor('error');
            setMsg("Unauthorized access");
          }
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.error(error)
      setOpen(true);
      setColor('error');
      setMsg(error.response.data.message || 'An Error Occured');
    }
  }

  const sendEmail = ()=>{
    try{
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": email
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/verifyemail", requestOptions)
.then(async (response) => {
  if (response.status === 200 || response.status === 400) {
    return { status_code: response.status, data: await response.json() };
  } else {
    return { status_code: response.status, data: { msg: 'Unexpected Error' } };
  }
})
.then((result) => {
  if (result.status_code === 200) {

    console.log(result,"email result")
    setOpen(true);
    setColor('success');
    setMsg(result.data.message);
  } else if (result.status_code === 400) {
    setOpen(true);
    setColor('error');
    setMsg(result.data.message);
  }
})
.catch(error => console.log('error', error));

    }catch(error){
      console.error(error)
    }
  }

  


  const handleRegisterOpen = () => {
    setRegisteropen(true);
  };

  const handleRegisterClose = () => {
    setRegisteropen(false);
  };

  const handleClickOpen = () => {
    setClickOpen(true);
  };

  const handleClickClose = () => {
    setClickOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffe0',
    ...theme.typography.body2,
    border: "1px solid #2d2859  ",
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#000",
    width: "100%",

  }));

  const navigateuser = () => {
    navigate("/registeruser");
  };

  const navigatebusiness = () => {
    navigate("/registerbusiness");
  };

  const navigatefreelancer = () => {
    navigate("/registerfreelancer");
  };


  const BackHome = () => {
    navigate("/")
  }



  return (
    <>
      {isMobile ? (
        <>
            <Container>
            <Grid mt={2} mb={2} xs={12} container direction="row" justifyContent="center" alignItems="center" sx={{ borderRadius: "20px" }}>
  <Grid 
    xs={12} sm={8} // xs for mobile, sm for tablets and up
    container 
    direction="column" 
    justifyContent="space-evenly" 
    alignItems="center" 
  >
    <Item>
      <Typography 
        sx={{ 
          fontSize: { xs: "35px", sm: "55px" }, // Adjust font size for mobile
          fontWeight: "bold" 
        }} 
      >
        Sign in
      </Typography>
      <Typography 
        sx={{ 
          fontSize: { xs: "18px", sm: "25px" }, // Adjust font size for mobile
          fontWeight: "bold" 
        }}
      >
        log into your account
      </Typography>
      <br />

      <Typography className='mt-3' sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
        To login, please enter your registerd email id
      </Typography>

      <TextField
        placeholder='Enter your email id'
        className='mt-4'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        // inputProps={{ maxLength: 10 }}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '20px',
            width: { xs: "250px", sm: "380px" }, 
            height: "60px"
          },
        }}
      />

      <Typography className='mt-4' sx={{ fontSize: { xs: "10px", sm: "10px" } }}>
        This will allow us to verify your identity and grant
      </Typography>
      <Typography className='mt-1' sx={{ fontSize: { xs: "10px", sm: "10px" } }}>
        you access to your account. If you encounter any
      </Typography>
      <Typography className='mt-1' sx={{ fontSize: { xs: "10px", sm: "10px" } }}>
        issues or need assistance, don't hesitate to reach out to our support team.
      </Typography>

      <Grid mt={5} mb={5} container direction="column" justifyContent="center" alignItems="center">
        <Button 
          sx={{ 
            fontSize: "13px", 
            fontWeight: "bold", 
            backgroundColor: "#2d2859", 
            color: "#fff", 
            borderRadius: "12px", 
            width: { xs: "230px", sm: "330px" }, // Adjust width for mobile
            height: "50px", 
            "&:hover": { backgroundColor: "#2d2859" } 
          }}  
          onClick={()=>{
            sendEmail()
          }}
        >
         Verify by your email
        </Button>

        <Typography className='mt-3' sx={{ fontSize: "10px", fontWeight: "bold" }}>
          Create a new account,  
          <Link onClick={handleRegisterOpen} sx={{ color: "#C052E3", textDecoration: "none", cursor: "pointer" }}> register here</Link>
        </Typography>
      </Grid>

      <Grid mb={5} container direction="row" justifyContent="space-around" alignItems="center" >
        <Button 
          onClick={BackHome} 
          variant='contained' 
          sx={{ 
            backgroundColor: "#2d2859", 
            color: "#fff", 
            fontSize:"10px",
            "&:hover": { backgroundColor: "#2d2859" } 
          }}
        >
          Back
        </Button>
        <Button 
          variant='contained' 
          sx={{ 
            backgroundColor: "#2d2859", 
            color: "#fff", 
            fontSize:"10px",
            "&:hover": { backgroundColor: "#2d2859" } 
          }} 
          onClick={handleClickOpen} 
        >
          Try another way
        </Button>
      </Grid>
    </Item>
  </Grid>
</Grid>
            </Container>


        </>
      ) : (
        <>
        <Navbar/>
          <Container>
            <Grid mt={2} mb={2} xs={12} container direction="row" justifyContent="space-evenly" alignItems="center" sx={{ borderRadius: "20px" }}>

              <Grid xs={8} container direction="column" justifyContent="space-evenly" alignItems="center" >
                <Item>
                  <Typography sx={{ fontSize: "55px", fontWeight: "bold" }} >Sign in</Typography>
                  <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>log into your account</Typography><br />

                  <Typography className='mt-3' sx={{ fontSize: "20px", }}>To,Login please enter your registered email id</Typography>
                  <TextField
                    placeholder='Enter your email id'
                    className='mt-4'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    // inputProps={{ maxLength: 10 }} 
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: '20px',
                        width: "380px",
                        height: "60px"
                      },
                    }}
                  />
                  <Typography className='mt-4' sx={{ fontSize: "10px", }}>This will allow us to verify your identity and grant</Typography>
                  <Typography className='mt-1' sx={{ fontSize: "10px", }}> you acess to your account, if you encounter any</Typography>
                  <Typography className='mt-1' sx={{ fontSize: "10px", }}>issues or need any assistance,don't hesitate to reach out our support team</Typography>

                  <Grid mt={5} mb={5} container direction="column" justifyContent="center" alignItems="center">
                    <Button onClick={()=>{
                      sendEmail()
                    }} sx={{ fontSize: "16px", fontWeight: "bold", backgroundColor: "#2d2859", color: "#fff", borderRadius: "12px", width: "330px", height: "50px", "&:hover": { backgroundColor: "#2d2859" } }}  >
                     Verify by your Email
                    </Button>
                    <Typography className='mt-3' sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      Create a new account,  <Link onClick={handleRegisterOpen} sx={{ color: "#C052E3", textDecoration: "none", cursor: "pointer" }}> register here</Link>
                    </Typography>
                  </Grid>
                  <Grid mb={5} container direction="row" justifyContent="space-around" alignItems="center" >
                    <Button onClick={BackHome} variant='contained' sx={{ backgroundColor: "#2d2859", color: "#fff", "&:hover": { backgroundColor: "#2d2859" } }}>
                      Back
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: "#2d2859", color: "#fff", "&:hover": { backgroundColor: "#2d2859" } }} onClick={handleClickOpen} >
                      Try another way
                    </Button>
                  </Grid>

                </Item>
              </Grid>

              {/* <Grid xs={4}>
                   <img src={Sign} alt='' width="100%" height="520px" />
                </Grid> */}

            </Grid>
          </Container>
        </>)}
        <Dialog
  open={clickOpen}
  onClose={handleClickClose}
  aria-labelledby="responsive-dialog-title"
  sx={{
    '& .MuiDialog-paper': {
      width: '90%',  // Responsive width
      maxWidth: '600px', // Max width for larger screens
      margin: 'auto', // Centering the dialog
    },
  }}
>
  <DialogTitle id="responsive-dialog-title" sx={{ backgroundColor: "#2d2859", padding: "16px" }}>
  
  </DialogTitle>
  <DialogContent sx={{ width: "100%", backgroundColor: "#2d2859", padding: "20px" }}>
  <Typography className='mt-4' align='center' sx={{ fontSize: "30px", color: "#fff" }}>Log into your Account</Typography>
      <Grid container direction="column" justifyContent="space-evenly" alignItems="center" >
        <Grid className="mt-2">
          <TextField
            placeholder='Enter your number'
            className='mt-4'
            value={number}
            onChange={(e) => {
              setNumber(e.target.value)
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '5px',
                width: "100%",  // Full width on mobile
                maxWidth: "350px",
                height: "50px",
                color: "#fff",
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
            }}
          />
        </Grid>
        <Grid className="mb-3 mt-4">
          <TextField
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            inputProps={{ color: "#fff" }} // Ensure the maximum length is 10
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '5px',
                width: "100%",  // Full width on mobile
                maxWidth: "350px",
                height: "50px",
                color: "#fff",
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
            }}
          />
        </Grid>
        <Button
          variant="contained"
          type="submit"
          className="mt-2"
          onClick={() => {
            if (!number) {
              setOpen(true);
              setColor('error');
              setMsg('Phone Number required');
              return;
            }
            if (number.length !== 10) {
              setOpen(true);
              setColor('error');
              setMsg('Phone Number must have 10 digits');
              return;
            }
            if (!password) {
              setOpen(true);
              setColor('error');
              setMsg('Password required');
              return;
            }

            handlesignin();
          }}
          sx={{ backgroundColor: "#f7f4cd", color: "#000", "&:hover": { backgroundColor: "#f7f4cd" } }}
        >
          Log In
        </Button>
        <Typography sx={{ color: "#fff", fontSize: "10px", cursor: "pointer" }} className="mt-2">
          Forget your password?
        </Typography>
      </Grid>
      <Grid mt={3} mb={3} container direction="column" justifyContent="center" alignItems="center">
      <Button
        variant="primary"
        className="d-flex align-items-center mb-3"
        sx={{ backgroundColor: "#0f40aa", width: "100%", maxWidth: "300px", "&:hover": { backgroundColor: "#0f40aa" } }}
      >
        <span className="text-center text-white">
          <FacebookIcon sx={{ marginRight: "5px" }} /> Continue with Facebook
        </span>
      </Button>
      <Button
        variant="danger"
        className="ezy__signin1_gDWjZETr-btn d-flex align-items-center mb-3"
        sx={{ backgroundColor: "#a02d2d", width: "100%", maxWidth: "300px", "&:hover": { backgroundColor: "#a02d2d" } }}
      >
        <span className="text-center text-white">
          <GoogleIcon sx={{ marginRight: "5px" }} /> Continue with Google
        </span>
      </Button>
      <Grid container direction="column" justifyContent="center" alignItems="flex-end">
        <Button sx={{ backgroundColor: "#f7f4cd", color: "#000", "&:hover": { backgroundColor: "#f7f4cd" } }} onClick={handleClickClose} >
          Close
        </Button>
      </Grid>
    </Grid>
    
  </DialogContent>
</Dialog>

<Dialog
  open={registeropen}
  onClose={handleRegisterClose}
  aria-labelledby="responsive-dialog-title"
  sx={{
    '& .MuiDialog-paper': {
      width: '90%',  // Responsive width
      maxWidth: '600px', // Max width for larger screens
      margin: 'auto', // Centering the dialog
    },
  }}
>
  <DialogTitle id="responsive-dialog-title" sx={{ backgroundColor: "#2d2859", padding: "16px" }}>
    <Typography sx={{ fontSize: "30px", color: "#fff" }}>Register Here !</Typography>
    <Typography sx={{ fontSize: "10px", color: "#fff" }}>Click your role</Typography>
  </DialogTitle>
  <DialogContent sx={{ width: "100%", backgroundColor: "#2d2859", padding: "20px" }}>
    <DialogContentText>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Item onClick={navigateuser} className='mb-3 mt-4'>
          <Typography sx={{ fontSize: "22px" }}><PersonIcon sx={{ fontSize: "25px" }} /> User Registration </Typography>
        </Item>
        <Item onClick={navigatebusiness} className='mb-3'>
          <Typography sx={{ fontSize: "22px" }}><StoreIcon sx={{ fontSize: "25px" }} /> Business Registration </Typography>
        </Item>
        <Item onClick={navigatefreelancer} className='mb-3'>
          <Typography sx={{ fontSize: "22px" }}><PersonOutlineIcon sx={{ fontSize: "25px" }} /> Freelancer Registration </Typography>
        </Item>
      </Grid>
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{ backgroundColor: "#2d2859", padding: "16px" }}>
    <Button sx={{ color: "#fff" }} onClick={handleRegisterClose}>
      Close
    </Button>
  </DialogActions>
</Dialog>
<Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
<Alert
  onClose={handleClose}
  severity={color}
  variant="filled"
  sx={{ width: '100%' }}
>
  {msg}
</Alert>
</Snackbar>
<Footer/>
    </>
  )
}

export default Signin