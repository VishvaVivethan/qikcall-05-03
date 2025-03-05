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
  TextField,
  AppBar,
  Toolbar,Chip,MenuItem,Select,FormControl,InputLabel,useMediaQuery,Checkbox,FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import Sales from '../../assets/img/Sale1.jpg'
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import Footer from '../footer/index';
import ad from '../../assets/image/sidead1.png'
import ad1 from '../../assets/image/sidead2.png'
import { IoIosMenu } from "react-icons/io";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from '@mui/material/styles';
import { GoUpload } from "react-icons/go";
import PropTypes from 'prop-types';

const VisuallyHiddenInput = ({ onChange }) => (
  <input
    type="file"
    style={{ display: 'none' }}
    onChange={onChange}
  />
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



function Jobs() {

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

  const theme = useTheme();

  const [data,setData]= useState('')

  useEffect(() => {
    getBizsales()
  }, []); 

const getBizsales =()=>{
  try{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("/api/getpostjobs", requestOptions)
    .then(async (response) => {
      if (response.status === 200 || response.status === 400) {
        return { status_code: response.status, data: await response.json() };
      } else {
        return { status_code: response.status, data: { msg: 'Unexpected Error' } };
      }
    })
    .then((result) => {
      setData(result.data.data)
      console.log(result.data.data,"jobs data")
     })
    .catch(error => console.log('error', error));

  }catch(error){
    console.error(error);
  }
}

const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    pincode: '',
    role: '',
    jobrole: '',
    experience: '',
    uploadresume: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, uploadresume: event.target.files[0] });
  };


  const handleApplyJob = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const jobid = data._id;

      const raw = JSON.stringify({
        jobId: jobid,
        ...formData,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/applyjobs", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          console.log(result.data, "applied");
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error("Error:", error);
    }
  };


const[create,setCreate]=useState('')

  const handleCreateOpen = () => {
   setCreate(true);
   
 };

 const handleCreateClose = () => {
   setCreate(false);
 };

 const [jobDetails, setJobDetails] = useState({
    customerId: '66e2f460d59e69133ed81a07',
    title: '',
    category: 'IT',
    companyname: '',
    location: '',
    city: '',
    state: '',
    jobdescription: '',
    experiance: '',
    salary: '',
    companydetails: '',
  });

  // Function to handle form input changes
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  // Function to handle job posting
  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(jobDetails);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/postjobs", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Optionally, you can handle success here, e.g., close the dialog or reset the form
      })
      .catch((error) => console.error(error));
  };

 useEffect(()=>{
  GetCategory()
},[])

const GetCategory= ()=>{
try{
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
    console.log(result.data.data,"good")
   })
  .catch(error => console.log('error', error));
}catch(error){
    console.error("Error:", error)
}

}



 const handleChipChange = (event) => {
  const {
    target: { value },
  } = event;
  setCcategory(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
  setFilterCategory(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

const handleImageChange = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type.startsWith('image/')) {
      // Create a preview URL and update the images array
      const newImages = [...addimages];
      newImages[index] = URL.createObjectURL(file); 
      setAddimages(newImages);

      // Store the actual file object for uploading later
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);
    } else {
      alert('Please select a valid image file.');
    }
  }
};



const uploadImage = async () => {
  try {
    const uploadedImageUrls = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Your Cloudinary preset

        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.secure_url) {
          return data.secure_url; // Cloudinary secure URL
        } else {
          throw new Error('Failed to upload image');
        }
      })
    );
    return uploadedImageUrls;
  } catch (error) {
    throw error;
  }
};

const [aadhar, setAadhar] = useState('');
const [pan, setPan] = useState('');
const [Proof, setProof] = useState('');
const [ad, setAd] = useState([]); 

const handleAadhar = (event) => {
const files = event.target.files;
setAadhar(files);
console.log(files); // Here you can do something with the selected files
};

const handlePan = (event) => {
const files = event.target.files;
setPan(files);
console.log(files); // Here you can do something with the selected files
};

const handleProof = (event) => {
const files = event.target.files;
setProof(files);
console.log(files); // Here you can do something with the selected files
};

const handleUploadedClick = () => {
  document.getElementById('file-input').click();
  };

  
    const uploadimages = async () => {
      try {
      const uploadedImageUrls = await Promise.all(ad.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary upload preset
      
        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });
      
        const data = await response.json();
      
        if (data.secure_url) {
          console.log(data.secure_url,"data")
          return data.secure_url;
        } else {
          setMsgOpen(true);
          setColor('error');
          setMsg("Failed to upload image");
          throw new Error('Failed to upload image.');
        }
      }));
      
      return uploadedImageUrls;
      } catch (error) {
      setMsgOpen(true);
            setColor('error');
            setMsg("Upload Images Error");
      throw error;
      }
      };
      
      const uploadgroup = async () => {
      try {
      // Function to upload a single file to Cloudinary
      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary upload preset
      
        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });
      
        const data = await response.json();
      
        if (data.secure_url) {
          return data.secure_url;
        } else {
          throw new Error('Failed to upload image.');
        }
      };
      
      // Upload all files in aadhar, pan, and proof
      const aadharUrls = await Promise.all([...aadhar].map(uploadFile));
      const panUrls = await Promise.all([...pan].map(uploadFile));
      const proofUrls = await Promise.all([...Proof].map(uploadFile));
      
      // Combine the URLs into a single object
      const uploadedGroupUrls = {
        aadhar: aadharUrls,
        pan: panUrls,
        proof: proofUrls,
      };
      
      console.log(uploadedGroupUrls);
      return uploadedGroupUrls;
      
      } catch (error) {
        setMsgOpen(true);
      setColor('error');
      setMsg("Upload Images Error");
      throw error;
      }
      };

      const [ctitle, setCtitle] = useState('');
      const [cdescription, setCdescription] = useState('');
      const [ccategory, setCcategory] = useState([]);
      const [category, setCategory] = useState([]);
      const [clocation, setCLocation] = useState('');
      const [cstorename, setCStorename] = useState('');
      const [cpannumber, setPannumber] = useState('');
      const [caadharnumber, setAadharnumber] = useState('');
      const [cemailid, setEmailid] = useState('');
      const [ccontactnumber, setCContactnumber] = useState('');
      const [cstartDate, setStartDate] = React.useState(null);
      const [cendDate, setEndDate] = React.useState(null);
      const [msgOpen, setMsgOpen] = useState(false);
      const [msg, setMsg] = useState('');
      const [color, setColor] = useState('');
      // const [startdates, setStartdates] = useState('');
      // const [enddate, setEnddate] = useState('');
      const [upload, setUpload] = useState({ "aadhar":aadhar, "pan":pan,"proof": Proof });
      // const [addimages, setAddimages] = useState('');
      const [getData,setGetData] = useState('')
      const[addimages,setAddimages]=useState('');
      const [files, setFiles] = useState([]);
      const [databyid,setDatabyId] = useState([])
      const [detailsopen, setDetailsOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log("data bt id",databyid)

      
      const handleOfferregister= async ()=>{
      try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      console.log(upload,"goodnight")
      
      const uploadedImageUrl = await uploadimages();
      
      const uploadedGroupUrl = await uploadgroup();
      
      const raw = JSON.stringify({
        "title": ctitle,
        "description": cdescription,
        "category": ccategory,
        "location": clocation,
        "pannumber": cpannumber,
        "aadharnumber": caadharnumber,
        "emailid": cemailid,
        "contactnumber": ccontactnumber,
        "startdate": cstartDate,
        "enddate": cendDate,
        "upload":uploadedGroupUrl,
        "addimages": uploadedImageUrl,
        "isapprove":"false"
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch("/api/bizsales", requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
        } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        if (result.status_code === 200) {
            console.log(result.data)
            setMsgOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");
      
        } else if (result.status_code === 400) {
            setMsgOpen(true);
            setColor('error');
            setMsg(result.data.msg);
      
        } })
        .catch((error) => console.error(error));
      }catch(error){
        console.error(error)
      }
      }
      
      
      const handleRegister =()=>{
        handleApplyJob();
        handleCreateClose();
        
      }
      

      const getDataById = (dataid)=>{
        try{
          const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch(`/api/bizsalesdata?id=${dataid}`, requestOptions)
          .then(async (response) => {
            if (response.status === 200 || response.status === 400) {
                return { status_code: response.status, data: await response.json() };
            } else {
                return { status_code: response.status, data: { msg: 'Unexpected Error' } };
            }
          })
          .then((result) => {
            if (result.status_code === 200) {
                console.log(result.data.data,"databyid")
                setDatabyId(result.data.data)
          
            } else if (result.status_code === 400) {
              
                console.log(result.data.msg)
          
            } })
            .catch((error) => console.error(error));
          }catch(error){
            console.error(error)
          }
      }

      
      const [filterCategory, setFilterCategory] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filteredSearchData, setFilteredSearchData] = useState(data);

  useEffect(() => {
    setFilteredSearchData(data); // Show all data by default
  }, [data]);

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleCityChange = (event) => {
    setFilterCity(event.target.value);
  };

  const applyFilters = () => {
    let filteredData = data;
  
    if (filterCategory && typeof filterCategory === 'string') {
      filteredData = filteredData.filter(offer =>
        offer.category && typeof offer.category === 'string' && 
        offer.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }
  
    if (filterCity && typeof filterCity === 'string') {
      filteredData = filteredData.filter(offer =>
        offer.city && typeof offer.city === 'string' && 
        offer.city.toLowerCase().includes(filterCity.toLowerCase())
      );
    }
  
    setFilteredSearchData(filteredData); // Update with filtered data
  };

  const clearFilters = () => {
    setFilterCategory('');
    setFilterCity('');
    setFilteredSearchData(data); // Reset to show all data
  };

  const handleDetailsOpen = () => {
   
    setDetailsOpen(true);
   
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
     
  

  return (
   <>
   {isMobile ? (
   <>
     <NavBar/>
     {/* AppBar for mobile view */}
     <AppBar position="static" color="primary">
       <Toolbar>
         <Button variant="contained" color="secondary" onClick={handleCreateOpen}>
           Register BizSales
         </Button>
         <Box ml={2}>
           <TextField
             label="Category"
             variant="outlined"
             size="small"
            //  onChange={handleCategoryChange}
           />
         </Box>
         <Box ml={2}>
           <TextField
             label="Location"
             variant="outlined"
             size="small"
            //  onChange={handleLocationChange}
           />
         </Box>
         <Button variant="contained" color="secondary" 
        //  onClick={handleFilterBizSales} 
         ml={2}>
           Filter
         </Button>
       </Toolbar>
     </AppBar>

     <Container>
       <Grid mt={5} container>
         <Grid container direction="row" justifyContent="flex-start" alignItems="center" item xs={12}>
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
              {offer.jobdescription}
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
         </Grid>
       </Grid>
     </Container>

     <Container>
       <Grid container direction="row" justifyContent="center" alignItems="center" mt={3}>
         <Grid item xs={12}>
           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
             <CCarousel controls transition="crossfade" style={{ height: '140px', width: "100%" }}>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad} alt="slide 1" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad} alt="slide 3" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
             </CCarousel>
           </Box>
         </Grid>
       </Grid>
     </Container>

     <Foot/>
   </>
) : (
   <>
     <NavBar/>
    
     <Container>
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      mt: 2,
      p: 2,
      bgcolor: "#f7f4cd",
      
      borderRadius: "12px",
    }}
  >
    {/* First section: Category, Location, and Filter Button */}
    <Grid item>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item>
          <FormControl
            fullWidth
            sx={{
              minWidth: 200,
              "& .MuiInputBase-input": {
                color: "#333",
                backgroundColor: "#fff",
                p: 1,
                fontSize: "14px",
                textAlign: "center",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#b0a9f7",
                },
                "&:hover fieldset": {
                  borderColor: "#8275e3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#574bd5",
                  boxShadow: "0 0 5px rgba(87, 75, 213, 0.5)",
                },
              },
            }}
          >
            <Select
              id="demo-multiple-select"
              displayEmpty
              value={filterCategory}
              onChange={handleCategoryChange}
              input={<OutlinedInput id="select-multiple" />}
              renderValue={(selected) => (selected ? selected : "Category")}
            >
              <MenuItem disabled value="">
                <em>Business Category</em>
              </MenuItem>
              {Array.isArray(getData) &&
                getData.map((category) => (
                  <MenuItem key={category._id} value={category.categoryname}>
                    {category.categoryname}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            placeholder="Location"
            variant="outlined"
            size="small"
            value={filterCity}
            onChange={handleCityChange}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#fff",
                fontSize: "14px",
                "& fieldset": {
                  borderColor: "#b0a9f7",
                },
                "&:hover fieldset": {
                  borderColor: "#8275e3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#574bd5",
                  boxShadow: "0 0 5px rgba(87, 75, 213, 0.5)",
                },
              },
            }}
          />
        </Grid>

        <Grid item>
          <Box sx={{ mt: 0.5, ml: 3, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={applyFilters}
              sx={{
                fontSize: "13px",
                textTransform: "capitalize",
                px: 3,
                py: 1,
                borderRadius: "20px",
                bgcolor: "#4caf50",
                "&:hover": {
                  bgcolor: "#45a049",
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={clearFilters}
              sx={{
                fontSize: "13px",
                textTransform: "capitalize",
                px: 3,
                py: 1,
                borderRadius: "20px",
                bgcolor: "#f44336",
                "&:hover": {
                  bgcolor: "#e53935",
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>

    {/* Second section: Register BizSales button */}
    <Grid item mt={1}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDetailsOpen}
        sx={{
          fontSize: "14px",
          textTransform: "capitalize",
          px: 4,
          py: 1.5,
          borderRadius: "20px",
          bgcolor: "#6c63ff",
          color: "#fff",
          boxShadow: "0px 4px 8px rgba(108, 99, 255, 0.3)",
          "&:hover": {
            bgcolor: "#574bd5",
          },
        }}
      >
        Register BizSales
      </Button>
    </Grid>
  </Grid>
</Container>


     <Container>
     <Grid mt={5} container>
  <Grid container direction="row" justifyContent="space-around" alignItems="center" item xs={12}>
    {Array.isArray(filteredSearchData) && filteredSearchData.length > 0 ? (
      filteredSearchData.map((offer) => (
        // offer.isapprove && (
          <Grid 
            container 
            item 
            xs={12} sm={5.5} md={5.5} lg={5} // Responsive grid columns for different screen sizes
            direction="row" 
            justifyContent="space-evenly" 
            alignItems="center" 
            key={offer._id}
          >
            <Grid mb={2} item xs={12} display="flex" justifyContent="center">
            <Card
  style={{
    display: 'flex',
    background: 'linear-gradient(135deg, #f8f8f8, #e0e4ff)',
    borderRadius: '20px',
    padding: 16,
    width: "100%",
    height: "300px", // Set your desired height here
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* <CardMedia
    component="img"
    sx={{
      width: { xs: "100px", sm: "150px", md: "200px", lg: "250px" },
      height: "100%", // Adjusts to fit within the card's height
      maxHeight: "100%", // Ensures it doesn't exceed card height
      borderRadius: '15px',
      objectFit: "cover",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    }}
    src={offer.addimages}
    alt="banner"
  /> */}

  <Grid
    item
    
    
    container
    direction="column"
    justifyContent="space-evenly"
    alignItems="flex-start"
    mt={2}
  >
    <Typography  sx={{ fontWeight: "bold", color: "#282866", fontSize: { xs: "16px", md: "18px",lg:"20px" } }}>
      {offer.title}
    </Typography>

    <Typography className='mt-1'  sx={{ fontWeight: "bold", color: "#bdb7ef", fontSize: { xs: "13px", md: "15px",lg:"17px" } }}>
      Company Name: {offer.companyname}
    </Typography>

    <Grid mt={1}  container direction="column" >
      <Typography component="div" sx={{ fontSize: { xs: "10px", md: "12px",lg:"15px" }, color: "#444" }}>
        Desciption: <span style={{  fontWeight: "500" }}>{offer.jobdescription}</span>
      </Typography>
      <Typography className='mt-1' component="div" sx={{ fontSize: { xs: "10px", md: "12px",lg:"15px" }, color: "#444" }}>
       Salary: <span style={{ fontWeight: "500" }}>{offer.salary}</span>
      </Typography>
      <Typography className='mt-1' component="div" sx={{ fontSize: { xs: "10px", md: "12px",lg:"15px" }, color: "#444" }}>
       Experiance: {offer.experiance}
      </Typography>
      <Typography className='mt-1' component="div" sx={{ fontSize: { xs: "10px", md: "12px",lg:"15px" }, color: "#444" }}>
       Company Details: {offer.companydetails}
      </Typography>
      <Typography className='mt-1' component="div" sx={{ fontSize: { xs: "10px", md: "12px",lg:"15px" }, color: "#444" }}>
      Location: {offer.location},{offer.city},{offer.state}
      </Typography>
    </Grid>

    <Button
      variant="contained"
      startIcon={<GoUpload />}
      sx={{
        marginTop: "8px",
        borderRadius: "10px",
        color: 'white',
        backgroundColor: "#5050A5",
        fontSize: { xs: "10px", md: "12px",lg:"15px" },
        padding: "6px 12px",
        textTransform: "uppercase",
        '&:hover': {
          backgroundColor: "#282866",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() =>  handleCreateOpen()}
    >
     Apply
    </Button>
  </Grid>
  <Typography
    component="div"
    sx={{
      fontSize: "8px",
      position: "absolute",
      top: "12px",
      right: "12px",
      padding: "3px 8px",
      backgroundColor: "#f3f3f3",
      borderRadius: "12px",
      color: "#282866",
      fontWeight: "600",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    }}
  >
    Category: {offer.category}
  </Typography>
</Card>

            </Grid>
          </Grid>
        // )
      ))
    ) : (
      <Grid mb={5} container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px", color: "#000", backgroundColor: "#ffe", padding: 2, borderRadius: "10px" }}>
          No data found
        </Typography>
      </Grid>
    )}
  </Grid>
</Grid>
     </Container>

     <Container>
       <Grid container direction="row" justifyContent="center" alignItems="center" mt={3}>
         <Grid item xs={12}>
           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
             <CCarousel controls transition="crossfade" style={{ height: '140px', width: "100%" }}>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad1} alt="slide 1" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
               <CCarouselItem>
                 <CImage className="d-block w-100" src={ad1} alt="slide 3" style={{ height: '140px', width: "100%", objectFit: 'cover' }} />
               </CCarouselItem>
             </CCarousel>
           </Box>
         </Grid>
       </Grid>
     </Container>

     <Foot/>
   </>
)}

<Dialog
      open={create}
      onClose={handleCreateClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        backdropFilter: "blur(10px)",
        "& .MuiDialog-paper": {
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ paddingX: 4 }}>
            <Typography className='mt-1' variant='h6' align='left'>
              Apply For Jobs
            </Typography>
            <Grid mt={1} container spacing={2}>
              {["name", "number", "email", "addressline1", "addressline2"].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    sx={{
                      marginY: 1.5,
                      backgroundColor: "rgba(240, 240, 250, 0.85)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#1A1A60" },
                        "&:hover fieldset": { borderColor: "#333" },
                      },
                    }}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase())}
                    variant="outlined"
                  />
                </Grid>
              ))}
              {["city", "state", "pincode"].map((field, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <TextField
                    fullWidth
                    sx={{
                      marginY: 1.5,
                      backgroundColor: "rgba(240, 240, 250, 0.85)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#1A1A60" },
                        "&:hover fieldset": { borderColor: "#333" },
                      },
                    }}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase())}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Role Selection */}
            <Grid container spacing={2} sx={{ paddingY: 1 }}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.role === "Fresher"}
                      onChange={() => handleRoleChange("Fresher")}
                      color="primary"
                      sx={{ color: "#2D2859" }}
                    />
                  }
                  label="Fresher"
                  sx={{ fontWeight: "600", color: "#333" }}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.role === "Experience"}
                      onChange={() => handleRoleChange("Experience")}
                      color="primary"
                      sx={{ color: "#2D2859" }}
                    />
                  }
                  label="Experience"
                  sx={{ fontWeight: "600", color: "#333" }}
                />
              </Grid>
            </Grid>

            {/* Conditional Fields */}
            <Grid container spacing={2}>
              {formData.role === "Experience" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      sx={{
                        marginY: 1.5,
                        backgroundColor: "rgba(240, 240, 250, 0.85)",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#1A1A60" },
                          "&:hover fieldset": { borderColor: "#333" },
                        },
                      }}
                      name="jobrole"
                      value={formData.jobrole}
                      onChange={handleChange}
                      placeholder="Job Role"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      sx={{
                        marginY: 1.5,
                        backgroundColor: "rgba(240, 240, 250, 0.85)",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#1A1A60" },
                          "&:hover fieldset": { borderColor: "#333" },
                        },
                      }}
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Experience"
                      variant="outlined"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {["degree", "department", "passedout"].map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <TextField
                        fullWidth
                        sx={{
                          marginY: 1.5,
                          backgroundColor: "rgba(240, 240, 250, 0.85)",
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#1A1A60" },
                            "&:hover fieldset": { borderColor: "#333" },
                          },
                        }}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field.replace(/([a-z])([A-Z])/g, "$1 $2")}
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>

          {/* Upload Resume Button */}
          <Container sx={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<FileUploadIcon />}
              sx={{
                background: "linear-gradient(135deg, #6A64E8 30%, #18A5A3 90%)",
                color: "#fff",
                borderRadius: "5px",
                textTransform: "capitalize",
                padding: "10px 30px",
                marginY: 2,
              }}
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
              />
            </Button>
          </Container>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApplyJob} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
  fullScreen={fullScreen}
  open={detailsopen}
  onClose={handleDetailsClose}
  aria-labelledby="responsive-dialog-title"
  sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: '90%' } }} // Set the dialog width
>
  <DialogTitle id="responsive-dialog-title">
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
      Post a Job
    </Typography>
  </DialogTitle>
  <DialogContent>
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f9f9f9',
            borderRadius: '15px',
            padding: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            name="title"
            label="Job Title"
            variant="outlined"
            value={jobDetails.title}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="companyname"
            label="Company Name"
            variant="outlined"
            value={jobDetails.companyname}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            value={jobDetails.location}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            value={jobDetails.city}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="state"
            label="State"
            variant="outlined"
            value={jobDetails.state}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="jobdescription"
            label="Job Description"
            variant="outlined"
            multiline
            rows={4}
            value={jobDetails.jobdescription}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="experiance"
            label="Experience"
            variant="outlined"
            value={jobDetails.experiance}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="salary"
            label="Salary"
            variant="outlined"
            value={jobDetails.salary}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
          <TextField
            name="companydetails"
            label="Company Details"
            variant="outlined"
            multiline
            rows={2}
            value={jobDetails.companydetails}
            onChange={handlePostChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
    <Grid mt={4} container  justifyContent="space-between" spacing={2} sx={{ p: 2 }}>
    <Grid >
      <Button
        onClick={handleDetailsClose}
        sx={{
          bgcolor: '#f44336',
          color: '#fff',
          '&:hover': {
            bgcolor: '#d32f2f',
          },
        }}
      >
        Cancel
      </Button>
    </Grid>
    <Grid >
      <Button
        onClick={handleSubmit}
        autoFocus
        sx={{
          bgcolor: '#007bff',
          color: '#fff',
          '&:hover': {
            bgcolor: '#0056b3',
          },
        }}
      >
        Submit
      </Button>
    </Grid>
  </Grid>
  </DialogContent>
 
</Dialog>


   </>
  );
}

export default Jobs;
