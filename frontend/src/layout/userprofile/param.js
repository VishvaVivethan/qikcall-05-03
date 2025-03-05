import { Container, Typography, Box, Grid, IconButton, Button, Divider, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Cookies from 'js-cookie';
// import { Form } from 'react-bootstrap';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import PersonIcon from '@mui/icons-material/Person';
// import StoreIcon from '@mui/icons-material/Store';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { jwtDecode } from "jwt-decode";
import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';
// import Thumbsup from '../../assets/img/thumbsup.webp'
import Banner from '../../assets/img/Sale1.jpg'





function Userprofile() {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [image, setImage] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a JPEG or PNG image.');
    }
  };

  const handleManageprofile = () => {
    navigate('/manageprofile');
  };

  const handlePricing = () => {
    navigate('/pricing');
  };

  const handlePrivacy = () => {
    navigate('/privacysetting');
  };
  // const { search } = useLocation();
  // const params = new URLSearchParams(search);
  // const token = params.get('token');
  // Cookies.set('token', token, { expires: 7, secure: true });
    
  // // const { token } = useParams();
  // console.log(token, "Token from URL");

  // // Decode the token from the URL to extract the user id
  // const [decodedToken, setDToken] = useState(jwtDecode(token));
  // // const decodedToken = jwtDecode(token);
  // console.log(decodedToken, "Decoded ");
  // const userId = decodedToken.user.id;
  // console.log(userId, "User ID");

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');

  // Store token in cookie
  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7, secure: true });
      console.log(token, "Token from URL");
    }
  }, [token]);

  // const [decodedToken, setDecodedToken] = useState('');
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       // Decode the token
  //       const decoded = jwtDecode(token);
  //       setDecodedToken(decoded);
  //       setUserId(decoded.user.id); 
  //       console.log(decoded, "Decoded Token");
  //       console.log(decoded.user.id, "User ID");
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  // }, [token]);

  // Decode the token from the URL to extract the user id
  const [decodedToken, setDToken] = useState(jwtDecode(token));
  // const decodedToken = jwtDecode(token);
  console.log(decodedToken, "Decoded ");
  const userId = decodedToken.user.id;
  console.log(userId, "User ID");


  const [data, setData] = useState([]);

  console.log(data,"data comming")

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const myHeaders = new Headers();
      // Set the token from the URL in the Authorization header
      myHeaders.append("Authorization", token);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // Fetch data using the extracted user id
      const response = await fetch(`/api/details?userid=${userId}`, requestOptions);
      const result = await response.json();

      if (response.status === 200 || response.status === 400) {
        setData(result.data);
        console.log(result.data, "Fetched Data");
      } else {
        console.log("Unexpected Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleLogout = () => {

  Cookies.remove("token")

  navigate('/')

};



  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if (decodedToken.exp < currentTime) {
          Cookies.remove('token');
          navigate('/');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove('token');
        navigate('/');
      }
    }
  }, [navigate]);




  return (
    <>
      {isMobile ?
        (
          <>
            <NavBar />
            <Container>
              <Grid xs={12} mt={5} container direction="column" justifyContent="space-evenly" alignItems="center">
                <Grid>
                  <Typography id="header-mob">Your Profile</Typography>
                </Grid>
                <Grid mt={3}>
                  <Stack direction="row" spacing={2}>
                    <Avatar id="user-img-mob" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Stack>
                </Grid>
                <Grid mt={3}>
                  <Typography id="name-mob">User Name</Typography>
                </Grid>
              </Grid>
            </Container>
            <Container>
              <Box mt={3} className="account-details-container">
                <Grid container spacing={2}>
                  <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                    <Typography id="title-mob" variant="h6" component="div" >Contact Information</Typography>
                    <IconButton onClick={handleManageprofile} size="small">
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography id="head-mob" variant="body1"><strong>Phone Number:</strong></Typography>
                    <Typography variant="body2">9384394667</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography id="head-mob" variant="body1"><strong>Email Address:</strong></Typography>
                    <Typography variant="body2">Heam******@mail.com</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography id="head-mob" variant="body1"><strong>Address:</strong></Typography>
                    <Typography variant="body2">India</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography id="head-mob" variant="body1"><strong>Alternative Number:</strong></Typography>
                    <Typography variant="body2">9384394667</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>

            <Container>
              <Box mt={3} className="account-details-container">
                <Typography
                  variant="h6"
                  className="account-details-title"
                >
                  Account Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="account-details-label">
                      Member Ship Status:
                    </Typography>
                    <Typography variant="body1">
                      Premium
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="account-details-label">
                      Account Created:
                    </Typography>
                    <Typography variant="body1">
                      11/10/2024
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" className="account-details-label">
                      Your Roll:
                    </Typography>
                    <Typography variant="body1">
                      Seller
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>

            <Container>
              <Box mt={3} mb={3} className="settings-container">
                <Typography
                  variant="h6"
                  className="settings-title"
                >
                  Settings
                </Typography>
                <Grid xs={12} container spacing={2}>
                  <Grid item xs={4} className="settings-option">
                    <a href='/manageprofile'  >Manage Profile</a>
                  </Grid>
                  <Grid item xs={4} className="settings-option">
                    Privacy Settings
                  </Grid>
                  <Grid item xs={4} className="settings-option">
                    Log out
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Footer />
          </>
        ) : (
          <>
            <NavBar />
            <Container>
              <Grid xs={12} >
                <img src={Banner} alt="banner" width={"100%"} height={"400px"} />
              </Grid>
            </Container>

            <Container>

           
    <Box
     
      sx={{
        backgroundColor: '#f7f4cd',
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '16px',
        maxWidth: '100%',
        position: 'relative',
      }}
      mt={5}
    >
      <IconButton
        onClick={handlePricing}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
        }}
      >
        <EditIcon />
      </IconButton>
      
      <>
     
      
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                sx={{ bgcolor: '#FFD700', width: "150px", height: "150px", cursor: 'pointer' }}
                // onClick={handleAvatarClick}
                src={data.profilepicture} // Adjust the image source
              >
                {!data.profilepicture && 'Logo'}
              </Avatar>
              {/* <input
                id="file-input"
                type="file"
                accept="image/jpeg, image/png"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              /> */}
            </Grid>
            <Grid item>
              <Typography
                sx={{ fontSize: "40px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000" }}
              >
                {data.username}
              </Typography>
              <Typography variant="body1">
              {data.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
          <Typography
            sx={{ fontSize: "20px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", textAlign: "right" }}
          >
            Account Created: <strong>{new Date(data.createdAt).toLocaleDateString()}</strong>
          </Typography>
        </Grid>
      </Grid>
     
      </>
    
   
    </Box>
 

            </Container>

            <Container>
              <Box p={3} mt={5} height={"auto"} sx={{ border: '1px solid #000' }} bgcolor="#f7f4cd" borderRadius={2} >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: "25px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} color="primary">
                        Contact Information
                      </Typography>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 0 }} >
                    <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                  </Grid>
                 {decodedToken && decodedToken.user? (decodedToken.user.role == "customer" && 
                 <>
                
                  <>
                   <Grid xs={6} container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center" sx={{ padding: "10px" }}>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center">

                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> <PhoneIcon color="primary" /> Phone Number </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'> : {data.phonenumber}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center" >
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><EmailIcon color="primary" /> Email Address</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> : {data.email}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><LocationOnIcon color="primary" /> Address:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>{data.addressline1},{data.addressline2},{data.city},{data.pincode},{data.state}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  </>
                
                 </> 
                 ):undefined}
                  {decodedToken && decodedToken.user ? (decodedToken.user.role == "freelancer" && 
                 <>
                 {Array.isArray(data) && data.map((datas) => (
                  <>
                   <Grid xs={6} container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center" sx={{ padding: "10px" }}>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center">

                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> <PhoneIcon color="primary" /> Phone Number </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'> : {datas.phonenumber}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center" >
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><EmailIcon color="primary" /> Email Address</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> : {datas.email}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><LocationOnIcon color="primary" /> Address:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>{datas.addressline1},{datas.addressline2},{datas.city},{datas.state},{datas.pincode}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid xs={6} container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center" sx={{ padding: "2px" }}>
                    <Grid item  container justifyContent="flex-end" alignItems="center"  >
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><StarIcon color="primary" />Member Ship Status:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} >{datas.membership}</Typography>
                      </Grid>
                    </Grid>

                    <Grid item  container justifyContent="flex-end" alignItems="center"  >
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><AlternateEmailIcon color="primary" />Alternative Number:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>{datas.alterphonenumber}</Typography>
                      </Grid>
                    </Grid>

                  </Grid>
                  </>
                 ))}
                 </>
                ) : undefined }
                 {decodedToken && decodedToken.user && decodedToken.user.role === "businessman" && (
  <Grid container spacing={2} sx={{ padding: "10px" }}>
    
    {/* Left Column */}
    <Grid item xs={6} container direction="column" justifyContent="space-evenly" alignItems="center">
      {/* Phone Number */}
      <Grid item container justifyContent="flex-start" alignItems="center" mt={3}>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <PhoneIcon color="primary" /> Phone Number
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align="center">
            : {data.phonenumber}
          </Typography>
        </Grid>
      </Grid>

      {/* Email Address */}
      <Grid item container justifyContent="flex-start" alignItems="center" mt={3}>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <EmailIcon color="primary" /> Email Address
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            : {data.email}
          </Typography>
        </Grid>
      </Grid>

      {/* Address */}
      <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" mt={3}>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <LocationOnIcon color="primary" /> Address:
          </Typography>
        </Grid>
        <Grid item mt={1} ml={2}>
          <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            {data.addressline1}, {data.addressline2}, {data.city}, {data.state}, {data.pincode}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    {/* Right Column */}
    <Grid item xs={6} container direction="column" justifyContent="space-evenly" alignItems="center">
      {/* Membership Status */}
      <Grid item container justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <StarIcon color="primary" /> Membership Status:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            {data.membership}
          </Typography>
        </Grid>
      </Grid>

      {/* Alternative Number */}
      <Grid item container justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <AlternateEmailIcon color="primary" /> Alternative Number:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            {data.alterphonenumber}
          </Typography>
        </Grid>
      </Grid>

      {/* Landmark */}
      <Grid item container justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            <AlternateEmailIcon color="primary" /> Landmark:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            {data.landmark}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)}

                </Grid>
              </Box>
            </Container>
           

            <Container>
              {/* <Box mt={4} borderRadius={2} sx={{ backgroundColor: '#f7f4cd', padding: 2, border: '1px solid #000'}}> */}
                {/* <Typography variant="h6" sx={{ fontSize: "25px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", marginBottom: 2 }}>
                  Settings
                </Typography> */}
                {/* <Grid item xs={12} sx={{ mt: 0 }} >
                  <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                </Grid> */}
                <Grid mt={3} mb={5} container spacing={2} justifyContent="space-around">
                  {/* <Grid item>
                    <Button component={Link} to="/manageprofile" variant="body1" align="center" sx={{ fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#000" }}>
                      Manage Profile
                    </Button>
                  </Grid> */}
                  <Grid item>
                    <Button onClick={handlePrivacy} variant="contained" align="center" sx={{ fontSize: "15px",backgroundColor:"#2d2859", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#fff" }}>
                      <IoMdSettings/> Privacy Settings
                    </Button>
                  </Grid>
                  <Grid item onClick={handleClickOpen}>
                    <Button   align="center" variant="contained" sx={{ fontSize: "15px",backgroundColor:"#2d2859", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#fff" }}>
                     <IoIosLogOut/> Logout
                    </Button>
                  </Grid>
                </Grid>
                <Dialog
        
        open={open}
        onClose={handleClose}
        padding="10px"
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you Sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you want to logout your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"red"}} autoFocus onClick={handleClose}>
            cancel
          </Button>
          <Button color="success" onClick={handleLogout} >
            yes
          </Button>
        </DialogActions>
      </Dialog>
              {/* </Box> */}
            </Container>

            <Footer />
          </>
        )}
    </>
  )
}




export default Userprofile
