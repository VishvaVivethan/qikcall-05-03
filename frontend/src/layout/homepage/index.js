import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import '@coreui/coreui/dist/css/coreui.min.css'
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
// import Paper from '@mui/material/Paper';
import NavBar from '../navbar/index';
import Foot from '../footer/index'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Container, Grid, Typography, Button, IconButton, InputBase, Paper,Divider } from '@mui/material';
// import { AiOutlineTable } from "react-icons/ai";
import SearchIcon from '@mui/icons-material/Search';
// import AcUnitIcon from '@mui/icons-material/AcUnit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


import { CgMoreVerticalO } from "react-icons/cg";
// import { IoStorefrontOutline } from "react-icons/io5";


// import Ambulance from '../../assets/qik call mobile view icons/ambulance1.png'
// import Homeapp from '../../assets/qik call mobile view icons/electric-appliance1.png'
// // import Hostel from '../../assets/qik call mobile view icons/pop.png'
// import Furniture from '../../assets/qik call mobile view icons/furniture1.png'
// import Homedec from '../../assets/qik call mobile view icons/strawberry1.png'
// import Beauty from '../../assets/qik call mobile view icons/io.png'
// import Restaraunts from '../../assets/qik call mobile view icons/strawberry1-1.png'
// import Hotel from '../../assets/qik call mobile view icons/strawberry2.png'
// import Theatre from '../../assets/qik call mobile view icons/theater1.png'
// import Jewellery from '../../assets/qik call mobile view icons/jewelry1.png'
// import Apartments from '../../assets/qik call mobile view icons/apartment1.png'
// import AC from '../../assets/qik call mobile view icons/air-conditioner1.png'
// import Dress from '../../assets/qik call mobile view icons/lol.png'
// import Computer from '../../assets/img/computer.png'
// import Dentist from '../../assets/img/dentist.png'
// import Law from '../../assets/img/law.png'
// import Car from '../../assets/img/maintenance.png'
// import Event from '../../assets/img/organiser.png'
// import Photo from '../../assets/img/photographer.png'
// import Electric from '../../assets/img/electrician.png'
// import Transport from '../../assets/img/delivery-truck.png'
// import More from '../../assets/img/plus.png'


import LoginDialog from '../../login';
import {retrieveToken} from '../../firebase';
import { jwtDecode } from "jwt-decode";


import ad1 from '../../assets/image/rename.png'
import ad2 from '../../assets/image/ganesh.png'
import ad3 from '../../assets/image/hotel.png'
import ad4 from '../../assets/image/pink.png'

import sidead1 from '../../assets/image/sidead1.png'
import sidead2 from '../../assets/image/sidead2.png'
import sidead3 from '../../assets/image/sidead3.png'
import sidead4 from '../../assets/image/sidead4.png'

import mainad1 from '../../assets/image/mainad1.png'
import mainad2 from '../../assets/image/mainad2.png'
import mainad3 from '../../assets/image/mainad3.png'
import mainad from '../../assets/image/mainad.png'

import cat1 from '../../assets/image/smoothie.png'
import cat2 from '../../assets/image/soda.png'
import cat3 from '../../assets/image/pizza.png'
import cat4 from '../../assets/image/scooty.png'
import cat5 from '../../assets/image/carwash.png'
import cat6 from '../../assets/image/papad.png'
import cat7 from '../../assets/image/icecream.png'
import cat8 from '../../assets/image/ad.png'






const DownCard = (props) => {
  // const names = Array(24).fill('Ambulance Service');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const [getData, setGetData] = useState([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    GetCategory();
  }, []);

  const navigate = useNavigate();

  const GetCategory = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("/api/categorylist", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setGetData(result.data.data);
          console.log(result.data.data,"category")
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (category) => {
    navigate(`/categorieslist/${category}`);
  };

  return (
    <>
      {isMobile ? (
        <>
        <Typography variant="h5" className=" mb-1 title-mob">Popular Categories</Typography>
         <Container>
         
         <Grid mb={1} container spacing={1} style={{ flexWrap: 'wrap' }}>
  {getData.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>
        <Typography
          onClick={() => handleNavigate(item._id)}
          variant="body1"
          component="span"
          style={{ whiteSpace: 'nowrap',cursor:"pointer",fontSize:"10px" }}
          
        >
          {item.categoryname}
        </Typography>
      </Grid>
      {index < getData.length - 1 && (
        <Grid item>
           <Divider orientation="vertical" variant="middle" flexItem />
        </Grid>
      )}
    </React.Fragment>
  ))}
</Grid>
        </Container>
        </>
      ) : (
        <>
        <Container>
        <Typography variant="h5" className="mb-3 mt-5">Popular Categories</Typography>
         <Grid container spacing={1} style={{ flexWrap: 'wrap' }}>
  {getData.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>
        <Typography
          onClick={() => handleNavigate(item._id)}
          variant="body1"
          component="span"
          style={{ whiteSpace: 'nowrap',cursor:"pointer" }}
          
        >
          {item.categoryname}
        </Typography>
      </Grid>
      {index < getData.length - 1 && (
        <Grid item>
           <Divider orientation="vertical" variant="middle" flexItem />
        </Grid>
      )}
    </React.Fragment>
  ))}
</Grid>
        </Container>
        </>
      )}
    </>
  )
}


const Location = (props) => {
  // const names = Array(24).fill('Ambulance Service');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const [getDistrict, setDistrict] = useState([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    GetDistrict();
  }, []);

  const navigate = useNavigate();

  const GetDistrict = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("/api/getdistrict", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setDistrict(result.data.data);
          console.log(result.data.data,"district")
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (location) => {
    navigate(`/locationlist/${location}`);
  };

  return (
    <>
      {isMobile ? (
        <>
        {/* <Typography variant="h5" className=" mb-1 title-mob">Major Locations</Typography> */}
         {/* <Container>
         
         <Grid container spacing={1} style={{ flexWrap: 'wrap' }}>
  {getDistrict.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>
        <Typography
          onClick={() => handleNavigate(item._id)}
          variant="body1"
          component="span"
          style={{ whiteSpace: 'nowrap',cursor:"pointer",fontSize:"10px" }}
          
        >
          {item.district}
        </Typography>
      </Grid>
      {index < getDistrict.length - 1 && (
        <Grid item>
           <Divider orientation="vertical" variant="middle" flexItem />
        </Grid>
      )}
    </React.Fragment>
  ))}
</Grid>
        </Container> */}
        </>
      ) : (
        <>
        <Container>
        {/* <Typography variant="h5" className="mb-3 mt-5">Major Locations</Typography> */}
         {/* <Grid container spacing={1} style={{ flexWrap: 'wrap' }}>
  {getDistrict.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>
        <Typography
          onClick={() => handleNavigate(item._id)}
          variant="body1"
          component="span"
          style={{ whiteSpace: 'nowrap',cursor:"pointer" }}
          
        >
          {item.district}
        </Typography>
      </Grid>
      {index < getDistrict.length - 1 && (
        <Grid item>
           <Divider orientation="vertical" variant="middle" flexItem />
        </Grid>
      )}
    </React.Fragment>
  ))}
</Grid> */}
        </Container>
        </>
      )}
    </>
  )
}



const MidCategories = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [getData, setGetData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("/api/categorylist", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setGetData(result.data.data);
          console.log(result.data.data, "category");
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (category) => {
    navigate(`/categorieslist/${category}`);
  };

  const handleClickOpen = () => {
    console.log("Opening dialog");  // Debug to check if this function gets called
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = [
    {
      icon: <CgMoreVerticalO style={{ color: "#fff", fontSize: "30px" }} />,
      label: 'More',
    }
  ];

  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter the data based on the search term
  const filteredData = getData.filter((category) =>
    category.categoryname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ flexGrow: 1, backgroundColor: '#f7f4cd', padding: '10px' }}>
  <Grid container>
    {getData.map((category, index) => (
      <Grid mb={2} container direction="column" justifyContent="space-evenly" alignItems="center" xs={3} sm={3} md={2} key={index}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px',
            padding: '10px',
            border: "1px solid #00bfff",
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: "#00bfff"
          }}
          onClick={(e) => { handleNavigate(getData[index]._id) }}
        >
          <img src={category.addimages} style={{ width: window.innerWidth > 320 ? "30px" : "30pxpx" }} alt="category" />
        </Box>
        <Typography
  variant="body1"
  sx={{
    fontFamily: "Anton, sans-serif",
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: '10px',
    textAlign: "center",
    fontSize: window.innerWidth > 320 ? "8px" : "6px" 
  }}
>
  {category.categoryname}
</Typography>

      </Grid>
    ))}
    {categories.map((category, index) => (
      <Grid mb={2} item container direction="column" justifyContent="space-evenly" alignItems="center" xs={3} sm={2} md={1.5} key={index}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px',
            padding: '10px',
            border: "1px solid #00bfff",
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: "#00bfff",
            cursor: 'pointer'
          }}
          onClick={handleClickOpen} // Ensuring this is bound properly
        >
          {category.icon}
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Anton, sans-serif",
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: '10px',
            textAlign: "center",
            fontSize: window.innerWidth > 320 ? "8px" : "6px" 
          }}
        >
          {category.label}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Box>

        </>
      ) : (
        <>
<Typography variant="h4" className="title mt-5">Categories</Typography>
<Box mt={4} mb={4} sx={{ flexGrow: 1, backgroundColor: '#f7f4cd', padding: '20px' }}>
  <Grid container spacing={3}>
    {getData.slice(0, 11).map((category, index) => ( 
      <Grid
        item
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        xs={6} sm={2.4} md={2} lg={2} xl={1.5}
        key={index}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70px',
            height: '70px',
            padding: '10px',
            border: "1px solid #00bfff",
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: "#00bfff",
            '@media (max-width: 600px)': {
              width: '60px',
              height: '60px',
            },
            '@media (min-width: 600px)': {
              width: '80px',
              height: '80px',
            }
          }}
          onClick={() => handleNavigate(getData[index]._id)}
        >
          <img src={category.addimages} alt="category" style={{ width: '100%', height: 'auto' }} />
        </Paper>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: { xs: "12px", md: "13px" },
            fontFamily: "Anton, sans-serif",
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: '10px',
            textAlign: "center"
          }}
        >
          {category.categoryname}
        </Typography>
      </Grid>
    ))}
    {categories.slice(0, 10).map((category, index) => (
      <Grid 
        item 
        container 
        direction="column" 
        justifyContent="space-evenly" 
        alignItems="center" 
        xs={6} sm={2.4} md={2} lg={2} xl={1.5} 
        key={index}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70px',
            height: '70px',
            padding: '10px',
            border: "1px solid #00bfff",
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: "#00bfff",
            '@media (max-width: 600px)': {
              width: '60px',
              height: '60px',
            },
            '@media (min-width: 600px)': {
              width: '80px',
              height: '80px',
            }
          }}
          onClick={handleClickOpen}
        >
          {category.icon}
        </Paper>
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: { xs: "12px", md: "13px" },
            fontFamily: "Anton, sans-serif",
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: '10px',
            textAlign: "center"
          }}
        >
          {category.label}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Box>

        </>
      )}
      
      <Dialog
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? 0 : undefined, // Remove margin on mobile
          position: 'absolute',
          right: 0,
          top: 0,
          width: isMobile ? '100%' : '80vw', // Maintain consistent width
          height: isMobile ? '100%' : '80vh', // Maintain consistent height
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} container direction="row" alignItems="center">
            <IconButton edge="center" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ fontSize: isMobile ? '16px' : '18px' }}>
              Popular Categories
            </Typography>
          </Grid>
          <Grid mt={2} item xs={12} sm={4} container direction="column" justifyContent="flex-end" alignItems="flex-end">
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                height: isMobile ? '35px' : '40px',
                fontFamily: 'Anton, sans-serif',
                fontWeight: 'bold',
                fontStyle: 'italic',
                '&:hover': { border: '2px solid #2d2859' },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent
        sx={{
          minHeight: '300px', 
          minWidth: '100%', 
          maxHeight: '500px', 
          overflowY: 'auto',
        }}
      >
        <DialogContentText>
          <Grid mt={3} container spacing={2} justifyContent="flex-start">
            {filteredData.map((category, index) => (
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                item
                xs={4}
                sm={4}
                md={4}
                lg={2.8}
                key={index}
              >
                {category && (
                  <Grid
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      width: '100%',
                      maxWidth: isMobile ? '100%' : undefined,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Grid sx={{ marginRight: '12px' }}>
                      <img src={category.addimages} style={{ width: isMobile ? '25px' : '30px' }} alt="categoryname" />
                    </Grid>
                    <Typography
                      onClick={(e) => handleNavigate(category._id)}
                      sx={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold' }}
                    >
                      {category.categoryname}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
};



function HomePage() {


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const [loginopen, setLoginOpen] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [borderColor, setBorderColor] = useState("#af07cf");

  useEffect(() => {
    const colors = ["#af07cf", "#07cfcf", "#cfaf07"]; // Array of colors to cycle through
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % colors.length; // Cycle through the colors array
      setBorderColor(colors[index]);
    }, 2000); // Change color every 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let token = Cookies.get('token') ? Cookies.get('token') : undefined;
  const [decode, SetDecode] = useState(token ? jwtDecode(token) : undefined);
  console.log(decode, "killer")
  console.log(token, "Home page")


  useEffect(() => {
    if (!token) {

      const timer = setTimeout(() => {
        setLoginOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [token]);

  useEffect(() => {
    if (decode?.user?.id) {
      retrieveToken(decode.user.id);
    }
  }, [decode?.user?.id]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1
    }
  };

  // const handleClickOpen = () => {
  //   if (!token) {
  //     setLoginOpen(true);
  //   }
  // };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const categories = [
    { name: 'Packers & Movers', img: cat1 },
    { name: 'Repair & Services', img: cat2 },
    { name: 'Lawyers', img: cat3 },
    { name: 'Jewellery', img: cat4 },
  ];


  return (
    <>

      {isMobile ? (
        <>
          <NavBar />
          <Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
              <Grid item xs={12} >
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  infinite={true}
                  showDots={false}
                  transitionDuration={500}
                  removeArrowOnDeviceType={["tablet", "mobile"]}

                >
                  <div><img src={sidead1} alt="Banner 1" className="carousel-image-mob" /></div>
                  <div><img src={sidead2} alt="Banner 2" className="carousel-image-mob" /></div>
                  <div><img src={sidead3} alt="Banner 3" className="carousel-image-mob" /></div>
                  <div><img src={sidead4} alt="Banner 4" className="carousel-image-mob" /></div>
                </Carousel>

              </Grid>
            </Grid>
          </Container>
          <Container  >
            <Grid container xs={12} sm={10} direction="row" mt={3}>
              <Typography variant="h5" className="mb-3 title-mob">Recent Categories</Typography>
              <Grid xs={12}>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" mb={2} >
                  <Grid item xs={5} >
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#00bfff", height: "250px", borderRadius: "0px 0px 10px 10px" }}>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat1} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat1} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat1} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>


                        <Typography sx={{ color: "#000", fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", }} className='mt-3'><b>Hotels</b></Typography>
                        <Button sx={{ backgroundColor: "#f7f4cd", color: "#000", fontSize: "10px", fontFamily: "Anton, sans-serif", fontStyle: "italic", '&:hover': { backgroundColor: "#e0e0e0" } }} variant="outlined" className=' mt-3 mb-2'>
                          Call Now
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={5} >
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#00bfff", height: "250px", borderRadius: "0px 0px 10px 10px" }}>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat2} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat2} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat2} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>


                        <Typography sx={{ color: "#000", fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", }} className='mt-3'><b>Repairs </b></Typography>
                        <Button sx={{ backgroundColor: "#f7f4cd", color: "#000", fontSize: "10px", fontFamily: "Anton, sans-serif", fontStyle: "italic", '&:hover': { backgroundColor: "#e0e0e0" } }} variant="outlined" className='mt-3 mb-2'>
                          Call Now
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" mb={2} >
                  <Grid item xs={5} >
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#00bfff", height: "250px", borderRadius: "0px 0px 10px 10px" }}>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat3} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat3} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat3} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>


                        <Typography sx={{ color: "#000", fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", }} className='mt-3'><b>Carpenters</b></Typography>
                        <Button sx={{ backgroundColor: "#f7f4cd", color: "#000", fontSize: "10px", fontFamily: "Anton, sans-serif", fontStyle: "italic", '&:hover': { backgroundColor: "#e0e0e0" } }} variant="outlined" className=' mt-3 mb-2'>
                          Call Now
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={5} >
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#00bfff", height: "250px", borderRadius: "0px 0px 10px 10px" }}>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat4} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat4} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={cat4} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>


                        <Typography sx={{ color: "#000", fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", }} className='mt-3'><b>Lawyers</b></Typography>
                        <Button sx={{ backgroundColor: "#f7f4cd", color: "#000", fontSize: "10px", fontFamily: "Anton, sans-serif", fontStyle: "italic", '&:hover': { backgroundColor: "#e0e0e0" } }} variant="outlined" className=' mt-3 mb-2'>
                          Call Now
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
              <Grid item xs={12} >
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  infinite={true}
                  showDots={false}
                  transitionDuration={500}
                  removeArrowOnDeviceType={["tablet", "mobile"]}

                >
                  <div><img src={sidead1} alt="Banner 1" className="carousel-image-mob" /></div>
                  <div><img src={sidead2} alt="Banner 2" className="carousel-image-mob" /></div>
                  <div><img src={sidead3} alt="Banner 3" className="carousel-image-mob" /></div>
                  <div><img src={sidead4} alt="Banner 4" className="carousel-image-mob" /></div>
                </Carousel>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="1200px" >
            <Typography variant="h5" className=" mt-3 title-mob">Major Categories</Typography>
            <Box sx={{ flexGrow: 1, padding: 2 }} mt={1}>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={ad1} alt="Appliances" style={{ width: '100%', height: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                  <img src={ad2} alt="Dining Room" style={{ width: '100%', height: "100%" }} />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={ad3} alt="Appliances" style={{ width: '100%', height: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                  <img src={ad4} alt="Dining Room" style={{ width: '100%', height: "100%" }} />
                </Grid>
              </Grid>
            </Box>
          </Container>

          <Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
              <Grid item xs={12} >
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  infinite={true}
                  showDots={false}
                  transitionDuration={500}
                  removeArrowOnDeviceType={["tablet", "mobile"]}

                >
                  <div><img src={sidead1} alt="Banner 1" className="carousel-image-mob" /></div>
                  <div><img src={sidead2} alt="Banner 2" className="carousel-image-mob" /></div>
                  <div><img src={sidead3} alt="Banner 3" className="carousel-image-mob" /></div>
                  <div><img src={sidead4} alt="Banner 4" className="carousel-image-mob" /></div>
                </Carousel>
              </Grid>
            </Grid>
          </Container>

          <Container  >
            <Typography variant="h5" className="mt-4 title-mob" > Categories</Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center" mt={2} >
              <Grid item xs={12} container direction="row" justifyContent="space-around" alignItems="center" >
                <Grid>
                  <MidCategories />
                </Grid>
              </Grid>
            </Grid>
          </Container>



          <Container  >
            <Grid container xs={12} direction="row" mt={1} mb={3}>
              <Typography variant="h5" className=" mb-4 title-mob">Daily Needs</Typography>
              <Grid xs={12}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                  <Grid item xs={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                      <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat5} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat5} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat5} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                      </CCarousel>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", fontSize: "12px" }} className="mt-3">
                        Packers & Movers
                      </Typography>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontStyle: "italic", color: "#000", fontSize: "8px" }} variant="body1" className="mt-3" align="center">
                        If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                      <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat6} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat6} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat6} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                      </CCarousel>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", fontSize: "12px" }} className="mt-3">
                        Spa & Saloon
                      </Typography>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontStyle: "italic", color: "#000", fontSize: "8px" }} variant="body1" className="mt-3" align="center">
                        If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

              </Grid>
              <Grid xs={12} mt={2}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                  <Grid item xs={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                      <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat7} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat7} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat7} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                      </CCarousel>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", fontSize: "12px" }} className="mt-3">
                        Repairs & Services
                      </Typography>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontStyle: "italic", color: "#000", fontSize: "8px" }} variant="body1" className="mt-3" align="center">
                        If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                      <CCarousel controls transition="crossfade" style={{ height: '150px' }}>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat8} alt="slide 1" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat8} alt="slide 2" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                        <CCarouselItem>
                          <CImage className="d-block w-100" src={cat8} alt="slide 3" style={{ height: '150px', objectFit: 'cover' }} />
                        </CCarouselItem>
                      </CCarousel>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000", fontSize: "12px" }} className="mt-3">
                        Real Estate Agent
                      </Typography>
                      <Typography sx={{ fontFamily: "Anton, sans-serif", fontStyle: "italic", color: "#000", fontSize: "8px" }} variant="body1" className="mt-3" align="center">
                        If you are relocating to another place or if you even just want to send some belongings somewhere, find the best deals on the most reliable packers and movers for your location
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Container>

          <Container >
          <DownCard />
          </Container>

          <Container >
          <Location />
          </Container> 
          

          <Foot />
        </>
      ) : (
        <>
          <NavBar />
          <Container >
            <Grid container direction="row" spacing={3} mt={5}>
              <Grid item xs={12}  >
                <Grid container className='carousel-container' direction="row" spacing={3}>
                  <Grid item xs={6} >
                    <Carousel
                      responsive={responsive}
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      infinite={true}
                      showDots={false}
                      transitionDuration={500}
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                      <div><img src={ad1} alt="ad1 1" className="carousel-image" /></div>
                      <div><img src={ad2} alt="ad1 2" className="carousel-image" /></div>
                      <div><img src={ad3} alt="ad1 3" className="carousel-image" /></div>
                      <div><img src={ad4} alt="ad1 4" className="carousel-image" /></div>
                    </Carousel>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={0} sx={{ flexDirection: 'column' }}>
                      <Grid item xs={12} md={12} sm={12} sx={{ padding: "5px" }}>
                        <Carousel
                          responsive={responsive}
                          autoPlay={true}
                          autoPlaySpeed={3000}
                          infinite={true}
                          // width='1000%'
                          showDots={false}
                          transitionDuration={500}
                          removeArrowOnDeviceType={["tablet", "mobile"]}

                        >
                          <div><img src={sidead1} alt="Banner 1" className="image" /></div>
                          <div><img src={sidead2} alt="Banner 1" className="image" /></div>
                        </Carousel>
                      </Grid>
                      <Grid item xs={12} md={12} sm={12} sx={{ padding: "5px" }}>
                        <Carousel
                          responsive={responsive}
                          autoPlay={true}
                          autoPlaySpeed={3000}
                          infinite={true}
                          showDots={false}
                          transitionDuration={500}
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                        >
                          <div><img src={sidead3} alt="Banner 1" className="image" /></div>
                          <div><img src={sidead4} alt="Banner 1" className="image" /></div>
                        </Carousel>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

          <Container mt={5}>
            <MidCategories />
          
          </Container>
          <Container  >
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={mainad} alt="Appliances" style={{ width: '100%', height: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                  <img src={mainad1} alt="Dining Room" style={{ width: '100%', height: "100%" }} />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={mainad2} alt="Appliances" style={{ width: '100%', height: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                  <img src={mainad3} alt="Dining Room" style={{ width: '100%', height: "100%" }} />
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container>
          <Grid container xs={12} direction="row" ml={1} mt={10}>
  <Typography variant="h4" className="title mb-5">Major Categories</Typography>
  <Grid container spacing={2} xs={12}>
    {categories.map((category, index) => (
      <Grid 
        item 
        key={index} 
        xs={12}
        sm={6}
        md={3}  
        sx={{ mt: 3 }}
      >
        <Grid 
          sx={{
            backgroundColor: "#00bfff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            p: 2,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CCarousel controls transition="crossfade" style={{ width: '100%', maxWidth: '300px', height: 'auto' }}>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={category.img}
                  alt={`slide ${index + 1}`}
                  style={{ height: 'auto', maxHeight: '240px', objectFit: 'cover' }}
                />
              </CCarouselItem>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={category.img}
                  alt={`slide ${index + 1}`}
                  style={{ height: 'auto', maxHeight: '240px', objectFit: 'cover' }}
                />
              </CCarouselItem>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={category.img}
                  alt={`slide ${index + 1}`}
                  style={{ height: 'auto', maxHeight: '240px', objectFit: 'cover' }}
                />
              </CCarouselItem>
            </CCarousel>
          </Box>

          <Typography
            sx={{
              fontFamily: "Anton, sans-serif",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#000",
              textAlign: 'center',
              mt: 2,
              fontSize: { xs: '1.2rem', md: '1.4rem' }
            }}
            variant='h6'>
            {category.name}
          </Typography>

          <Button
            sx={{
              fontFamily: "Anton, sans-serif",
              fontStyle: "italic",
              backgroundColor: "#f7f4cd",
              color: "#000",
              '&:hover': { backgroundColor: "#e0e0e0" },
              mt: 2,
              mb: 2,
              fontSize: { xs: '0.8rem', md: '1rem' }
            }}
            variant="outlined">
            Call Now
          </Button>
        </Grid>
      </Grid>
    ))}
  </Grid>
</Grid>

    </Container>


          <Container>
      <Grid container direction="column" ml={1} mt={10} mb={3}>
        <Typography variant="h4" className="title mb-5">
          Daily Needs
        </Typography>

        <Grid container justifyContent="space-around" alignItems="center" spacing={2}>
          {/* First Category */}
          <Grid
            item
            xs={12}
            sm={5}
            md={3}
            lg={2.5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CCarousel controls transition="crossfade" style={{ height: '200px' }}>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat5}
                    alt="slide 1"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat5}
                    alt="slide 2"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat5}
                    alt="slide 3"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
              </CCarousel>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#000',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                Packers & Movers
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontStyle: 'italic',
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                If you are relocating to another place or if you even just want to send some belongings
                somewhere, find the best deals on the most reliable packers and movers for your location.
              </Typography>
            </Box>
          </Grid>

          {/* Second Category */}
          <Grid
            item
            xs={12}
            sm={5}
            md={3}
            lg={2.5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CCarousel controls transition="crossfade" style={{ height: '200px' }}>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat6}
                    alt="slide 1"
          
                  style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat6}
                    alt="slide 2"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat6}
                    alt="slide 3"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
              </CCarousel>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#000',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                Spa & Saloon
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontStyle: 'italic',
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                Pamper yourself with top-rated spa & salon services. Find the best deals and services
                near you for relaxation and self-care.
              </Typography>
            </Box>
          </Grid>

          {/* Third Category */}
          <Grid
            item
            xs={12}
            sm={5}
            md={3}
            lg={2.5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CCarousel controls transition="crossfade" style={{ height: '200px' }}>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat7}
                    alt="slide 1"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat7}
                    alt="slide 2"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat7}
                    alt="slide 3"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
              </CCarousel>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#000',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                Repairs and Service
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontStyle: 'italic',
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                Get reliable repairs and service for your appliances, gadgets, and home services at
                unbeatable prices.
              </Typography>
            </Box>
          </Grid>

          {/* Fourth Category */}
          <Grid
            item
            xs={12}
            sm={5}
            md={3}
            lg={2.5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CCarousel controls transition="crossfade" style={{ height: '200px' }}>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat8}
                    alt="slide 1"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat8}
                    alt="slide 2"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={cat8}
                    alt="slide 3"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </CCarouselItem>
              </CCarousel>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#000',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                Real Estate Agent
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Anton, sans-serif',
                  fontStyle: 'italic',
                  color: '#000',
                  fontSize: '10px',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                Find trusted real estate agents to assist with buying, selling, or renting your
                property with confidence.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
          
           <Container sx={{marginBottom:"20px"}} >
          <DownCard  />
          </Container>

          <Container >
          <Location />
          </Container>  

          <Foot />
        </>
      )}
      <Dialog
            open={loginopen}
            onClose={handleLoginClose}
            aria-labelledby="responsive-dialog-title"
          >
                      <DialogContent 
   sx={{backgroundColor:"#2d2859;"}}
    >

              <LoginDialog />
              {/* <Grid mt={2}>
              <Button
  align="right"
  variant="contained"
  sx={{
    backgroundColor: "red",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: "red", // Set hover background color to red
    },
  }}
  onClick={handleLoginClose}
>
  Close
</Button>
              </Grid> */}
            </DialogContent>
            
             
              
            
          </Dialog>


    </>
  );
}

export default HomePage;
