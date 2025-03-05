import { Container, Typography, Box,Button, Grid,TextField , } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import EditIcon from '@mui/icons-material/Edit';
import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';
// import Thumbsup from '../../assets/img/thumbsup.webp'


function ManageProfile() {
    const [name,setName] = useState(''); 
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [altnumber,setAltnumber] = useState('');
    const [address,setAddress] = useState(''); 

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlebutton = () => {
        navigate('/userprofile');
      };

    return (
        <>
            {isMobile ? (
                <>
                    <NavBar />
                    <Container>
                        <Typography className='mt-4 mg-main-mob'  >Manage Profile </Typography>
      <Box mt={3} mb={1} className="account-details-container">
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <Grid item>
            <Typography id="mg-head-mob" variant="h5">Personal Information</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={2} mt={2}>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" sx={{ width: 130, height: 130 }} />
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="body1">Update Picture</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mt={4} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Typography>Name</Typography>
          <TextField  value={name}  variant="outlined" className="mg-custom-textfield-mob mt-1"  onChange={(e) => { setName(e.target.value); }}  />
          </Grid>
          <Grid item mt={3} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Typography>Email</Typography>
          <TextField  value={email}  variant="outlined" className="mg-custom-textfield-mob mt-1"  onChange={(e) => { setEmail(e.target.value); }}  />
          </Grid>
          <Grid item mt={3} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Typography>Phone Number</Typography>
          <TextField  value={number}  variant="outlined" className="mg-custom-textfield-mob mt-1"  onChange={(e) => { setNumber(e.target.value); }}  />
          </Grid>
          <Grid item mt={3} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Typography>Alternative Phone Number</Typography>
          <TextField  value={altnumber}  variant="outlined" className="mg-custom-textfield-mob mt-1"  onChange={(e) => { setAltnumber(e.target.value); }}  />
          </Grid>
          <Grid item mt={3} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Typography>Address</Typography>
          <TextField  value={address}  variant="outlined" className="mg-custom-textfield-mob mt-1"  onChange={(e) => { setAddress(e.target.value); }}  />
          </Grid>
        </Grid>
      </Box>
      <Grid mb={3} container  item xs={12} sm="auto" justifyContent="center" alignItems="center">
                    <Button id='mg-button-mob' onClick={handlebutton} >Save</Button>
                  </Grid>
    </Container>

                    <Footer />


                </>
            ) : (
                <>

                </>
            )}
        </>
    )

}

export default ManageProfile