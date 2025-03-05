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
  Toolbar,Chip,MenuItem,Select,FormControl,InputLabel,useMediaQuery
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



function Bizsales() {

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
    
    fetch("/api/bizsalesdetail", requestOptions)
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
 

const[create,setCreate]=useState('')

  const handleCreateOpen = () => {
   setCreate(true);
   
 };

 const handleCreateClose = () => {
   setCreate(false);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files, "files from event");
    setAd(files);
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
        handleOfferregister();
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
        offer.location && typeof offer.location === 'string' && 
        offer.location.toLowerCase().includes(filterCity.toLowerCase())
      );
    }
  
    setFilteredSearchData(filteredData); // Update with filtered data
  };

  const clearFilters = () => {
    setFilterCategory('');
    setFilterCity('');
    setFilteredSearchData(data); // Reset to show all data
  };

  const handleDetailsOpen = (dataid) => {
    setDetailsOpen(true);
    getDataById(dataid)
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
    
     <Container  >
     <Grid 
  container 
  direction="row" 
  justifyContent="space-between" 
  alignItems="center" 
  sx={{ 
    marginTop: "15px", 
    backgroundColor: "#f7f4cd", 
    padding: "10px 20px", 
    // border:"1px solid #000",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px #aaa673"
  }}
>
  {/* First section: Category, Location, and Filter Button */}
  <Grid item>
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <FormControl
          fullWidth
          sx={{
            marginTop: '5px',
            minWidth: 200,
            minHeight: 20,
            borderColor: '#2d2859',
            '& .MuiInputBase-input': {
              color: "#000",
              backgroundColor: "white",
              padding: '5px',
              minHeight: '30px',
              fontSize: "15px",
              textAlign: "center",
              borderColor: '#2d2859'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#2d2859', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#2d2859', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2d2859', // Border color when focused
              },
            },
          }}
        >
          <Select
            id="demo-multiple-select"
            displayEmpty
            value={filterCategory} // Bind to state
            onChange={handleCategoryChange} // Category change handler
            input={<OutlinedInput id="select-multiple" />}
            renderValue={(selected) => (selected ? selected : "Category")}
          >
            <MenuItem disabled value="">
              <em>Business Category</em>
            </MenuItem>
            {Array.isArray(getData) && getData.map((category) => (
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
          value={filterCity} // Bind to state
          onChange={handleCityChange} // Location change handler
          sx={{
            width: 200,
            marginTop: '5px',
            color: "#000",
            backgroundColor: "white",
            fontSize: "15px",
            textAlign: "center",
            borderColor: '#2d2859',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: "#2d2859", // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#2d2859', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2d2859', // Border color when focused
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#000" },
          }}
        />
      </Grid>

      <Grid item>
        <Box sx={{ mt: 1, ml: 2 }}>
          <Button variant="contained" color="success" onClick={applyFilters}>
            Filter
          </Button>
          <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={clearFilters}>
            Clear
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Grid>

  {/* Second section: Register BizSales button */}
  <Grid item mt={1}>
    <Button variant="contained" color="secondary" onClick={handleCreateOpen}>
      Register BizSales
    </Button>
  </Grid>
</Grid>




     </Container>

     <Container>
       <Grid mt={5} container>
         <Grid container direction="row" justifyContent="flex-start" alignItems="center" item xs={12}>
         {Array.isArray(filteredSearchData) && filteredSearchData.length > 0 ? (
        filteredSearchData.map((offer, index) => (
          offer.isapprove === true && (
            <Grid container item xs={12} direction="row" justifyContent="flex-start" alignItems="flex-start" key={offer._id}>
              <Grid mb={2} item xs={6} spacing={2}>
                <Card style={{ display: 'flex', backgroundColor: '#ffffe0', borderRadius: '15px', padding: 2, width: "100%", height: "auto", position: "relative" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "200px", borderRadius: '10px', objectFit: "cover" }}
                    src={offer.addimages}
                    alt="banner"
                  />
                  <Grid item xs={6} sx={{ padding: 2 }} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Typography component="div" variant="h6">
                      {offer.title}
                    </Typography>
                   
                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                        Offer starts on: <span style={{ color: "green" }}>{new Date(offer.startdate).toLocaleDateString()}</span>
                      </Typography>
                      <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
                        Offer ends on: <span style={{ color: "red" }}>{new Date(offer.enddate).toLocaleDateString()}</span>
                      </Typography>
                      <Typography className='mt-2'   component="div" sx={{ fontSize: "13px" }}>
                       <b style={{color:"#282866"}} > Location:</b> {offer.location}
                      </Typography>
                    </Grid>
                    <Button
  variant="contained"
  startIcon={<IoIosMenu />}
  sx={{
    marginTop: "10px",
    borderColor: 'white',
    color: 'white',
    backgroundColor: "#282866",
    fontSize: "10px",
    '&:hover': {
      backgroundColor: "#5050A5",
    }
  }}
  onClick={() => handleDetailsOpen(offer._id)} // Fixing the onClick syntax
>
  More Details
</Button>

                  </Grid>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: "10px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Category: {offer.category}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          )
        ))
      ) : (
        <Grid mb={5}  container direction="row" textAlign="center" justifyContent="center"  >
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px", color: "#000",backgroundColor:"#ffe",padding:2,borderRadius:"10px" }}>
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

<Dialog open={create} onClose={handleCreateClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Register Biz-sales"}</DialogTitle>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container mt={2} spacing={2} sx={{ padding: 2 }}>
                <Grid container justifyContent="space-evenly" alignItems="center">
  <Grid container rowSpacing={2} columnSpacing={2} justifyContent="space-around">
    <Grid item xs={12} sm={6} lg={5}>
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={ctitle}
        onChange={(e) => setCtitle(e.target.value)}
        placeholder="Title"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={cdescription}
        onChange={(e) => setCdescription(e.target.value)}
        placeholder="Description"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={ccontactnumber}
        onChange={(e) => setCContactnumber(e.target.value)}
        placeholder="Contact Number"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={cpannumber}
        onChange={(e) => setPannumber(e.target.value)}
        placeholder="Pan Number"
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={5}>
      <FormControl fullWidth sx={{ marginTop: '30px' }}>
        <InputLabel id="demo-multiple-chip-label">Business Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={ccategory}
          onChange={handleChipChange}
          input={<OutlinedInput id="select-multiple-chip" label="Business Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Array.isArray(getData) &&
            getData.map((category) => (
              <MenuItem
                key={category._id}
                value={category.categoryname}
                style={getStyles(ctitle, ccategory, theme)}
              >
                {category.categoryname}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={cemailid}
        onChange={(e) => setEmailid(e.target.value)}
        placeholder="Email Id"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={clocation}
        onChange={(e) => setCLocation(e.target.value)}
        placeholder="Location"
        variant="outlined"
      />
      <TextField
        fullWidth
        sx={{ marginTop: '30px' }}
        value={caadharnumber}
        onChange={(e) => setAadharnumber(e.target.value)}
        placeholder="Aadhar Number"
        variant="outlined"
      />
    </Grid>
  </Grid>
</Grid>

                  <Grid mt={3} item xs={12} container direction="row" justifyContent="flex-start" alignItems="center">
                    <Typography variant="h6" sx={{ color: '#1A1A60', textAlign: 'left' }}>Duration:</Typography>
                  </Grid>
                  <Grid mt={1} xs={6} container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid mb={2} item >
                      <DatePicker
                        label="Start Date"
                        value={cstartDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} style={{ width: 100 }} variant="outlined" InputLabelProps={{ style: { color: '#000' } }} />}
                      />
                    </Grid>
                    <Grid item >
                      <DatePicker
                        label="End Date"
                        value={cendDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        renderInput={(params) => <TextField {...params} sx={{ borderRadius: "20px" }} variant="outlined" InputLabelProps={{ style: { color: '#000' } }} />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </LocalizationProvider>

              <Container>
                <Grid mt={3} xs={12}  container direction="row" justifyContent="space-evenly" alignItems="center">
                  {[
                    { label: 'Aadhar', handler: handleAadhar, files: aadhar },
                    { label: 'Pan Number', handler: handlePan, files: pan },
                    { label: 'BusinessProof', handler: handleProof, files: Proof }
                  ].map(({ label, handler, files }, index) => (
                    <Grid item xs={4} sx={{padding:2}} display="column" justifyContent="space-evenly" key={index}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ backgroundColor: '#1A1A60', color: '#FFFFFF', padding: '10px 10px', fontSize: '10px', }}
                      >
                        Upload Your {label}
                        <VisuallyHiddenInput onChange={handler} />
                      </Button>
                      {files && (
                        <Grid item mt={2}>
                          <div>
                            <strong>Selected Files:</strong>
                            <ul>
                              {Array.from(files).map((file, i) => <li key={i}>{file.name}</li>)}
                            </ul>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  ))}

                  <Grid mt={5} item xs={12} container direction="row" justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<FileUploadIcon />}
                      sx={{ backgroundColor: '#1A1A60', color: '#FFFFFF', padding: '10px 20px', fontSize: '10px' }}
                      onClick={handleUploadedClick}
                    >
                      Add Image
                    </Button>
                    <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} multiple />
                  </Grid>
                  <Grid mt={4} container direction="row" justifyContent="flex-end" alignItems="center">
</Grid>
                </Grid>
              </Container>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCreateClose} sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#2D2859' }}}>Cancel</Button>
              <Button onClick={handleRegister} sx={{  backgroundColor: '#2D2859',color: '#fff','&:hover': {backgroundColor: '#2D2859'  } }} >
                Register
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
        fullScreen={fullScreen}
        open={detailsopen}
        onClose={handleDetailsClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Details"}
        </DialogTitle>
        <DialogContent>
        {databyid.isapprove === true && (
  <Grid container item xs={12} key={databyid._id}>
    <Grid item xs={12} md={6} mb={2}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: 2,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: '0.3s',
          
        }}
      >
        <Box 
          component="img"
          sx={{ width: "100%", borderRadius: '8px', objectFit: "cover", marginRight: 2 }}
          src={databyid.addimages}
          alt="banner"
        />
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            {databyid.title}
          </Typography>

          <Typography className='mt-2' sx={{ fontSize: "12px", color: '#666' }}>
            <b>Description:</b> {databyid.description}
          </Typography>

          <Typography className='mt-2' sx={{ fontSize: "12px", color: '#666' }}>
            <b>Contact:</b> {databyid.contactnumber} 
          </Typography>

          <Typography className='mt-2' sx={{ fontSize: "12px", color: '#666' }}>
            <b>Email:</b> {databyid.emailid}
          </Typography>
          
          <Box>
            <Typography className='mt-2' sx={{ fontSize: "12px", color: '#666' }}>
              Sale starts on: <span style={{ color: "#4CAF50" }}>{new Date(databyid.startdate).toLocaleDateString()}</span>
            </Typography>
            <Typography className='mt-2'  sx={{ fontSize: "12px", color: '#666' }}>
              Sale ends on: <span style={{ color: "#F44336" }}>{new Date(databyid.enddate).toLocaleDateString()}</span>
            </Typography>
            <Typography className='mt-2' sx={{ fontSize: "14px", fontWeight: '500', color: '#333' }}>
              <b>Location:</b> {databyid.location}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            padding: "5px 10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            color: "#333",
            fontWeight: "600",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Category: {databyid.category}
        </Typography>
      </Box>
    </Grid>
  </Grid>
)}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

   </>
  );
}

export default Bizsales;
