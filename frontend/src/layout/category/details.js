import React, { useState, useEffect } from 'react';
import { Container, Grid,IconButton,Typography, Button, Box,Paper, Card,
  CardContent,
  CardMedia,TextField,Alert,Snackbar  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import { useNavigate,useParams,useLocation } from 'react-router-dom';
import './style.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Demo from '../../assets/img/image3.jpeg';
import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FaCircleUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import NavBar from '../navbar';
import Footer from '../footer';
import PhoneIcon from '@mui/icons-material/Phone';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffe0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  width:"auto",
  height:"auto",
  marginTop:"20px",
  color: "#000",
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    
  }),
}));
  



const HotelCard = () => {

  

  return (
    <>
    
<Card
      sx={{
        display: 'flex',
        backgroundColor: '#ffffe0',
        borderRadius: '15px',
        padding: '16px',
        maxWidth: 400, // Ensures cards don't take up too much space
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        sx={{ width: 150, borderRadius: '10px' }}
        src='https://res.cloudinary.com/qikcall/image/upload/v1725091160/bailg9wjkq8hbfqv7ysi.jpg'
        alt="Hotel"
      />

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
        <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
          {/* Star Rating */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle color="success" sx={{ marginRight: '4px' }} />
            <Typography variant="body2" color="textSecondary">
              Confirmed
            </Typography>
            <IconButton color="default" size="small">
              <FavoriteBorder />
            </IconButton>
          </Box>

          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <LocationOn color="error" />
            <Typography variant="body2" color="textSecondary">
              GRT HOTEL, Palanganatham Madurai
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
            9075642376
          </Button>
        </CardContent>
      </Box>
    </Card>
   
    </>
    
  );
};

const PrevButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  left: '10px',
  zIndex: 1,
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: '#444',
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: '10px',
  zIndex: 1,
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: '#444',
  },
}));

export default function Details() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  const [value, setValue] = React.useState('');
  const [color,setColor] = useState('')
  const [msg,setMsg] = useState('')
  const [open, setOpen] = React.useState(false);
  const [rate,setRate] = useState(false)
  const [showMore, setShowMore] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRateOpen = () => {
    setRate(true);
  };

  const handleRateClose = () => {
    setRate(false);
    setValue(null);
    setComment('');
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 425);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  

const{id} = useParams();

  const[cdata,setCdata] = useState([])

  console.log(cdata,"poooooo")

  useEffect(()=>{
    CategoryData();
  },[])

  const CategoryData = () => {
    try{
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(` /api/servicedata?id=${id}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setCdata(result.data.data)
        // console.log(result.data.data,"godzillla")
       })
      .catch(error => console.log('error', error));
      
  } catch (error) {
    console.error(error);
  }
  }


  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // Get token from URL params or cookies
  const urlToken = params.get('token');
  const cookieToken = Cookies.get('token');
  const token = urlToken || cookieToken;

  const [decodedToken, setDecodedToken] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState([]);
  const [databyid, setDatabyId] = useState([]);
  console.log(data,"data comming")
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.warn('No token found in URL or cookies');
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken) {
      handleGetData();
    }
  }, [decodedToken]);
  
  const handleGetData = async () => {
    try {
      const myHeaders = new Headers();
      
      // Check if token exists before appending
      if (token) {
        myHeaders.append("Authorization", token);
      } else {
        console.warn('No token available for Authorization header');
        return;
      }
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch(`/api/details?userid=${decodedToken?.user?.id}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        if (result.status_code === 200) {
          setOpen(true);
          setColor('success');
          setData(result.data.data)
          setMsg(result.data.msg || "Rating Registered");
        } else if (result.status_code === 400) {
          setOpen(true);
          setColor('error');
          setMsg(result.data.msg);
        }
      })
      .catch(error => {
        console.log('error', error);
        setOpen(true);
        setColor('error');
        setMsg(error.response?.data?.message || 'An Error Occurred');
      });

  } catch (error) {
    console.error(error);
    setOpen(true);
    setColor('error');
    setMsg(error.response?.data?.message || 'An Error Occurred');
  }
  };
  

const RegisterRating = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let name;

    if (data && typeof data === 'object' && 'username' in data) {
      name = data.username;
      console.log(name, "Username:");
    } else {
      console.log("Data is either not valid or doesn't contain a username.");
      setOpen(true);
      setColor('warning');
      setMsg('Login to give ratings');
      return;
    }
    

    let storename;
    if (Array.isArray(cdata) && cdata.length > 0) {
      storename = cdata[0].servicename;  // Accessing the nested array's first object's _id
      console.log(storename, "Store ID:");
    } else {
      console.log("cdata is either not an array or is empty.");
      return;
    }

    const raw = JSON.stringify({
      "username": name,
      "storename": storename,
      "rating": value,
      "comment": comment
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/rating", requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        if (result.status_code === 200) {
          setOpen(true);
          setColor('success');
          setMsg(result.data.msg || "Rating Registered");
        } else if (result.status_code === 400) {
          setOpen(true);
          setColor('error');
          setMsg(result.data.msg);
        }
      })
      .catch(error => {
        console.log('error', error);
        setOpen(true);
        setColor('error');
        setMsg(error.response?.data?.message || 'An Error Occurred');
      });

  } catch (error) {
    console.error(error);
    setOpen(true);
    setColor('error');
    setMsg(error.response?.data?.message || 'An Error Occurred');
  }
};

const getWishlistById = (userid) => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`/api/wishlistdata?id=${userid}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: "Unexpected Error" } };
        }
      })
      .then((result) => {
        if (result.status_code === 200) {
          console.log("Wishlist data", result.data.data[0]);
          const wishlistData = result.data.data[0]; // Store fetched wishlist data
          setDatabyId(wishlistData); // Store fetched data

          // Assuming wishlistData is an object, compare storeId directly
          if (wishlistData && wishlistData.wishlist && wishlistData.wishlist.storeId === cdata[0]?._id) {
            console.log("Item is in the wishlist");
            setIsFavorite(true); 
          } else {
            console.log("Item is NOT in the wishlist");
            setIsFavorite(false); // Not favorite
          }
        } else if (result.status_code === 400) {
          console.log(result.data.msg);
        }
      })
      .catch((error) => {
        console.log("Error fetching wishlist", error);
      });
  } catch (error) {
    console.log("Error fetching wishlist", error);
  }
};




// Function to save or remove from wishlist
const saveWishlist = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      storeId: cdata[0]?._id,
      customerId: data?._id,
      isfavorite: !isFavorite // Toggle the favorite status
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("/api/wishlist", requestOptions);
    const result = await response.json();

    if (response.status === 200) {
      setIsFavorite((prev) => !prev); // Toggle the favorite icon state
      setOpen(true);
      setColor("success");
      setMsg(result.msg || (isFavorite ? "Removed from wishlist" : "Added to wishlist"));
    } else {
      throw new Error(result.msg || "An error occurred");
    }
  } catch (error) {
    console.error("Error:", error);
    setOpen(true);
    setColor("error");
    setMsg(error.message || "An error occurred");
  }
};

// Handle the wishlist action (save and fetch again)
const handleWishlist = (userid) => {
  saveWishlist(); // Save the wishlist changes

  setTimeout(() => {
    getWishlistById(userid); // Refresh wishlist after saving
  }, 2000);
};


useEffect(() => {
  if (data?._id) {
    getWishlistById(data._id); 
  }
}, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ratingsToShow = showMore ? cdata[0]?.ratings : cdata[0]?.ratings?.slice(0, 10);

  const handleMoreReviews = () => {
    setShowMore(true);
  };

  useEffect(() => {
    AllServiceData();
  }, []);
  
  const [alldata, setAllData] = useState([]);
  
  const AllServiceData = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
  
      fetch("/api/servicelists", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: "Unexpected Error" } };
          }
        })
        .then((result) => {
          if (result.status_code === 200) {
            console.log("All Data", result.data.data);
            setAllData(result.data.data); // Make sure this is an array of service objects
          } else if (result.status_code === 400) {
            console.log(result.data.msg);
          }
        })
        .catch((error) => {
          console.log("Error fetching Data", error);
        });
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };
  
  
  const filteredData = alldata.filter(data => {
    // Ignore data with matching _id
    if (data._id === cdata._id) {
        return false;
    }

    // Check if the servicetype in alldata matches the servicetype in cdata
    const serviceTypeMatches = Array.isArray(data.servicetype) && 
                               Array.isArray(cdata.servicetype) &&
                               data.servicetype.some(type => cdata.servicetype.includes(type));

    // If there's a match, include the item
    if (serviceTypeMatches) {
        return true;
    }

    // If no match, log the message and exclude the item
    console.log(`No match for servicetype in ${data.servicetype}`);
    console.log(`Match for servicetype in ${cdata.servicetype}`);
    return false;
});

console.log('Matching services found:', filteredData);
  
  
  
  

  
  return (
   <>
    {isMobile ? (
    <>
    <NavBar/>
   
      <>
    <Container sx={{marginTop:"50px"}} >
    
    <Grid mt={5}  xs={12} container spacing={1} sx={{ backgroundColor: '#f7f4cd' }}>
    <Grid item xs={4}>
        <Grid container direction="column" spacing={2} alignItems="left">
          <Grid item>
            <img src={Demo} alt="demo" width="100%" height="150px" />
          </Grid>
          <Grid item>
            <img src={Demo} alt="demo" width="100%" height="150px" />
          </Grid>
        </Grid>
      </Grid>

     
      <Grid item xs={4}>
        <Grid container direction="column" spacing={2} alignItems="left">
          <Grid item>
            <img src={Demo} alt="demo" width="100%" height="150px" />
          </Grid>
          <Grid item>
            <img src={Demo} alt="demo" width="100%" height="150px" />
          </Grid>
        </Grid>
      </Grid>

      {/* Third column with one photo occupying two rows */}
      <Grid item xs={4} style={{ position: 'relative' }}>
      <Grid container direction="column"  alignItems="center">
        <Grid item style={{ position: 'relative' }}>
          <img src={Demo} alt="demo" width="100%" height="315px" style={{ display: 'block' }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: background color with opacity
            color: 'white', // Change text color if needed
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10, // Ensure this is above the image
            padding: '10px', // Optional: padding around the text
          }}>
            + 200 Photos
          </div>
        </Grid>
      </Grid>
    </Grid>
    </Grid>
    </Container>
    <Container >
    <Grid mt={5}   sx={{ border: '1px solid #000', padding: 2,  }}>
      <Grid container  direction="row"   spacing={2}>
        <Grid container  direction="row" justifyContent="space-between"  alignItems="left" item xs={12} md={6} >
          <Grid  item xs={4}>
            <img
              src="https://via.placeholder.com/100" // Replace with actual logo URL
              alt="GRT Hotels"
              style={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={7} justifyContent="center" alignItems="center">
            <Typography mt={3} sx={{fontSize:"30px"}} fontWeight="bold">
              GRT HOTELS
            </Typography>
            <Typography sx={{fontSize:"20px"}} variant="body2">★★★★☆</Typography>
            <Typography className='mt-2' fontWeight="bold" sx={{fontSize:"10px"}} variant="body2" color="textSecondary">
              <span style={{ marginRight: 8 }}>📍</span>
              GRT HOTEL, Palanganatham Madurai
            </Typography>
            <Grid container spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
              <Grid item>
                <Button variant="outlined" startIcon={<PhoneIcon />}>
                  9075642376
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<ShareIcon />}>
                  Share
                </Button>
              </Grid>
              <Grid item>
                <Button  startIcon={<FavoriteBorderIcon />} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container
  direction="column"
  justifyContent="space-evenly"
  alignItems="flex-start" item xs={12} md={4}>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>GST:</strong> AMJ5678
          </Typography>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>SMS:</strong>
          </Typography>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>Website:</strong> www.grthotel.com
          </Typography>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>Mail id:</strong> grt@com
          </Typography>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>Types of Rooms:</strong> 4
          </Typography>
          <Typography className='mt-4' sx={{fontSize:"15px"}}  variant="body2">
            <strong>Check out:</strong> 24 Hrs
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    </Container>
    </>
    


<Footer/>
    </>
  ):(
  <>
  <NavBar/>
 
  <React.Fragment > {/* Make sure to add a unique key */}
   <Container>
  <Grid mt={5} sx={{ border: '1px solid #9f9c7a', borderRadius: '8px', boxShadow: '0 4px 12px #9f9c7a', padding: 3 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} container alignItems="flex-start">
        <Grid item xs={4}>
          <img
            src={cdata.logo} // Replace with actual logo URL
            alt="GRT Hotels"
            style={{ width: '120px', borderRadius: '4px' }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: "28px", fontWeight: '600', color: '#333' }}>
            {cdata.servicename}
          </Typography>
          <Typography sx={{ fontSize: "18px", color: '#ff9800' }} variant="body2">★★★★☆</Typography>
          <Typography
            sx={{ fontSize: "12px", marginTop: 1, color: '#757575' }}
            variant="body2"
          >
            <span style={{ marginRight: 8 }}>📍</span>
            {`${cdata.addressline1}, ${cdata.addressline2}, ${cdata.area}, ${cdata.city}, ${cdata.pincode}`}
          </Typography>
          <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Button
                sx={{ fontSize: '14px', textTransform: 'none', padding: '6px 12px', borderRadius: '20px' }}
                variant="outlined"
                startIcon={<PhoneIcon />}
              >
                {cdata.number}
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ fontSize: '14px', textTransform: 'none', padding: '6px 12px', borderRadius: '20px' }}
                variant="outlined"
                startIcon={<ShareIcon />}
              >
                Share
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleWishlist(data?._id)}
                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                sx={{ fontSize: "14px", textTransform: 'none', padding: '6px 12px', borderRadius: '20px' }}
              >
                {isFavorite ? "Favorited" : "Favorite"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Container>

    {/* Gallery Section */}
    <Container>
      <Card sx={{ width: "100%", backgroundColor: "#f7f4cd", marginTop: "50px",border: '1px solid #9f9c7a', borderRadius: '8px', boxShadow: '0 4px 12px #9f9c7a', padding: 3 }}>
        <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>Gallery</Typography>
        <Slider {...settings} style={{ marginTop: '20px' }}>
          {Array.isArray(cdata.addimages) && cdata.addimages.map((image, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={image} alt={`image-${index}`} style={{ width: "200px", height: "200px", borderRadius: '10px' }} />
            </div>
          ))}
        </Slider>
      </Card>
    </Container>
  </React.Fragment>


<Container>
      <Grid mt={5} container direction="column" justifyContent="center" alignItems="center">
        <Card sx={{ width: "100%", backgroundColor: "#f7f4cd", border: '1px solid #9f9c7a', borderRadius: '8px', boxShadow: '0 4px 12px #9f9c7a', padding: 3  }}>
          <Grid mt={3} container direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: "25px", marginLeft: "10px", fontWeight: "bold" }}>
              Customer Reviews
            </Typography>
            <Button onClick={handleRateOpen} variant='contained' sx={{ backgroundColor: "#2d2859", marginRight: "10px", '&:hover': { backgroundColor: "#2d2859" } }}>
              New Comment
            </Button>
            <Dialog
              open={rate}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
             
              <DialogContent sx={{ width: "600px", backgroundColor: '#2d2859' }}>
              <Grid container direction="column" justifyContent="flex-start" sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      <Typography className='mt-2' align="left" sx={{ fontSize: "30px", fontWeight: 'bold', color: '#333' }}>
        Post Your Experience
      </Typography>
      <Typography className='mt-2' sx={{ fontSize: "18px", color: '#555' }}>
        <FaCircleUser style={{ marginRight: 8 }} /> {data.username}
      </Typography>
      
      <Grid container direction="column" justifyContent="center" alignItems="flex-start">
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" mt={3}>
          <Typography sx={{ fontSize: "20px", fontWeight: '500', color: '#333' }}>Rate Your Reviews:</Typography>
          <Rating
            className='mt-2'
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{ '& .MuiRating-iconFilled': { color: '#ff9800' }, '& .MuiRating-iconEmpty': { color: '#ddd' } }}
          />
        </Grid>
        
        <Grid mt={3} container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            id="outlined-textarea"
            label="Comment Your Experience"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            multiline
            rows={4}
            sx={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd", // Light grey border color
                },
                "&:hover fieldset": {
                  borderColor: "#ff9800", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9800", // Border color when focused
                },
              },
              "& label": {
                color: "#666",
              },
            }}
          />
        </Grid>
        
        <Grid mt={3} container direction="row" justifyContent="space-between" alignItems="center">
          <Button color='error' variant="outlined" onClick={handleRateClose}>Close</Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              if (!value) {
                setOpen(true);
                setColor('error');
                setMsg('Ratings required');
                return;
              }
              if (!comment) {
                setOpen(true);
                setColor('error');
                setMsg('Comment Your Experience');
                return;
              }
              RegisterRating();
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      
      <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={color} variant="filled" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid mt={3} mb={3} container direction="row" justifyContent="space-evenly" alignItems="flex-start">
            {Array.isArray(cdata) && cdata.length > 0 && Array.isArray(cdata[0]?.ratings) && ratingsToShow.length > 0 ? (
              ratingsToShow.map((datas, index) => (
                <Grid mb={3} item xs={11} key={index} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                  <Paper sx={{ width: "100%", border: "1px solid", padding: "10px" }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "#000", marginLeft: "10px" }} className='mt-2'>
                        <FaCircleUser /> {datas.username}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", marginRight: "10px" }}>
                        Commented at {new Date(datas.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Typography sx={{ marginTop: "10px" }}>Ratings:</Typography>
                    <Rating className='mt-2' value={datas.rating} readOnly />
                    <Typography sx={{ marginTop: "10px" }}>{datas.comment}</Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid mt={5} container direction="row" justifyContent="center" alignItems="center">
                <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>No Comments Posted Yet</Typography>
              </Grid>
            )}
          </Grid>
          {Array.isArray(cdata) && cdata.length > 0 && cdata[0]?.ratings?.length > 10 && !showMore && (
            <Button variant='outlined' onClick={handleMoreReviews} sx={{ margin: "10px auto" }}>
              More Reviews
            </Button>
          )}
          {showMore && (
            <Dialog open={showMore} onClose={() => setShowMore(false)} aria-labelledby="more-reviews-title">
              <DialogTitle id="more-reviews-title">More Reviews</DialogTitle>
              <DialogContent>
                {cdata[0]?.ratings.slice(10).map((datas, index) => (
                  <Paper key={index} sx={{ margin: "10px 0", padding: "10px", border: "1px solid" }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
                        <FaCircleUser /> {datas.username}
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        Commented at {new Date(datas.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Typography sx={{ marginTop: "10px" }}>Ratings:</Typography>
                    <Rating value={datas.rating} readOnly />
                    <Typography sx={{ marginTop: "10px" }}>{datas.comment}</Typography>
                  </Paper>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowMore(false)} color="primary">Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </Card>
      </Grid>
    </Container>
<Container>
  
</Container>

    <Container>
    {Array.isArray(filteredData) && filteredData.length > 0 && (
  <>
    <Typography mt={5} sx={{ fontSize: "30px", color: "#000", fontWeight: 'bold', textAlign: 'center' }}>
      Related Posts
    </Typography>
    
    <Grid container spacing={4} justifyContent="center" mt={3}>
      {filteredData.map((data, index) => (
        <Grid item xs={12} sm={6} md={5} key={index}>
          <Card
            sx={{
              display: 'flex',
              backgroundColor: '#f9f9f9',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              maxWidth: 600 // Optional, for controlling card width
            }}
          >
            {/* Left Side Image */}
            <CardMedia
              component="img"
              sx={{
                width: 160,
                height: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
                marginRight: '16px'
              }}
              src={data.logo || 'https://res.cloudinary.com/qikcall/image/upload/v1725091160/bailg9wjkq8hbfqv7ysi.jpg'}
              alt="Service"
            />

            {/* Right Side Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent sx={{ paddingBottom: '8px' }}>
                <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {data.servicename}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <LocationOn sx={{ fontSize: "16px", color: "#f44336" }} />
                  <Typography sx={{ fontSize: "14px", color: "#555", marginLeft: '4px' }}>
                    {`${data.addressline1}, ${data.addressline2}, ${data.area}, ${data.city}, ${data.state}`}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Phone />}
                  sx={{
                    marginTop: '16px',
                    backgroundColor: '#333',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#555',
                    }
                  }}
                >
                  {data.number}
                </Button>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
)}

    </Container>
    
    <Footer/>
  </>
)}
   </>
  );
}
