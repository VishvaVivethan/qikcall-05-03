import React,{useEffect,useState} from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
// import { Input as BaseInput } from '@mui/base/Input';

// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import { experimentalStyled as styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';
// import Image from '../../assets/img/image1.jpeg'
import Image1 from '../../assets/img/image2.jpeg'
import Image2 from '../../assets/img/image3.jpeg'
import Image3 from '../../assets/img/image4.jpeg'
import Image4 from '../../assets/img/image5.jpeg'
import Image5 from '../../assets/img/image6.jpeg'


function About() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 599);
      };

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
         
         {isMobile ? (
         <>
         <NavBar />
            <Container maxWidth="1300px">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" id="head-text-mob" >
                        About US
                    </Typography>
                    <img
                        src={Image3}
                        alt="Description"
                        style={{
                            width: '100%',
                            height: '60%',
                            opacity:0.5,
                            objectFit: 'cover',
                            zIndex: 0
                        }}
                    />
                </Box>
            </Container>
            <Container>
                <Grid xs={12} container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid xs={10} container  direction="column" justifyContent="space-evenly" alignItems="center">
                         <Typography sx={{fontSize:"28px",color: "#000", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic"}} >Our Team</Typography>
                         <Typography className='mt-3' sx={{fontSize:"10px",color: "#000", fontFamily: "Anton, sans-serif",fontStyle:"italic",textAlign:"left"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container>
            <Grid mt={5} container  item xs={12} direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid  item xs={3} >
          <img src={Image5} id="image-style-mob" alt="Grid item 1"  />
        </Grid>
        <Grid item xs={3} >
          <img src={Image1} id="image-style-mob" alt="Grid item 2"  />
        </Grid>
        <Grid item xs={3} >
          <img src={Image2} id="image-style-mob" alt="Grid item 3"  />
        </Grid>
      </Grid>
            </Container>
            <Container >
                <Grid xs={12} mt={5}   container direction="row" justifyContent="space-between" alignItems="center">
                <Grid  item xs={4} mt={5} container direction="row" justifyContent="center"  alignItems="center" >
          <img src={Image5} alt="Grid item 1" id="content-img-mob"  />
        </Grid>
        <Grid xs={7} mt={5} container  direction="row" justifyContent="center" alignItems="center">
                         <Typography id="content-head-mob" >Our Mission</Typography>
                         <Typography id="content-text-mob" className='mt-3' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    </Grid>

                </Grid>
                <Grid xs={12} mt={2} mb={5}  container direction="row" justifyContent="space-between" alignItems="center">
                <Grid xs={7} mt={5} container  direction="row" justifyContent="center" alignItems="center">
                         <Typography  id="content-head-mob"  >Our Vision</Typography>
                         <Typography id="content-text-mob" className='mt-3'  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    </Grid>
                <Grid  item xs={4} mt={5} container direction="row" justifyContent="center"  alignItems="center" >
          <img src={Image5} alt="Grid item 1" id="content-img-mob"  />
        </Grid>
        

                </Grid>
            </Container>
            <Footer />
         </>
        ):(
        <>
        <NavBar />
<Container maxWidth="lg"> {/* Use 'lg' for better responsiveness */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      textAlign: 'center',
    }}
  >
    <Typography variant="h2" id='head-text'>
      About Us
    </Typography>
    <img
      src={Image3}
      alt="Description"
      style={{
        width: '100%',
        height: '90%',
        opacity: 0.5,
        objectFit: 'cover',
        zIndex: 0,
      }}
    />
  </Box>
</Container>

<Container>
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12} md={10} container direction="column" alignItems="center">
      <Typography sx={{ fontSize: { xs: '28px', md: '38px' }, color: "#000", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
        Our Team
      </Typography>
      <Typography className='mt-3' sx={{ fontSize: { xs: '16px', md: '20px' }, color: "#000", fontFamily: "Anton, sans-serif", fontStyle: "italic", textAlign: "left" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </Grid>
  </Grid>
</Container>

<Container>
  <Grid mt={5} container justifyContent="space-between" alignItems="center">
    <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Image5} id="image-style" alt="Grid item 1" style={{ width: '100%', height: 'auto' }} />
    </Grid>
    <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Image1} id="image-style" alt="Grid item 2" style={{ width: '100%', height: 'auto' }} />
    </Grid>
    <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Image2} id="image-style" alt="Grid item 3" style={{ width: '100%', height: 'auto' }} />
    </Grid>
    <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Image3} id="image-style" alt="Grid item 4" style={{ width: '100%', height: 'auto' }} />
    </Grid>
  </Grid>
</Container>

<Container>
  <Grid xs={12} mt={5} mb={5} container direction="row" justifyContent="space-evenly" alignItems="center">
    <Grid item xs={12} md={4} mt={5} container direction="row" justifyContent="center" alignItems="center">
      <img src={Image5} alt="Grid item 1" id='content-img' style={{ width: '100%', height: 'auto' }} />
    </Grid>
    <Grid item xs={12} md={6} mt={5} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
      <Typography id="content-head">Our Mission</Typography>
      <Typography className='mt-3' id="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
    </Grid>
  </Grid>

  <Grid xs={12} mt={5} mb={5} container direction="row" justifyContent="space-evenly" alignItems="center">
    <Grid item xs={12} md={6} mt={5} container direction="column" justifyContent="space-evenly" alignItems="flex-end">
      <Typography id="content-head">Our Vision</Typography>
      <Typography className='mt-3' id="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
    </Grid>
    <Grid item xs={12} md={4} mt={5} container direction="row" justifyContent="center" alignItems="center">
      <img src={Image5} alt="Grid item 1" id='content-img' style={{ width: '100%', height: 'auto' }} />
    </Grid>
  </Grid>
</Container>
<Footer />
        </>
    )}

        </>

    )
}
export default About