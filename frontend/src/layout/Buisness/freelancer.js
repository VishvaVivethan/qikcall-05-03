import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, IconButton, Button, Divider, Link,Paper,Card } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import Banner from '../../assets/img/Sale1.jpg';
import Rating from '@mui/material/Rating';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import NavBar from '../navbar';
import Footer from '../footer';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../../assets/logo/recent2.png'





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width:"auto",
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      
    }),
  }));
    
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  

    function FreelancerDetails(){

        const navigate = useNavigate();
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  const text = "xz20op03lmo"

  const handleCopy = () => {

    navigator.clipboard.writeText(text)
    
      .then(() => {
        
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };



  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


//   const handleService = () => {
//     navigate('/service');
//   };

  const token = jwtDecode(Cookies.get('token'));

const [data, setData] = useState([]);

const role = token.user.role

console.log(data,"freeelancer data")
console.log(role,"role get")


  useEffect(()=>{
    handelGetData()
  },[])
  
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
          setData(result.data.data);
         })
        .catch(error => console.log('error', error));
  
    } catch (error) {
      console.error(error);
    }
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

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePricing = () => {
    navigate('/pricing');
  };


        return(
           <>
           {isMobile ? (
           <>
             <NavBar />
      {data.isapprove ? (
        <>
          <Container>
            <Box p={3} mt={5} height="auto" sx={{ border: '1px solid #000' }} bgcolor="#2d2859" borderRadius={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '24px', md: '35px' }, // Responsive font size
                        color: '#fff',
                        fontFamily: 'Anton, sans-serif',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                      }}
                      color="primary"
                    >
                      Business Information
                    </Typography>
                    <IconButton>
                      <EditIcon onClick={handlePricing} sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0 }}>
                  <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #fff' }} />
                </Grid>

                <Grid container spacing={3} sx={{ padding: "10px" }}>
                  <Grid item xs={12} md={6} container direction="column" justifyContent="space-evenly">
                    {[
                      { icon: <CreditCardIcon color="primary" />, label: 'Pan Number:', value: data.pannumber },
                      { icon: <ShoppingBagIcon color="primary" />, label: 'Aadhar Number:', value: data.aadharnumber },
                      { icon: <EventNoteIcon color="primary" />, label: 'Membership:', value: data.membership },
                    ].map(({ icon, label, value }, index) => (
                      <Grid item container justifyContent="flex-start" alignItems="center" key={index}>
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: { xs: '20px', md: '30px' }, // Responsive font size
                              color: '#fff',
                              fontFamily: 'Anton, sans-serif',
                              fontWeight: 'bold',
                              fontStyle: 'italic',
                            }}
                          >
                            {icon} {label}
                          </Typography>
                        </Grid>
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: { xs: '20px', md: '30px' }, // Responsive font size
                              color: '#fff',
                              fontFamily: 'Anton, sans-serif',
                              fontWeight: 'bold',
                              fontStyle: 'italic',
                              ml: 1,
                            }}
                          >
                            {value}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={6} container direction="column" justifyContent="space-evenly">
                    <Grid>
                      <Item>
                        <Typography sx={{
                          fontSize: { xs: '16px', md: '22px' }, // Responsive font size
                          color: '#000',
                          fontFamily: 'Anton, sans-serif',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                        }}>
                          Your Referral Code
                        </Typography>
                        <Tooltip title="Click to Copy" color="success" arrow>
                          <Typography
                            sx={{
                              fontSize: { xs: '14px', md: '20px' }, // Responsive font size
                              color: '#000',
                              fontFamily: 'Anton, sans-serif',
                              fontStyle: 'italic',
                            }}
                            onClick={handleCopy}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                          >
                            {text}
                          </Typography>
                        </Tooltip>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container>
            <Grid mt={5} item xs={12} container direction="row" justifyContent="space-evenly">
              <Box sx={{ bgcolor: '#2d2859', color: "#fff", width: "100%" }}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="#fff"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab sx={{ backgroundColor: "#f7f4cd", color: "#000" }} label="Item One" {...a11yProps(0)} />
                    <Tab sx={{ backgroundColor: "#f7f4cd", color: "#000" }} label="Item Two" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Item Two
                </TabPanel>
              </Box>
            </Grid>
          </Container>
        </>
      ) : (
        <Container style={{ marginTop: "80px" }}>
          <Grid mb={8} mt={5} item xs={12} container direction="column" justifyContent="space-evenly" alignItems="center">
            <Card sx={{ borderRadius: "12px", width: { xs: "90%", sm: "600px" } }}> {/* Responsive width */}
              <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#2d2859", padding: 1 }}>
                <img src={logo} alt="logo" width="50px" />
                <Typography sx={{ fontSize: "20px", fontWeight: "bold", marginTop: "5px", color: "#fff" }}>
                  QIKCALL
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ padding: 3 }}>
                <Typography sx={{ fontSize: "20px", fontWeight: "bold", marginTop: "5px" }}>
                  Your Request was in Pending, It is Verified within 24 Hours
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </Container>
      )}
      <Footer />
           </>
        ):(
        <>
        <NavBar/>
         {data.isapprove ?(<>
          <Container>
              <Box p={3} mt={5} height={"auto"} sx={{ border: '1px solid #000' }} bgcolor="#2d2859" borderRadius={2}>
              
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography
                        sx={{
                          fontSize: "35px",
                          color: "#fff",
                          fontFamily: "Anton, sans-serif",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                        color="primary"
                      >
                        Business Information
                      </Typography>
                      <IconButton>
                        <EditIcon onClick={handlePricing} sx={{color:"#fff"}} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 0 }}>
                    <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #fff' }} />
                  </Grid>

                  <Grid container spacing={3} sx={{ padding: "10px" }}>
                    <Grid item xs={6} container direction="column" justifyContent="space-evenly">
                    <Grid item container justifyContent="flex-start" alignItems="center">
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                            }}
                          >
                            <CreditCardIcon color="primary" /> Pan Number:
                          </Typography>
                        </Grid>
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                              ml: 1,
                            }}
                          >
                            {data.pannumber}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item container justifyContent="flex-start" alignItems="center">
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                            }}
                          >
                            <ShoppingBagIcon color="primary" /> Aadhar Number:
                          </Typography>
                        </Grid>
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                              ml: 1,
                            }}
                          >
                            {data.aadharnumber}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Grid item container justifyContent="flex-start" alignItems="center">
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                            }}
                          >
                            <EventNoteIcon color="primary" /> Membership:
                          </Typography>
                        </Grid>
                        <Grid mt={2} item>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "30px",
                              color: "#fff",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",
                              ml: 1,
                            }}
                          >
                           {data.membership}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} container direction="column" justifyContent="space-evenly">
                      
                        <Grid >
                        <Item>
                            <Typography sx={{fontSize: "22px",
                              color: "#000",
                              fontFamily: "Anton, sans-serif",
                              fontWeight: "bold",
                              fontStyle: "italic",}}>
                                Your Referal Code
                            </Typography>
                            <Tooltip title="Click to Copy" color="success" arrow>
                            <Typography 
                            sx={{fontSize: "20px",
                            color: "#000",
                            fontFamily: "Anton, sans-serif",
                            
                            fontStyle: "italic",}}
      onClick={handleCopy}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      {text}
    </Typography>
    </Tooltip>
    
    </Item>
                        </Grid>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container>
            <Grid mt={5} items xs={12} container direction="row" justifyContent="space-evenly" >
    <Box sx={{ bgcolor: '#2d2859',color:"#fff", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="#fff"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={{backgroundColor:"#f7f4cd",color:"#000"}} label="Item One" {...a11yProps(0)} />
          <Tab sx={{backgroundColor:"#f7f4cd",color:"#000"}} label="Item Two" {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
      <TabPanel  value={value} index={0} >
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      
    </Box>
    </Grid>
            </Container>
         </>):(<Container style={{marginTop:"80px"}}>
    <Grid mb={8} mt={5} item xs={12} container direction="column" justifyContent="space-evenly" alignItems="center" >
      <Card sx={{borderRadius:"12px",width:"600px"}}>
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{backgroundColor:"#2d2859",padding:1}} >
          <img src={logo} alt="logo" width="50px" />
          <Typography sx={{fontSize:"20px",fontWeight:"bold",marginTop:"5px",color:"#fff"}}>
            QIKCALL 
          </Typography>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{padding:3}} >
          <Typography sx={{fontSize:"20px",fontWeight:"bold",marginTop:"5px"}} >
            Your Request was in Pending, It is Verified within 24 Hours
          </Typography>
        </Grid>
      </Card>
    </Grid>
  </Container>) }
            <Footer/>
        </>
    )}
           </>
        )
    }

    export default FreelancerDetails