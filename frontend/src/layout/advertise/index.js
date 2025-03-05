import React ,{useEffect,useState}from 'react';
import { Box, Typography, Grid, TextField, Container,Button,Snackbar,Alert } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import './style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Image from '../../assets/img/image1.jpeg'
import Image1 from '../../assets/img/image2.jpeg'
import Image2 from '../../assets/img/image3.jpeg'
import Image3 from '../../assets/img/image4.jpeg'
import Image4 from '../../assets/img/image5.jpeg'
import Image5 from '../../assets/img/image6.jpeg'


import Banner from '../../assets/image/sidead2.png'



const VisuallyHiddenInput = ({ onChange }) => (
  <input
    type="file"
    style={{ display: 'none' }}
    onChange={onChange}
  />
);

function Advertise(){
    
    const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [color, setColor] = useState('');
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 599);
      };

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const images = [
        Image,Image1,Image2,Image3,Image4,Image5
      ];
    
      const [aadhar, setAadhar] = useState('');
      const [pan, setPan] = useState('');
      const [Proof, setProof] = useState('');
      const [ad, setAd] = useState([]); 

  const handleAadhar = (event) => {
    const files = event.target.files;
    setAadhar(files);
    console.log(files); // Here you can do something with the selected files
  };

  const handlePan = (event) => {
    const files = event.target.files;
    setPan(files);
    console.log(files); // Here you can do something with the selected files
  };

  const handleProof = (event) => {
    const files = event.target.files;
    setProof(files);
    console.log(files); // Here you can do something with the selected files
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files, "files from event");
    setAd(files);
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const uploadimages = async () => {
    try {
      const uploadedImageUrls = await Promise.all(ad.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary upload preset
  
        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.secure_url) {
          console.log(data.secure_url,"data")
          return data.secure_url;
        } else {
          setOpen(true);
          setColor('error');
          setMsg("Failed to upload image");
          throw new Error('Failed to upload image.');
        }
      }));
  
      return uploadedImageUrls;
    } catch (error) {
      setOpen(true);
            setColor('error');
            setMsg("Upload Images Error");
      throw error;
    }
  };

  const uploadgroup = async () => {
    try {
      // Function to upload a single file to Cloudinary
      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary upload preset
  
        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.secure_url) {
          return data.secure_url;
        } else {
          throw new Error('Failed to upload image.');
        }
      };
  
      // Upload all files in aadhar, pan, and proof
      const aadharUrls = await Promise.all([...aadhar].map(uploadFile));
      const panUrls = await Promise.all([...pan].map(uploadFile));
      const proofUrls = await Promise.all([...Proof].map(uploadFile));
  
      // Combine the URLs into a single object
      const uploadedGroupUrls = {
        aadhar: aadharUrls,
        pan: panUrls,
        proof: proofUrls,
      };
  
      console.log(uploadedGroupUrls);
      return uploadedGroupUrls;
  
    } catch (error) {
      setOpen(true);
      setColor('error');
      setMsg("Upload Images Error");
      throw error;
    }
  };


  
const [adtitle, setAdtitle] = useState('');
const [addescription, setAddescription] = useState('');
const [adcategory, setAdcategory] = useState('');
const [location, setLocation] = useState('');
const [pannumber, setPannumber] = useState('');
const [aadharnumber, setAadharnumber] = useState('');
const [emailid, setEmailid] = useState('');
const [contactnumber, setContactnumber] = useState('');
// const [startdates, setStartdates] = useState('');
// const [enddate, setEnddate] = useState('');
const [upload, setUpload] = useState({ "aadhar":aadhar, "pan":pan,"proof": Proof });
const [addimages, setAddimages] = useState('');

  const handleAdvertiseregister= async ()=>{
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      console.log(upload,"goodnight")

      const uploadedImageUrl = await uploadimages();

      const uploadedGroupUrl = await uploadgroup();
      
      const raw = JSON.stringify({
        "adtitle": adtitle,
        "addescription": addescription,
        "adcategory": adcategory,
        "location": location,
        "pannumber": pannumber,
        "aadharnumber": aadharnumber,
        "emailid": emailid,
        "contactnumber": contactnumber,
        "startdate": startDate,
        "enddate": endDate,
        "upload":uploadedGroupUrl,
        "addimages": uploadedImageUrl
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch("/api/advertise", requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
        } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
    })
    .then((result) => {
        if (result.status_code === 200) {
            console.log(result.data)
            setOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");

        } else if (result.status_code === 400) {
            setOpen(true);
            setColor('error');
            setMsg(result.data.msg);

        } })
        .catch((error) => console.error(error));
    }catch(error){

    }
  }


    return(
        <>
        {isMobile ? (
        
        <>
        <NavBar/>
        <Container>
        <Grid item xs={12} mt={3}>
          <img src={Banner} alt="banner" width="100%" height={isMobile ? "200px" : "400px"} />
        </Grid>
      </Container>
      
      <Container maxWidth="100%">
        <Grid item xs={12} mt={5} container direction="row" justifyContent="center" alignItems="center">
          <Grid xs={12} md={7} container direction="column" justifyContent="space-evenly" alignItems="center">
            <Grid>
              <Typography 
                sx={{
                  fontSize: isMobile ? "24px" : "40px", 
                  fontFamily: "Anton, sans-serif", 
                  fontWeight: "bold", 
                  fontStyle: "italic", 
                  textAlign: "center"
                }}
              >
                Optimizing customer
              </Typography>
              <Typography 
                sx={{
                  fontSize: isMobile ? "24px" : "40px", 
                  fontFamily: "Anton, sans-serif", 
                  fontWeight: "bold", 
                  fontStyle: "italic", 
                  textAlign: "center"
                }}
              >
                support like never before
              </Typography>
            </Grid>
            <Grid>
              <Typography 
                mt={2} 
                sx={{
                  fontSize: isMobile ? "10px" : "13px", 
                  fontFamily: "Anton, sans-serif", 
                  fontStyle: "italic", 
                  textAlign: "center"
                }}
              >
                Stop advertising to save money is like stopping your watch<br /> to save time
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container mt={2} spacing={2} sx={{ backgroundColor: '#f7f4cd', padding: 3 }}>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
              <Box>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Grid item xs={12} sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                    <TextField sx={{ marginTop: '20px', width: '100%' }}  
                     onChange={(e)=>{
                      setAdtitle(e.target.value)
                    }}
                     placeholder="AD Title" 
                     variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }} 
                    onChange={(e)=>{
                      setAddescription(e.target.value)
                    }}
                    placeholder="AD Description" 
                    variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }}
                    onChange={(e)=>{
                      setPannumber(e.target.value)
                    }}
                    placeholder="Pan Number" 
                    variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }} 
                    onChange={(e)=>{
                      setContactnumber(e.target.value)
                    }}
                    placeholder="Contact Number" 
                    variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                    <TextField sx={{ marginTop: '20px', width: '100%' }} 
                    onChange={(e)=>{
                      setAdcategory(e.target.value)
                    }}
                    placeholder="AD Category" 
                    variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }} 
                    onChange={(e)=>{
                      setAdcategory(e.target.value)
                    }}
                    placeholder="Location" 
                    variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }}
                    onChange={(e)=>{
                      setEmailid(e.target.value)
                    }}
                    placeholder="Email id" 
                    variant="outlined" />
                    <TextField sx={{ marginTop: '20px', width: '100%' }}
                    onChange={(e)=>{
                      setAadharnumber(e.target.value)
                    }} 
                    placeholder="Aadhar number" 
                    variant="outlined" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid mt={3} item xs={12} container direction="row" justifyContent="flex-start" alignItems="center">
              <Typography variant="h6" sx={{ color: '#1A1A60', textAlign: "left" }}>
                Duration:
              </Typography>
            </Grid>
            <Grid mt={1} xs={12} container direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs={4.5} >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params}  variant="outlined" InputLabelProps={{ style: { color: '#000' } }} />
                  )}
                />
              </Grid>
              <Grid item xs={4.5} >
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params}  variant="outlined" InputLabelProps={{ style: { color: '#000', } }} />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Container>
      <Container>
  <Grid mt={3} container direction="row" justifyContent="space-evenly" alignItems="center">
    {/* First Row */}
    <Grid item xs={5} display="flex" justifyContent="center">
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: '#1A1A60',
          color: '#FFFFFF',
          padding: '5px 10px',
          fontSize: '10px',
        }}
      >
        Upload Your Aadhar
        <VisuallyHiddenInput onChange={handleAadhar} />
      </Button>
      {aadhar && (
        <Grid item mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(aadhar).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
    </Grid>
    <Grid item xs={5} display="flex" justifyContent="center">
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: '#1A1A60',
          color: '#FFFFFF',
          padding: '5px 10px',
          fontSize: '10px',
        }}
      >
        Upload Your Pan Number
        <VisuallyHiddenInput onChange={handlePan} />
      </Button>
      {pan && (
        <Grid item mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(pan).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
    </Grid>
    {/* Second Row */}
    <Grid item xs={5} display="flex" justifyContent="center" mt={3}>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: '#1A1A60',
          color: '#FFFFFF',
          padding: '5px 10px',
          fontSize: '10px',
        }}
      >
        Upload Your Business Proof
        <VisuallyHiddenInput onChange={handleProof} />
      </Button>
      {Proof && (
        <Grid item mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(Proof).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
    </Grid>
    <Grid item xs={5} display="flex" justifyContent="center" mt={3}>
      <input
        id="file-input"
        type="file"
        style={{ display: 'none' }}
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
      <Button
        sx={{
          backgroundColor: '#1A1A60',
          color: '#FFFFFF',
          padding: '5px 10px',
          fontSize: '10px',
        }}
        variant="contained"
        onClick={handleUploadClick}
      >
        <FileUploadIcon /> Upload Your Photos or Videos
      </Button>
      {ad.length > 0 && (
        <Grid item mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {ad.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
    </Grid>
  </Grid>
</Container>


      <Container>
      <Grid container mt={5} mb={3} direction="row" justifyContent="space-evenly" alignItems="center">
  {images.map((src, index) => (
    <Grid 
      item xs={4} sm={4} md={4} key={index} mt={3} 
      container direction="row" justifyContent="center" alignItems="center">
      <Grid
        item
        xs={12} container direction="row" justifyContent="center" alignItems="center"
      >
        <Box
          component="img"
          src={src}
          alt={`image-${index}`}
          sx={{
            width: {
              xs: '90px', 
              
            },
            height: {
              xs: '90px',
              
            },
            borderRadius: 1,
          }}
        />
      </Grid>
    </Grid>
  ))}
</Grid>
<Grid mt={4} mb={4} container
  direction="row"
  justifyContent="center"
  alignItems="center">
     <Button id="button-ads-mob" onClick={handleAdvertiseregister} variant='contained'>
          Post Your Ad's
        </Button>
     </Grid>
      </Container>
        <Foot/>
        </>
    ):(
    <>
    <NavBar/>
    <Container >
        <Grid item xs={12} >
            <img src={Banner} alt="banner" width="100%" height="400px" />
        </Grid>
    </Container>
    <Container maxWidth="100%">
        <Grid item xs={12} mt={5}  container direction="row" justifyContent="center" alignItems="center">
            <Grid xs={7}  container direction="column" justifyContent="space-evenly" alignItems="center">
                <Grid>
                <Typography sx={{fontSize:"40px",fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic",textAlign:"center"}}  >
                    Optimizing customer
                </Typography>
                <Typography sx={{fontSize:"40px",fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic",textAlign:"center"}}  >
                   support like never before
                </Typography>
                </Grid>
                <Grid>
                <Typography mt={2} sx={{fontSize:"13px",fontFamily: "Anton, sans-serif", fontStyle: "italic",textAlign:"center"}}  >
                  Stop advertising to save money is like stopping your watch<br/> to save time
                </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Container>
    <Container>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container mt={2} spacing={2} sx={{ backgroundColor: '#f7f4cd', padding: 3 }}>
        <Grid container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center">
         <Box>
                <Grid container rowspacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '100%' }}
                        onChange={(e)=>{
                          setAdtitle(e.target.value)
                        }}
                        placeholder="AD Title" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setAddescription(e.target.value)
                        }}
                        placeholder="AD Descrpition" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setPannumber(e.target.value)
                        }}
                        placeholder="Pan Number" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setContactnumber(e.target.value)
                        }}
                        placeholder="Contact Number" variant="outlined" />
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setAdcategory(e.target.value)
                        }}
                        placeholder="AD Category" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setLocation(e.target.value)
                        }}
                        placeholder="Location " variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setAadharnumber(e.target.value)
                        }}
                        placeholder=" Aadhar Number" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} 
                        onChange={(e)=>{
                          setEmailid(e.target.value)
                        }}
                        placeholder="Email id" variant="outlined" />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
      
        <Grid mt={3} item xs={12} container
  direction="row"
  justifyContent="flex-start"
  alignItems="center">
          <Typography variant="h6" sx={{ color: '#1A1A60', textAlign:"left" }}>
            Duration:
          </Typography>
        </Grid>
        <Grid
  mt={1}
  xs={6} sm={10}  
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
  <Grid item xs={3.5}>
    <DatePicker
      label="Start Date"
      value={startDate}
      onChange={(newValue) => setStartDate(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          style={{ width: 100 }}
          variant="outlined"
          InputLabelProps={{ style: { color: '#000' } }}
        />
      )}
    />
  </Grid>
  <Grid item xs={3.5}>
    <DatePicker
      label="End Date"
      value={endDate}
      onChange={(newValue) => setEndDate(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ borderRadius: "20px" }}
          variant="outlined"
          InputLabelProps={{ style: { color: '#000' } }}
        />
      )}
    />
  </Grid>
</Grid>

        
      </Grid>
    </LocalizationProvider>
    </Container>
    <Container>
    <Grid
      mt={3}
      xs={12}
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={3} display="column" justifyContent="center">
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: '#1A1A60',
            color: '#FFFFFF',
            padding: '10px 20px',
            fontSize:{xs:"15px",sm:"12px",md:"14px",lg:"16px"},
          }}
        >
          Upload Your Aadhar Proof
          <VisuallyHiddenInput onChange={handleAadhar} />
        </Button>
        {aadhar && (
        <Grid item  mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(aadhar).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
      </Grid>
      <Grid item xs={3} display="column" justifyContent="center">
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: '#1A1A60',
            color: '#FFFFFF',
            padding: '10px 20px',
            fontSize:{xs:"15px",sm:"12px",md:"14px",lg:"16px"},
          }}
        >
          Upload Your Pan Number
          <VisuallyHiddenInput onChange={handlePan} />
        </Button>
        {pan && (
        <Grid item  mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(pan).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
      </Grid>
      <Grid item xs={3} md={3} sm={3} display="column" justifyContent="center">
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: '#1A1A60',
            color: '#FFFFFF',
            padding: '10px 20px',
            fontSize:{xs:"15px",sm:"12px",md:"14px",lg:"16px"},
          }}
        >
          Upload Your Business proof
          <VisuallyHiddenInput onChange={handleProof} />
        </Button>
        {Proof && (
        <Grid item  mt={2}>
          <div>
            <strong>Selected Files:</strong>
            <ul>
              {Array.from(Proof).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Grid>
      )}
      </Grid>
      <Grid mt={5} item xs={12} container direction="row" justifyContent="center" alignItems="center">
  <Grid item xs={4.6} lg={5} sm={5} container direction="column" justifyContent="center" alignItems="center">
    <input
      id="file-input"
      type="file"
      style={{ display: 'none' }}
      multiple
      accept="image/*,video/*"  
      onChange={handleFileChange}
    />
    <Button 
      sx={{
        backgroundColor: '#1A1A60',
        color: '#FFFFFF',
        padding: '10px 20px',
        fontSize:{xs:"15px",sm:"12px",md:"14px",lg:"18px"},
        width:"100%"
      }} 
      variant="contained" 
      onClick={handleUploadClick}
    >
      <FileUploadIcon /> Upload Your Photos or Videos
    </Button>

    <Grid container direction="column" alignItems="center" style={{ marginTop: '20px' }}>
      {ad.length > 0 && (
        <div>
          <strong>Selected Files:</strong>
          <ul>
            {ad.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Grid>
  </Grid>
</Grid>
      
    </Grid>
    </Container>
       
       <Container>
       <Grid container mt={5} mb={3} direction="row" justifyContent="space-evenly"  alignItems="center">
        {images.map((src, index) => (
          <Grid  item xs={12} sm={6} md={4} key={index} mt={3}container direction="row" justifyContent="space-evenly"  alignItems="center">
            <Box
              component="img"
              src={src}
              alt={`image-${index}`}
              sx={{
                width: '300px',
                height: '200px',
                display: 'block',
                borderRadius: 1,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid mt={4} mb={4} container
  direction="row"
  justifyContent="center"
  alignItems="center">
     <Button id="button-ads" onClick={handleAdvertiseregister} variant='contained'>
          Post Your Ad's
        </Button>
     </Grid>
      
       </Container>
    <Foot/>
    </>
)}
 <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          variant="filled"
          
        >
          {msg}
        </Alert>
      </Snackbar>
        </>
    )
}

export default Advertise