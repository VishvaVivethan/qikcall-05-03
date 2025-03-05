import React,{ useEffect, useState,useRef  } from 'react'
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CFormCheck,
//   CListGroup,
//   CListGroupItem,
//   CRow,
// } from '@coreui/react'
// import { DocsExample } from 'src/components'
import {Typography,Button,Grid,TextField,Tooltip,Card,CardMedia,CardContent,Divider , IconButton,Box,Container} from '@mui/material';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


const VisuallyHiddenInput = ({ onChange }) => (
  <input
    type="file"
    style={{ display: 'none' }}
    onChange={onChange}
  />
);

const ListGroups = () => {

const[data,setData]= useState('')
const[advertise,setAdvertise]=useState('')
const [open, setOpen] = React.useState(false);
const [expanded, setExpanded] = React.useState(false);
const[title,setTitle]=useState('');
const[category,setCategory]=useState('')
const[description,setDescription]=useState('')
const[storename,setStorename]=useState('')
const[contactnumber,setContactnumber]=useState('')
const[location,setLocation]=useState('')
const[startdate,setStartdate]=useState('');
const[enddate,setEnddate]=useState('');
// const[isapprove,setApprove]=useState('');
const[addimages,setAddimages]=useState('');
const [files, setFiles] = useState([]);
const [msgOpen, setMsgOpen] = useState(false);
const [msg, setMsg] = useState('');
const [color, setColor] = useState('');
const fileInputRef = useRef(null);
const [checked, setChecked] = React.useState(false);


console.log(advertise,"offerdata")

const navigate = useNavigate('')

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If token is expired, remove the token and navigate to homepage
      if (decodedToken.exp < currentTime) {
        Cookies.remove('token');
        navigate('/');
      }
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove('token');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    getOffer()
  }, []); 

const getOffer =()=>{
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

const getOfferById =(offerid)=>{
 try{
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`/api/bizsalesdata?id=${offerid}`, requestOptions)
  .then(async (response) => {
    if (response.status === 200 || response.status === 400) {
      return { status_code: response.status, data: await response.json() };
    } else {
      return { status_code: response.status, data: { msg: 'Unexpected Error' } };
    }
  })
  .then((result) => {
    setAdvertise(result.data.data)
    setTitle(result.data.data.title || '');
      setDescription(result.data.data.description || '');
      setCategory(result.data.data.category || '');
      setStorename(result.data.data.storename || '');
      setContactnumber(result.data.data.contactnumber || '');
      setLocation(result.data.data.location || '');
      setStartdate(result.data.data.startdate || '');
      setEnddate(result.data.data.enddate || '');
      setChecked(result.data.data.isapprove || '');
      setAddimages(result.data.data.addimages || '');
    console.log(result.data.data,"advertise data by id")
   })
  .catch(error => console.log('error', error));
 }catch(error){
  console.error(error)
 }
}

const updateOffer = async (offerid) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let imageUrls = [];

    // Only upload images if new images were selected
    if (files.length > 0) {
      imageUrls = await uploadImage();
    }

    // Use existing images if no new images were uploaded
    const finalImageUrls = imageUrls.length > 0 ? imageUrls : addimages; // 'existingImages' contains the previously saved image URLs

    const raw = JSON.stringify({
      title: title,
      category: category,
      description: description,
      storename: storename,
      location: location,
      contactnumber: contactnumber,
      startdate: startdate,
      enddate: enddate,
      isapprove: checked,  // Send updated approval status
      addimages: finalImageUrls // Send the final images (newly uploaded or existing)
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch(`/api/bizsales_update?id=${offerid}`, requestOptions);
    const result = await response.json();
    
    if (response.status === 200 || response.status === 400) {
      console.log(result, "Offer updated successfully");
      getOffer();  // Fetch the updated offer
    } else {
      console.log("Unexpected error occurred.");
    }
  } catch (error) {
    console.log("Error updating offer:", error);
  }
};


const offerDelete =(offerid)=>{
  try{
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    
    fetch(`/api/delete_bizsales?id=${offerid}`, requestOptions)
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
          getOffer(); 
          setMsgOpen(true);
          setColor('success');
          setMsg(result.data.msg || "Delete Success");
    
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

const handleFileChange = (event) => {
const files = Array.from(event.target.files);
console.log(files, "files from event");
setAd(files);
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
const [ccategory, setCcategory] = useState('');
const [clocation, setCLocation] = useState('');
const [cstorename, setCStorename] = useState('');
const [cpannumber, setPannumber] = useState('');
const [caadharnumber, setAadharnumber] = useState('');
const [cemailid, setEmailid] = useState('');
const [ccontactnumber, setCContactnumber] = useState('');
const [cstartDate, setStartDate] = React.useState(null);
const [cendDate, setEndDate] = React.useState(null);
// const [startdates, setStartdates] = useState('');
// const [enddate, setEnddate] = useState('');
const [upload, setUpload] = useState({ "aadhar":aadhar, "pan":pan,"proof": Proof });
// const [addimages, setAddimages] = useState('');

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
  "isapprove":approve
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
      getOffer();
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

const [approve,setApprove]= useState('')
const[remove,setDelete]=useState('');


console.log(checked,"log")
  const handleApprove = (event) => {
    setChecked(event.target.checked);
  };

  const handleCheck = (event) => {
    setApprove(event.target.checked);
  };


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = (offerid) => {
    getOfferById(offerid)
    console.log(offerid,"id offer")
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateAdvertise = (offerid) => {
    updateOffer(offerid); 
    handleClose(); 
    
  };

  const handleDeleteOpen = (offerid) => {
    getOfferById(offerid)
    console.log(offerid,"id offer")
    setDelete(true);
   
  };

  const handleDeleteClose = () => {
    setDelete(false);
  };

  const handleDeleteOffer = (offerid) => {
    offerDelete(offerid); 
    handleDeleteClose(); 
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };

  const[create,setCreate]=useState('')

  const handleCreateOpen = () => {
   setCreate(true);
   
 };

 const handleCreateClose = () => {
   setCreate(false);
 };


  return (
    <>
      <Box mb={5} sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#2d2859", color: "#fff" }} position="static">
        <Toolbar variant="dense">
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={6} container direction="row" alignItems="center">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
                <CategoryIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
               Biz-sales List
              </Typography>
            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
              <Button onClick={handleCreateOpen} color="inherit">
                <AddCircleIcon sx={{ mr: 0.5 }} /> Add Biz-sales
              </Button>
            </Grid>
          </Grid>

          <Dialog open={create} onClose={handleCreateClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Create Offer"}</DialogTitle>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container mt={2} spacing={2} sx={{ padding: 2 }}>
                  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={ctitle} onChange={(e) => setCtitle(e.target.value)} placeholder="Title" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={cdescription} onChange={(e) => setCdescription(e.target.value)} placeholder="Description" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={ccontactnumber} onChange={(e) => setCContactnumber(e.target.value)} placeholder="Contact Number" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={cpannumber} onChange={(e) => setPannumber(e.target.value)} placeholder="Pan Number" variant="outlined" />
                      </Grid>
                      <Grid item sm={12} md={6} lg={4} container direction="row" justifyContent="center" alignItems="center">
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={ccategory} onChange={(e) => setCcategory(e.target.value)} placeholder="Category" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={cemailid} onChange={(e) => setEmailid(e.target.value)} placeholder="Email Id" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={clocation} onChange={(e) => setCLocation(e.target.value)} placeholder="Location" variant="outlined" />
                        <TextField sx={{ marginTop: '30px', width: '100%' }} value={caadharnumber} onChange={(e) => setAadharnumber(e.target.value)} placeholder="Aadhar Number" variant="outlined" />
                        
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
  <Typography>Approve</Typography>
  <Switch
    checked={approve}
    onChange={handleCheck}
    inputProps={{ 'aria-label': 'controlled' }}
  />
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
        </Toolbar>
      </AppBar>
    </Box>
    <Grid >
    {Array.isArray(data) && data.length > 0 ? (
    data.map((item, index) => (
      <Card sx={{marginBottom:"12px"}} >
      
      <Accordion mb={4} expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
         <Grid container direction="row" justifyContent="space-between" alignItems="center">
  {/* First Grid (Icon and Title) */}
  <Grid item xs={4} container direction="row" alignItems="center">
    <Typography sx={{ flexShrink: 0 }}>
      Title: {item.title}
    </Typography>
  </Grid>



  {/* Third Grid (Contact Information) */}
  <Grid item xs={4}>
    <Typography sx={{ color: 'text.secondary' }}>
      Contact: {item.contactnumber}
    </Typography>
  </Grid>
</Grid>

        </AccordionSummary>
        <AccordionDetails >
       
        <Grid container direction="column" justifyContent="space-around" alignItems="flex-start"  >
       <Grid container direction="column" justifyContent="space-around" alignItems="flex-end" >
       <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
       <IconButton>
      <EditNoteIcon onClick={()=>{handleClickOpen(item._id)}} color='error' />
    </IconButton>
    <IconButton>
      <DeleteIcon onClick={()=>{handleDeleteOpen(item._id)}} color='error' />
    </IconButton>
       </Grid>
       </Grid>
       <Grid mb={2} mt={2} container direction="row" justifyContent="space-evenly" alignItems="center">
  <Typography sx={{ color: 'black', fontSize: '13px', marginTop: '8px' }}>
    Description: {item.description}
  </Typography>
  <Divider orientation="vertical" flexItem sx={{ borderColor: 'red' }} />
  
  <Typography sx={{ color: 'black', fontSize: '13px', marginTop: '8px' }}>
    Category: {item.category}
  </Typography>
  <Divider orientation="vertical" flexItem sx={{ borderColor: 'red' }} />
  
  <Typography sx={{ color: 'black', fontSize: '13px', marginTop: '8px' }}>
    Aadhar Number: {item.aadharnumber}
  </Typography>
  <Divider orientation="vertical" flexItem sx={{ borderColor: 'red' }} />
  
  <Typography sx={{ color: 'black', fontSize: '13px', marginTop: '8px' }}>
    Pan Number: {item.pannumber}
  </Typography>
</Grid>
          <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start">
          <Typography sx={{ color: '#fff', fontSize: "15px", marginTop: "10px",backgroundColor:"green",padding:1,fontWeight:"bold" }}>
  Start Date: {new Date(item.startdate).toLocaleDateString()}
</Typography>
<Typography sx={{ color: '#fff', fontSize: "15px", marginTop: "10px",backgroundColor:"red",padding:1,fontWeight:"bold" }}>
  End Date: {new Date(item.enddate).toLocaleDateString()}
</Typography>
          </Grid>
          <Typography sx={{ color: 'black', fontSize: "18px", marginTop: "15px",fontWeight:"bold" }}>
  Proof
</Typography>
<Grid mt={1} mb={1} container direction="row" justifyContent="space-around" alignItems="center">
  <Grid item xs={3} container direction="column" justifyContent="space-around" alignItems="flex-start">
    <Typography sx={{ color: 'black', fontSize: "13px", marginTop: "10px",fontWeight:"bold" }}>
      Aadhar Proof:
    </Typography>
    <img src={item.upload[0].aadhar} alt='aadhar' width="100px" style ={{marginTop:"10px"}} />
  </Grid>

  <Grid item xs={3} container direction="column" justifyContent="space-around" alignItems="flex-start">
    <Typography sx={{ color: 'black', fontSize: "13px", marginTop: "10px",fontWeight:"bold" }}>
      Pan Proof:
    </Typography>
    <img src={item.upload[0].pan} alt='pan' width="100px" style ={{marginTop:"10px"}} />
  </Grid>

  <Grid item xs={3} container direction="column" justifyContent="space-around" alignItems="flex-start">
    <Typography sx={{ color: 'black', fontSize: "13px", marginTop: "10px",fontWeight:"bold" }}>
      Business Proof:
    </Typography>
    <img src={item.upload[0].proof} alt='business proof' width="100px" style ={{marginTop:"10px"}} />
  </Grid>
</Grid>

         </Grid>
         <Typography sx={{ color: 'black', fontSize: "18px", marginTop: "15px",fontWeight:"bold" }}>
  Uploaded Ad
</Typography>

<Grid mt={1} mb={1} container direction="column" justifyContent="space-around" alignItems="flex-start">
<img src={item.addimages[0]} alt='aadhar' width="100px" />
</Grid>

<Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit Offers"}
        </DialogTitle>
        <DialogContent sx={{width:"600px"}}>
         <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
         <TextField
         sx={{marginTop:"15px"}}
         fullWidth
         label="AD Title"
         value={title}
         onChange={(e)=>{
          setTitle(e.target.value)
         }}
         />
          <TextField
           sx={{marginTop:"15px"}}
           fullWidth
           label="AD Category"
         value={category}
         onChange={(e)=>{
          setCategory(e.target.value)
         }}
         />
          <TextField
           sx={{marginTop:"15px"}}
           fullWidth
           label="AD Description"
         value={description}
         onChange={(e)=>{
          setDescription(e.target.value)
         }}
         />
      
        
         <TextField
           sx={{marginTop:"15px"}}
           fullWidth
           label="Contact Number"
         value={contactnumber}
         onChange={(e)=>{
          setContactnumber(e.target.value)
         }}
         />
          <TextField
           sx={{marginTop:"15px"}}
           fullWidth
           label="Location"
         value={location}
         onChange={(e)=>{
          setLocation(e.target.value)
         }}
         />
         <Typography align='left' sx={{fontSize:"18px",marginTop:"15px"}}>
          Uploaded AD:
         </Typography>

<Grid item xs={12} sm={6} container direction="column" justifyContent="space-between" alignItems="flex-start">
  {/* File Input and Upload Button */}
  <input
    type="file"
    ref={fileInputRef} 
    onChange={(event) => handleImageChange(0, event)}
    accept="image/*"
    style={{ display: 'none' }} 
  />
  <Button variant='contained' sx={{backgroundColor:"#1c305c"}} onClick={handleUploadClick}>
    <FileUploadIcon/>Upload
  </Button>

  {/* Image Previews */}
  {addimages && addimages.length > 0 && (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
      {addimages.map((image, index) => (
        <img key={index} src={image} alt={`Preview ${index}`} style={{ width: '200px', height: '200px' }} />
      ))}
    </div>
  )}
</Grid>
<Grid mt={4} container direction="row" justifyContent="flex-end" alignItems="center">
  <Typography>Approve</Typography>
  <Switch
    checked={checked}
    onChange={handleApprove}
    inputProps={{ 'aria-label': 'controlled' }}
  />
</Grid>
<Grid mt={4} sx={{padding:1}} container direction="row" justifyContent="space-between" alignItems="center">
<Button  onClick={handleClose} variant='contained' sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}} >
            Close
          </Button>
          <Button variant='contained' onClick={() => handleUpdateAdvertise(advertise._id)} sx={{ backgroundColor: '#2D2859', color: '#fff','&:hover': {backgroundColor: '#2D2859' }}} >
           Submit
          </Button>
</Grid>
         </Grid>
        </DialogContent>
        
      </Dialog>
      <Dialog
        open={remove}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Advertisement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are Sure, You want to Delete this Advertisement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid sx={{padding:1}} container direction="row" justifyContent="space-between" alignItems="center">
          <Button variant='contained' autoFocus onClick={handleDeleteClose} sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}>
            No
          </Button>
          <Button variant='contained' onClick={() => handleDeleteOffer(advertise._id)} autoFocus sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}}>
           Yes
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
        
        </AccordionDetails>
      </Accordion>
      </Card>
      ))
    ) : (
      <Typography variant="body2" color="text.secondary">
        No Advertisement available
      </Typography>
    )}
    </Grid>
    </>
  )
}

export default ListGroups
