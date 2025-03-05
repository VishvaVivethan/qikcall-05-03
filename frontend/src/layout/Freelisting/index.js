import { Container, Typography, Grid, List, ListItem, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Thumbsup from '../../assets/img/manup.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';

function FreeListing() {
    const [email,setEmail] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
      };

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

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
       
      } else if (result.status_code === 400) {
        console.log(result,"email not sent")
      }
    })
    .catch(error => console.log('error', error));
    
        }catch(error){
          console.error(error)
        }
      }
    

    return (
        <>
           {isMobile ? (
           <>
           <NavBar/>
           <Container  sx={{marginTop:"15px"}} >
            <Grid mt={3} mb={3} sx={{border:"1px solid #000",padding:"5px"}}>
            <Grid xs={12} mt={3}   container direction="row" justifyContent="space-between" alignItems="center">
              <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start">
               <Grid>
               <Typography sx={{ fontSize: "30px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}><b>Sign in</b></Typography>
              <Typography sx={{ fontSize: "15px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>Log in your account</Typography>
              <Typography sx={{ fontSize: "15px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginTop:"3px",marginBottom:"15px" }}>To log in, please enter your Whatsapp number</Typography>
                </Grid> 
               <Grid mb={1}>
               <TextField
      sx={{
        width: '250px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          '&:hover fieldset': {
            borderColor: '#2d2859', // Change to your desired hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#2d2859',
           
            color: 'black' 
          },
          '&.Mui-focused': {
            backgroundColor: '#f7f4cd', // Background color when focused
            color: 'black', // Text color when focused
          },
        },
      }}
      value={email}
      placeholder="Phone Number"
      variant="outlined"
      onChange={(e) => { setEmail(e.target.value); }}
    />
               </Grid>
               <Typography sx={{ fontSize: "10px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginTop:"3px",marginBottom:"15px" }}>This will allow as to verify your identify and great<br/>you acess to your account,if you encounter any<br/>issues or need assistance, don't hesitate to reach out to our support team</Typography>
               <Grid mb={6} mt={3}  container
  direction="column"
  justifyContent="space-evenly"
  alignItems="center">
               <Button sx={{
                backgroundColor: "#2d2859", marginLeft:"8px", borderRadius: "34px", color: "#fff", width: "250px", height: "60px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", '&:hover': { backgroundColor: "#2d2859" }
            }} >Get OTP from your number</Button>
               </Grid>
             </Grid>  
            </Grid>
            </Grid>
           </Container>
           <Footer/>
           </>
        ):(
        <>
         <NavBar />

<Container className='mt-5 mb-5' sx={{ backgroundColor: "#F4F3DE", border: "1px solid #000",width:"1000px",height:"auto"}}>
    <Grid xs={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Grid xs={8} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
            <Grid>
            <Typography sx={{ fontSize: "30px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}><b>List Your Buisness for Free</b></Typography>
            </Grid>
            <Grid mt={3} mb={3} container direction="row" justifyContent="flex-start" alignItems="center">
            <TextField sx={{width:"450px"}} placeholder="Enter Your Email id" value={email}
      onChange={(e) => { setEmail(e.target.value); }} variant="outlined" />
            <Button onClick={()=>{sendEmail()}} sx={{
                backgroundColor: "#2d2859", marginLeft:"8px", borderRadius: "12px", color: "#fff", width: "auto", height: "50px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", '&:hover': { backgroundColor: "#2d2859" }
            }} >Log in</Button>
            </Grid>
            <Grid>
            <List>
                <ListItem disablePadding>
                    <FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "10px" }} />
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "17px",color:"#2d2859" }} ><b>Get Discovered and Create your Online buisness</b> </Typography>
                </ListItem>
                <ListItem disablePadding>
                    <FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "10px" }} />
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "17px",color:"#2d2859" }} ><b>Respond to Customer Reviews and Questions</b></Typography>
                </ListItem>
                <ListItem disablePadding>
                    <FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "10px" }} />
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "17px",color:"#2d2859" }} ><b>Showcase Your Products and Service Offerings</b></Typography>
                </ListItem>
                
            </List>
            </Grid>
        </Grid>
        <Grid xs={2} container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <img src={Thumbsup} alt='man' width={"300px"} height={"400px"} />
        </Grid>
    </Grid>
</Container>
<Container className='mt-5 mb-5' sx={{ backgroundColor: "#F4F3DE", border: "1px solid #000",width:"1000px",height:"auto"}}>
    <Grid xs={12} container direction="row" justifyContent="space-evenly"alignItems="center">
        <Grid xs={8} mt={6} container direction="column" justifyContent="space-evenly"alignItems="flex-start">
           <Grid mt={2}> <Typography  sx={{ fontSize: "35px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>Get Free Businees Listing 3 Steps </Typography></Grid>
            <Grid mt={3}>
            <Typography  sx={{ fontSize: "18px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",opacity:0.5,marginBottom:"15px" }}><b>Step1:</b></Typography>
            <Typography sx={{ fontSize: "35px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginBottom:"15px" }}><b>Sign up or Log in</b></Typography>
            <Typography sx={{ fontSize: "18px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginBottom:"15px" }}>stay by signing up for an account on the website if you haven't already.<br/>if you are already registered,log in to your account </Typography>
        </Grid>
        <Grid mt={3}>
            <Typography  sx={{ fontSize: "18px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",opacity:0.5,marginBottom:"15px" }}><b>Step2:</b></Typography>
            <Typography sx={{ fontSize: "35px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginBottom:"15px" }}><b>Create Your Listing</b></Typography>
           
                    
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "18px",color:"#2d2859",marginBottom:"10px" }} ><FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "15px" }} />Click on "Create Listing" </Typography>
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "18px",color:"#2d2859",marginBottom:"10px" }} ><FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "15px" }} />Fill out the listing Form with details about what you are offering.<br/> include a clear title, description, category<br/>(if applicable),price(if selling) and any other relevant information </Typography>
                    <Typography sx={{ fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic", fontSize: "18px",color:"#2d2859",marginBottom:"15px" }} ><FiberManualRecordIcon sx={{ color: "#2d2859", marginRight: "5px", fontSize: "15px" }} />Upload the photos if website allows and if applicable,<br/>as visuals can attract more attention to your</Typography>

        </Grid>
        <Grid mt={3} mb={3}>
            <Typography  sx={{ fontSize: "18px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",opacity:0.5,marginBottom:"15px" }}><b>Step3:</b></Typography>
            <Typography sx={{ fontSize: "35px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginBottom:"15px" }}><b>Publish</b></Typography>
            <Typography sx={{ fontSize: "18px",color:"#2d2859",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic",marginBottom:"15px" }}>Once statisfied,click the "Publish" or "Submit" button to<b/> make your listing live on the website</Typography>
        </Grid>
        </Grid>
    </Grid>
</Container>


<Footer />
        </>
    )}

        </>
    )
}

export default FreeListing