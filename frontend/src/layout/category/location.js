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


// HotelCard Component
const HotelCard = () => {
    const { id } = useParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const [data, setData] = useState([]);
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      CategoryData();
    }, [id]);
  
    const CategoryData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
  
        const response = await fetch(`/api/districtdata?id=${id}`, requestOptions);
        if (response.status === 200 || response.status === 400) {
          const result = await response.json();
          console.log(result.data.data, "details"); // Check the structure here
          setData(result.data.data.service);
        } else {
          console.log('Unexpected Error');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    return (
      <>
        {isMobile ? (
          // Mobile view card
          <Card sx={{
            display: 'flex',
            backgroundColor: '#ffffe0',
            borderRadius: '15px',
            padding: '16px',
            maxWidth: 400,
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
            <CardMedia component="img"
              sx={{ width: { xs: '100%', sm: 150 }, borderRadius: '10px', marginBottom: { xs: '16px', sm: 0 } }}
              image="your-image-url-here"
              alt="Hotel" />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: { xs: 0, sm: '16px' }, textAlign: { xs: 'center', sm: 'left' } }}>
              <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
                <Typography component="div" variant="h6">GRT HOTELS</Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
                  <CheckCircle color="success" sx={{ marginRight: '4px' }} />
                  <Typography variant="body2" color="textSecondary">Confirmed</Typography>
                  <IconButton color="default" size="small">
                    <FavoriteBorder />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center', marginTop: '8px' }}>
                  <Typography variant="body2" color="textSecondary">
                    <LocationOn sx={{ fontSize: "15px" }} color="error" /> GRT HOTEL, Palanganatham Madurai
                  </Typography>
                </Box>
                <Button variant="outlined" startIcon={<Phone />}
                  sx={{ marginTop: '8px', borderColor: 'black', color: 'black', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                  9075642376
                </Button>
              </CardContent>
            </Box>
          </Card>
        ) : (
          <>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((datas, index) => (
                <Card
                  key={index}
                  sx={{
                    display: 'flex',
                    backgroundColor: '#ffffe0',
                    borderRadius: '15px',
                    padding: '6px',
                    maxWidth: "100%",
                    marginBottom: '16px'
                  }}
                >
                  <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <Grid container direction="row" justifyContent="space-around" alignItems="center">
                      {Array.isArray(datas.addimages) && datas.addimages.map((image, imgIndex) => (
                        <Grid item key={imgIndex}>
                          <img src={image} alt={`banner-${imgIndex}`} style={{ width: 150, height: 150 }} />
                        </Grid>
                      ))}
                    </Grid>
                    <Grid>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
                          <Typography component="div" variant="h6">{datas.servicename}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle color="success" sx={{ marginRight: '4px' }} />
                            <Typography variant="body2" color="textSecondary">Confirmed</Typography>
                            <IconButton color="default" size="small">
                              <FavoriteBorder />
                            </IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                            <LocationOn color="error" />
                            <Typography variant="body2" color="textSecondary">
                              {datas.addressline1}, {datas.addressline2}, {datas.area}, {datas.city}, {datas.pincode}
                            </Typography>
                          </Box>
                          <Button variant="outlined" startIcon={<Phone />}
                            sx={{ marginTop: '8px', borderColor: 'black', color: 'black' }}>
                            {datas.number}
                          </Button>
                        </CardContent>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Typography>No data available</Typography>
            )}
          </>
        )}
      </>
    );
  };
  
function Categories() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const handleDetails = (e, id) => {
      navigate(`/categories-details/${id}`);
    };
  
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const [data, setData] = useState([]); // Initialize with empty array
    const [category, setCategory] = useState({}); // Adjust initialization of category
  
    useEffect(() => {
      CategoryData();
    }, [id]);
  
    const CategoryData = async () => {
        try {
          const requestOptions = {
            method: "GET",
            redirect: "follow",
          };
      
          fetch(`/api/districtdata?id=${id}`, requestOptions)
          .then(async (response) => {
            if (response.status === 200 || response.status === 400) {
              return { status_code: response.status, data: await response.json() };
            } else {
              return { status_code: response.status, data: { msg: 'Unexpected Error' } };
            }
          })
          .then((result) => {
            setData(result.data.data.service);
            setCategory(result.data.data)
            console.log(result.data.data.service, "category");
          })
          .catch(error => console.log('error', error));
        } catch (error) {
          console.error('Fetch error:', error);
          return { status_code: 500, data: { msg: 'Fetch error occurred' } };
        }
      };
  
    return (
      <>
        {isMobile ? (
          <>
            <NavBar />
            <Container>
              <Container>
                <Grid mt={isMobile ? 2 : 3} container spacing={2} justifyContent="center">
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
                        {/* Carousel items here */}
                      </CCarousel>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
  
              <Container>
                <Grid mt={isMobile ? 2 : 3} container spacing={2} justifyContent="center">
                  <Grid onClick={handleDetails} item xs={12} sm={6} md={6}>
                    <HotelCard />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <HotelCard />
                  </Grid>
                </Grid>
              </Container>
            </Container>
            <Footer />
          </>
        ) : (
          <>
            <NavBar />
            <Container>
  <Grid mt={5}>
  <Typography  variant="h5">Category: {category.district}</Typography>
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
  <Grid mt={3} container justifyContent="flex-start">
    {Array.isArray(data) && data.length > 0 ? (
      data.map((item) => (
        <Grid key={item._id} onClick={(e) => handleDetails(e, item._id)} item xs={12}>
          <Card
            sx={{
              display: 'flex',
              backgroundColor: '#ffffe0',
              borderRadius: '15px',
              padding: '6px',
              maxWidth: '100%',
              marginBottom: '16px',
            }}
          >
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid container direction="row" justifyContent="space-around" alignItems="center">
                {Array.isArray(item.addimages) &&
                  item.addimages.map((image, imgIndex) => (
                    <Grid item key={imgIndex}>
                      <img src={image} alt={`banner-${imgIndex}`} style={{ width: 150, height: 150 }} />
                    </Grid>
                  ))}
              </Grid>
              <Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                  <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
                    <Typography component="div" variant="h6">
                      {item.servicename}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircle color="success" sx={{ marginRight: '4px' }} />
                      <Typography variant="body2" color="textSecondary">
                        Confirmed
                      </Typography>
                      <IconButton color="default" size="small">
                        <FavoriteBorder />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <LocationOn color="error" />
                      <Typography variant="body2" color="textSecondary">
                        {item.addressline1}, {item.addressline2}, {item.area}, {item.city}, {item.pincode}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      startIcon={<Phone />}
                      sx={{ marginTop: '8px', borderColor: 'black', color: 'black' }}
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
      <Typography>No data available</Typography>
    )}
  </Grid>
</Container>

  
            <Foot />
          </>
        )}
      </>
    );
  }
  

export default Categories;
