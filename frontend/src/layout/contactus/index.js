import React, { useState,useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent,TextField,Button } from '@mui/material';
import { Input as BaseInput } from '@mui/base/Input';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width:"100px",
  height:"120px"
}));

const Input = React.forwardRef(function CustomInput(props, ref) {
  return (
    <BaseInput
      slots={{
        
        root: RootDiv,
        input: 'input',
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled(TextareaAutosize)(
  ({ theme }) => `
  width:600px;
  font-family: Anton, sans-serif;
font-style: italic;
  font-size: 0.875rem;
  
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 2px;
  color: ${theme.palette.mode === 'dark' ? '#2d2859' : "#2d2859"};
  background: ${theme.palette.mode === 'dark' ? '#fff' : "#fff"};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#818283' : "#818283"};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  &:hover {
    border-color: #2d2859;
  }

  &:focus {
    border-color: #2d2859;
    box-shadow: 0 0 0 3px #fff;
  } `,
);

function Contactus() {

const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [number,setNumber]= useState('')
const [message,setMessage]= useState('')


const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
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
      <Container id="container-mob">
      <Box id="centerBox-mob">
        <Typography variant="h5" id="typography-mob">
          Contact us
        </Typography>
      </Box>
    </Container>
    
  <Grid mt={4} container direction="row" justifyContent="space-around" alignItems="center">
    <Grid item xs={3.5} container direction="column" justifyContent="flex-start" alignItems="center">
      <Item id="item-mob">
        <Grid container justifyContent="center" alignItems="center" id="grid-mob">
          <LocationOnIcon id="icon-mob" />
        </Grid>
        <Typography className="header-mob">
          Location
        </Typography>
        <Typography sx={{ fontSize: '6px', color: '#2d2859', textAlign: 'center', fontFamily: 'Anton, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
          <b>Lorem ipsum dolor sit amet consectetur.</b>
        </Typography>
      </Item>
    </Grid>

    <Grid item xs={3.5} container direction="column" justifyContent="center" alignItems="center">
      <Item id="item-mob">
        <Grid container justifyContent="center" alignItems="center" id="grid-mob">
          <PhoneIcon id="icon-mob" />
        </Grid>
        <Typography className="header-mob">
          Contact
        </Typography>
        <Typography sx={{ fontSize: '6px', color: '#2d2859', textAlign: 'center', fontFamily: 'Anton, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
          <b>044-784582638<br />8754901237</b>
        </Typography>
      </Item>
    </Grid>

    <Grid item xs={3.5} container direction="column" justifyContent="flex-start" alignItems="center">
      <Item id="item-mob">
        <Grid container justifyContent="center" alignItems="center" id="grid-mob">
          <EmailIcon id="icon-mob" />
        </Grid>
        <Typography className="header-mob">
          Email
        </Typography>
        <Typography sx={{ fontSize: '6px', color: '#2d2859', textAlign: 'center', fontFamily: 'Anton, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
          <b>qikcall@gmail.com<br />call34@gmail.com</b>
        </Typography>
      </Item>
    </Grid>
  </Grid>




      <Container sx={{ marginTop: "20px",marginBottom:"20px" }} >
        <Grid xs={12} mt={10} mb={4} container direction="row" justifyContent="space-evenly" alignItems="flex-start">
          <Grid  container  direction="row"  justifyContent="space-evenly"  alignItems="flex-start">
          <Typography id="form-head-mob" >
               <b>Send Us a Message </b>
           </Typography>
           <Typography id="form-text-mob" >
               <b>Give us chance to serve and bring magic to your brand</b>
           </Typography>
           <Grid mt={4}  container direction="row" justifyContent="space-between" alignItems="center">
           <Grid >
           <Typography className='mb-2'  id="input-text-mob">
               Fullname
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={name}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
          width:"150px"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: name ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: name ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setName(e.target.value); }}
    />
           </Grid>
    <Grid>
    <Typography className='mb-2' id="input-text-mob">
              Email
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={email}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
          width:"150px"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: email ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: email ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setEmail(e.target.value); }}
    />
    </Grid>
           </Grid>
           <Grid xs={12} mt={2} container direction="row" justifyContent="flex-start"  alignItems="center">
           <Typography className='mb-2' id="input-text-mob">
             Phone number
           </Typography>
           <TextField
      id="outlined-basic"
      fullWidth
      value={number}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: number ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: number ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setNumber(e.target.value); }}
    />
           </Grid>
           <Grid xs={12} mt={2} container direction="column" justifyContent="flex-start" alignItems="flex-start">
           <Typography className='mb-2' id="input-text-mob">
             Message
           </Typography>
           <Input aria-label="Demo input" value={message} onChange={(e) => { setMessage(e.target.value); }} multiline placeholder="May I Help You" />
           </Grid>
           <Grid mt={4}>
           <Button id="button-mob">Submit</Button>
           </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
            <Grid item xs={10} >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.017850728938!2d-122.41941868468119!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d28366c897%3A0x7dff6e35aa1edbfa!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623674643501!5m2!1sen!2sus"
          title="Qik call maps"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Grid> 
        </Grid>
      </Container>
      <Footer />
      </>
    ):(
    <>
    <NavBar />
      <Container maxWidth="1200px" id="container" >
        <Box id="centerBox">
          <Typography variant='h1' id="typography" >
            Contact us
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
    <Grid item xs={12} container spacing={2} justifyContent="space-evenly" alignItems="center" style={{ padding: '20px' }}>
      
      <Grid item xs={12} sm={6} md={4} container justifyContent={{ xs: 'center', sm: 'flex-end' }} alignItems="center">
        <Card id="card" variant="outlined">
          <Box id="centerBox">
            <CardContent id="cardcontent">
              <Grid id="grid">
                <LocationOnIcon id="icon" />
              </Grid>
              <Typography id="header">Location</Typography>
              <Typography id="text">
                Lorem ipsum dolor sit amet consectetur.<br /> Aliquam mauris amet cursus hendrerit.
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
        <Card variant="outlined" id="card">
          <Box id="centerBox">
            <CardContent id="cardcontent">
              <Grid id="grid">
                <PhoneIcon id="icon" />
              </Grid>
              <Typography id="header" component="div">Contact</Typography>
              <Typography id="text">
                044-784582638<br />8754901237
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} container justifyContent={{ xs: 'center', sm: 'flex-start' }} alignItems="center">
        <Card variant="outlined" id="card">
          <Box id="centerBox">
            <CardContent id="cardcontent">
              <Grid id="grid">
                <EmailIcon id="icon" />
              </Grid>
              <Typography id="header" component="div">Email</Typography>
              <Typography id="text">
                qikcall@gmail.com<br />call34@gmail.comm
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>

    </Grid>
  </Grid>
</Container>

      <Container sx={{ marginTop: "20px",marginBottom:"20px" }} >
        <Grid xs={12} mt={10} mb={8} container direction="row" justifyContent="space-evenly" alignItems="center">
          <Grid xs={5} container  direction="column"  justifyContent="center"  alignItems="flex-start">
          <Typography id="form-head" >
               <b>Send Us a Message </b>
           </Typography>
           <Typography id="form-text" >
               <b>Give us chance to serve and bring magic to your brand</b>
           </Typography>
           <Grid mt={4}  container direction="row" justifyContent="space-between" alignItems="center">
           <Grid >
           <Typography id="input-text" className='mb-2' >
               Fullname
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={name}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: name ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: name ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setName(e.target.value); }}
    />
           </Grid>
    <Grid>
    <Typography className='mb-2' id="input-text">
              Email
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={email}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: email ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: email ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setEmail(e.target.value); }}
    />
    </Grid>
           </Grid>
           <Grid xs={12} mt={2} container direction="row" justifyContent="flex-start"  alignItems="center">
           <Typography className='mb-2' id="input-text">
             Phone number
           </Typography>
           <TextField
      id="outlined-basic"
      fullWidth
      value={number}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: number ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: number ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setNumber(e.target.value); }}
    />
           </Grid>
           <Grid xs={12} mt={2} container direction="column" justifyContent="flex-start" alignItems="flex-start">
           <Typography className='mb-2' id="input-text">
             Message
           </Typography>
           <Input aria-label="Demo input" value={message} onChange={(e) => { setMessage(e.target.value); }} multiline placeholder="May I Help You" />
           </Grid>
           <Grid mt={4}>
           <Button id="button">Submit</Button>
           </Grid>
          </Grid>
          <Grid item xs={4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.017850728938!2d-122.41941868468119!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d28366c897%3A0x7dff6e35aa1edbfa!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623674643501!5m2!1sen!2sus"
          title="Qik call maps"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )}
    </>
  );
}

export default Contactus;
