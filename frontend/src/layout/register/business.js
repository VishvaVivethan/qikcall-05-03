import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField,Container,FormHelperText, Button,CardMedia,Card,Snackbar,Tooltip,Alert,InputLabel,Select,FormControl,MenuItem,Toolbar,AppBar,IconButton, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from '@mui/material/Checkbox';
import person from '../../assets/img/manup.png';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdHome } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Collapse } from 'react-bootstrap';
import Banner from '../../assets/img/image6.jpeg';
import useMediaQuery from '@mui/material/useMediaQuery';
import Basic from '../../assets/img/basic.jpeg'
import Standard from '../../assets/img/standard.jpeg'
import Premium from '../../assets/img/premium.jpeg'

import './style.css'
import NavBar from '../navbar';
import Footer from '../footer';
// import NavBar from '../navbar';
// import Footer from '../footer';

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

// const colorList = ['#FF5733', '#3357FF',  '#FF69B4'];

const pricingList = {
	monthlyPricings: [
		{
			planTitle: "Basic",
			price: "Rs.1,000/-",
			timeline: "/month",
			description:
				"More off this less hello salamander lied porpoise much circa horse taped.",
			isActive: true,
		},
		{
			planTitle: "Standard",
			price: "Rs.5,000/-",
			timeline: "/month",
			description:
				"Sed ut in perspiciatis unde omnis iste natus error sit tatem doloremque.",
			isActive: true,
		},
		{
			planTitle: "Premium",
			price: "Rs.12,500",
			timeline: "/month",
			description:
				"Urna molestie at eleme ntum eu facilisis sed odio Male suada fames.",
			isActive: true,
		},
	],
	// yearlyPricings: [
	// 	{
	// 		planTitle: "Basic",
	// 		price: "$99",
	// 		timeline: "/year",
	// 		description:
	// 			"It’s easier to reach your savings goals when you have the right savings account.",
	// 		isActive: true,
	// 	},
	// 	{
	// 		planTitle: "Standard",
	// 		price: "$199",
	// 		timeline: "/year",
	// 		description:
	// 			"It’s easier to reach your savings goals when you have the right savings account.",
	// 		isActive: true,
	// 	},
	// 	{
	// 		planTitle: "Premium",
	// 		price: "$299",
	// 		timeline: "/year",
	// 		description:
	// 			"It’s easier to reach your savings goals when you have the right savings account.",
	// 		isActive: true,
	// 	},
	// 	{
	// 		planTitle: "Lifetime",
	// 		price: "$399",
	// 		timeline: "/year",
	// 		description:
	// 			"It’s easier to reach your savings goals when you have the right savings account.",
	// 		isActive: true,
	// 	},
	// ],
};

const pricingTab = {
	monthly: "monthly",
	// yearly: "yearly",
};

const PricingItem = ({ pricing, onSelect }) => (
  <div
    className={classNames("ezy__pricing4_o1tBHh42-item p-3 p-lg-5", {
      "active shadow-lg": pricing.isActive,
    })}
  >
    <h3 className="fw-bold mb-2 ezy__pricing4_o1tBHh42-title">{pricing.planTitle}</h3>
    <p
      className={classNames("mb-4 ezy__pricing4_o1tBHh42-note", {
        "opacity-50": !pricing.isActive,
      })}
    >
      {pricing.description}
    </p>
    {/* <div className="ezy__pricing4_o1tBHh42-price mb-3">
      <span className="fs-3 fw-bold">{pricing.price}</span>
      <span
        className={classNames("ms-2", {
          "opacity-50": !pricing.isActive,
        })}
      >
        {pricing.timeline}
      </span>
    </div> */}

    <Button
      variant={pricing.isActive ? "light" : "outline"}
      className="w-100 mt-4 ezy__pricing4_o1tBHh42-btn"
      onClick={() => onSelect(pricing.planTitle)}
    >
      Choose plan
    </Button>
  </div>
);

PricingItem.propTypes = {
  pricing: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};


function BusinessRegistration()  {


  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[phonenumber,setPhonenumber] = useState('');
  const[alterphonenumber,setAlter] = useState('');
  const[pannumber,setPannumber] = useState('');
  // const[address,setAddress] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
const [landmark, setLandmark] = useState('');
const [city, setCity] = useState('');
const [pincode, setPincode] = useState('');
const [state, setState] = useState('');
const [area, setArea] = useState('');
const [serviceName, setServiceName] = useState('');
const [serviceType, setServiceType] = useState('');
const [serviceCategory, setServiceCategory] = useState([]);
const [websiteLink, setWebsiteLink] = useState('');
const [addImages1, setAddImages1] = useState('');
const [addImages2, setAddImages2] = useState('');
const [aadhar, setAadharnumber] = useState('');
const [gstNumber, setGstNumber] = useState('');
const [description, setServiceDescription] = useState('');
  const [open,setOpen] = useState('');
  const[color,setColor] = useState('');
  const[msg,setMsg] = useState('');
  const [getData,setGetData] = useState('')
  const[membership,setMember] = useState('')
  const theme = useTheme();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  const [activeStep, setActiveStep] = useState(0); // Track the current step/page
  const [selectedPlan, setSelectedPlan] = useState('');
  const steps = ['General Information', 'Business Details',"Business Documents"];

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 425);
  };
  const [activeTimeline, setActiveTimeline] = useState(pricingTab.monthly);

	const switchActiveTimeline = (tab) => setActiveTimeline(tab);

  
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    console.log(selectedPlan,"kodiiiiiiiiiiiiiii")


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlehome=()=>{
    navigate("/")
  }

  const handleBusiness = async () => {
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const uploaddocs = await uploadDocs();

     
      
      const raw = JSON.stringify({
        "username": name,
  "email": email,
  "phonenumber": phonenumber,
  "password": password,
  "role": "businessman",
  "alterphonenumber": alterphonenumber,
  "membership": "none",
  "pannumber": pannumber,
  "addressline1": addressLine1,
  "addressline2": addressLine2,
  "city": city,
  "pincode": pincode,
  "state": state,
  "aadharnumber": aadhar ? aadhar : "none",
  "gstnumber": gstNumber,
  "upload": uploaddocs
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch("/api/register", requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
        } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
    })
    .then((result) => {
        if (result.status_code === 200) {
            console.log(result.data.token);

            const token = result.data.token;
            Cookies.set('token', token, { expires: 7, secure: true });


            setOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");
            setTimeout(() => {
              navigate('/');
            }, "1000");
            

        } else if (result.status_code === 400) {
            setOpen(true);
            setColor('error');
            setMsg(result.data.msg);

        } else if (result.status_code === 401) {
            setOpen(true);
            setColor('error');
            setMsg("Unauthorized access");
        }
    })
    .catch((error) => {
        console.error(error);
        setOpen(true);
        setColor('error');
        setMsg(error.response?.data?.message || 'An Error Occurred');
    });
    }catch(error){
      console.error(error);
      setOpen(true);
      setColor('error');
      setMsg(error.response?.data?.message || 'An Error Occurred');
    }
   }

   const handleService = async () => {
    try {
        
      const uploadimages = await uploadImage();

        // Prepare the request data
        const raw = JSON.stringify({
  "servicename": serviceName,
            "number": phonenumber,
            "servicetype": serviceCategory,
            "servicedescription": description,
            "addressline1": addressLine1,
  "addressline2": addressLine2,
  "area": area,
  "city": city,
  "pincode": pincode,
  "state": state,
            "websitelink": websiteLink,
            "addimages": uploadimages,
            "landmark":landmark 
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
  console.log('error', error)
  }
  
  }

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
      setArea(postOffice.Name)
      setCity(postOffice.District || '');
      setState(postOffice.State || '');
    }
  }, [pincodedata]);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!validateEmail(value)) {
      setEmailError(true);
      setHelperText('Your email is not valid');
    } else {
      setEmailError(false);
      setHelperText('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError('Password must be 8-16 characters with at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };


  const handleChipChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const validateStep = () => {
    let newErrors = {};
  
    // Step 0 validation
    if (activeStep === 0) {
      if (!name) newErrors.name = "Name is required";
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
        if (!passwordRegex.test(password)) {
          newErrors.password = "Password must be 8-16 characters, contain uppercase, lowercase, number, and special character.";
        }
      }
      if (!phonenumber) {
        newErrors.phonenumber = "Phonenumber is required";
      } else if(!phonenumber.length===10) {
          newErrors.phonenumber = "Phone number must be 10 Digits";
      }
      if (!alterphonenumber) newErrors.alterphonenumber = " Alter Phone number is required";
      if (!addressLine1) newErrors.addressLine1 = "Door No is required";
      if (!addressLine2) newErrors.addressLine2 = "Street/Area  is required";
      if (!area) newErrors.area = "Area is required";
      if (!city) newErrors.city = "City is required";
      if (!state) newErrors.state = "State is required";
      if (!pincode) newErrors.pincode = "Pincode is required";
    }
  
    // Step 1 validation
    if (activeStep === 1) {
      if (!serviceName) newErrors.serviceName = "Business name is required";
      if (!description) newErrors.description = "Business description is required";
      if (serviceCategory.length === 0) newErrors.serviceCategory = "At least one category must be selected";
    }
  
    // Step 2 validation
    if (activeStep === 2) {
      if (!pannumber) newErrors.pannumber = "Pan number is required";
      if (!aadhar) newErrors.aadhar = "Aadhar number is required";
      if (!gstNumber) newErrors.gstNumber = "GST number is required";
      if (images.length === 0) newErrors.images = "Images must be selected";
    }
  
    return newErrors;
  };
  

  const handleNext = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      setActiveStep((prev) => prev + 1); 
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set error states
    } else {
      if (!images) {
        setOpen(true);
        setColor('error');
        setMsg('Business Documents required');
        return;
      }
      if (!selectedFiles) {
        setOpen(true);
        setColor('error');
        setMsg('Business Documents required');
        return;
      }
      if (!checked) {
        setOpen(true);
        setColor('error');
        setMsg('Accept Terms and Conditions');
        return;
      }
      handleBusiness(); // Call submit handlers if no errors
      handleService();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [checked, setChecked] = React.useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [term, setTerm] = useState(false);
const [scroll, setScroll] = useState('paper');

const TermsOpen = (scrollType) =>()=> {
  setTerm(true);
  setScroll(scrollType);
};

const CloseTerms = () => {
  setTerm(false);
};

const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (term) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [term]);



  const [selectedFiles, setSelectedFiles] = useState([]);  

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files, "files from event");
    setSelectedFiles(files);
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const uploadDocs = async () => {
    try {
      const uploadedImageUrls = await Promise.all(selectedFiles.map(async (file) => {
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
          setOpen(true);
          setColor('error');
          setMsg("Failed to upload image");
          throw new Error('Failed to upload image.');
        }
      }));
  
      return uploadedImageUrls;
    } catch (error) {
      setOpen(true);
            setColor('error');
            setMsg("Upload Images Error");
      throw error;
    }
  };

  const [images, setImages] = useState(['','']);

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

  const uploadImage = async () => {
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
          console.log(data.secure_url,"poda")
          return data.secure_url;
        } else {
          setOpen(true);
          setColor('error');
          setMsg("Failed to upload image");
          throw new Error('Failed to upload image.');
        }
      }));
  
      return uploadedImageUrls;
    } catch (error) {
      setOpen(true);
            setColor('error');
            setMsg("Upload Images Error");
      throw error;
    }
  };

  const[plan,setPlan]= useState(false)

  const handlePlanOpen = () => {
    setPlan(true);
  };

  const handlePlanClose = () => {
    setPlan(false);
  };

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    handlePlanClose();
  };


  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: '' })); // Clear error on change
              }}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Alternate Number"
              variant="outlined"
              value={alterphonenumber}
              onChange={(e) => setAlter(e.target.value)}
              error={!!errors.alterphonenumber}
              helperText={errors.alterphonenumber}
              fullWidth
              margin="normal"
            />
            <Typography sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2 }}>
             Business Address:
            </Typography>
            <TextField
              label="Door No"
              variant="outlined"
              value={addressLine1}
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine1(e.target.value)}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
            />
            <TextField
              label="Street/Colony"
              variant="outlined"
              fullWidth
              value={addressLine2}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setAddressLine2(e.target.value)}
              error={!!errors.addressLine2}
              helperText={errors.addressLine2}
            />
            <Typography align='right' fontSize="10px">*Optional</Typography>
            <TextField
              label="Landmark"
              variant="outlined"
              fullWidth
              value={landmark}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setLandmark(e.target.value)}
            />
             <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
            {!area ? (
  <Tooltip title="Enter Pincode First" placement="bottom">
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
        onChange={(e) => setArea(e.target.value)}
      >
        {pincodedata.map((postOffice, index) => (
          <MenuItem key={index} value={postOffice.Name}>
            {postOffice.Name}
          </MenuItem>
        ))}
      </Select>
      {errors.area && (
        <FormHelperText sx={{ color: "red" }}>Select at least one category</FormHelperText>
      )}
    </FormControl>
  </Tooltip>
) : (
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
      onChange={(e) => setArea(e.target.value)}
    >
      {pincodedata.map((postOffice, index) => (
        <MenuItem key={index} value={postOffice.Name}>
          {postOffice.Name}
        </MenuItem>
      ))}
    </Select>
    {errors.area && (
      <FormHelperText sx={{ color: "red" }}>Select at least one category</FormHelperText>
    )}
  </FormControl>
)}


            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.city}
              helperText={errors.city}
            />
           
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              value={state}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setState(e.target.value)}
              InputProps={{ readOnly: true }}
              error={!!errors.state}
              helperText={errors.state}
            />
          </>
        );
  
      case 1:
        return (
          <>
            <TextField
              label="Business Name"
              variant="outlined"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              error={!!errors.serviceName}
              helperText={errors.serviceName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Business Description"
              variant="outlined"
              value={description}
              onChange={(e) => setServiceDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-multiple-chip-label">Business Category</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                sx={{ marginBottom: 2 }}
                multiple
                value={serviceCategory}
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
                error={!!errors.serviceCategory}
                helperText={errors.serviceCategory}
              >
                {Array.isArray(getData) && getData.map((category) => (
                  <MenuItem
                    key={category._id}
                    value={category.categoryname}
                    style={getStyles(name, serviceCategory, theme)}
                  >
                    {category.categoryname}
                  </MenuItem>
                ))}
              </Select>
              {errors.serviceCategory && (
                <FormHelperText sx={{color:"red"}}>Select at least one category</FormHelperText>
              )}
            </FormControl>
            <Typography align='right' fontSize="10px">*Optional</Typography>
            <TextField
              label="Website Link"
              variant="outlined"
              fullWidth
              value={websiteLink}
              sx={{ marginBottom: 3 }}
              onChange={(e) => setWebsiteLink(e.target.value)}
            />
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
      <Typography align='left' style={{ color: "#3357FF", textDecoration: "none", fontWeight: "bold", fontSize: "12px",}}>
        Select a subscription plan to access our services fully and without any restrictions
      </Typography>
      <TextField
              label="Membership"
              variant="outlined"
              fullWidth
              value={selectedPlan}
              sx={{ marginBottom: 3,marginTop: 3 }}
              onChange={(e) => setWebsiteLink(e.target.value)}
              onClick={handlePlanOpen}
              InputProps={{ readOnly: true }}
            />
      <Dialog
        fullScreen={fullScreen}
        open={plan}
        onClose={handlePlanClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}
      >
        <DialogContent sx={{ width: '100%'}}>
         
            <Container>
              <Row className="justify-content-center mb-3">
                <Col lg={6} xl={5} className="text-center">
                  <p className="ezy__pricing4_o1tBHh42-sub-heading mb-0">
                    Choose a suitable plan for you Monthly
                  </p>
                </Col>
              </Row>
              <div className="text-center mb-1">
                {/* <Button
                  variant={pricingTab.monthly === activeTimeline ? "contained" : "outlined"}
                  className="ezy__pricing4_o1tBHh42-btn me-1"
                  onClick={() => switchActiveTimeline(pricingTab.monthly)}
                >
                  MONTHLY
                </Button> */}
                {/* <Button
                  variant={pricingTab.yearly === activeTimeline ? "contained" : "outlined"}
                  className="ezy__pricing4_o1tBHh42-btn"
                  onClick={() => switchActiveTimeline(pricingTab.yearly)}
                >
                  YEARLY
                </Button> */}
              </div>
              <Collapse in={activeTimeline === pricingTab.monthly}>
  <Row  className="justify-content-center">
    {pricingList.monthlyPricings.map((pricing, i) => (
      <Col md={6} xl={3} className="mt-4" key={i}>
        <PricingItem pricing={pricing} onSelect={handlePlanSelect} />
      </Col>
    ))}
  </Row>
</Collapse>
              {/* <Collapse in={activeTimeline === pricingTab.yearly}>
                <Row>
                  {pricingList.yearlyPricings.map((pricing, i) => (
                    <Col md={6} xl={3} className="mt-4" key={i}>
                      <PricingItem pricing={pricing} onSelect={handlePlanSelect} />
                    </Col>
                  ))}
                </Row>
              </Collapse> */}
            </Container>
         
        </DialogContent>
      </Dialog>
    </Grid>
    <Grid>
    </Grid>
 
            <Typography className='mt-5' variant="h4" align="center" gutterBottom>
              Add Images
            </Typography>
            <Grid mt={3} mb={3} container direction="row" justifyContent="center" alignItems="center">
              {images.slice(0, 2).map((image, index) => (
                <Grid container direction="row" justifyContent="center" alignItems="center" item xs={12} sm={5} md={5} key={index}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`file-input-${index}`}
                    type="file"
                    onChange={(event) => handleImageChange(index, event)}
                  />
                  <label error={!!errors.images}
              helperText={errors.images} htmlFor={`file-input-${index}`}>
                    <IconButton component="span">
                      <Card sx={{ width: '200px' }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={image}
                          alt={`Image ${index + 1}`}
                          sx={{ cursor: 'pointer', width: '100%' }}
                        />
                      </Card>
                    </IconButton>
                  </label>
                </Grid>
              ))}
            </Grid>
          </>
        );
  
      case 2:
        return (
          <>
            <TextField
              label="Pan Number"
              variant="outlined"
              value={pannumber}
              onChange={(e) => setPannumber(e.target.value)}
              error={!!errors.pannumber}
              helperText={errors.pannumber}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Aadhar Number"
              variant="outlined"
              value={aadhar}
              onChange={(e) => setAadharnumber(e.target.value)}
              error={!!errors.aadhar}
              helperText={errors.aadhar}
              fullWidth
              margin="normal"
            />
            <TextField
              label="GST Number"
              variant="outlined"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              error={!!errors.gstNumber}
              helperText={errors.gstNumber}
              fullWidth
              margin="normal"
            />
            <Typography className='mt-2' fontSize="20px">Upload documents:</Typography>
            <Typography className='mt-2 mb-3' align='center'>
              Business-related documents (Business ID, Tax ID)
            </Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
              />
              <Button id="upload-btn" variant="contained" component="span" onClick={() => document.getElementById('file-input').click()}>
                Upload Files
              </Button>
              {files && (
                <Box mt={2}>
                  <Typography variant="body1">Selected files:</Typography>
                  {Array.from(files).map((file, index) => (
                    <Typography key={index} variant="body2">{file.name}</Typography>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid mt={2}  container direction="row" justifyContent="flex-start" alignItems='center'>
                  
                  <Checkbox  
                   checked={checked}
    onChange={handleChange}
    /> <Typography onClick={TermsOpen('paper')}  style={{ color: '#2c2c4b' }}> 
                    Accept the <span style={{ color: 'skyblue',cursor:"pointer" }}>terms & Condition</span></Typography>
  
                 </Grid>
          </>
        );
  
      default:
        return null;
    }
  };
  

  return (
    <>
      {isMobile ? (
        <>
          
         <NavBar/>
          <Grid   container justifyContent="center" sx={{ height: 'auto' }}>
            {/* Left Section */}
            {/* <Grid
              item
              container
              xs={12} md={5.5}
              direction="column"
                justifyContent= 'flex-start'
                alignItems='center'
              sx={{
                backgroundColor: '#f7f4cd',
                color: '#2d2f6b',
                padding: 0
              }}
            >
            

              <Typography className='mt-4' variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Business Registration
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 300, textAlign: 'center', marginBottom: 3 }}>
                Becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.
              </Typography>
              <Box
                component="img"
                sx={{
                  width: '70%',
                  height: "60%",
                  maxWidth: 200,
                }}
                alt="Person Illustration"
                src={person} // replace with actual image path
              />
            </Grid> */}

            {/* Right Section */}
            <Grid
              item
              xs={12} md={6}
              sx={{
                backgroundColor: '#f7f4cd',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Grid mb={5}>
                <Typography variant="h3" align='center' sx={{ fontWeight: 'bold', color: '#2d2f6b' }}>
                  {steps[activeStep]}
                </Typography>
              </Grid>

              {/* Progress Bar */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  marginBottom: 10
                }}
              >
                {steps.map((step, index) => (
                  <Box key={index}
                    sx={{
                      height: 5,
                      width: '30%',
                      backgroundColor: index <= activeStep ? '#2d2f6b' : '#d3d3d3'
                    }}
                  />
                ))}
              </Box>

              {/* Content for each step */}
              {renderContent()}

             

              {/* Navigation Buttons */}
              <Grid container spacing={2} mt={0.5} justifyContent={activeStep > 0 ? "space-between" : "flex-end"}>
  {activeStep > 0 && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleBack}>
        <ArrowBackIcon sx={{ marginRight: "5px" }} /> Back
      </Button>
    </Grid>
  )}

  {(activeStep === 0 || activeStep === 1) && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleNext}>
        Next <LoginIcon sx={{ marginLeft: "5px" }} />
      </Button>
    </Grid>
  )}

  {activeStep === 2 && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleSubmit}>
        Save <LoginIcon sx={{ marginLeft: "5px" }} />
      </Button>
    </Grid>
  )}
</Grid>


            </Grid>
          </Grid>
         <Footer/>
        </>
      ) : (
        <>
        <NavBar/>
        {/* <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor:"#2d2f6b"}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IoMdHome onClick={handlehome} size={24} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BusinessRegistration
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>  */}
          <Grid   container justifyContent="center" sx={{ height: 'auto' }}>
            {/* Left Section */}
            {/* <Grid
              item
              container
              xs={12} md={5.5}
              direction="column"
                justifyContent= 'flex-start'
                alignItems='center'
              sx={{
                backgroundColor: '#f7f4cd',
                color: '#2d2f6b',
                padding: 0
              }}
            >
            

              <Typography className='mt-4' variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Business Registration
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 300, textAlign: 'center', marginBottom: 3 }}>
                Becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.
              </Typography>
              <Box
                component="img"
                sx={{
                  width: '70%',
                  height: "60%",
                  maxWidth: 200,
                }}
                alt="Person Illustration"
                src={person} // replace with actual image path
              />
            </Grid> */}

            {/* Right Section */}
            <Grid
              item
              xs={12} md={6}
              sx={{
                backgroundColor: '#f7f4cd',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Grid mb={5}>
                <Typography variant="h3" align='center' sx={{ fontWeight: 'bold', color: '#2d2f6b' }}>
                  {steps[activeStep]}
                </Typography>
              </Grid>

              {/* Progress Bar */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  marginBottom: 10
                }}
              >
                {steps.map((step, index) => (
                  <Box key={index}
                    sx={{
                      height: 5,
                      width: '30%',
                      backgroundColor: index <= activeStep ? '#2d2f6b' : '#d3d3d3'
                    }}
                  />
                ))}
              </Box>

              {/* Content for each step */}
              {renderContent()}

             

              {/* Navigation Buttons */}
          <Grid container spacing={2} mt={0.5} justifyContent={activeStep > 0 ? "space-between" : "flex-end"}>
  {activeStep > 0 && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleBack}>
        <ArrowBackIcon sx={{ marginRight: "5px" }} /> Back
      </Button>
    </Grid>
  )}

  {(activeStep === 0 || activeStep === 1) && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleNext}>
        Next <LoginIcon sx={{ marginLeft: "5px" }} />
      </Button>
    </Grid>
  )}

  {activeStep === 2 && (
    <Grid item>
      <Button id="button-go" variant="contained" onClick={handleSubmit}>
        Save <LoginIcon sx={{ marginLeft: "5px" }} />
      </Button>
    </Grid>
  )}
</Grid>


              
            </Grid>
          </Grid>
          
        </>
      )}
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
      <Dialog
  open={term}
  onClose={CloseTerms}
  scroll={scroll}
  aria-labelledby="scroll-dialog-title"
  aria-describedby="scroll-dialog-description"
>
  <DialogTitle id="scroll-dialog-title">Terms & Conditions</DialogTitle>
  <DialogContent dividers={scroll === 'paper'}>
    <DialogContentText
      id="scroll-dialog-description"
      ref={descriptionElementRef}
      tabIndex={-1}
    >
       <h4>Terms Of Use For Information Dissemination</h4>
    <p>This document is an electronic record in terms of the amended Information Technology Act, 2000 and rules and regulation made thereunder. This electronic record is generated by a computer system and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 that require publishing the Terms for access or usage of Qik call’s service via Qik CallPortal. This document meets the stipulations and conditions mentioned in Section 65B (2) of the Indian Evidence Act, 1872.</p>
    
    <h4>YOUR ACCEPTANCE OF THIS AGREEMENT:</h4>
    <p>This is an agreement between you ("you" or "your") and Qik CallLimited, a company incorporated under the Companies Act 1956 with its registered office at Building M, 501-B, Palm Court Complex, Besides Goregaon Sports Club, New Link Road, Malad (W), Mumbai 400 064 ("Qik call" "we," or "our") that governs your use of the search services offered by Qik Callthrough its website <a href="http://www.qikcalll.com">www.qikcalll.com</a> ("Website"), telephone search, SMS, WAP or any other medium using which Qik Callmay provide the search services (collectively "Platforms"). When you access or use any of the Platforms you agree to be bound by these Terms and Conditions ("Terms").</p>
    
    <h4>CHANGES:</h4>
    <p>We may periodically change the Terms and the Site without notice, and you are responsible for checking these Terms periodically for revisions. All amended Terms become effective upon our posting to the Site, and any use of the site after such revisions have been posted signifies your consent to the changes.</p>
    
    <h4>HOW YOU MAY USE OUR MATERIALS:</h4>
    <p>We use a diverse range of information, text, photographs, designs, graphics, images, sound and video recordings, animation, content, advertisement and other materials and effects (collectively "Materials") for the search services on the Platforms. We provide the Material through the Platforms FOR YOUR PERSONAL AND NON-COMMERCIAL USE ONLY.</p>
    <p>While every attempt has been made to ascertain the authenticity of the Platforms content, Qik Callis not liable for any kind of damages, losses or action arising directly or indirectly, due to access and/or use of the content in the Platforms including but not limited to decisions based on the content in the Platforms which results in any loss of data, revenue, profits, property, infection by viruses etc.</p>
    <p>Accordingly, you may view, use, copy, and distribute the Materials found on the Platforms for internal, non-commercial, informational purposes only. You are prohibited from data mining, scraping, crawling, or using any process or processes that send automated queries to Qik call. You may not use the Platforms or any of them to compile a collection of listings, including a competing listing product or service. You may not use the Platforms or any Materials for any unsolicited commercial e-mail. Except as authorized in this paragraph, you are not being granted a license under any copyright, trademark, patent or other intellectual property right in the Materials or the products, services, processes or technology described therein. All such rights are retained by Qik call, its subsidiaries, parent companies, and/or any third party owner of such rights.</p>
    
    <h4>HOW YOU MAY USE OUR MARKS:</h4>
    <p>The Qik Callcompany names and logos and all related products and service names, design marks and slogans are trademarks and service marks owned by and used under license from Qik Callor its wholly owned subsidiaries. All other trademarks and service marks herein are the property of their respective owners. All copies that you make of the Materials on any of the Platforms must bear any copyright, trademark or other proprietary notice located on the respective Platforms that pertains to the material being copied. You are not authorized to use any Qik Callname or mark in any advertising, publicity or in any other commercial manner without the prior written consent of Qik call. Requests for authorization should be made to <a href="mailto:intproperty@qikcalll.com">intproperty@qikcalll.com</a></p>
    
    <h4>HOW WE MAY USE INFORMATION YOU PROVIDE TO US:</h4>
    <p>Do not send us any confidential or proprietary information. Except for any personally identifiable information that we agree to keep confidential as provided in our Privacy Policy, any material, including, but not limited to any feedback, data, answers, questions, comments, suggestions, ideas or the like, which you send to us will be treated as being non-confidential and nonproprietary. We assume no obligation to protect confidential or proprietary information (other than personally identifiable information) from disclosure and will be free to reproduce, use, and distribute the information to others without restriction. We will also be free to use any ideas, concepts, know-how or techniques contained in information that you send us for any purpose whatsoever including but not limited to developing, manufacturing and marketing products and services incorporating such information.</p>
    
    <h4>REVIEWS, RATINGS & COMMENTS BY USERS:</h4>
    <p>Since, Qik Callprovides information directory services through various mediums (SMS, WAP, E-Mail, Website, APP and voice or phone), your ("Users") use any of the aforementioned medium to post Reviews, Ratings and Comments about the Qik Callservices and also about the Advertiser's listed at Qik Callis subject to additional terms and conditions as mentioned herein.</p>
    <p>You are solely responsible for the content of any transmissions you make to the Site or any transmissions you make to any mediums offered by Qik Calland any materials you add to the Site or add to any mediums offered by Qik call, including but not limited to transmissions like your Reviews, Ratings & Comments posted by you (the "Communications"). Qik Calldoes not endorse or accept any of your Communication as representative of their (Qik call) views. By transmitting any public Communication to the Site, you grant Qik Callan irrevocable, non-exclusive, worldwide, perpetual, unrestricted, royalty-free license (with the right to sublicense) to use, reproduce, distribute, publicly display, publicly perform, adapt, modify, edit, create derivative works from, incorporate into one or more compilations and reproduce and distribute such compilations, and otherwise exploit such Communications, in all Platforms now known or later developed.</p>
    <p>You confirm and warrant that you have the right to grant these rights to Qik call. You hereby waive and grant to Qik Callall rights including intellectual property rights and also "moral rights" in your Communications, posted at Qik Callthrough any of mediums of Qik call. Qik Callis free to use all your Communications as per its requirements from time to time. You represent and warrant that you own or otherwise control all of the rights to the content that you post as Review, Rating or Comments; that the content is accurate; that use of the content you supply does not violate these Terms and will not cause injury to any person or entity. For removal of doubts it is clarified that, the reference to Communications would also mean to include the reviews, ratings and comments posted by your Friend's tagged by you. Also Qik Callreserves the right to mask or unmask your identity in respect of your Reviews, Ratings & Comments posted by you.</p>
    <p>Qik Callhas the right, but not the obligation to monitor and edit or remove any content posted by you as Review, Rating or Comments. Qik Callcannot review all Communications made on and through any of the mediums of Qik call. However, Qik Callreserves the right, but has no obligation, to monitor and edit, modify or delete any Communications (or portions thereof) which Qik Callin its sole discretion deems inappropriate, offensive or contrary to any Qik Callpolicy, or that violate these terms:</p>
    <p>Qik Callreserves the right not to upload or distribute to, or otherwise publish through the Site or Forums any Communication which</p>
    <ul>
        <li>is obscene, indecent, pornographic, profane, sexually explicit, threatening, or abusive;</li>
        <li>constitutes or contains false or misleading indications of origin or statements of fact;</li>
        <li>slanders, libels, defames, disparages, or otherwise violates the legal rights of any third party;</li>
        <li>causes injury of any kind to any person or entity;</li>
        <li>infringes or violates the intellectual property rights (including copyright, patent and trademark rights), contract rights, trade secrets, privacy or publicity rights or any other rights of any third party;</li>
        <li>violates any applicable laws, rules, or regulations;</li>
        <li>contains software viruses or any other malicious code designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment;</li>
        <li>impersonates another person or entity, or that collects or uses any information about Site visitors.</li>
    </ul>
    <p>It is also clarified that, if there are any issues or claims due to your Reviews, Ratings and Comments, then Qik Callreserves right to take appropriate legal action against you. Further, you shall indemnify and protect Qik Callagainst such claims or damages or any issues, due to your posting of such Reviews, Ratings and Comments Qik Calltakes no responsibility and assumes no liability for any content posted by you or any third party on Qik Callsite or on any mediums of Qik call.</p>
    <p>ADVERTISING:</p>
    <p>Qik Callreserves the right to refuse, reject, omit, remove or suspend any advertisement in its sole discretion for any reason. However, Qik Callwill inform the advertiser in such case. Qik Callis not liable for any damages, loss or expense of any sort incurred by you as a result of any error or failure or delay in the listing of your advertisement.</p>
    <p>If you observe any kind of misuse or abuse of our Services or any breach of these terms and conditions, please report the same to <a href="mailto:abuse@qikcalll.com">abuse@qikcalll.com</a>.</p>
    
    <p><em>For further information please feel free to contact us at:</em></p>
    <address>
        Qik Call Limited,<br/>
        Building M, 501-B, Palm Court Complex,<br/>
        Besides Goregaon Sports Club,<br/>
        New Link Road, Malad (W),<br/>
        Mumbai - 400064.<br/>
        Phone: +91-22-28884060<br/>
        Email: <a href="mailto:info@qikcalll.com">info@qikcalll.com</a>
    </address>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    {/* <Button onClick={CloseTerms}>Cancel</Button> */}
    <Button onClick={CloseTerms}>Ok</Button>
  </DialogActions>
</Dialog>
       <Footer/>
    </>
   
  );
};

export default BusinessRegistration;
