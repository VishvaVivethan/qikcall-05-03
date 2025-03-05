import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Card,CardMedia, CardContent,IconButton, Typography, TextField, Container, Grid, Button,Avatar,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavBar from '../navbar';
import Footer from '../footer';
import './style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

const steps = ['', '', ''];

const CustomStepper = ({ activeStep }) => {
    return (
        <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel icon={index <= activeStep ? <CheckCircleIcon style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #0D1B2A' }} /> : <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #0D1B2A' }} />} />
                </Step>
            ))}
        </Stepper>
    );
};

const PageOne = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const [activeStep, setActiveStep] = useState(0);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [images, setImages] = useState([
        'https://via.placeholder.com/700x300', 
        'https://via.placeholder.com/700x300' 
      ]);
    
      const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
          const newImages = [...images];
          newImages[index] = URL.createObjectURL(file);
          setImages(newImages);
        }
      };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderFormContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    
                                    <Box component="form" sx={{ mt: 2 }}>
                                        <TextField
                                            label="Name"
                                            placeholder="Your Name"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Email"
                                            placeholder="Your Email id"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Number"
                                            placeholder="Your Number"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Alternative Number"
                                            placeholder="Your Alternative Number"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <Typography align='left' className='mb-3' sx={{ fontSize: "20px", fontWeight: 'bold' }}>
                                            Address:
                                        </Typography>
                                        <TextField
                                            label="Street"
                                            placeholder="Your Street/colony name"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Area"
                                            placeholder="Your Area name"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Landmark"
                                            placeholder="Your Area Landmark"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="Pincode"
                                            placeholder="Your Area pincode"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="City"
                                            placeholder="Your City"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                        <TextField
                                            label="State"
                                            placeholder="Your State"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            InputLabelProps={{
                                                sx: { color: '#0D1B2A' },
                                            }}
                                        />
                                    </Box>
                            
                );
            case 1:
                return (
                    <Box component="form" sx={{ mt: 2 }}>

<Grid mb={5} container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            sx={{ bgcolor: '#FFD700', width: "150px", height: "150px" }} 
          >
            Logo
          </Avatar>
        </Grid>
        <Grid item>
          <Typography sx={{fontSize:"40px",fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000"}} fontWeight="bold">
            Owner Name
          </Typography>
        </Grid>
      </Grid>
                       
                        <TextField
                            label="Store Name"
                            placeholder="Your Store name"
                            fullWidth
                            sx={{ marginBottom: 3 }}
                            InputLabelProps={{
                                sx: { color: '#0D1B2A' },
                            }}
                        />
                        <TextField
                            label="Pan Number"
                            placeholder="Your Pan Number"
                            fullWidth
                            sx={{ marginBottom: 3 }}
                            InputLabelProps={{
                                sx: { color: '#0D1B2A' },
                            }}
                        />
                        <TextField
                            label="GST Number"
                            placeholder="Your GST Number"
                            fullWidth
                            sx={{ marginBottom: 3 }}
                            InputLabelProps={{
                                sx: { color: '#0D1B2A' },
                            }}
                        />
                        <TextField
                            label="Store Description"
                            placeholder="Your Store Description"
                            fullWidth
                            sx={{ marginBottom: 3 }}
                            InputLabelProps={{
                                sx: { color: '#0D1B2A' },
                            }}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box component="form" sx={{ mt: 2 }}>
                          
        
        <FormControl fullWidth margin="normal">
          <TextField
            id="service-name"
            variant="outlined"
            placeholder="Service name"
            InputProps={{
              style: {
                color: '#000',
                borderColor: '#333366'
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
  <InputLabel id="type-label" sx={{ color: '#000' }}>Type</InputLabel>
  
  <Select
    labelId="type-label"
    id="type"
    label="Type"
  >
    <MenuItem value="Type1">Type1</MenuItem>
    <MenuItem value="Type2">Type2</MenuItem>
    <MenuItem value="Type3">Type3</MenuItem>
  </Select>
</FormControl>


        <FormControl fullWidth margin="normal">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* <InputLabel htmlFor="website-link" sx={{ color: '#333366' }}>Website link</InputLabel> */}
            <Typography variant="body2" sx={{ color: '#333366' }}>Optional</Typography>
          </Box>
          <TextField
            id="website-link"
            variant="outlined"
            placeholder="Website link"
            InputProps={{
              style: {
                color: '#333366',
                borderColor: '#333366'
              },
            }}
            
          />
        </FormControl>

        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: '2rem', marginBottom: '1rem', color: '#333366' }}
        >
          Add Images
        </Typography>

        <Grid mt={3}  container direction="row"  justifyContent="center">
        
          {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`file-input-${index}`}
              type="file"
              onChange={(event) => handleImageChange(index, event)}
            />
            <label htmlFor={`file-input-${index}`}>
              <IconButton component="span">
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`Image ${index + 1}`}
                    sx={{ cursor: 'pointer' }}
                  />
                </Card>
              </IconButton>
            </label>
          </Grid>
        ))}
        </Grid>
        <Grid mt={3}  container direction="row"  justifyContent="center">
        
          {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`file-input-${index}`}
              type="file"
              onChange={(event) => handleImageChange(index, event)}
            />
            <label htmlFor={`file-input-${index}`}>
              <IconButton component="span">
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`Image ${index + 1}`}
                    sx={{ cursor: 'pointer' }}
                  />
                </Card>
              </IconButton>
            </label>
          </Grid>
        ))}
        </Grid>

                    </Box>
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <>
            {isMobile ? (
                <>
                </>
            ) : (
                <>
                     <NavBar />
                <Container>
                    <Grid item xs={12} container>
                        <Box mt={5} sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box mt={5} mb={5} sx={{ width: '80%', textAlign: 'center' }}>
                                <CustomStepper activeStep={activeStep} />
                                <Card sx={{ backgroundColor: '#f7f4cd', marginTop: 4, padding: 3 }}>
                                    <CardContent>
                                        <Typography className='mb-5' component="div" sx={{ fontWeight: 'bold', color: '#0D1B2A', fontSize: "30px" }}>
                                            {activeStep === 0 ? 'Personal Information' : activeStep === 1 ? 'Store Information' : 'Location Information'}
                                        </Typography>
                                        {renderFormContent()}
                                        <Grid container spacing={2} mt={3} justifyContent={activeStep > 0 ? "space-between" : "flex-end"}>
                                            {activeStep > 0 && (
                                                <Grid item>
                                                    <Button id="button-go" variant='contained' onClick={handleBack}>
                                                        <ArrowBackIcon sx={{ marginRight: "5px" }} /> Back
                                                    </Button>
                                                </Grid>
                                            )}
                                            {activeStep < steps.length - 1 ? (
                                                <Grid item>
                                                    <Button id="button-go" variant='contained' onClick={handleNext}>
                                                        Next <LoginIcon sx={{ marginLeft: "5px" }} />
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                <Grid item>
                                                    <Button id="button-go" variant='contained' onClick={() => alert('Form saved!')}>
                                                        Save <LoginIcon sx={{ marginLeft: "5px" }} />
                                                    </Button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
                <Footer />
                </>
            )}
        </>
    );
};

export default PageOne;
