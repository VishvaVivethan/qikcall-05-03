import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, IconButton, Button, Divider, Link,Paper,Card } from '@mui/material';
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
import logo from '../../assets/logo/recent2.png'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f7f4cd',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  width:"100%",
  border: "1px solid black",
  marginTop:"15px",
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


function ServiceCard() {
  const navigate = useNavigate();
  const [value, setValue] = useState(3);
  const token = jwtDecode(Cookies.get('token'));
  const [data, setData] = useState({}); // Initialize as an object

  console.log(data, "<<<<<<<<<<<");

  useEffect(() => {
    handelGetData();
  }, []);

  const handelGetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", Cookies.get('token'));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
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
          const serviceData = result.data.data.servicelist;
          setData(serviceData || {});  // Ensure that you are setting an object, not null/undefined
          console.log(serviceData, "good");
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

  const handlePricing = () => {
    navigate('/pricing');
  };

  return (
    <>
      {data.isapprove ? (<>
        <Item>
        <Grid elevation={3} sx={{ padding: 1, position: 'relative', backgroundColor: "#f7f4cd" }}>
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
            <EditIcon onClick={handlePricing} />
          </IconButton>

          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <ShoppingCartIcon sx={{ fontSize: 40, color: '#ff8a00' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Store Name: <span style={{ textAlign: "center", fontFamily: "Anton, sans-serif", fontStyle: "italic" }}>{data.servicename || "No Name to Display"}</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid mt={1} container alignItems="center" spacing={2}>
            <Grid item>
              <Typography fontSize="15px">
                Store Address:{" "}
                <span style={{ textAlign: "center", fontFamily: "Anton, sans-serif", fontStyle: "italic" }}>
                  {data.addressline1 || data.addressline2 || data.area || data.city || data.pincode || data.state
                    ? `${data.addressline1 || ""}, ${data.addressline2 || ""}, ${data.area || ""}, ${data.city || ""}, ${data.pincode || ""}, ${data.state || ""}`
                    : "No address to display"}
                </span>
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="subtitle1" sx={{ fontSize: "20px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            Category
          </Typography>

          <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={1} sx={{ marginY: 1 }}>
            {Array.isArray(data.servicetype) && data.servicetype.length > 0 ? (
              data.servicetype.map((product, index) => (
                <Grid item container direction="row" justifyContent="flex-start" alignItems="center" key={index}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      fontSize: "8px",
                      color: "#282866",
                      borderColor: "#282866",
                      fontFamily: "Anton, sans-serif",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {product}
                  </Button>
                </Grid>
              ))
            ) : (
              <Typography>No Products to display</Typography>
            )}
          </Grid>

          <Typography variant="subtitle1" mt={2} sx={{ fontSize: "20px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            Gallery
          </Typography>

          <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={1} sx={{ marginY: 1 }}>
            {Array.isArray(data.addimages) && data.addimages.length > 0 ? (
              data.addimages.map((image, index) => (
                <Grid item key={index}>
                  <img src={image} alt={`banner-${index}`} style={{ width: 150, height: 150 }} />
                </Grid>
              ))
            ) : (
              <Typography>No images to display</Typography>
            )}
          </Grid>

          <Divider sx={{ marginY: 3, border: '1px solid #000' }} />

          <Grid mt={4}>
            <Box mt={3} sx={{ backgroundColor: '#2d2859', color: "#fff", borderRadius: "12px" }}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12} container direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Grid>
                    <Typography sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>
                      Rating and reviews:
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography component={Link} to="/" sx={{ fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", fontSize: "10px" }}>
                      See all
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={4}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    User Reviews
                  </Typography>
                </Grid>
                <Grid item xs={12}>
            {Array.isArray(data.ratings) && data.ratings.length > 0 ? (
  data.ratings.map((review, index) => (
    <Grid 
      item 
      xs={8} 
      container 
      direction="row" 
      justifyContent="flex-start"  
      key={index} 
      sx={{ padding: 1 }}
    >
      <Item>
        <Typography variant="subtitle1">
          User Name: {review.username}
        </Typography>
        <Typography sx={{ fontSize: "15px" }} variant="subtitle1">
          Rating: 
          <Rating
            value={review.rating}
            sx={{ fontSize: "15px" }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Typography>
        <Typography variant="subtitle1">
          Comments: {review.comment}
        </Typography>
      </Item>
    </Grid>
  ))
) : (
  <Typography>No Reviews Submitted yet</Typography>
)}

            </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Item>
      </>):( <Container style={{marginTop:"30px"}}>
    <Grid mb={5} mt={5} item xs={12} container direction="column" justifyContent="space-evenly" alignItems="center" >
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
  </Container>)}
    </>
  );
}

    
    // const RenderStars = () => {

    //   const [value, setValue] = useState(3);
    //   return (
        
    //     <>
        
    //     </>
    //   );
    // };
    

    function BusinessDetails(){

        const navigate = useNavigate();
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleService = () => {
    navigate('/service');
  };

  const token = jwtDecode(Cookies.get('token'));

const [data, setData] = useState([]);

const role = token.user.role

console.log(data,"data not comming")
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

  const handlePricing = () => {
    navigate('/pricing');
  };

        return(
           <>
           {isMobile ? (
           <>
           
           </>
        ):(
        <>
        <NavBar/>
       
  <Container>
    <Box p={3} mt={5} height={"auto"} sx={{ border: '1px solid #000' }} bgcolor="#f7f4cd" borderRadius={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontSize: "35px",
                color: "#000",
                fontFamily: "Anton, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
              color="primary"
            >
              Basic Information
            </Typography>
            <IconButton>
              <EditIcon onClick={handlePricing} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 0 }}>
          <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
        </Grid>

        <Grid container spacing={3} sx={{ padding: "10px" }}>
          <Grid item xs={6} container direction="column" justifyContent="space-evenly">
            <Grid item container justifyContent="flex-start" alignItems="center">
              <Grid mt={2} item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#000",
                    fontFamily: "Anton, sans-serif",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  <ShoppingBagIcon color="primary" /> Aadhar:
                </Typography>
              </Grid>
              <Grid mt={2} item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#000",
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
                    fontSize: "20px",
                    color: "#000",
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
                    fontSize: "20px",
                    color: "#000",
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
            <Grid item container justifyContent="flex-end" alignItems="center">
              <Grid mt={2} item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#000",
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
                    fontSize: "20px",
                    color: "#000",
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

            <Grid item container justifyContent="flex-end" alignItems="center">
              <Grid mt={2} item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#000",
                    fontFamily: "Anton, sans-serif",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  <ShoppingBagIcon color="primary" /> Gst Number:
                </Typography>
              </Grid>
              <Grid mt={2} item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#000",
                    fontFamily: "Anton, sans-serif",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    ml: 1,
                  }}
                >
                  {data.gstnumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Container>
  
 
  <Container>
    <Grid container mt={5} spacing={2} sx={{ padding: 3, backgroundColor: '#f7f4cd' }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Service Management
        </Typography>
      </Grid>
      <Grid xs={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={6} align="left">
          <Typography sx={{ fontSize: "20px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>
            Service List
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Button variant="contained" onClick={handleService} startIcon={<EditIcon />} sx={{ borderRadius: 50 }}>
            Add Services
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="column" justifyContent="space-evenly" alignItems="center" item xs={12}>
        <ServiceCard sx={{ padding: "10px" }} />
      </Grid>
    </Grid>
  </Container>
  



            <Footer/>
        </>
    )}
           </>
        )
    }

    export default BusinessDetails