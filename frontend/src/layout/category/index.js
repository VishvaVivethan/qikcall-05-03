import React, { useState, useEffect } from 'react';
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
import { useNavigate,useParams } from 'react-router-dom';

import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import Sales from '../../assets/img/Sale1.jpg'
import banner from '../../assets/img/images.jpeg'
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import Footer from '../footer/index';
// import { LocationOn, Phone } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 


// HotelCard Component
const HotelCard = () => {

  const{id} = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const[data,setData] = useState([])

  console.log(data,"hotelcard")

  useEffect(()=>{
    CategoryData();
    
  },[id])

  const CategoryData = () => {
    try{
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`/api/categorydata?id=${id}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setData(result.data.data.result)
        console.log(result.data.data.result,"hotelcarddata")
       })
      .catch(error => console.log('error', error));

  } catch (error) {
    console.error(error);
  }
  }
  
  return (
    <>
    {isMobile ? (
    <>
    
    <Card
  sx={{
    display: 'flex',
    backgroundColor: '#ffffe0',
    borderRadius: '15px',
    padding: '16px',
    maxWidth: 400,
    flexDirection: { xs: 'column', sm: 'row' }, // Column on small screens, row on larger screens
  }}
>
  {/* Image */}
  <CardMedia
    component="img"
    sx={{
      width: { xs: '100%', sm: 150 }, // Full width on small screens, fixed width on larger screens
      borderRadius: '10px',
      marginBottom: { xs: '16px', sm: 0 }, // Add margin-bottom on small screens
    }}
    image="your-image-url-here"
    alt="Hotel"
  />

  {/* Content */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: { xs: 0, sm: '16px' }, // Remove margin on small screens
      textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
    }}
  >
    <CardContent
      sx={{
        flex: '1 0 auto',
        paddingBottom: '8px',
      }}
    >
      {/* Star Rating */}
      {/* <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
        {[...Array(4)].map((_, index) => (
          <Typography key={index} color="primary">
            ★
          </Typography>
        ))}
        <Typography color="disabled">★</Typography>
      </Box> */}

      {/* Hotel Name */}
      <Typography component="div" variant="h6">
        GRT HOTELS
      </Typography>

      {/* Confirmation & Favorite */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-start' }, // Center content on small screens
          alignItems: 'center',
        }}
      >
        <CheckCircle color="success" sx={{ marginRight: '4px' }} />
        <Typography variant="body2" color="textSecondary">
          Confirmed
        </Typography>
        <IconButton color="default" size="small">
          <FavoriteBorder />
        </IconButton>
      </Box>

      {/* Location */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-start' }, // Center content on small screens
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        
        <Typography variant="body2" color="textSecondary">
        <LocationOn sx={{fontSize:"15px"}}  color="error" />  GRT HOTEL, Palanganatham Madurai
        </Typography>
      </Box>

      {/* Phone */}
      <Button
        variant="outlined"
        startIcon={<Phone />}
        sx={{
          marginTop: '8px',
          borderColor: 'black',
          color: 'black',
          display: 'block', // Full width button
          marginLeft: { xs: 'auto', sm: 0 }, // Center button on small screens
          marginRight: { xs: 'auto', sm: 0 }, // Center button on small screens
        }}
      >
        9075642376
      </Button>
    </CardContent>
  </Box>
</Card>
    </>
  ):(
  <>
   {Array.isArray(data) && data.map((datas, index) => (
  <Card
    key={index}
    sx={{
      display: 'flex',
      backgroundColor: '#ffffe0',
      borderRadius: '15px',
      padding: '6px',
      maxWidth: "100%",
      marginBottom: '16px' // Add margin between cards if needed
    }}
  >
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      {/* Image */}
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        {Array.isArray(datas.addimages) && datas.addimages.map((image, imgIndex) => (
          <Grid item key={imgIndex}>
            <img src={image} alt={`banner-${imgIndex}`} style={{ width: 150, height: 150 }} />
          </Grid>
        ))}
      </Grid>

      {/* Content */}
      <Grid>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
          <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
            {/* Hotel Name */}
            <Typography component="div" variant="h6">
              {datas.servicename}
            </Typography>

            {/* Confirmation & Favorite */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="success" sx={{ marginRight: '4px' }} />
              <Typography variant="body2" color="textSecondary">
                Confirmed
              </Typography>
              <IconButton color="default" size="small">
                <FavoriteBorder />
              </IconButton>
            </Box> */}

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <LocationOn color="error" />
              <Typography variant="body2" color="textSecondary">
                {datas.addressline1}, {datas.addressline2},{datas.area}, {datas.city}, {datas.pincode}
              </Typography>
            </Box>

            {/* Phone */}
            <Button
              variant="outlined"
              startIcon={<Phone />}
              sx={{
                marginTop: '8px',
                borderColor: 'black',
                color: 'black',
              }}
            >
              {datas.number}
            </Button>
          </CardContent>
        </Box>
      </Grid>
    </Grid>
  </Card>
))}

  
  </>)}
    </>
  );
};

function Categories() {

  const{id} = useParams();

  const navigate = useNavigate();

  const handleDetails=(e,id)=>{
    navigate(`/categories-details/${id}`);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 425);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const[data,setData] = useState([])
  const[category,setCategory] = useState([])


  console.log(data,"ttttttttt")

  useEffect(()=>{
    CategoryData();
  },[id])

  const CategoryData = () => {
    try{
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`/api/categorydata?id=${id}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setData(result.data.data.result)
        setCategory(result.data.data)
        console.log(result.data.data,"poyyyyyyy")
       })
      .catch(error => console.log('error', error));

  } catch (error) {
    console.error(error);
  }
  }
  

  

  return (
   <>
   {isMobile ? (
   <>
   <NavBar/>
    <Container>
      <Container>
      <Grid  mt={isMobile ? 2 : 3} container spacing={2}  justifyContent="center">
          <Grid onClick={handleDetails} item xs={12} sm={6} md={6}>
            <HotelCard />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="center" mt={isMobile ? 2 : 3}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <CCarousel controls transition="crossfade" style={{ maxWidth: '100%' }}>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={Sales}
                    alt="slide 1"
                    style={{  height: isMobile ? '100%' : '100%', width: '100%', objectFit: 'cover'  }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={Sales}
                    alt="slide 2"
                    style={{  height: isMobile ? '100%' : '100%', width: '100%', objectFit: 'cover'  }}
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src={Sales}
                    alt="slide 3"
                    style={{  height: isMobile ? '100%' : '100%', width: '100%', objectFit: 'cover'  }}
                  />
                </CCarouselItem>
              </CCarousel>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid  mt={isMobile ? 2 : 3} container spacing={2}  justifyContent="center">
          <Grid onClick={handleDetails} item xs={12} sm={6} md={6}>
            <HotelCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <HotelCard />
          </Grid>
        </Grid>
      </Container>
    </Container>
    <Footer/>
   </>
  ):(
  <>
   <NavBar/>
   <Container>
  <Grid mt={5}>
  <Typography  variant="h5">Category: {category.categoryname}</Typography>
  </Grid>
  <Grid container direction="row" justifyContent="center" alignItems="center" mt={4}>
    <Grid item xs={12}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CCarousel controls transition="crossfade" style={{ height: '100px', width: "100%" }}>
          <CCarouselItem>
            <CImage className="d-block w-100" src={Sales} alt="slide 1" style={{ height: '100px', width: "100%", objectFit: 'cover' }} />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={Sales} alt="slide 2" style={{ height: '100px', width: "100%", objectFit: 'cover' }} />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={Sales} alt="slide 3" style={{ height: '100px', width: "100%", objectFit: 'cover' }} />
          </CCarouselItem>
        </CCarousel>
      </Box>
    </Grid>
  </Grid>
</Container>

<Container>
  <Grid mt={3} container spacing={3} justifyContent="flex-start">
    {data.length > 0 ? (
      data.map((item, index) => (
        <Grid
          key={item._id}
          item
          xs={12} sm={6} md={4} // Adjust for two cards per row on larger screens
         
        >
          <Card
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f7f4cd',
              borderRadius: '15px',
              padding: '16px',
              boxShadow: '0px 4px 10px #9f9c7a',
              maxWidth: '100%',
              marginBottom: '16px',
            }}
          >
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              {/* Image Carousel */}
              <Carousel showThumbs={false} infiniteLoop autoPlay>
                {Array.isArray(item.addimages) && item.addimages.map((image, imgIndex) => (
                  <div key={imgIndex}>
                    <img src={image} alt={`carousel-${imgIndex}`} style={{ maxHeight: 200, objectFit: 'cover' }} />
                  </div>
                ))}
              </Carousel>

              {/* Content */}
              <Grid  onClick={(e) => handleDetails(e, item._id)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                  <CardContent sx={{ paddingBottom: '8px' }}>
                    {/* Service Name */}
                    <Typography component="div" variant="h6" gutterBottom>
                      {item.servicename}
                    </Typography>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      
                      <Typography variant="body2" color="textSecondary">
                      <LocationOn color="error" sx={{ marginRight: '2px',fontSize:"15px" }} /> {item.addressline1}, {item.addressline2}, {item.area}, {item.city}, {item.pincode}
                      </Typography>
                    </Box>

                    {/* Phone */}
                    <Button
                      variant="outlined"
                      startIcon={<Phone />}
                      sx={{
                        marginTop: '16px',
                        borderColor: 'black',
                        color: 'black',
                      }}
                    >
                      {item.number}
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))
    ) : (
      <Grid xs={12} container justifyContent="center" alignItems="center">
        <Typography variant="h6" color="#000" sx={{ textAlign: "center" }}>
          No service in this category
        </Typography>
      </Grid>
    )}
  </Grid>
</Container>
   
    <Foot/>
  </>
)}
   </>
  );
}

export default Categories;
