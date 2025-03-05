import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField,Button,Snackbar,Alert,Checkbox,Link,useMediaQuery, useTheme,Autocomplete, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdHome } from "react-icons/io";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import person from '../../assets/img/manup.png'
import NavBar from '../navbar';
import Footer from '../footer';
// import NavBar from '../navbar';
// import Footer from '../footer';

function UserRegistration()  {

   const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
// const [landmark, setLandmark] = useState('');
const [city, setCity] = useState('');
const [pincode, setPincode] = useState('');
const [state, setState] = useState('');
    const [color, setColor] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogopen, setDialogopen] = useState(false);
    const [msg, setMsg] = useState('');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // useEffect(() => {
    //     const savedToken = Cookies.get('token');
    //     if (savedToken) {
    //         navigate('/'); 
    //     }
    // }, [navigate]);

    const handlehome=()=>{
      navigate("/")
    }


    const handleRegister = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const raw = JSON.stringify({
                "username": name,
                "email": email,
                "password": password,
                "phonenumber": phonenumber,
                "addressline1": addressLine1,
  "addressline2": addressLine2,
  "city": city,
  "pincode": pincode,
  "state": state,
                "role":"customer"
            });
    
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
    
            fetch("/api/register", requestOptions)
                .then(async (response) => {
                    if (response.status === 200 || response.status === 400) {
                        return { status_code: response.status, data: await response.json() };
                    } else {
                        return { status_code: response.status, data: { msg: 'Unexpected Error' } };
                    }
                })
                .then((result) => {
                    if (result.status_code === 200) {
                        console.log(result.data.token, "Token stored");
    
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
                .catch((error) => {
                    console.error(error);
                    setOpen(true);
                    setColor('error');
                    setMsg(error.response?.data?.message || 'An Error Occurred');
                });
    
        } catch (error) {
            console.error(error);
            setOpen(true);
            setColor('error');
            setMsg(error.message || 'An Error Occurred');
        }
    };
    
    const handleClickOpen = () => {
        setDialogopen(true);
      };

      const handleClickClose = () => {
        setDialogopen(false);
      };
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const handleValidation = (event) => {
        const { value } = event.target;
        // Allow only digits and ensure length is exactly 10 digits
        if (/^\d{0,10}$/.test(value)) {
          setValue(value);
        }
      };

      const [checked, setChecked] = React.useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [term, setTerm] = useState(false);
const [scroll, setScroll] = useState('paper');

const TermsOpen = (scrollType) =>()=> {
  setTerm(true);
  setScroll(scrollType);
};

const CloseTerms = () => {
  setTerm(false);
};
const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (term) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [term]);

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

  const [pincodedata, setPincodedata] = useState([]);
  // const [text, setText] = useState('');

  console.log(pincodedata,pincode, "Pincode")

  const pincodeDetails = () => {
    if (!pincode) return; // Ensure pincode is not empty

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200 && data[0].Status === 'Success') {
          setPincodedata(data[0].PostOffice || []);
        } else {
          setPincodedata([]);
        }
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    if (pincode.length === 6) {
      pincodeDetails();
    }
  }, [pincode]);

  useEffect(() => {
    if (pincodedata.length > 0) {
      // Assuming the first result is what we need
      const postOffice = pincodedata[0];
      setCity(postOffice.District || '');
      setState(postOffice.State || '');
    }
  }, [pincodedata]);

  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError('Password must be 8-16 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const [errors, setErrors] = useState({});


  const validateStep = () => {
    let newErrors = {};
  
   
   
      if (!name) newErrors.name = "Name is required";
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
        if (!passwordRegex.test(password)) {
          newErrors.password = "Password must be 8-16 characters, contain uppercase, lowercase, number, and special character.";
        }
      }
      if (!phonenumber) {
        newErrors.phonenumber = "Phonenumber is required";
      } else if(!phonenumber.length===10) {
          newErrors.phonenumber = "Phone number must be 10 Digits";
      }
     
      if (!addressLine1) newErrors.addressLine1 = "Door No is required";
      if (!addressLine2) newErrors.addressLine2 = "Street/Area  is required";
      
      if (!city) newErrors.city = "City is required";
      if (!state) newErrors.state = "State is required";
      if (!pincode) newErrors.pincode = "Pincode is required";
   
  
   
  
    return newErrors;
  };

  

  const handleSave = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      handleRegister();
    }
  };
  
  
  return (
    <>
    {isMobile ? (
    <>
    <NavBar/>
    <Grid   container justifyContent="space-between" sx={{ height: 'auto',backgroundColor: '#2d2f6b' }}>
      {/* Left Section */}
      <Grid 
        item 
        xs={12} md={5.5} 
        sx={{ 
          backgroundColor: '#2d2f6b', 
          color: 'white', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 0 
        }}
      >
       
        <Typography className='mt-5' variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          User Registration
        </Typography>
        <Typography sx={{ maxWidth: 300, textAlign: 'center', marginBottom: 3,fontSize:"13px" }}>
          Becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.
        </Typography>
        {/* Placeholder for Image */}
        {/* <Box 
          component="img" 
          sx={{ 
            width: '80%', 
            height:"60%",
            maxWidth: 200, 
           
          }} 
          alt="Person Illustration" 
          src={person} // replace with actual image path
        /> */}
      </Grid>

      {/* Right Section */}
      <Grid 
        item 
        xs={12} md={6} 
        sx={{ 
          backgroundColor: '#f7f4cd', 
          padding: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start' 
        }}
      >
       <Grid mb={2}>
       <Typography variant="h4" align='center'  sx={{ fontWeight: 'bold', color: '#2d2f6b' }}>
          Personal Information
        </Typography>
       </Grid>

        {/* Progress Bar (Placeholder) */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: 10 
          }}
        >
          <Box sx={{ height: 5, width: '60%', backgroundColor: '#2d2f6b' }}></Box>
         
        </Box>

        {/* Form Fields */}
        <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: '' })); // Clear error on change
              }}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />
           <Tooltip title="Password must be 8-16 characters with at least one uppercase letter, one lowercase letter, one number, and one special character" placement="bottom">
           <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
            />
           </Tooltip>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
              fullWidth
              margin="normal"
            />
           
            <Typography sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2 }}>
              Address:
            </Typography>
            <TextField
              label="Door No"
              variant="outlined"
              value={addressLine1}
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine1(e.target.value)}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
            />
            <TextField
              label="Street/Colony"
              variant="outlined"
              fullWidth
              value={addressLine2}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine2(e.target.value)}
              error={!!errors.addressLine2}
              helperText={errors.addressLine2}
            />
           
             <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.city}
              helperText={errors.city}
            />
           
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              value={state}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setState(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.state}
              helperText={errors.state}
            />
         <Grid  container direction="row" justifyContent="flex-start" alignItems='center'>
                  
                  <Checkbox  
                   checked={checked}
    onChange={handleChange}
    /> <Typography onClick={TermsOpen('paper')}  style={{ color: '#2c2c4b' }}> 
                    Accept the <span style={{ color: 'skyblue',cursor:"pointer" }}>terms & Condition</span></Typography>
  
                 </Grid>
        <Grid mt={3} container
  direction="row"
  justifyContent="center"
  alignItems="center">
        <Button sx={{ backgroundColor: "#2d2859", fontSize: "15px", width: "200px","&:hover": { backgroundColor: "#4b487e" }  }} 
        variant='contained'
        onClick={()=> {
            
handleSave()

              if(!checked == true){
                setOpen(true);
                setColor('error');
                setMsg('Accept Condition');
                return
              }
              
              
        }}
        >
                    register
                    </Button>
        </Grid>
        <Typography className='mt-3' align='center' fontSize="15px">
            If you have already a account, 
            <Button onClick={handleClickOpen} >Sign in</Button>
        </Typography>
        <Grid >
                   <Typography className='mt-5' style={{ color: '#2c2c4b',fontSize:"20px" }}>What are Terms and Conditions Agreements?</Typography>
                   <Typography className='mt-3' style={{ color: '#2c2c4b' }}>
                     A Terms and Conditions agreement acts as a legal contract between you (the company) and the user.
                     It's where you maintain your rights to exclude users from your app in the event that they abuse your website/app,
                     set out the rules for using your service, and note other important details and disclaimers.
                   </Typography>
                  
                 </Grid>
                
               
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
    <Footer/>
    </>
):(
<>
<NavBar/>
<Grid mt={5}  container justifyContent="space-between" sx={{ height: 'auto' }}>
      {/* Left Section */}
      <Grid 
  item 
  xs={12} 
  md={5.5} 
  sx={{ 
    backgroundColor: '#2d2f6b', 
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 0, 
    position: 'relative' // Add relative positioning for child absolute positioning
  }}
>
  <Box 
    sx={{ 
      position: 'absolute', 
      top: 20, 
      left: 10 // Adjust values as needed
    }}
  >
    {/* <IoMdHome onClick={handlehome} size={24} />  */}
  </Box>
  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
    User Registration
  </Typography>
  <Typography variant="body1" sx={{ maxWidth: 300, textAlign: 'center', marginBottom: 3 }}>
    Becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.
  </Typography>
  {/* Placeholder for Image */}
  <Box 
    component="img" 
    sx={{ 
      width: '80%', 
      height:"60%",
      maxWidth: 200
    }} 
    alt="Person Illustration" 
    src={person} // replace with actual image path
  />
</Grid>


      {/* Right Section */}
      <Grid 
        item 
        xs={12} md={6} 
        sx={{ 
          backgroundColor: '#f7f4cd', 
          padding: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start' 
        }}
      >
       <Grid mb={2}>
       <Typography variant="h3" align='center'  sx={{ fontWeight: 'bold', color: '#2d2f6b' }}>
          Personal Information
        </Typography>
       </Grid>

        {/* Progress Bar (Placeholder) */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: 10 
          }}
        >
          <Box sx={{ height: 5, width: '60%', backgroundColor: '#2d2f6b' }}></Box>
         
        </Box>

        {/* Form Fields */}
        <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: '' })); // Clear error on change
              }}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />
           <Tooltip title="Password must be 8-16 characters with at least one uppercase letter, one lowercase letter, one number, and one special character" placement="bottom">
           <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
            />
           </Tooltip>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
              fullWidth
              margin="normal"
            />
           
            <Typography sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2 }}>
              Address:
            </Typography>
            <TextField
              label="Door No"
              variant="outlined"
              value={addressLine1}
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine1(e.target.value)}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
            />
            <TextField
              label="Street/Colony"
              variant="outlined"
              fullWidth
              value={addressLine2}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine2(e.target.value)}
              error={!!errors.addressLine2}
              helperText={errors.addressLine2}
            />
           
             <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.city}
              helperText={errors.city}
            />
           
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              value={state}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setState(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.state}
              helperText={errors.state}
            />
        
         <Grid  container direction="row" justifyContent="flex-start" alignItems='center'>
                  
                  <Checkbox  
                   checked={checked}
    onChange={handleChange}
    /> <Typography onClick={TermsOpen('paper')}  style={{ color: '#2c2c4b' }}> 
                    Accept the <span style={{ color: 'skyblue',cursor:"pointer" }}>terms & Condition</span></Typography>
  
                 </Grid>
        <Grid mt={3} container
  direction="row"
  justifyContent="center"
  alignItems="center">
        <Button 
  sx={{ 
    backgroundColor: "#2d2859", 
    fontSize: "15px", 
    width: "200px",
    "&:hover": { backgroundColor: "#4b487e" } 
  }} 
  variant="contained"
  onClick={() => {
    handleSave()
    if (!checked) {
      setOpen(true);
      setColor('error');
      setMsg('Accept Terms and Conditions');
      return;
    }
  }}
>
  Register
</Button>
</Grid>
        <Typography className='mt-3' align='center' fontSize="15px">
            If you have already a account, 
            <Button onClick={handleClickOpen} >Sign in</Button>
        </Typography>
        {/* <Grid >
                   <Typography className='mt-5' style={{ color: '#2c2c4b',fontSize:"20px" }}>What are Terms and Conditions Agreements?</Typography>
                   <Typography className='mt-3' style={{ color: '#2c2c4b' }}>
                     A Terms and Conditions agreement acts as a legal contract between you (the company) and the user.
                     It's where you maintain your rights to exclude users from your app in the event that they abuse your website/app,
                     set out the rules for using your service, and note other important details and disclaimers.
                   </Typography>
                  
                 </Grid> */}
                
               
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>

     

    </Grid>
    
</>
)}

    <Dialog
      open={dialogopen}
      onClose={handleClickClose}
      aria-labelledby="responsive-dialog-title"
      fullScreen={fullScreen} // Fullscreen on small screens
      maxWidth="xs" // Max width for smaller screens
      fullWidth={true} // Allows content to take full width
    >
      <DialogContent
        sx={{
          backgroundColor: "#f7f4cd",
          color: "#000",
          width: { xs: "100%", sm: "500px", md: "440px" }, 
          height: { xs: "auto", sm: "auto", md: "500px" }, // Adjust height for mobile
          p: { xs: 2, sm: 3 }, // Padding
        }}
      >
        <DialogContentText sx={{ color: "#000" }}>
          <Typography sx={{ fontSize: { xs: "35px", sm: "45px" }, fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: "bold" }}>
            Log into your account
          </Typography>
          <br />
          <Typography className="mt-3" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
            To login, please enter your registered email id
          </Typography>
          <TextField
            placeholder="Enter your email id"
            className="mt-4"
            value={email}
            // onChange={handleValidation}
            // inputProps={{ maxLength: 10 }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '20px',
                width: { xs: "100%", sm: "350px" }, // Full width on mobile
                height: "60px",
              },
            }}
          />
          <Typography className="mt-5" sx={{ fontSize: { xs: "8px", sm: "10px" } }}>
            This will allow us to verify your identity and grant access to your account.
          </Typography>
          <Typography className="mt-1" sx={{ fontSize: { xs: "8px", sm: "10px" } }}>
            If you encounter any issues, don't hesitate to reach out to our support team.
          </Typography>
          <Grid mt={3} container direction="row" justifyContent="center" alignItems="center">
            <Button
              
              className="mt-4"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#C052E3",
                color: "#000",
                borderRadius: "12px",
                width: { xs: "100%", sm: "300px" }, // Full width on mobile
              }}
              autoFocus
              onClick={()=>{
                sendEmail()
              }}
            >
              Get Verify from your Email
            </Button>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#f7f4cd" }}>
        <Button onClick={handleClickClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
<Dialog
  open={term}
  onClose={CloseTerms}
  scroll={scroll}
  aria-labelledby="scroll-dialog-title"
  aria-describedby="scroll-dialog-description"
>
  <DialogTitle id="scroll-dialog-title">Terms & Conditions</DialogTitle>
  <DialogContent dividers={scroll === 'paper'}>
    <DialogContentText
      id="scroll-dialog-description"
      ref={descriptionElementRef}
      tabIndex={-1}
    >
       <h4>Terms Of Use For Information Dissemination</h4>
    <p>This document is an electronic record in terms of the amended Information Technology Act, 2000 and rules and regulation made thereunder. This electronic record is generated by a computer system and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 that require publishing the Terms for access or usage of Qik call’s service via Qik CallPortal. This document meets the stipulations and conditions mentioned in Section 65B (2) of the Indian Evidence Act, 1872.</p>
    
    <h4>YOUR ACCEPTANCE OF THIS AGREEMENT:</h4>
    <p>This is an agreement between you ("you" or "your") and Qik CallLimited, a company incorporated under the Companies Act 1956 with its registered office at Building M, 501-B, Palm Court Complex, Besides Goregaon Sports Club, New Link Road, Malad (W), Mumbai 400 064 ("Qik call" "we," or "our") that governs your use of the search services offered by Qik Callthrough its website <a href="http://www.qikcalll.com">www.qikcalll.com</a> ("Website"), telephone search, SMS, WAP or any other medium using which Qik Callmay provide the search services (collectively "Platforms"). When you access or use any of the Platforms you agree to be bound by these Terms and Conditions ("Terms").</p>
    
    <h4>CHANGES:</h4>
    <p>We may periodically change the Terms and the Site without notice, and you are responsible for checking these Terms periodically for revisions. All amended Terms become effective upon our posting to the Site, and any use of the site after such revisions have been posted signifies your consent to the changes.</p>
    
    <h4>HOW YOU MAY USE OUR MATERIALS:</h4>
    <p>We use a diverse range of information, text, photographs, designs, graphics, images, sound and video recordings, animation, content, advertisement and other materials and effects (collectively "Materials") for the search services on the Platforms. We provide the Material through the Platforms FOR YOUR PERSONAL AND NON-COMMERCIAL USE ONLY.</p>
    <p>While every attempt has been made to ascertain the authenticity of the Platforms content, Qik Callis not liable for any kind of damages, losses or action arising directly or indirectly, due to access and/or use of the content in the Platforms including but not limited to decisions based on the content in the Platforms which results in any loss of data, revenue, profits, property, infection by viruses etc.</p>
    <p>Accordingly, you may view, use, copy, and distribute the Materials found on the Platforms for internal, non-commercial, informational purposes only. You are prohibited from data mining, scraping, crawling, or using any process or processes that send automated queries to Qik call. You may not use the Platforms or any of them to compile a collection of listings, including a competing listing product or service. You may not use the Platforms or any Materials for any unsolicited commercial e-mail. Except as authorized in this paragraph, you are not being granted a license under any copyright, trademark, patent or other intellectual property right in the Materials or the products, services, processes or technology described therein. All such rights are retained by Qik call, its subsidiaries, parent companies, and/or any third party owner of such rights.</p>
    
    <h4>HOW YOU MAY USE OUR MARKS:</h4>
    <p>The Qik Callcompany names and logos and all related products and service names, design marks and slogans are trademarks and service marks owned by and used under license from Qik Callor its wholly owned subsidiaries. All other trademarks and service marks herein are the property of their respective owners. All copies that you make of the Materials on any of the Platforms must bear any copyright, trademark or other proprietary notice located on the respective Platforms that pertains to the material being copied. You are not authorized to use any Qik Callname or mark in any advertising, publicity or in any other commercial manner without the prior written consent of Qik call. Requests for authorization should be made to <a href="mailto:intproperty@qikcalll.com">intproperty@qikcalll.com</a></p>
    
    <h4>HOW WE MAY USE INFORMATION YOU PROVIDE TO US:</h4>
    <p>Do not send us any confidential or proprietary information. Except for any personally identifiable information that we agree to keep confidential as provided in our Privacy Policy, any material, including, but not limited to any feedback, data, answers, questions, comments, suggestions, ideas or the like, which you send to us will be treated as being non-confidential and nonproprietary. We assume no obligation to protect confidential or proprietary information (other than personally identifiable information) from disclosure and will be free to reproduce, use, and distribute the information to others without restriction. We will also be free to use any ideas, concepts, know-how or techniques contained in information that you send us for any purpose whatsoever including but not limited to developing, manufacturing and marketing products and services incorporating such information.</p>
    
    <h4>REVIEWS, RATINGS & COMMENTS BY USERS:</h4>
    <p>Since, Qik Callprovides information directory services through various mediums (SMS, WAP, E-Mail, Website, APP and voice or phone), your ("Users") use any of the aforementioned medium to post Reviews, Ratings and Comments about the Qik Callservices and also about the Advertiser's listed at Qik Callis subject to additional terms and conditions as mentioned herein.</p>
    <p>You are solely responsible for the content of any transmissions you make to the Site or any transmissions you make to any mediums offered by Qik Calland any materials you add to the Site or add to any mediums offered by Qik call, including but not limited to transmissions like your Reviews, Ratings & Comments posted by you (the "Communications"). Qik Calldoes not endorse or accept any of your Communication as representative of their (Qik call) views. By transmitting any public Communication to the Site, you grant Qik Callan irrevocable, non-exclusive, worldwide, perpetual, unrestricted, royalty-free license (with the right to sublicense) to use, reproduce, distribute, publicly display, publicly perform, adapt, modify, edit, create derivative works from, incorporate into one or more compilations and reproduce and distribute such compilations, and otherwise exploit such Communications, in all Platforms now known or later developed.</p>
    <p>You confirm and warrant that you have the right to grant these rights to Qik call. You hereby waive and grant to Qik Callall rights including intellectual property rights and also "moral rights" in your Communications, posted at Qik Callthrough any of mediums of Qik call. Qik Callis free to use all your Communications as per its requirements from time to time. You represent and warrant that you own or otherwise control all of the rights to the content that you post as Review, Rating or Comments; that the content is accurate; that use of the content you supply does not violate these Terms and will not cause injury to any person or entity. For removal of doubts it is clarified that, the reference to Communications would also mean to include the reviews, ratings and comments posted by your Friend's tagged by you. Also Qik Callreserves the right to mask or unmask your identity in respect of your Reviews, Ratings & Comments posted by you.</p>
    <p>Qik Callhas the right, but not the obligation to monitor and edit or remove any content posted by you as Review, Rating or Comments. Qik Callcannot review all Communications made on and through any of the mediums of Qik call. However, Qik Callreserves the right, but has no obligation, to monitor and edit, modify or delete any Communications (or portions thereof) which Qik Callin its sole discretion deems inappropriate, offensive or contrary to any Qik Callpolicy, or that violate these terms:</p>
    <p>Qik Callreserves the right not to upload or distribute to, or otherwise publish through the Site or Forums any Communication which</p>
    <ul>
        <li>is obscene, indecent, pornographic, profane, sexually explicit, threatening, or abusive;</li>
        <li>constitutes or contains false or misleading indications of origin or statements of fact;</li>
        <li>slanders, libels, defames, disparages, or otherwise violates the legal rights of any third party;</li>
        <li>causes injury of any kind to any person or entity;</li>
        <li>infringes or violates the intellectual property rights (including copyright, patent and trademark rights), contract rights, trade secrets, privacy or publicity rights or any other rights of any third party;</li>
        <li>violates any applicable laws, rules, or regulations;</li>
        <li>contains software viruses or any other malicious code designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment;</li>
        <li>impersonates another person or entity, or that collects or uses any information about Site visitors.</li>
    </ul>
    <p>It is also clarified that, if there are any issues or claims due to your Reviews, Ratings and Comments, then Qik Callreserves right to take appropriate legal action against you. Further, you shall indemnify and protect Qik Callagainst such claims or damages or any issues, due to your posting of such Reviews, Ratings and Comments Qik Calltakes no responsibility and assumes no liability for any content posted by you or any third party on Qik Callsite or on any mediums of Qik call.</p>
    <p>ADVERTISING:</p>
    <p>Qik Callreserves the right to refuse, reject, omit, remove or suspend any advertisement in its sole discretion for any reason. However, Qik Callwill inform the advertiser in such case. Qik Callis not liable for any damages, loss or expense of any sort incurred by you as a result of any error or failure or delay in the listing of your advertisement.</p>
    <p>If you observe any kind of misuse or abuse of our Services or any breach of these terms and conditions, please report the same to <a href="mailto:abuse@qikcalll.com">abuse@qikcalll.com</a>.</p>
    
    <p><em>For further information please feel free to contact us at:</em></p>
    <address>
        Qik Call Limited,<br/>
        Building M, 501-B, Palm Court Complex,<br/>
        Besides Goregaon Sports Club,<br/>
        New Link Road, Malad (W),<br/>
        Mumbai - 400064.<br/>
        Phone: +91-22-28884060<br/>
        Email: <a href="mailto:info@qikcalll.com">info@qikcalll.com</a>
    </address>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    {/* <Button onClick={CloseTerms}>Cancel</Button> */}
    <Button onClick={CloseTerms}>Ok</Button>
  </DialogActions>
</Dialog>
<Footer/>
    </>
  );
};

export default  UserRegistration;