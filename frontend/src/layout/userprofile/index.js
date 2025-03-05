import { Container, Typography, Box, Grid, IconButton, Button, TextField, Card, CardMedia, Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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





const Userprofile = () => {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
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

  const token = jwtDecode(Cookies.get('token'));

  console.log(token.user, "userprofile")

  const [data, setData] = useState([]);


  useEffect(() => {
    handelGetData()
  }, [])

  const handelGetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", Cookies.get('token'));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`/api/details?userid=${token ? token.user.id : undefined}`, requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setData([result.data.data])
          console.log(result.data.data, "good")
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.error(error);
    }
  };



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [images, setImages] = useState(['']);
  const [files, setFiles] = useState('')
  const [msgOpen, setMsgOpen] = useState('')
  const [color, setColor] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (data && data.length > 0) {
      const user = data[0]; // Assuming the first item has the user data
      setName(user.username || ''); // Set only if value exists
      setEmail(user.email || '');
      setPhonenumber(user.phonenumber || '');
      setAddressLine1(user.addressline1 || '');
      setAddressLine2(user.addressline2 || '');
      setCity(user.city || '');
      setPincode(user.pincode || '');
      setState(user.state || '');
    }
  }, [data]);


  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file); // Show the image preview
        setImages(newImages);

        // Save the file object in state for later uploading
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const uploadImage = async () => {
    try {
      const uploadedImageUrls = await Promise.all(files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary upload preset

        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
          console.log(data.secure_url, "poda")
          return data.secure_url;
        } else {
          setMsgOpen(true);
          setColor('error');
          setMsg("Failed to upload image");
          throw new Error('Failed to upload image.');
        }
      }));

      return uploadedImageUrls;
    } catch (error) {
      setMsgOpen(true);
      setColor('error');
      setMsg("Upload Images Error");
      throw error;
    }
  };



  const EditUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const uploadprofile = await uploadImage();

      const raw = JSON.stringify({
        "username": name || data[0]?.username,  // Use existing value if unchanged
        "email": email || data[0]?.email,
        "phonenumber": phonenumber || data[0]?.phonenumber,
        "city": city || data[0]?.city,
        "state": state || data[0]?.state,
        "pincode": pincode || data[0]?.pincode,
        "addressline1": addressLine1 || data[0]?.addressline1,
        "addressline2": addressLine2 || data[0]?.addressline2,
        "profilepicture": uploadprofile || data[0]?.profilepicture,  // Handle image if not uploaded
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`/api/user_update?id=${token ? token.user.id : undefined}`, requestOptions);
      const result = await response.json();

      if (response.status === 200 || response.status === 400) {
        setData([result.data]);
        console.log(result.data, "Updated data");
      } else {
        console.error('Unexpected Error');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    EditUser()
    setEdit(false);
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

  // const handleChoose = () => {
  //   if (token.user.role == "customer") {
  //     handleEditOpen()
  //   } else {
  //     handlePricing()
  //   }
  // }

  const [edit, setEdit] = useState('')

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const handleSnackClose = () => {
    setMsgOpen(false);
  };




  return (
    <>
      {isMobile ?
        (
          <>
            <NavBar />
            <Container>
              {Array.isArray(data)&& data.map((datas,index)=>(
                <Grid xs={12} mt={5} key={index} container direction="column" justifyContent="space-evenly" alignItems="center">
                <Grid>
                  <Typography id="header-mob">Your Profile</Typography>
                </Grid>
                <Grid mt={3}>
                  <Stack direction="row" spacing={2}>
                  <Avatar
                              sx={{ bgcolor: '#FFD700', width: "150px", height: "150px", cursor: 'pointer' }}
                              // onClick={handleAvatarClick}
                              src={datas.profilepicture} // Adjust the image source
                            >
                              {!datas.profilepicture && 'Logo'}
                            </Avatar>
                  </Stack>
                </Grid>
                <Grid mt={3}>
                  <Typography id="name-mob">{datas.username}</Typography>
                </Grid>
              </Grid>
              ))}
            </Container>
            <Container>
              <Box p={3} mt={5} height={"auto"} sx={{ border: '1px solid #000' }} bgcolor="#f7f4cd" borderRadius={2} >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: "25px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} color="primary">
                        Contact Information
                      </Typography>
                      {/* <IconButton onClick={handleEditOpen}>
                        <EditIcon />
                      </IconButton> */}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 0 }} >
                    <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                  </Grid>
                  {token && token.user ? (token.user.role == "customer" &&
                    <>
                      {Array.isArray(data) && data.map((datas) => (
                        <>
                          <Grid xs={6} container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center" sx={{ padding: "10px" }}>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">

                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> <PhoneIcon color="primary" /> Phone Number </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'> : {datas.phonenumber}</Typography>
                              </Grid>
                            </Grid>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center" >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><EmailIcon color="primary" /> Email Address</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'> : {datas.email}</Typography>
                              </Grid>
                            </Grid>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><LocationOnIcon color="primary" /> Address:</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'>{datas.addressline1},{datas.addressline2},{datas.city},{datas.pincode},{datas.state}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                        </>
                      ))}
                    </>
                  ) : undefined}
                  {token && token.user ? (token.user.role == "freelancer" &&
                    <>
                      {Array.isArray(data) && data.map((datas) => (
                        <>
                          <Grid xs={6} container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center" sx={{ padding: "2px" }}>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">

                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}> <PhoneIcon sx={{fontSize:"15px"}} color="#282866" /> Phone Number :</Typography>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'>  {datas.phonenumber}</Typography>
                              </Grid>
                              <Grid item>
                                
                              </Grid>
                            </Grid>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center" >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><EmailIcon sx={{fontSize:"15px"}} color="#282866" /> Email Address :</Typography>
                                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'>  {datas.email}</Typography>
                              </Grid>
                              
                            </Grid>
                            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><LocationOnIcon sx={{fontSize:"15px"}} color="#282866" /> Address:</Typography>
                                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic",textAlign:"left",marginLeft:"10px" }}>{datas.addressline1},{datas.addressline2},{datas.city},{datas.state},{datas.pincode}</Typography>
                              </Grid>
                              
                            </Grid>
                          </Grid>

                          <Grid xs={6} container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center" sx={{ padding: "2px" }}>
                            <Grid item container justifyContent="flex-end" alignItems="center"  >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><StarIcon sx={{fontSize:"15px"}} color="#282866" />Member Ship Status:</Typography>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center' >{datas.membership}</Typography>
                              </Grid>
                            </Grid>

                            <Grid item container justifyContent="flex-end" alignItems="center"  >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><PhoneIcon sx={{fontSize:"15px"}} color="#282866" />Alternative Number:</Typography>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'>{datas.alterphonenumber}</Typography>
                              </Grid>
                            
                            </Grid>

                            <Grid item container justifyContent="flex-end" alignItems="center"  >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "12px", color: "#282866", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><AlternateEmailIcon sx={{fontSize:"15px"}} color="#282866" />Account Created:</Typography>
                                <Typography variant="body1" sx={{ fontSize: "10px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} align='center'>{new Date(datas.createdAt).toLocaleDateString()}</Typography>
                              </Grid>
                             
                            </Grid>

                          </Grid>
                        </>
                      ))}
                    </>
                  ) : undefined}
                 {token && token.user ? (token.user.role == "businessman" &&
  <>
    {Array.isArray(data) && data.map((datas) => (
      <>
        <Grid xs={6} container direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: "10px" }}>
          <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Typography className="typography-phone">
                <PhoneIcon sx={{fontSize: "15px"}} color="#282866" /> Phone Number:
              </Typography>
              <Typography className="typography-content"> {datas.phonenumber}</Typography>
            </Grid>
          </Grid>
          <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Typography className="typography-email">
                <EmailIcon sx={{fontSize: "15px"}} color="#282866" /> Email Address:
              </Typography>
              <Typography className="typography-content"> {datas.email}</Typography>
            </Grid>
          </Grid>
          <Grid item mt={3} container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item>
              <Typography className="typography-address">
                <LocationOnIcon sx={{fontSize: "15px"}} color="#282866" /> Address:
              </Typography>
              <Typography className="typography-content">{datas.addressline1}, {datas.addressline2}, {datas.city}, {datas.state}, {datas.pincode}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={6} container direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: "10px" }}>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography className="typography-membership">
                <StarIcon sx={{fontSize: "15px"}} color="#282866" /> Membership Status:
              </Typography>
              <Typography className="typography-content">{datas.membership}</Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography className="typography-alternative">
                <PhoneIcon sx={{fontSize: "15px"}} color="#282866" /> Alternative Number:
              </Typography>
              <Typography className="typography-content">{datas.alterphonenumber}</Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography className="typography-landmark">
                <AlternateEmailIcon sx={{fontSize: "15px"}} color="#282866"  /> Landmark:
              </Typography>
              <Typography className="typography-content">{datas.landmark}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </>
    ))}
  </>
) : undefined}

                </Grid>
              </Box>
            </Container>


            <Container>
            <Box mt={3} mb={3} className="settings-container-mob">
  <Typography variant="h6" className="settings-title-mob">
    Settings
  </Typography>
  <Grid mt={3} xs={12} container >
    <Grid item xs={4} onClick={handleEditOpen} className="settings-option-mob">
      Manage Profile
    </Grid>
    <Grid item xs={4} onClick={handlePrivacy} className="settings-option-mob">
      Privacy Settings
    </Grid>
    <Grid item xs={4} onClick={handleClickOpen} className="settings-option-mob">
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
                 
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                  }}
                >
                  <EditIcon />
                </IconButton>
               
                <>
                  {Array.isArray(data) && data.map((datas) => (

                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar
                              sx={{ bgcolor: '#FFD700', width: "150px", height: "150px", cursor: 'pointer' }}
                              // onClick={handleAvatarClick}
                              src={datas.profilepicture} // Adjust the image source
                            >
                              {!datas.profilepicture && 'Logo'}
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
                              {datas.username}
                            </Typography>
                            <Typography variant="body1">
                              {datas.email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
                        <Typography
                          sx={{ fontSize: "20px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", textAlign: "right" }}
                        >
                          Account Created: <strong>{new Date(datas.createdAt).toLocaleDateString()}</strong>
                        </Typography>
                      </Grid>
                    </Grid>

                  ))}</>


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
                      {/* <IconButton>
                        <EditIcon />
                      </IconButton> */}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 0 }} >
                    <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                  </Grid>
                  {token && token.user ? (token.user.role == "customer" &&
                    <>
                      {Array.isArray(data) && data.map((datas) => (
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
                                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>{datas.addressline1},{datas.addressline2},{datas.city},{datas.pincode},{datas.state}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                        </>
                      ))}
                    </>
                  ) : undefined}
                  {token && token.user ? (token.user.role == "freelancer" &&
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
                            <Grid item container justifyContent="flex-end" alignItems="center"  >
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}><StarIcon color="primary" />Member Ship Status:</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1" sx={{ fontSize: "20px", color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} >{datas.membership}</Typography>
                              </Grid>
                            </Grid>

                            <Grid item container justifyContent="flex-end" alignItems="center"  >
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
                  ) : undefined}
                {token && token.user ? (
  token.user.role === "businessman" && (
    <>
      {Array.isArray(data) && data.map((datas) => (
        <React.Fragment key={datas._id}>
          <Grid xs={6} container direction="column" justifyContent="space-evenly" alignItems="center" className="grid-container" sx={{ padding: "10px" }}>
            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <PhoneIcon color="primary" /> Phone Number
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className="typography-custom"> : {datas.phonenumber}</Typography>
              </Grid>
            </Grid>
            <Grid item mt={3} container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <EmailIcon color="primary" /> Email Address :
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className="typography-custom">  {datas.email}</Typography>
              </Grid>
            </Grid>
            <Grid item mt={3} container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <LocationOnIcon color="primary" /> Address:
                </Typography>
              </Grid>
              <Grid item mt={1} ml={2}>
                <Typography variant="body1" className="typography-custom">
                  {datas.addressline1}, {datas.addressline2}, {datas.city}, {datas.state}, {datas.pincode}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={6} container direction="column" justifyContent="space-evenly" alignItems="center" className="grid-container" sx={{ padding: "10px" }}>
            <Grid item container justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <StarIcon color="primary" /> Membership Status:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className="typography-custom">{datas.membership}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <AlternateEmailIcon color="primary" /> Alternative Number:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className="typography-custom">{datas.alterphonenumber}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Typography variant="body1" className="typography-custom">
                  <AlternateEmailIcon color="primary" /> Landmark:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className="typography-custom">{datas.landmark}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </>
  )
) : undefined}
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
                  <Button onClick={handlePrivacy} variant="contained" align="center" sx={{ fontSize: "15px", backgroundColor: "#2d2859", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#fff" }}>
                    <IoMdSettings /> Privacy Settings
                  </Button>
                </Grid>
                <Grid item onClick={handleClickOpen}>
                  <Button align="center" variant="contained" sx={{ fontSize: "15px", backgroundColor: "#2d2859", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#fff" }}>
                    <IoIosLogOut /> Logout
                  </Button>
                </Grid>
              </Grid>
              
              {/* </Box> */}
            </Container>

            <Footer />
          </>
        )}
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
  <Button sx={{ color: "red" }} autoFocus onClick={handleClose}>
    cancel
  </Button>
  <Button color="success" onClick={handleLogout} >
    yes
  </Button>
</DialogActions>
</Dialog>
         <Dialog

open={edit}
onClose={handleEditClose}
aria-labelledby="responsive-dialog-title"
>

<DialogContent>
  <Typography variant="h5" sx={{color:"#282866"}}>Manage your Profile</Typography>
  <Grid mt={3} mb={3} container justifyContent="center">
    {images.map((image, index) => (
      <Grid item xs={12} sm={5} md={5} key={index} container direction="column" justifyContent="center" alignItems="center" >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`file-input-${index}`}
          type="file"
          onChange={(event) => handleImageChange(index, event)}
        />
        <Typography sx={{ fontSize: "18px" }}> Your Avatar</Typography>
        <label htmlFor={`file-input-${index}`}>
          <IconButton component="span">

            <Card sx={{
              width: '200px',
              height: '200px', // Set height equal to width
              borderRadius: '50%', // Make it circular
              overflow: 'hidden' // Ensures the image fits within the circle
            }}>
              <CardMedia
                component="img"
                height="200" // Set height equal to card height
                image={image}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover' // Ensures the image covers the card without distortion
                }}
              />
            </Card>
          </IconButton>
        </label>


      </Grid>
    ))}
  </Grid>
  {Array.isArray(data) && data.map((datas) => (
    <>
      <TextField
        label="Name"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setName(e.target.value)}
        value={name || datas.username || ''} // Ensure value is correctly handled
      />
      <TextField
        label="Email Id"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        value={email || datas.email || ''}
      />
      <TextField
        label="Phone number"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setPhonenumber(e.target.value)}
        InputLabelProps={{ shrink: true }}
        value={phonenumber || datas.phonenumber || ''}
      />
      <Typography sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2 }}>
        Address:
      </Typography>
      <TextField
        label="Door No"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setAddressLine1(e.target.value)}
        InputLabelProps={{ shrink: true }}
        value={addressLine1 || datas.addressline1 || ''}
      />
      <TextField
        label="Street/Colony"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setAddressLine2(e.target.value)}
        InputLabelProps={{ shrink: true }}
        value={addressLine2 || datas.addressline2 || ''}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setCity(e.target.value)}
        value={city || datas.city || ''}
      />
      <TextField
        label="Pincode"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setPincode(e.target.value)}
        value={pincode || datas.pincode || ''}
      />
      <TextField
        label="State"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setState(e.target.value)}
        value={state || datas.state || ''}
      />
    </>
  ))}
   <Grid container direction="row" justifyContent="space-between" alignItems="center" >
    <Button variant="contained" sx={{ backgroundColor: "red", '&:hover': { backgroundColor: "red" } }} onClick={handleEditClose}>
      Close
    </Button>
    <Button variant="contained" sx={{
      backgroundColor: "#2d2859", '&:hover': { backgroundColor: "#2d2859" }
    }}
      onClick={handleSubmit} >
      Submit
    </Button>
  </Grid>
</DialogContent>

</Dialog>
<Snackbar open={msgOpen} autoHideDuration={2000} onClose={handleSnackClose}>
<Alert
  onClose={handleSnackClose}
  severity={color}
  variant="filled"
  sx={{ width: '100%' }}
>
  {msg}
</Alert>
</Snackbar>
    </>
  )
}




function Login() {





  return (
    <>
      <Grid>
        <Userprofile />
      </Grid>
    </>
  )
}

export default Login