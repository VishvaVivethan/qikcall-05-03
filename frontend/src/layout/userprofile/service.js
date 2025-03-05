import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Container, Button, Card, CardMedia, IconButton, Snackbar, Alert,
  Tooltip,
  FormHelperText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import NavBar from '../navbar';
import Footer from '../footer';
import './style.css'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';




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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function FreelistingForm() {
  const [color, setColor] = useState('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const[servicedescription,setServiceDescription]=useState('')
  const [number, setNumber] = useState('');
  const [type, setType] = useState([]);
  const [link, setLink] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
const [area, setArea] = useState('');
const [city, setCity] = useState('');
const [pincode, setPincode] = useState('');
const [state, setState] = useState('');
  const [getData,setGetData] = useState('')
  const [images, setImages] = useState(['', '', '', '']);
 
  // const navigate = useNavigate();

  console.log(getData,"+++++++++++")

  const handleService = async () => {
    try {
        
        const uploadedImageUrl = await uploadimages();
        const uploadlogo = await uploadAvatarImage();

        // Prepare the request data
        const raw = JSON.stringify({
            "servicename": name,
            "servicedescription":servicedescription,
            "number": number,
            "logo":uploadlogo,
            "servicetype": type,
            "addressline1": addressLine1,
  "addressline2": addressLine2,
  "area": area,
  "city": city,
  "pincode": pincode,
  "state": state,
            "websitelink": link,
            "addimages": uploadedImageUrl ,
           
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Make the service request
        const response = await fetch("/api/service", requestOptions);
        const result = {
            status_code: response.status,
            data: await response.json()
        };
        console.log(result.data,"++++++++++")

        // Handle the response
        if (result.status_code === 200) {
            setOpen(true);
            setColor('success');
            
            setMsg(result.data.msg );
        } else if (result.status_code === 400) {
            setOpen(true);
            setColor('error');
            setMsg(result.data.msg );
        }
    } catch (error) {
        setOpen(true);
        setColor('error');
        setMsg('An unexpected error occurred');
        console.error(error);
    }
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const[files,setFiles] = useState('')

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file); // Show the image preview
        setImages(newImages);
        
        // Save the file object in state for later uploading
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  

  const uploadimages = async () => {
    try {
      const uploadedImageUrls = await Promise.all(files.map(async (file) => {
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
          throw new Error('Failed to upload image.');
        }
      }));
  
      return uploadedImageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const [avatarImage, setAvatarImage] = useState(''); // To store the image URL for Avatar
  const [avatarFile, setAvatarFile] = useState(''); // To store the selected file for uploading

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click(); // Trigger file input on avatar click
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAvatarImage(URL.createObjectURL(file)); // Preview image in Avatar
      setAvatarFile(file); // Save the file for uploading
    } else {
      alert('Please select a valid image file.');
    }
  };

  const uploadAvatarImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', avatarFile);
      formData.append('upload_preset', 'ae1kvvqp'); // Replace with your Cloudinary preset

      const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        console.log(data.secure_url, 'Uploaded avatar image URL');
        return data.secure_url;
      } else {
        throw new Error('Failed to upload avatar image.');
      }
    } catch (error) {
      console.error('Error uploading avatar image:', error);
      throw error;
    }
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleArea = (event) => {
    setArea(event.target.value);
  };

  


  const [pincodedata, setPincodedata] = useState([]);
  // const [text, setText] = useState('');

  console.log(pincodedata,pincode, "Pincode")

  const pincodeDetails = () => {
    if (!pincode) return; // Ensure pincode is not empty

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200 && data[0].Status === 'Success') {
          setPincodedata(data[0].PostOffice || []);
        } else {
          setPincodedata([]);
        }
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    if (pincode.length === 6) {
      pincodeDetails();
    }
  }, [pincode]);

  useEffect(() => {
    if (pincodedata.length > 0) {
      // Assuming the first result is what we need
      const postOffice = pincodedata[0];
      setCity(postOffice.District || '');
      setState(postOffice.State || '');
      setArea(postOffice.Name || '');
    }
  }, [pincodedata]);

  const [errors, setErrors] = useState({});


  const validateStep = () => {
    let newErrors = {};
  
   
   
      if (!name) newErrors.name = "Name is required";
      if (!servicedescription) newErrors.servicedescription = "Servicedescription is required";
     
      if (!number) {
        newErrors.number = "Number is required";
      } else if(!number.length===10) {
          newErrors.number = "Phone number must be 10 Digits";
      }
      if (type.length === 0) newErrors.type = "At least select on category";
      if (!addressLine1) newErrors.addressLine1 = "Door No is required";
      if (!addressLine2) newErrors.addressLine2 = "Street/Colony is required";
      if (area.length===0) newErrors.area = "Area  is required";
      if (!city) newErrors.city = "City is required";
      if (!state) newErrors.state = "State is required";
      if (!pincode) newErrors.pincode = "Pincode is required";
   
  
   
  
    return newErrors;
  };

  

  const handleSave = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      handleService();
      setName('')
      setServiceDescription('')
      setAddressLine1('')
      setAddressLine2('')
      setNumber('')
      setArea('')
      setCity('')
      setState('')
      setType('')
      setImages('')
      // setAvatarFile('')

    }
  };

  return (
    <>
      <NavBar />
      <Container sx={{ marginBottom: "15px"}}>
        <Box
          sx={{
            backgroundColor: '#f7f4cd', // light yellow background
            height: 'auto',
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mt={5}
          mb={5}
        >
          <Box
            sx={{
              backgroundColor: '#f7f4cd', // slightly darker yellow for the form
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              border: '1px solid #333366', // border color matching the text color
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: '2rem', color: '#333366' }}
            >
            Service Profile
            </Typography>

            <input
        type="file"
        id="avatarInput"
        accept="image/*" // Only allow image files
        style={{ display: 'none' }} // Hide the input
        onChange={handleAvatarChange}
      />

      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
      >
        <Avatar
          alt="User Avatar"
          src={avatarImage || '/static/images/avatar/1.jpg'} // Display selected image or default
          sx={{ width: 200, height: 200 }} // Avatar size
          onClick={handleAvatarClick} // Handle avatar click to select image
          style={{ cursor: 'pointer' }} // Show pointer on hover
        />
      </Stack>

            <FormControl fullWidth margin="normal">
              <TextField
                id="service-name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Service Name"
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366'
                  },
                }}
                error={!!errors.name}
              helperText={errors.name}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="service-description"
                variant="outlined"
                value={servicedescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                label="Service Descripton"
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366'
                  },
                }}
                error={!!errors.servicedescription}
              helperText={errors.servicedescription}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
            {/* <InputLabel id="demo-multiple-chip-number">Mobile Number</InputLabel> */}
              <Tooltip title="Enter Your  Registered Mobile number" placement="bottom">
              <TextField
              // labelId="demo-multiple-chip-number"
                id="service-number"
                variant="outlined"
                value={number}
                label="Mobile Number"
                onChange={(e) => setNumber(e.target.value)}
                
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366',
                    
                  },
                }}
                error={!!errors.number}
              helperText={errors.number}
              />
              </Tooltip>
            </FormControl>

            <FormControl fullWidth margin="normal" >
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={type}
          onChange={handleChange}
          error={!!errors.type}
          input={<OutlinedInput id="select-multiple-chip" label="Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Array.isArray(getData)&& getData.map((category) => (
            <MenuItem
              key={category._id}
              value={category.categoryname}
              style={getStyles(name, type, theme)}
            >
              {category.categoryname}
            </MenuItem>
          ))}
        </Select>
        {errors.type && (
                <FormHelperText sx={{color:"red"}}>Select at least one category</FormHelperText>
              )}
      </FormControl>

      <Typography  sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2,marginTop:2 }}>
                Address:
              </Typography>
              <TextField
                label="Door No"
                variant="outlined"
                value={addressLine1}
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setAddressLine1(e.target.value)
                }}
                error={!!errors.addressLine1}
              helperText={errors.addressLine1}

              />
              <TextField
                label="Street/Colony"
                variant="outlined"
                fullWidth
                value={addressLine2}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setAddressLine2(e.target.value)
                }}
                error={!!errors.addressLine2}
              helperText={errors.addressLine2}
              />
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                value={pincode}
                sx={{ marginBottom: 2 }}
                
                onChange={(e)=>{
                  setPincode(e.target.value)
                }}
                error={!!errors.pincode}
              helperText={errors.pincode}
              />
              <Tooltip title="Enter Pincode First" placement='bottom'>
              <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Area</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          InputProps={{ readOnly: true }}
          label="Area"
          sx={{ marginBottom: 2 }}
          error={!!errors.area}
          onChange={handleArea}
        >
          
          {pincodedata.map((postOffice, index) => (
      <MenuItem key={index} value={postOffice.Name}>
        {postOffice.Name}
      </MenuItem>
    ))}
    {errors.area && (
                <FormHelperText sx={{color:"red"}}>Select at least one category</FormHelperText>
              )}
        </Select>  
        
      </FormControl>
      </Tooltip>
              
              <Tooltip title="Enter Pincode First" placement='bottom' >
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                sx={{ marginBottom: 2 }}
                InputProps={{ readOnly: true }}
                onChange={(e)=>{
                  setCity(e.target.value)
                }}
                error={!!errors.city}
              helperText={errors.city}
              />
              </Tooltip>
              
              <Tooltip title="Enter Pincode First" placement='bottom' >
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                value={state}
                sx={{ marginBottom: 2 }}
                InputProps={{ readOnly: true }}
                onChange={(e)=>{
                  setState(e.target.value)
                }}
                error={!!errors.state}
              helperText={errors.state}
              />
              </Tooltip>

            <FormControl fullWidth margin="normal">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#333366' }}>*Optional</Typography>
              </Box>
              <TextField
                id="website-link"
                variant="outlined"
                value={link}
                onChange={(e) => setLink(e.target.value)}
               label="Website link"
                InputProps={{
                  style: {
                    color: '#333366',
                    borderColor: '#333366'
                  },
                }}
              />
            </FormControl>

            <Typography
              variant="h6"
              align="center"
              sx={{ marginTop: '2rem', marginBottom: '1rem', color: '#333366' }}
            >
              Add Images
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
  {/* First Row */}
  <Grid container item xs={12}  justifyContent="space-evenly" alignItems="center">
    {Array.isArray(images)&&images.slice(0, 2).map((image, index) => (
      <Grid item xs={12} sm={6} md={5} lg={5} key={index} justifyContent="center" alignItems="center">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`file-input-${index}`}
          type="file"
          onChange={(event) => handleImageChange(index, event)}
        />
        <label htmlFor={`file-input-${index}`}>
          <IconButton component="span">
            <Card className="custom-card">
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Image ${index + 1}`}
                className="custom-card-media"
              />
            </Card>
          </IconButton>
        </label>
      </Grid>
    ))}
  </Grid>

  {/* Second Row */}
  <Grid container item xs={12}  justifyContent="space-evenly" alignItems="center">
    {Array.isArray(images)&&images.slice(2, 4).map((image, index) => (
      <Grid item xs={12} sm={6} md={5} lg={5} key={index + 2} justifyContent="center" alignItems="center">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`file-input-${index + 2}`}
          type="file"
          onChange={(event) => handleImageChange(index + 2, event)}
        />
        <label htmlFor={`file-input-${index + 2}`}>
          <IconButton component="span">
            <Card className="custom-card">
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Image ${index + 3}`}
                className="custom-card-media"
              />
            </Card>
          </IconButton>
        </label>
      </Grid>
    ))}
  </Grid>
</Grid>




          </Box>
        </Box>
        <Grid container justifyContent="center" mt={2}>
          <Button
          
            variant="contained"
            onClick={()=>{
            
              if(!images){
                setOpen(true);
                setColor('error');
                setMsg('Address required');
                return
              }
             
              handleSave()
            
            }}
            sx={{ borderRadius: 50, fontSize: "15px",marginBottom:"20px", backgroundColor: "#282866" }}
          >
            Add Services
          </Button>
        </Grid>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={color}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </>
  );
}

export default FreelistingForm;
