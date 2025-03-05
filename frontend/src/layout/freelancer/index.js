import { Container, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';
import Thumbsup from '../../assets/img/thumbsup.webp'
import Work from '../../assets/qik call mobile view icons/order.png'
import Time from '../../assets/qik call mobile view icons/timetable.png'
import Salary from '../../assets/qik call mobile view icons/salary.png'
import Target from '../../assets/qik call mobile view icons/forbidden-sign.png'
import Pressure from '../../assets/qik call mobile view icons/Group 291.png'
import { Button } from 'react-bootstrap';
// import { BorderAll, BorderAllOutlined } from '@mui/icons-material';


function Freelancer() {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFreelancer =()=>{
    navigate('/registerfreelancer')
  }

  return (
    <>
      {isMobile ? (
        <>
          <NavBar />
          <Container maxWidth="1200px" className="container-custom">
            <section className="ezy__comingsoon8_w2RBJjPU mt-5">
              <svg className="position-absolute top-0 end-0" width="400" height="300" viewBox="0 0 1024 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H1024V539H539C241.319 539 0 297.681 0 0Z" fill="currentColor" />
              </svg>

              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-5 d-flex flex-column justify-content-center text-center text-lg-start">
                    <Typography variant='h3' className="ezy__comingsoon8_w2RBJjPU-heading mb-4">Reduce Your Time</Typography>
                    <Typography variant='h3' className="ezy__comingsoon8_w2RBJjPU-heading mb-4">Increase Your Money!</Typography>
                    <p className="ezy__comingsoon8_w2RBJjPU-sub-heading mb-4 mb-lg-0">
                      An activity that requires a person's mental or physical effort is work.If a person is trained for a
                      certain type of job, they may have a profession. Typically, a job would be a subset of someone's career.
                    </p>
                  </div>
                  <Button  onClick={handleFreelancer} variant="contained"  style={{ marginBottom:15, backgroundColor: "#2d2859", color:"#fff",width:"150px" }}>
  Register Here!
</Button>
                  <div className="col-12 col-lg-7">
                    <img src="https://cdn.easyfrontend.com/pictures/comingsoon/eight.png" alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </section>
          </Container>


          <Container maxWidth="1200px" className='container-main'>
          <Grid container xs={12} direction="row" mt={3} mb={3}>
                <Container>
                    <Grid item xs={12} md={12} mt={3} mb={3}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={3.5}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <img
                                        src={Work}
                                        alt="Work"
                                        id="image-border"
                                    />
                                </Box>
                                <Typography className='text-mob'>
                                    <b>Work From Home</b>
                                </Typography>
                                <Typography id="text-mob" variant="body1" className="mt-2">
                                    Find the best deals on reliable packers and movers for your location.
                                </Typography>
                            </Grid>
                            <Grid item xs={3.5}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <img
                                        src={Time}
                                        alt="Time"
                                        id="image-border"
                                    />
                                </Box>
                                <Typography className='text-mob'>
                                    <b>At Your Free Time</b>
                                </Typography>
                                <Typography id="text-mob" variant="body1" className="mt-2">
                                    Find the best deals on reliable packers and movers for your location.
                                </Typography>
                            </Grid>
                            <Grid item xs={3.5}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <img
                                        src={Salary}
                                        alt="salary"
                                        id="image-border"
                                    />
                                </Box>
                                <Typography className='text-mob'>
                                    <b>Best Package</b>
                                </Typography>
                                <Typography id="text-mob" variant="body1" className="mt-2">
                                    Find the best deals on reliable packers and movers for your location.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Container>
                <Grid container direction="row" justifyContent="center" alignItems="center" mb={3}>
                    <Grid xs={12} className='mt-3 mb-3'>
                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item xs={4}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <img
                                        src={Target}
                                        alt="Target"
                                        id="image-border"
                                    />
                                </Box>
                                <Typography className='text-mob'>
                                    <b>No Target</b>
                                </Typography>
                                <Typography id="text-mob" variant="body1" className="mt-2">
                                    Find the best deals on reliable packers and movers for your location.
                                </Typography>
                            </Grid>
                            <Grid xs={1}></Grid>
                            <Grid item xs={4}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <img
                                        src={Pressure}
                                        alt="pressure"
                                        id="image-border"
                                    />
                                </Box>
                                <Typography className='text-mob'>
                                    <b>No Pressure</b>
                                </Typography>
                                <Typography id="text-mob" variant="body1" className="mt-2">
                                    Find the best deals on reliable packers and movers for your location.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>

        <Container>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // spacing={2}
        mt={2}
        mb={3}
      >
        {/* Image Section */}
        <Grid mt={2} item xs={12} sm={4} container justifyContent="center">
          <img src={Thumbsup} alt="Benefits of work" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        {/* Text Section */}
        <Grid mt={2} item xs={12} sm={5} container direction="column" justifyContent="center" alignItems="center" sx={{padding:1}} >
          <Typography variant="h5" align="center" gutterBottom>
            <b>Benefits of Work</b>
          </Typography>

          <List>
            {Array.from({ length: 5 }, (_, index) => (
              <ListItem key={index} disablePadding>
                <FiberManualRecordIcon id="work-icon-mob" />
                <Typography id="work-text-mob">
                  Lorem ipsum dolor sit amet consectetur. Netus eu libero at lectus netus accumsan id non phasellus.
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
          <Footer />
        </>) : (
        <>
          <NavBar />
          <Container  sx={{ backgroundColor: "#fff",borderRadius:"18px"}} >
            <section class="ezy__comingsoon8_w2RBJjPU mt-5 mb-5">
              <svg class="position-absolute top-0 end-0" width="100%" height="300" viewBox="0 0 100% 300" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H1024V539H539C241.319 539 0 297.681 0 0Z" fill="currentColor" />
              </svg>

              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-10 col-lg-4 d-flex flex-column justify-content-center text-center text-lg-center">
                    <Typography variant='h3' class="ezy__comingsoon8_w2RBJjPU-heading mb-4" sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>Reduce Your Time</Typography>
                    <Typography variant='h3' class="ezy__comingsoon8_w2RBJjPU-heading mb-4" sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>Increase Your Money!</Typography>
                    <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} class="mt-1 mb-5 mb-lg-0" >
                      An activity that requires a person's mental or physical effort is work.If a person is trained for a
                      certain type of job, they may have a profession. Typically, a job would be a subset of someone's career.
                    </Typography>
                    <Button  onClick={handleFreelancer} alignItems="center" variant="contained"  style={{ marginTop: 16,marginBottom:"15px", backgroundColor: "#2d2859", color:"#fff",width:"auto" }}>
  Register Here!
</Button>
                  </div>
                  
                  <div class="col-10 col-lg-6">
                    <img src="https://cdn.easyfrontend.com/pictures/comingsoon/eight.png" alt="" class="img-fluid" />
                  </div>
                </div>
              </div>
            </section>
          </Container>

          <Container className="container-main ">
      <Grid container xs={12} direction="row" ml={1} mt={5} mb={3}>
        <Container>
          <Grid xs={12} className="mt-3 mb-3">
            <Grid mt={3} container direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <img
                    src={Work}
                    alt="Work From Home"
                    width="150px"
                    height="150px"
                    id="image-border"
                  />
                  <Typography className="typography-title">
                    <b>Work From Home</b>
                  </Typography>
                  <Typography className="typography-body">
                    If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location.
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <img
                    src={Time}
                    alt="At Your Free Time"
                    width="150px"
                    height="150px"
                    id="image-border"
                  />
                  <Typography className="typography-title">
                    <b>At Your Free Time</b>
                  </Typography>
                  <Typography className="typography-body">
                    If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location.
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <img
                    src={Salary}
                    alt="Best Package"
                    width="150px"
                    height="150px"
                    id="image-border"
                  />
                  <Typography className="typography-title">
                    <b>Best Package</b>
                  </Typography>
                  <Typography className="typography-body">
                    If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid container xs={12} direction="row" mb={3}>
        <Container>
          <Grid xs={12} className="mt-3 mb-3">
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <img
                    src={Target}
                    alt="No Target"
                    width="150px"
                    height="150px"
                    id="image-border"
                  />
                  <Typography className="typography-title">
                    <b>No Target</b>
                  </Typography>
                  <Typography className="typography-body">
                    If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location.
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <img
                    src={Pressure}
                    alt="No Pressure"
                    width="150px"
                    height="150px"
                    id="image-border"
                  />
                  <Typography className="typography-title">
                    <b>No Pressure</b>
                  </Typography>
                  <Typography className="typography-body">
                    If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Container>
    <Container>
  <Grid 
    container 
    spacing={2} // Add spacing between items
    mt={5} 
    justifyContent="space-evenly" 
    alignItems="center"
  >
    <Grid item xs={12} sm={5} md={5} container justifyContent="space-evenly" alignItems="center">
      <img 
        src={Thumbsup} 
        alt="Benefits of work" 
        style={{ 
          width: "100%", 
          height: "350px", 
          maxWidth: "450px", 
        }} 
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
      <Typography 
        sx={{ 
          fontSize: { xs: "24px", sm: "30px", md: "40px" }, // Responsive font size
          fontFamily: "Anton, sans-serif", 
          fontWeight: "bold", 
          fontStyle: "italic" 
        }}
      >
        <b>Benefits of Work</b>
      </Typography>
      
      <List>
        {Array(5).fill().map((_, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ color: "#2d2859" }} />
            </ListItemIcon>
            <ListItemText 
              sx={{ 
                fontFamily: "Anton, sans-serif", 
                fontWeight: "bold", 
                fontStyle: "italic" 
              }} 
              primary="Lorem ipsum dolor sit amet consectetur. Netus eu libero at lectus netus accumsan id non phasellus." 
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Grid>
</Container>

          
          <Footer />
        </>)}

    </>
  )
}

export default Freelancer