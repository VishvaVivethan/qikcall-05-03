import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import Sales from '../../assets/img/Sale1.jpg'
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import Footer from '../footer/index';
import ad from '../../assets/image/sidead1.png'
import ad1 from '../../assets/image/sidead2.png'



const HotelCard = () => {
  const [data,setData]= useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

console.log(data,"data comming")

  useEffect(() => {
    getOffer()
  }, []); 

const getOffer =()=>{
  try{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("/api/offerdetail", requestOptions)
    .then(async (response) => {
      if (response.status === 200 || response.status === 400) {
        return { status_code: response.status, data: await response.json() };
      } else {
        return { status_code: response.status, data: { msg: 'Unexpected Error' } };
      }
    })
    .then((result) => {
      setData(result.data.data)
      console.log(result.data.data,"advertise data")
     })
    .catch(error => console.log('error', error));

  }catch(error){
    console.error(error);
  }
}
  
  return (
    <>
    {isMobile ? (
    <>
   {Array.isArray(data) && data.map((offer, index) => (
  offer.isapprove === true && (
    <Grid 
      container
      
      item 
      xs={12} 
      direction="row" 
      justifyContent="flex-start" 
      alignItems="flex-start" 
      
    >
      <Grid mb={2}   item xs={12} spacing={2}  >   
        <Card
         
          style={{
            display: 'flex',
            backgroundColor: '#ffffe0',
            borderRadius: '15px',
            padding: 2,
            width: "100%",
            height: "auto",
          }}
        >
          {/* Image */}
          <CardMedia
            component="img"
            sx={{ width: 150, borderRadius: '10px' }}
            src={offer.addimages}
            alt="banner"
          />

          {/* Content */}
          <Grid 
            item xs={12} 
            sx={{ padding: 2 }} 
            container 
            direction="column" 
            justifyContent="space-evenly" 
            alignItems="flex-start"
          >
            <Typography component="div" variant="h6">
              {offer.title}
            </Typography>

            <Typography className='mt-1' color="secondary" component="div" sx={{ fontSize: "13px" }}>
              {offer.description}
            </Typography>

            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                Offer starts on:{" "}
                <span style={{ color: "green" }}>
                  {new Date(offer.startdate).toLocaleDateString()}
                </span>
              </Typography>
              <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                Offer ends on:{" "}
                <span style={{ color: "red" }}>
                  {new Date(offer.enddate).toLocaleDateString()}
                </span>
              </Typography>
            </Grid>

            <Button
              variant="contained"
              startIcon={<LocationOn />}
              sx={{
                marginTop: "10px",
                borderColor: 'white',
                color: 'white',
                backgroundColor: "#282866"
              }}
            >
              Visit Store
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
))}
    </>
  ):(
  <>
 {Array.isArray(data) && data.map((offer, index) => (
  offer.isapprove === true && (
    <Grid 
      container
      spacing={2}
      key={index}
      item 
      xs={12} 
      direction="row" 
      justifyContent="flex-start" 
      alignItems="flex-start" 
      
    >
      <Grid mb={2}   item xs={6} spacing={2}  >   
        <Card
         
          style={{
            display: 'flex',
            backgroundColor: '#ffffe0',
            borderRadius: '15px',
            padding: 2,
            width: "100%",
            height: "auto",
          }}
        >
          {/* Image */}
          <CardMedia
            component="img"
            sx={{ width: 150, borderRadius: '10px' }}
            src={offer.addimages}
            alt="banner"
          />

          {/* Content */}
          <Grid 
            item xs={6} 
            sx={{ padding: 2 }} 
            container 
            direction="column" 
            justifyContent="space-evenly" 
            alignItems="flex-start"
          >
            <Typography component="div" variant="h6">
              {offer.title}
            </Typography>

            <Typography className='mt-1' color="secondary" component="div" sx={{ fontSize: "13px" }}>
              {offer.description}
            </Typography>

            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                Offer starts on:{" "}
                <span style={{ color: "green" }}>
                  {new Date(offer.startdate).toLocaleDateString()}
                </span>
              </Typography>
              <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                Offer ends on:{" "}
                <span style={{ color: "red" }}>
                  {new Date(offer.enddate).toLocaleDateString()}
                </span>
              </Typography>
            </Grid>

            <Button
              variant="contained"
              startIcon={<LocationOn />}
              sx={{
                marginTop: "10px",
                borderColor: 'white',
                color: 'white',
                backgroundColor: "#282866"
              }}
            >
              Visit Store
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
))}
  </>)}
    </>
  );
};

function TodayOffer() {

  const navigate = useNavigate();

  // const handleDetails=()=>{
  //   navigate('/categories-details');
  // }

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
     <NavBar/>
    <Container>
      <Grid mt={5} container >
        <Grid container direction="row" justifyContent="flex-start" alignItems="center"  item xs={12} >
          <HotelCard  />
        </Grid>
      </Grid>
    </Container>
    <Container>
    <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
              <Grid item xs={12} >
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel  controls transition="crossfade" style={{ height: '140px',width:"100%" }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad} alt="slide 1" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad} alt="slide 3" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>
                      </Box>
              </Grid>
            </Grid>
    </Container>
    <Foot/>
   </>
  ):(
  <>
   <NavBar/>
    <Container>
      <Grid mt={5} container >
        <Grid container direction="row" justifyContent="flex-start" alignItems="center"  item xs={12} >
          <HotelCard  />
        </Grid>
      </Grid>
    </Container>
    <Container>
    <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
              <Grid item xs={12} >
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CCarousel  controls transition="crossfade" style={{ height: '140px',width:"100%" }}>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad} alt="slide 1" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={ad} alt="slide 3" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
                          </CCarouselItem>
                        </CCarousel>
                      </Box>
              </Grid>
            </Grid>
    </Container>
    <Foot/>
  </>
)}
   </>
  );
}

export default TodayOffer;
