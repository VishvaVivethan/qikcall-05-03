import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { debounce } from "lodash";
import './style.css';
// import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Container, Dialog, AppBar, Toolbar, List, Card, CardContent, Slide, TextField,useMediaQuery,Divider,CircularProgress,FormControl,InputLabel } from '@mui/material';
// import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';

// import { FaWhatsapp } from "react-icons/fa";
// import ReactSearchBox from "react-search-box";

// import CategoryIcon from '@mui/icons-material/Category';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import BusinessIcon from '@mui/icons-material/Business';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import PercentIcon from '@mui/icons-material/Percent';
import { jwtDecode } from "jwt-decode";
// import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../../assets/logo/recent2.png';
import Twitter from '../../assets/qik call mobile view icons/Group.png'
import Whatsapp from '../../assets/qik call mobile view icons/Group76.png'
import Fb from '../../assets/qik call mobile view icons/Group77.png'
import Linkedin from '../../assets/qik call mobile view icons/Group78.png'
import Instagram from '../../assets/qik call mobile view icons/Group80.png'
import Telegram from '../../assets/qik call mobile view icons/telegram1.png'
// import Youtube from '../../assets/qik call mobile view icons/youtube.png'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
// import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import LoginIcon from '@mui/icons-material/Login';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';

import { Button, Typography, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaTwitter as FaXTwitter, FaWhatsapp } from 'react-icons/fa';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiTwitterXLine } from "react-icons/ri";
// import { IoIosPhonePortrait } from "react-icons/io";
// import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function NavBar() {


  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook className='social-icon' />, url: '#' },
    { name: 'Instagram', icon: <FaInstagram className='social-icon' />, url: '#' },
    { name: 'YouTube', icon: <FaYoutube className='social-icon' />, url: '#' },
    { name: 'X', icon: <RiTwitterXLine className='social-icon' />, url: '#' },
    { name: 'LinkedIn', icon: <FaLinkedin className='social-icon' />, url: '#' },
    { name: 'Telegram', icon: <FaTelegram className='social-icon' />, url: '#' },
    { name: 'WhatsApp', icon: <FaWhatsapp className='social-icon' />, url: '#' },
  ];
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 598);
  const [language, setLanguage] = React.useState('EN');
  const [categorylist, setCategorylist] = React.useState('category');
  const [getData, setGetData] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [filterArea, setFilterArea] = useState('');
const [filterCity, setFilterCity] = useState('');
const [filterPincode, setFilterPincode] = useState('');


  // const [inputText, setInputText] = useState("");


  // let inputHandler = (e) => {
  //   //convert input text to lower case
  //   var lowerCase = e.target.value.toLowerCase();
  //   setInputText(lowerCase);
  // };

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategorylist(event.target.value);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 598);
  };

  const mobileView = useMediaQuery('(max-width:320px)');

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // data = [
  //   {
  //     key: "john",
  //     value: "John Doe",
  //   },
  //   {
  //     key: "jane",
  //     value: "Jane Doe",
  //   },
  //   {
  //     key: "mary",
  //     value: "Mary Phillips",
  //   },
  //   {
  //     key: "robert",
  //     value: "Robert",
  //   },
  //   {
  //     key: "karius",
  //     value: "Karius",
  //   },
  // ];



  const handleFreelancer = () => {
    navigate('/freelancer');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handlebusiness = () => {
    navigate('/registerbusiness');
  };

  const handlebusinessdetails = () => {
    navigate('/businessdetails');
  };

  const handlebusinessupdate = () => {
    navigate('/update-to-business');
  };

  const handleFreelist = () => {
    navigate('/free-listing');
  };

  const handleFreelistForm = () => {
    navigate('/free-listingform');
  };


  const handleFreelancerdetails = () => {
    navigate('/freelancerdetails');
  };

  const handleWishlist = () => {
    navigate('/wishlist');
  };

  const handleUserprofile = () => {
    navigate('/userprofile');
  };

  const handleDetails = () => {
    navigate('/usersdetails/:token');
  };

  const handlesignin = () => {
    navigate('/signin');
  };

  const handleNotify = () => {
    navigate('/notifications');
  };

  const handleAdvertise = () => {
    navigate('/advertise');
  };

  const handleOffer = () => {
    navigate('/today-offer');
  };

  const handleNavigate = (category) => {
    navigate(`/categorieslist/${category}`)
  }

  const handleBizsales = () => {
    navigate(`/bizsales`)
  }

  const handleJobs = () => {
    navigate(`/jobs`)
  }

  useEffect(() => {
    GetCategory()
  }, [])

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
          setGetData(result.data.data)
          console.log(result.data.data, "dinosaur")
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error("Request Error:", error);
    }

  }

  const [search, setSearch] = useState('');
  const [searchdata, setSearchdata] = useState('');

  console.log(searchdata, "112122122");
  console.log(search, "lllllllllllll");

  const getSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Ensure the search value is not empty
    if (!search) {
      console.log("Please enter a search term.");
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const payload = {};

      if (isNaN(search)) {
        // If search is not a number, assume it's either a servicename or city
        payload.servicename = search;
        payload.city = search;
      } else {
        // If search is a number, assume it's a phone number
        payload.number = search;
      }

      const raw = JSON.stringify(payload);

      console.log("Request Payload:", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/search", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            const result = await response.json();
            setSearchdata(result.data);
            console.log("API Response:", result.data);
            return { status_code: response.status, data: result };
          } else {
            console.log("Unexpected Status Code:", response.status);
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          if (result.status_code === 200) {
            console.log("Searched Data:", result.data);
            // Handle the result.data as needed in your UI
          } else if (result.status_code === 400) {
            console.error("Search Error:", result.data.msg);
            // Handle the error as needed in your UI
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });

    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  const [filteredSearchData, setFilteredSearchData] = useState(searchdata);


  useEffect(() => {
    setFilteredSearchData(searchdata); // Show all data by default
  }, [searchdata]);

  const applyFilters = () => {
    let filteredData = searchdata;

    // Apply filters only if user has input values
    if (filterArea) {
      filteredData = filteredData.filter(data => data.area.toLowerCase().includes(filterArea.toLowerCase()));
    }
    if (filterCity) {
      filteredData = filteredData.filter(data => data.city.toLowerCase().includes(filterCity.toLowerCase()));
    }
    if (filterPincode) {
      filteredData = filteredData.filter(data => data.pincode.toString().includes(filterPincode));
    }

    setFilteredSearchData(filteredData); // Update with filtered data
  };

  const clearFilters = () => {
    // Clear filter input and show all data again
    setFilterArea('');
    setFilterCity('');
    setFilterPincode('');
    setFilteredSearchData(searchdata); // Reset to show all data
  };

  const [searchPin, setSearchPin] = useState([])
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [pincodename, setPincodename] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [pincodedata, setPincodedata] = useState();
  const [areadata, setAreadata] = useState();

  console.log(areadata,"area data")


  const SearchbyArea = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "area": text,
      "pincodename": pincodename
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/area", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: data };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        if (result.status_code === 200) {
          setSearchPin(result.data.data || []); // Ensure data is an array or empty
        } else {
          setSearchPin([]); // Clear on error
        }
      })
      .catch((error) => {
        console.error('error', error);
        setSearchPin([]); // Handle fetch error by clearing options
      });
  };

  // Debounce the fetch request to avoid calling it on every keystroke
  const debouncedSearchByArea = debounce(SearchbyArea, 300);

  // Monitor the `text` state and fetch when it's 3 or more characters
  useEffect(() => {
    if (text.length >= 3) {
      debouncedSearchByArea();
    } else {
      setSearchPin([]); // Clear the search results if fewer than 3 characters
    }

    // Cleanup debounced function on unmount
    return () => debouncedSearchByArea.cancel();
  }, [text]); 

  const getAreaData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        area: name, 
        pincodename: pincodedata
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("/api/areadata", requestOptions);
      const result = await response.json();
  
      if (response.status === 200 || response.status === 400) {
        if (response.status === 200) {
          console.log("Searched Data:",result);
          setAreadata(result.services); // Set area data in the state
          setSelectedArea(result.postalAPIResult); // Set selected area data for the dialog
        } else {
          console.error("Search Error:", result.data.msg);
        }
      } else {
        console.error("Fetch Error:", result.data.msg);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSearchPin([]); // Handle fetch error by clearing options
    }
  };
  
  

  const handleSearch =  () => {
    
    getAreaData(); 
    setOpen(true);
    setText('')
  };

  const [pincode, setPincode] = useState([]);
 
  console.log(pincode, "Pincode")

  const pincodeDetails = () => {
    const pincodeData = text;
    console.log(pincodeData, "pincodeData");

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`https://api.postalpincode.in/pincode/${pincodeData}`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: data };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        if (result.status_code === 200 && result.data[0].Status === 'Success') {
          setPincode(result.data[0].PostOffice || []);
          console.log(result.data[0].PostOffice, "fetched data");
        } else {
          setPincode([]); // Clear options if the status is not successful
        }
      })
      .catch(error => console.log('error', error));
  };

  const [selectedArea, setSelectedArea] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(searchPin); // Initially display all data
  }, [searchPin]);

  const handleAreaChange = (event, value) => {

    const selected = areadata.find(option => option.Name === value);
    setSelectedArea(selected);


    if (searchPin.length === 0) {
      console.log('searchPin is empty');
      setFilteredData([]);
      return;
    }

    if (value) {
      const valueString = String(value).trim().toLowerCase();

      // Use filter method to find matching data
      const filtered = searchPin.filter(item => {
        const areaString = String(item.area).trim().toLowerCase();
        console.log(`Comparing "${areaString}" with "${valueString}"`);
        return areaString === valueString;
      });

      console.log('Filtered data:', filtered);
      setFilteredData(filtered);
    } else {
      // If value is null or empty, reset to show all data
      setFilteredData(searchPin);
    }
  };

  const handleCategoryDetails = (id) => {

    navigate(`/categories-details/${id}`);
  }



  const location = useLocation();

  const tokenFromUrl = new URLSearchParams(location.search).get('token'); // Assuming the token is a query parameter in the URL

  let token = Cookies.get('token') ? Cookies.get('token') : undefined;
  const [decode, SetDecode] = useState(token ? jwtDecode(token) : undefined);
  console.log(decode, "killer")

  // useEffect(() => {
  //   if (!decode && !tokenFromUrl) {
  //     handlesignin();
  //   } else if (decode) {
  //     handleUserprofile();
  //   } else if (tokenFromUrl) {
  //     handleDetails();
  //   }
  // }, [decode, tokenFromUrl]);

  const [searchopen, setSearchOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setSearchOpen(true);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setSearch('')
  };

  // const handleCodeOpen = () => {
  //   pincodeDetails()
  //   SearchbyArea()
  //   setOpen(true);
  // };

  

  const handleCodeClose = () => {
    setOpen(false);
  };

  return (
    <>

      {isMobile ? (

        <>



          <Grid xs={12} sm={12} >
            <nav >
              <Grid  item xs={12} sm="auto" container direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" mt={1} >
                <Grid sx={{ textAlign: 'center' }}>
                  <div>
                    <img className="" src={Logo} onClick={handleHome} alt="logo" width={"100px"} height={"100px"} />
                    <Typography className="mb-2" id="titletext-mob" sx={{ color: "red", fontSize: "25px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }}>Qik Call</Typography>
                  </div>
                </Grid>
                {/* <Grid container xs={12} direction='row' justifyContent="space-evenly" alignItems="center" mt={1} >
                  <Grid container className='mb-1' item xs={6} sm="auto" justifyContent="space-around" alignItems="center">
                    <Button id='Topbutton-mob' > Business Login/signup</Button>
                  </Grid>
                  <Grid container className='mb-1' item xs={6} sm="auto" justifyContent="space-around" alignItems="center">
                    <Button id='Topbutton-mob' >Always Free Ads(T&C)</Button>
                  </Grid>
                </Grid> */}
              </Grid>

              <Grid mb={1} container xs={12} mt={0.5} direction="row" justifyContent="space-evenly" alignItems="center">
                <Grid item xs={3}  container direction="row" justifyContent="center" alignItems="center" >
                  <Select
                    value={language}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#2d2859",
                      width: "auto",
                      height: "25px",
                      borderRadius: "20px",
                      color: "white",
                      fontSize: "8px",
                      marginLeft: "3px",
                      '.MuiSelect-icon': {
                        color: "white"
                      },
                    }}
                  // inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="EN">
                      <LanguageIcon id="selct-text-mob" sx={{ fontSize: "10px", marginRight: "5px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} /> EN
                    </MenuItem>
                    <MenuItem value="ES">
                      <LanguageIcon sx={{ fontSize: "10px", marginRight: "1px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} /> ES
                    </MenuItem>
                    
                  </Select>
                </Grid>
                <Grid item xs={mobileView ? 3 : 2.4} container justifyContent="center" alignItems="center">
      <Select
        value={categorylist}
        sx={{
          backgroundColor: "#000080",
          borderRadius: "12px",
          fontSize: mobileView ? "8px" : "8px",  
            width: mobileView ? "100%" : "80px",    
            height: "25px",
          color: "white",
          fontFamily: "Anton, sans-serif", 
          fontWeight: "bold", 
          fontStyle: "italic",
          '.MuiSelect-icon': { color: "white" },
          '.MuiOutlinedInput-notchedOutline': { border: "none" },
        }}
      >
        <MenuItem sx={{ textAlign: "center" }} value="category">Jobs</MenuItem>
        {Array.isArray(getData) && getData.map((category, index) => (
          <MenuItem key={index} onClick={() => handleNavigate(getData[index]._id)} value={category}>
            {category.categoryname}
          </MenuItem>
        ))}
      </Select>
    </Grid>
                <Grid item xs={3}  sm="auto" container direction="row" justifyContent="space-evenly" alignItems="center"  >
                  <Grid  container direction="row" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#2D2859", height: "25px", borderRadius: "20px", width: "90px" }} >
                  <Grid >
                  <IconButton onClick={handleWishlist} edge="start" sx={{ color: "#f7f4cd" }} >
                    <FavoriteIcon sx={{ fontSize: "13px" }} />
                  </IconButton>
                  <IconButton onClick={handleNotify} edge="center" sx={{ color: "#f7f4cd" }} >
                    <NotificationsIcon sx={{ fontSize: "13px" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      if (!decode && !tokenFromUrl) {
                        handlesignin();
                      } else if (decode) {
                        handleUserprofile();
                      } else if (tokenFromUrl) {
                        handleDetails();
                      }
                    }}
                    edge="end"
                    sx={{ color: "#f7f4cd" }}
                  >
                    <AccountCircle sx={{ fontSize: "13px" }} />
                  </IconButton>
                </Grid>
                  </Grid>
                </Grid>
              </Grid>




              <Grid container direction="row" justifyContent="center" alignItems="center" mt={0.5} mb={2}>
                <Grid xs={12} container direction="row" justifyContent="space-evenly" alignItems="center" >
                  <Grid item xs={3} sm="auto" container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Button id="mid-button-mob" onClick={() => {
                if (decode && decode.user ? decode.user.role == "businessman" : undefined) {
                  handlebusinessdetails()
                } else {
                  handlebusiness()
                }
              }}>Business</Button>
                  </Grid>
                  <Grid item xs={3} sm="auto" container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Button id="mid-button-mob" onClick={handleAdvertise} >Advertise</Button>
                  </Grid>
                  <Grid item xs={3} sm="auto" container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Button id="mid-button-mob" onClick={handleFreelist}>Freelilsting(T&C)</Button>
                  </Grid>
                  <Grid item xs={3} sm="auto" container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Button id="mid-button-mob" onClick={() => {
                if (decode && decode.user ? decode.user.role == "freelancer" : undefined) {
                  handleFreelancerdetails()
                } else {
                  handleFreelancer()
                }
              }}>Freelancer</Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid container direction="row" justifyContent="space-evenly" alignItems="center"> */}
                {/* <Grid mb={1}>
                  <Button onClick={handleOffer} className="button-36-mob">
                    <span className="text">Today Offers</span>
                  </Button>
                </Grid> */}
                {/* <Box sx={{
  width: "267px",
  height: "auto",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#f7f4cd",
  
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>
  <Grid container spacing={2} justifyContent="space-between" alignItems="center">
    <Grid item>
      <img src={Twitter} alt="Twitter" className="social-icon" />
    </Grid>
    <Grid item>
      <img src={Whatsapp} alt="Whatsapp" className="social-icon" />
    </Grid>
    <Grid item>
      <img src={Fb} alt="Facebook" className="social-icon" />
    </Grid>
    <Grid item>
      <img src={Linkedin} alt="LinkedIn" className="social-icon" />
    </Grid>
    <Grid item>
      <img src={Instagram} alt="Instagram" className="social-icon" />
    </Grid>
    <Grid item>
      <img src={Telegram} alt="Telegram" className="social-icon" />
    </Grid>
   
    
  </Grid>
</Box> */}
  <Grid container direction="column" alignItems="flex-end" mt={2}>
            <nav className="social">
              <ul>
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Grid>
              {/* </Grid> */}

              <hr className="w-100 ezy__nav1_vFX4KuxH-separator" />
              <Grid container direction="row" justifyContent="space-around" alignItems="center">
      {/* Row for Biz-Sales Button and Search Input */}
      <Grid xs={12} sx={{padding:1}} container direction="row" justifyContent="space-around" alignItems="center">
        
        {/* Biz-Sales Button */}
        <Grid item xs={mobileView ? 2.6 : 2.8} >
        <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Button onClick={handleOffer} className="button-36-mob">
                    <span className="text">Today Offers</span>
                  </Button>
                </Grid>
      </Grid>

        {/* Search by city, servicename, or number */}
        <Grid item xs={8} container direction="row" justifyContent="flex-start" alignItems="center">
          <Paper
            component="form"
            onSubmit={getSearch}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: "100%",
              height: "30px",
              fontFamily: "Anton, sans-serif",
              fontWeight: "bold",
              fontStyle: "italic",
              '&:hover': { border: "2px solid #2d2859" },
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1,fontSize:"10px" }}
              placeholder="Search by city, servicename, or number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="submit" disabled={!search} onClick={handleClickOpen} sx={{ p: '5px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {/* Category Select */}
      <Grid xs={12} sx={{ padding: 1 }} container direction="row" justifyContent="space-around" alignItems="center">
      {/* Biz-Sales Button */}
      <Grid item xs={mobileView ? 2.5 : 2.4} container justifyContent="center" alignItems="center">
      <Button
          onClick={handleBizsales}
          sx={{
            backgroundColor: "#2d2859",
            borderRadius: "12px",
            fontFamily: "Anton, sans-serif",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: mobileView ? "7px" : "8px",  
            width: mobileView ? "70px" : "80px",    
            height: "30px",
            '&:hover': { backgroundColor: "#2d2859" }
          }}
          variant='contained'
        >
          Biz-Sales
        </Button>
    </Grid>
      {/* Pincode Search */}
      <Grid xs={mobileView ? 5 : 5} container direction="row" justifyContent="center" alignItems="center">
        <Paper sx={{ backgroundColor: "#2d2859", height: "30px" }}>
          <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
            <TextField
              placeholder="Search by Pincode"
              value={text}
              onChange={(e) => setText(e.target.value)}
              InputProps={{ sx: { height: "100%", fontSize: mobileView ? "8px" : "10px" } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                  height: '100%',
                },
                '& .MuiInputLabel-root': { color: '#FFF' },
              }}
            />
             <IconButton type="submit" disabled={!text}  sx={{ p: '5px' }} aria-label="search">
          <SearchIcon sx={{color:"white"}} />
        </IconButton>
          </Stack>
        </Paper>
      </Grid>

      {/* Category Select */}
      <Grid item xs={mobileView ? 3 : 2.5} container direction="row" justifyContent="center" alignItems="center">
        <Select
          value={categorylist}
          placeholder="Category"
          sx={{
            backgroundColor: "#2d2859",
            borderRadius: "12px",
            fontSize: mobileView ? "6px" : "8px",  // Smaller font for 320px
            width: mobileView ? "80px" : "100px",   // Smaller width for 320px
            height: "30px",
            color: "white",
            fontFamily: "Anton, sans-serif",
            fontWeight: "bold",
            fontStyle: "italic",
            border: "none",
            '.MuiSelect-icon': { color: "white" },
            '.MuiOutlinedInput-notchedOutline': { border: "none" },
          }}
        >
          <MenuItem value="category">Category</MenuItem>
          {Array.isArray(getData) && getData.map((category, index) => (
            <MenuItem key={index} onClick={() => handleNavigate(getData[index]._id)} value={category}>
              {category.categoryname}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
    </Grid>
              
            </nav>
          </Grid>
      
        </>
      ) : (
        <Container maxWidth="1200px" sx={{ backgroundColor: "#f7f4cd" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            mt={1}
          >
           <Grid sm="auto" className="logo-container">
      <div>
        <img
          onClick={handleHome}
          src={Logo}
          alt="logo"
          className="logo"
        />
      </div>

      {/* Typography */}
      <Typography id="titletext" className="title-text">
        Qik Call
      </Typography>
    </Grid>
          </Grid>
          <Grid container direction="column" alignItems="flex-end" mt={2}>
            <nav className="social">
              <ul>
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent="space-evenly"
            alignItems="center"
            mt={1}
            mb={1}
          >
            <Grid item xs={3} sm="auto" className="select-container">
      <Select
        value={language}
        onChange={handleChange}
        className="select-custom" // Apply the external class
        MenuProps={{
          PaperProps: {
            sx: {
              '.MuiMenuItem-root': {
                '&.Mui-selected': {
                  backgroundColor: '#C052E3',
                },
              },
            },
          },
        }}
      >
        <MenuItem value="EN">
          <LanguageIcon className="select-icon"  />
          EN
        </MenuItem>
        <MenuItem value="ES">
          <LanguageIcon className="select-icon"  />
          ES
        </MenuItem>
        {/* Add more MenuItems here as needed */}
      </Select>
    </Grid>
            <Grid item xs={3} sm="auto" container direction='row' justifyContent="space-evenly" alignItems="center">
              <Button id="end-button" onClick={() => {
                if (decode && decode.user ? decode.user.role == "freelancer" : undefined) {
                  handleFreelancerdetails()
                } else {
                  handleFreelancer()
                }
              }}>Freelancer</Button>
            </Grid>

            <Grid item xs={3} sm="auto">
              <Button id="mid-button" onClick={handleAdvertise}>Advertise</Button>
            </Grid>
            {/* <Grid item xs={3} sm="auto">
              <Button id="mid-button" className=" mt-2"><HowToRegIcon /> Business Login/Signup</Button>
            </Grid> */}
            <Grid item xs={1.3} container direction='row' justifyContent="space-evenly" alignItems="center" >
              {/* <button onClick={handleOffer} className='button-36 pulse-button'>
                    <Typography className="text">Today Offer</Typography>
                  </button> */}
              <Button onClick={handleOffer} class="test-btn">Today Offer</Button>
            </Grid>
            
            <Grid item xs={3} sm="auto">
              <Button id="mid-button" onClick={() => {
                if (decode && decode.user) {
                 
                  if (decode.user.role === "businessman") {
                    handlebusinessdetails();
                  } 
                  
                  else {
                    handlebusinessupdate();
                  }
                } 
                
                else {
                  handlebusiness();
                }
              }} className=" mt-2"> Business</Button>
            </Grid>


            <Grid item xs={3} sm="auto">
              <Button id="end-button" className=" mt-2"  onClick={() => {
              if (!decode && !tokenFromUrl) {
                handleFreelist();
              } else if (decode) {
                handleFreelistForm();
              } else if (tokenFromUrl) {
                handleFreelistForm();
              }
            }}>Freelilsting</Button>
            </Grid>
            <Grid item xs={3} mt={1} sm="auto" container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid container direction="row" justifyContent="center" alignItems="center" className='button-container'>
        <Grid>
          <IconButton onClick={handleWishlist} edge="start" className="icon-button">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={handleNotify} edge="center" className="icon-button">
            <NotificationsIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!decode && !tokenFromUrl) {
                handlesignin();
              } else if (decode) {
                handleUserprofile();
              } else if (tokenFromUrl) {
                handleDetails();
              }
            }}
            edge="end"
            className="icon-button"
          >
            <AccountCircle />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>

            {/* <Grid item xs={3} sm="auto">
              <Button id="end-button" className=" mt-2"> Always Free Ads </Button>
            </Grid> */}
          </Grid>


          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
  <Divider sx={{ width: '100%', my: 2, borderColor: 'black' }} />

  <Grid container direction="row" justifyContent="space-evenly" alignItems="center" mb={3}>

    {/* Biz-Sales Button */}
    <Grid item xs={12} sm={1.2} md={1.5} lg={1.5} container justifyContent="center">
      <Button 
        onClick={handleBizsales} 
        sx={{ 
          backgroundColor: "#2d2859", 
          borderRadius: "12px", 
          fontFamily: "Anton, sans-serif", 
          fontWeight: "bold", 
          fontStyle: "italic", 
          fontSize: { xs: "10px", sm: "8px", md: "13px", lg: "14px" }, 
          width: { xs: "100px", sm: "90px", md: "130px" }, 
          height: { xs: "40px", sm: "40px", md: "50px" }, 
          '&:hover': { backgroundColor: "#2d2859" }
        }} 
        variant="contained"
      >
        Biz-Sales
      </Button>
    </Grid>

    {/* Select Category Dropdown */}
    <Grid item xs={12} sm={1} md={1.5} lg={1.5} container justifyContent="center" alignItems="center">
      <Button
        sx={{
          backgroundColor: "#000080",
          borderRadius: "12px",
          fontSize: { xs: "10px", sm: "10px", md: "15px", lg: "16px" }, 
          width: { xs: "100px", sm: "80px", md: "130px" }, 
          height: { xs: "40px", sm: "40px", md: "50px" }, 
          color: "white",
          fontFamily: "Anton, sans-serif", 
          fontWeight: "bold", 
          fontStyle: "italic",
          '.MuiSelect-icon': { color: "white" },
          '.MuiOutlinedInput-notchedOutline': { border: "none" },
          '&:hover':{backgroundColor:"#000080"}
        }}
        onClick={handleJobs}
      >
        Jobs
      </Button>
    </Grid>

    {/* Search by City, Servicename, or Number */}
    <Grid item xs={12} sm={4} md={4} lg={3.5} container justifyContent="flex-start" alignItems="center">
      <Paper
        component="form"
        onSubmit={getSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: "100%",
          height: { xs: "40px", sm: "40px", md: "50px" },
          fontFamily: "Anton, sans-serif",
          fontWeight: "bold",
          fontStyle: "italic",
          '&:hover': { border: "2px solid #2d2859" },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: { xs: "10px", sm: "10px", md: "13px", lg: "15px" } }}
          placeholder="Search by city, servicename, or number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" disabled={!search} onClick={handleClickOpen} sx={{ p: '5px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>

    {/* Category Select */}
    <Grid item xs={12} sm={1.2} md={1.5} lg={1.5} container justifyContent="center">
      <Select
        value={categorylist}
        sx={{
          backgroundColor: "#2d2859",
          borderRadius: "12px",
          fontSize: { xs: "10px", sm: "10px", md: "13px", lg: "16px" }, 
          width: { xs: "100px", sm: "100px", md: "130px" }, 
          height: { xs: "40px", sm: "40px", md: "50px" }, 
          color: "white",
          fontFamily: "Anton, sans-serif", 
          fontWeight: "bold", 
          fontStyle: "italic",
          '.MuiSelect-icon': { color: "white" },
          '.MuiOutlinedInput-notchedOutline': { border: "none" },
        }}
      >
        <MenuItem value="category">Category</MenuItem>
        {Array.isArray(getData) && getData.map((category, index) => (
          <MenuItem key={index} onClick={() => handleNavigate(getData[index]._id)} value={category}>
            {category.categoryname}
          </MenuItem>
        ))}
      </Select>
    </Grid>

    {/* Search by Pincode */}
   

    <Grid item xs={12} sm={3} md={2.5} lg={2.5} container justifyContent="center">
  <Paper sx={{ backgroundColor: "#2d2859", width: "100%", height: { xs: "40px", sm: "40px", md: "50px" } }}>
    <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
    <Autocomplete
      freeSolo
      options={searchPin.map(option => `${option.Name}, ${option.District}, ${option.Pincode}`)}
      sx={{ width: '100%' }}
      onInputChange={(e, newValue) => {
        setText(newValue); // Update the text state
      }}
      onChange={(e, newValue) => {
        const selectedOption = searchPin.find(option => `${option.Name}, ${option.District}, ${option.Pincode}` === newValue);
        if (selectedOption) {
          setPincodedata(selectedOption.Pincode); // Set pincode data
          setName(selectedOption.Name); // Set name data
          console.log(selectedOption.Pincode, "Area pincode");
        }
      }}
      inputValue={text} // Bind input value to text state
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search by Pincode"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#FFF',
              fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" },
              textAlign: "center",
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputLabel-root': { color: '#FFF' },
          }}
        />
      )}
    />


<IconButton type="button" disabled={!text} onClick={handleSearch} sx={{ p: '5px' }} aria-label="search">
  <SearchIcon sx={{ color: "white" }} />
</IconButton>

    </Stack>
  </Paper>
</Grid>


</Grid>
</Grid>


          
                <Dialog
                  fullScreen
                  open={open}
                  onClose={handleCodeClose}
                  TransitionComponent={Transition}
                >
                  <AppBar sx={{ position: 'relative', backgroundColor: "#f7f4cd" }}>
                    <Toolbar >
                      <Grid container direction='row' justifyContent="space-between" alignItems="center">
                        <img
                          src={Logo}
                          height={"80px"}
                          width="80px"
                          edge="start"
                          color="inherit"
                          onClick={handleCodeClose}
                          aria-label="close"
                        />
                        <Button sx={{ color: "#000" }} onClick={handleCodeClose}>
                          Close
                        </Button>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                  <Container maxWidth="1200px">
                  
                  <Grid mt={2} container direction="row" justifyContent="flex-start" alignItems="center">
    <Grid onClick={() => handleCategoryDetails(areadata?._id)} item xs={12} sm={6} key={areadata?._id}>
        <Card
            sx={{
                backgroundColor: '#ffffe0',
                borderRadius: '15px',
                padding: '6px',
                maxWidth: '100%',
                marginBottom: '16px',
            }}
        >
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid xs={12} container direction="row" justifyContent="space-around" alignItems="center">
                    {Array.isArray(areadata?.addimages) && areadata.addimages.length > 0 ? (
                        areadata.addimages.map((image, imgIndex) => (
                            <Grid item key={imgIndex}>
                                <img
                                    src={image}
                                    alt={`banner-${imgIndex}`}
                                    style={{ width: '100%', height: '100%', maxWidth: '90px', maxHeight: '90px' }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <img
                                src=""
                                alt="fallback"
                                style={{ width: '100%', height: 'auto', maxWidth: '150px', maxHeight: '150px' }}
                            />
                        </Grid>
                    )}
                </Grid>

                <Grid>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
                            <Typography component="div" variant="h6">
                                {areadata?.servicename || "Service Name Unavailable"}
                            </Typography>

                            {/* <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                <CheckCircle color="success" sx={{ marginRight: '4px' }} />
                                <Typography variant="body2" color="textSecondary">
                                    Confirmed
                                </Typography>
                                <IconButton color="default" size="small">
                                    <FavoriteBorder />
                                </IconButton>
                            </Box> */}

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                <LocationOn color="error" />
                                <Typography variant="body2" color="textSecondary">
                                    {areadata ? 
                                        `${areadata.addressline1}, ${areadata.addressline2}, ${areadata.area}, ${areadata.city}, ${areadata.pincode}` 
                                        : "Address Unavailable"
                                    }
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                startIcon={<Phone />}
                                sx={{
                                    marginTop: '8px',
                                    borderColor: 'black',
                                    color: 'black',
                                }}
                                disabled={!areadata?.number} // Disable button if number is not available
                            >
                                {areadata?.number || "No Number Available"}
                            </Button>
                        </CardContent>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    </Grid>
</Grid>



                  </Container>
                </Dialog>

        </Container>
      )}
      <Dialog
      fullScreen
      open={searchopen}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ backgroundColor: "#f7f4cd" }}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: "#2d2859" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close">
            <SearchIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Search
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Filter Section */}
        <Box sx={{ mt: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Area"
                variant="outlined"
                fullWidth
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                value={filterPincode}
                onChange={(e) => setFilterPincode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Filter
            </Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={clearFilters}>
              Clear
            </Button>
          </Box>
        </Box>

        {/* Search Results */}
        {filteredSearchData.length > 0 ? (
          <Grid container spacing={2}>
            {filteredSearchData.map((datas) => (
              <Grid onClick={() => handleCategoryDetails(datas.id)} item xs={12} sm={6} key={datas._id}>
                <Card sx={{ backgroundColor: '#ffffe0', borderRadius: '15px', padding: '6px', maxWidth: '100%', marginBottom: '16px' }}>
                  <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    {/* Images */}
                    <Grid container direction="row" justifyContent="space-around" alignItems="center">
                      {Array.isArray(datas.addimages) && datas.addimages.length > 0 ? (
                        datas.addimages.map((image, imgIndex) => (
                          <Grid item key={imgIndex}>
                            <img
                              src={image}
                              alt={`banner-${imgIndex}`}
                              style={{ width: '100%', height: 'auto', maxWidth: '150px', maxHeight: '150px' }}
                            />
                          </Grid>
                        ))
                      ) : (
                        <Grid item>
                          <img
                            src="/path/to/fallback-image.jpg"
                            alt="fallback"
                            style={{ width: '100%', height: 'auto', maxWidth: '150px', maxHeight: '150px' }}
                          />
                        </Grid>
                      )}
                    </Grid>

                    {/* Service Information */}
                    <Grid>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingBottom: '8px' }}>
                          <Typography component="div" variant="h6">
                            {datas.servicename}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
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
                              {datas.addressline1}, {datas.addressline2}, {datas.area}, {datas.city}, {datas.pincode}
                            </Typography>
                          </Box>

                          <Button
                            variant="outlined"
                            startIcon={<Phone />}
                            sx={{ marginTop: '8px', borderColor: 'black', color: 'black' }}
                          >
                            {datas.number}
                          </Button>
                        </CardContent>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary" mt={2}>
            No Results Found
          </Typography>
        )}
      </Container>
    </Dialog>


    </>




  );
}

export default NavBar;
