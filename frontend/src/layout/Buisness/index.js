import React ,{useEffect,useState}from 'react';
import { Box, Typography, Grid, TextField, Container,Button } from '@mui/material';
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import './style.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Refer from '../../assets/qik call web view icons and image size/megaphone1.png'
import Cash from '../../assets/qik call web view icons and image size/refund1.png'
import Image from '../../assets/img/image1.jpeg'
import Image1 from '../../assets/img/image2.jpeg'
import Image2 from '../../assets/img/image3.jpeg'
import Image3 from '../../assets/img/image4.jpeg'
import Image4 from '../../assets/img/image5.jpeg'
import Image5 from '../../assets/img/image6.jpeg'


const Business = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 735);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
      };

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    

    const images = [
        Image,Image1,Image2,Image3,Image4,Image5
      ];

      const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };


    return (
        <>
        {isMobile ? (
        <>
        <NavBar />
        <Container>
            <Box id="box-start-mob">
                <Typography variant="h2" id="image-text-mob" >
                    List Your  Business
                </Typography>
                <img
                    src={'https://colorado.edu/business/sites/default/files/article-image/msba-lede.jpg'}
                    alt="Description"
                    style={{
                        width: '100%',
                        height: '90%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                />
            </Box>
            </Container>
           <Container>
            <Box>
                <Grid container rowspacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '80%' }}  placeholder="Name" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="Pincode" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="Area" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="City" variant="outlined" />
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="Phone Number" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="Street/Colony name" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="Land Mark" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '80%' }} placeholder="State" variant="outlined" />
                    </Grid>
                </Grid>
            </Box>
            </Container>

            <Container >
            <Grid  container direction="column" justifyContent="center" mt={4} id="description-head-mob"  >
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#000',textAlign:"left",fontSize:"15px",fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>
                <b>Business Description </b>
            </Typography>
            <Typography className='mt-2' variant="body1" id="description-body-mob" >
                Lorem ipsum dolor sit amet consectetur. Non mauris dictum semper tellus feugiat dictumst. Tempus pellentesque viverra elementum fringilla at tristique lorem auctor. Diam suspendisse amet diam facilisis feugiat vestibulum tincidunt. Adipiscing in sed odio ut mauris sapien consequat morbi.
            </Typography>
        </Grid>
        </Container>
<Container>
        <Grid xs={12} container direction="row" justifyContent="space-between"  alignItems="center" mt={4}>
            <Grid xs={5} id="box-mob"  container direction="row" justifyContent="center" alignItems="center" >
             <Grid >
               <img src={Refer} alt="logo" width="50px" height="50px"/>
               </Grid>
               <Grid>
               <Typography  sx={{ color: '#000',textAlign:"right",fontSize:"23px", paddingLeft:"8px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>
                <b>Refer & Earn</b>
            </Typography>
               </Grid>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5} id="box-mob" container direction="row" justifyContent="center" alignItems="center" >
               <Grid>
               <img src={Cash} alt="logo" width="50px" height="50px"/>
               </Grid>
               <Grid>
               <Typography sx={{ color: '#000',textAlign:"right",fontSize:"25px", paddingLeft:"8px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>
              <b> Cashback</b>
            </Typography>
               </Grid>
            </Grid>
            </Grid>
            </Container>
            <Container>
                <Grid xs={12} mt={4} id="gird-mob"  container direction="row" justifyContent="space-around"  alignItems="center">
                <input
        id="file-input"
        type="file"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />
      <Button id="upload-btn" variant="contained" onClick={handleUploadClick}>
        <FileUploadIcon /> Upload Your Business Documents
      </Button>

      <Grid container direction="column" alignItems="center" style={{ marginTop: '20px' }}>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </Grid>
                </Grid>
            </Container>
            <Container>
      <Grid mt={5} container  item xs={12} 
  direction="row"
  justifyContent="space-between"
  alignItems="center">
        <Grid  item xs={3} >
          <img src={Image2} alt="Grid item 1" id="image-style-mob"  />
        </Grid>
        <Grid item xs={3} >
          <img src={Image1} alt="Grid item 2" id="image-style-mob" />
        </Grid>
        <Grid item xs={3} >
          <img src={Image3} alt="Grid item 3" id="image-style-mob" />
        </Grid>
        
      </Grid>
      <Grid mt={4} container  item xs={12} 
  direction="row"
  justifyContent="space-between"
  alignItems="center">
        <Grid  item xs={3} >
          <img src={Image3} alt="Grid item 1" id="image-style-mob" />
        </Grid>
        <Grid item xs={3} >
          <img src={Image4} alt="Grid item 2" id="image-style-mob" />
        </Grid>
        <Grid item xs={3} >
          <img src={Image5} alt="Grid item 3" id="image-style-mob" />
        </Grid>
        
      </Grid>
     <Grid mt={2} mb={4} container
  direction="row"
  justifyContent="center"
  alignItems="center">
     <Button id="button-mob"  variant='contained'>
          Save & Continue
        </Button>
     </Grid>
    </Container>
                 
     
            <Foot />

        </>
    ):(
    <>
    <NavBar />
            <Box id="box-start">
                <Typography variant="h2" id="image-text" >
                    List Your  Business
                </Typography>
                <img
                    src={'https://colorado.edu/business/sites/default/files/article-image/msba-lede.jpg'}
                    alt="Description"
                    id="box-image"
                />
            </Box>

            <Box>
                <Grid container rowspacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item sm={12} md={6} lg={4}>
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Name" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Pincode" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Area" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="City" variant="outlined" />
                    </Grid>
                    <Grid item sm={12} md={6} lg={4}>
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Phone Number" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Street/Colony name" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="Land Mark" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} placeholder="State" variant="outlined" />
                    </Grid>
                </Grid>
            </Box>

            <Container >
            <Grid  container direction="column"  justifyContent="center" mt={4}  sx={{ border: '1px solid #000', padding: 5,backgroundColor:"#F4F3DE",height:"300px"}}>
            <Typography variant="h6" component="h2" id="description-head" gutterBottom >
                <b>Business Description </b>
            </Typography>
            <Typography className='mt-2' id="description-body" variant="body1" >
                Lorem ipsum dolor sit amet consectetur. Non mauris dictum semper tellus feugiat dictumst. Tempus pellentesque viverra elementum fringilla at tristique lorem auctor. Diam suspendisse amet diam facilisis feugiat vestibulum tincidunt. Adipiscing in sed odio ut mauris sapien consequat morbi.
            </Typography>
        </Grid>
        </Container>
<Container>
        <Grid xs={12} container direction="row" justifyContent="space-between"  alignItems="center" mt={4}>
            <Grid xs={5} sx={{border: '1px solid #000',backgroundColor:"#fff",height:"120px"}} container direction="row" justifyContent="center" alignItems="center" >
             <Grid >
               <img src={Refer} alt="logo" width="77px" height="77px"/>
               </Grid>
               <Grid>
               <Typography  sx={{ color: '#000',textAlign:"right",fontSize:"25px", paddingLeft:"8px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>
                <b>Refer & Earn</b>
            </Typography>
               </Grid>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5} container direction="row" justifyContent="center" alignItems="center" sx={{border: '1px solid #000',backgroundColor:"#fff",height:"120px"}} >
               <Grid>
               <img src={Cash} alt="logo" width="77px" height="77px"/>
               </Grid>
               <Grid>
               <Typography sx={{ color: '#000',textAlign:"right",fontSize:"25px", paddingLeft:"8px", fontFamily: "Anton, sans-serif",fontWeight:"bold",fontStyle:"italic" }}>
              <b> Cashback</b>
            </Typography>
               </Grid>
            </Grid>
            <Grid>

            </Grid>
            </Grid>
            </Container>
            <Container>
            <Grid
  xs={12}
  mt={4}
  id="gird"
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
>
  <input
    id="file-input"
    type="file"
    style={{ display: 'none' }}
    multiple
    onChange={handleFileChange}
  />
  
  <Grid item container
  direction="column"
  justifyContent="center"
  alignItems="center">
    <Button id="upload-button" variant="contained" onClick={handleUploadClick}>
      <FileUploadIcon /> Upload Your Business Photos
    </Button>
  </Grid>

  <Grid container direction="column" alignItems="center" style={{marginTop:"5px"}}>
    {selectedFiles.length > 0 && (
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    )}
  </Grid>
</Grid>

            </Container>
            <Container>
                 
      <Grid container mt={4} mb={3} direction="row" justifyContent="space-evenly"  alignItems="center">
        {images.map((src, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} mt={2}container direction="row" justifyContent="space-evenly"  alignItems="center">
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
      <Grid mt={2} mb={4} container
  direction="row"
  justifyContent="center"
  alignItems="center">
     <Button id="button-save" variant='contained'>
          Save & Continue
        </Button>
     </Grid>
            </Container>
            <Foot />

    </>
)}
        </>
    );
}

export default Business;
