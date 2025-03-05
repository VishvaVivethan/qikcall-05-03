import React, { useState,useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react'
// import { DocsExample } from 'src/components'
// import Typography from '../../theme/typography/Typography'
import {Typography,Button,Grid,TextField,Tooltip,Card,CardMedia,CardContent,IconButton,} from '@mui/material';
import Switch from '@mui/material/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FormControl, InputLabel, Select, OutlinedInput, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


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

const Collapses = () => {
  const [store, setStore] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
  const [deletedata, setDelete] = useState('');
  const [deleteopen, setDeleteOPen] = useState(false);
  const [color, setColor] = useState('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

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
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await fetch("/api/servicelists", { method: "GET", redirect: "follow" });
      if (response.ok) {
        const result = await response.json();
        setStore(result.data); // Adjust based on your API response
      } else {
        console.error('Unexpected Error', response.status);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const getServiceById = async (serviceId) => {
    try {
      const response = await fetch(`/api/servicedata?id=${serviceId}`, { method: "GET", redirect: "follow" });
      if (response.ok) {
        const result = await response.json();
        setSelectedServiceDetails(result.data); 
        setEName(result.data.servicename)
        setENumber(result.data.number)
        setEType(result.data.servicetype)
        setEDescription(result.data.servicedescription)
        setEAddressLine1(result.data.addressline1)
        setEAddressLine2(result.data.addressline2)
        setEArea(result.data.area)
        setECity(result.data.city)
        setEState(result.data.state)
        setEPincode(result.data.pincode)
        setELink(result.data.websitelink)
        setEImages(result.data.addimages)
        setChecked(result.data.isapprove)
        setListed(result.data.freelisting)

        console.log(result.data,"dtat coming")
      } else {
        console.error('Unexpected Error', response.status);
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  const [editdata,setEditdata] = useState('')
  const [ename, setEName] = useState('');
  const [enumber, setENumber] = useState('');
  const [etype, setEType] = useState([]);
  const [elink, setELink] = useState('');
  const [edescription, setEDescription] = useState('');
  const [eaddressLine1, setEAddressLine1] = useState('');
const [eaddressLine2, setEAddressLine2] = useState('');
const [earea, setEArea] = useState('');
const [ecity, setECity] = useState('');
const [epincode, setEPincode] = useState('');
const [estate, setEState] = useState('');
  const [eimages, setEImages] = useState(['', '', '', '']);
  const [check, setChecked] = React.useState(false); 
  const [list, setListed] = React.useState(false); 

  const handleApproveChange = (event) => {
    console.log(event.target.checked,"event.target.checked")
    setChecked(event.target.checked);  
  };

  const handleApproveList = (event) => {
    console.log(event.target.checked,"event.target.Listed")
    setListed(event.target.checked);  
  };

  const serviceUpdate = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      let uploadedImageUrl = [];
  
      // Only upload images if new images were selected
      if (files.length > 0) {
        uploadedImageUrl = await uploadimages();
      }
  
      console.log(editServiceId, "id coming in serviceUpdate");  // Log the serviceId being used
  
      if (!editServiceId) {
        console.error('No serviceId available');
        return;
      }
  
      // Use existing image URLs if no new images were uploaded
      const finalImageUrls = uploadedImageUrl.length > 0 ? uploadedImageUrl : eimages; // `eimages` holds existing images
  
      const raw = JSON.stringify({
        servicename: ename,
        isapprove: check,
        number: enumber,
        servicetype: etype,
        servicedescription: edescription,
        addressline1: eaddressLine1,
        addressline2: eaddressLine2,
        area: earea,
        city: ecity,
        pincode: epincode,
        state: estate,
        freelisting:list,
        websitelink: elink,
        addimages: finalImageUrls  
      });
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch(`/api/serviceupdate?id=${editServiceId}`, requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setEditdata(result);
          getServices();
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log("error", error);
    }
  };
  const userDelete = async (serviceId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
      
      const response = await fetch(`/api/delete_service?id=${serviceId}`, requestOptions);
      
      if (response.ok) {
        const result = await response.json();
        setDelete(result);
        console.log("Deleted data:", result);
        getServices(); 
      } else {
        console.error("Error deleting service", response.status);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState([]);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
const [area, setArea] = useState('');
const [city, setCity] = useState('');
const [pincode, setPincode] = useState('');
const [state, setState] = useState('');
  const [getData,setGetData] = useState('')
  const [images, setImages] = useState(['', '', '', '']);
  const [newcheck, setNewChecked] = React.useState(false); 
  const [newlist, setNewListed] = React.useState(false); 
  
  const handleApproveNew = (event) => {
    console.log(event.target.checked,"event.target.checked")
    setNewChecked(event.target.checked);  
  };

  const handleListNew = (event) => {
    console.log(event.target.checked,"event.target.Listed")
    setNewListed(event.target.checked);  
  };
  
  const handleService = async () => {
    try {
        
        const uploadedImageUrl = await uploadimages();

        // Prepare the request data
        const raw = JSON.stringify({
            "servicename": name,
            "number": number,
            "servicetype": type,
            "servicedescription": description,
            "addressline1": addressLine1,
  "addressline2": addressLine2,
  "area": area,
  "city": city,
  "pincode": pincode,
  "state": state,
            "websitelink": link,
            "addimages": uploadedImageUrl,
            "isapprove":newcheck,
            "freelisting":newlist 
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
            getServices();
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

  const handledClose = (event, reason) => {
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
        setEImages(newImages);
        
        // Save the file object in state for later uploading
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const handleEditImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const newEImages = [...eimages];
        newEImages[index] = URL.createObjectURL(file); // Show the image preview
        setEImages(newEImages); // Set edited images for preview
  
        const newFiles = [...files];
        newFiles[index] = file; // Save the file object for later upload
        setFiles(newFiles);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  

  const uploadimages = async () => {
    try {
      // Convert files to an array
      const filesArray = Array.from(files); 
  
      const uploadedImageUrls = await Promise.all(filesArray.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ae1kvvqp');
  
        const response = await fetch('https://api.cloudinary.com/v1_1/qikcall/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.secure_url) {
          console.log(data.secure_url, "data")
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

  const handleEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setEType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  
  const [create,setCreate]=useState('')
  const [editopen,setEditopen] = useState('')
  const [editServiceId,setEditServiceId] = useState('')

  const handleNewRegister =()=>{
    handleService()
    handleCreateClose()
  }

  const handleCreateOpen = async () => {
    setCreate(true)
  };

  const handleCreateClose = () => {
    setCreate(false); 
  };
  

  const handleMenuOpen = (event, serviceId) => {
    setAnchorEl(event.currentTarget);
    setSelectedServiceId(serviceId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = async () => {
    if (selectedServiceId) {
      await getServiceById(selectedServiceId);
      setDetailsOpen(true);
    }
  };

  const handleClose = () => {
    setDetailsOpen(false);
    setAnchorEl(null);
  };

  const handleDeleteOpen = async () => {
    if (selectedServiceId) {
      await getServiceById(selectedServiceId);
      setDeleteOPen(true);
    }
  };

  const handleDeleteClose = () => {
    setDeleteOPen(false);
  };

  const handleEditOpen =  () => {
    if (selectedServiceId) {
      getServiceById(selectedServiceId);
      console.log(selectedServiceId, "id coming in handleEditOpen");
      setEditopen(true);
      setEditServiceId(selectedServiceId);  // Ensure you are saving the serviceId somewhere
    }
  };
  
  const handleEditClose = () => {
    setEditopen(false);
  };

const handleEditUpdate =()=>{
  serviceUpdate();
  handleEditClose();
  handleMenuClose()
  }
  

  const handleDelete = () => {
    if (selectedServiceId) {
      userDelete(selectedServiceId); // Delete by selectedServiceId
      setDeleteOPen(false);
      handleMenuClose()
      
    }
  };

  const menuopen = Boolean(anchorEl);

  return (
    <>
    <Box mb={5} sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{ backgroundColor: "#2d2859", color: "#fff" }}  >
      <Toolbar variant="dense">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} container direction="row" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
              <CategoryIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Service List
            </Typography>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleCreateOpen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Services</Button>
          </Grid>
        </Grid>
        <Dialog
       
        open={create}
        onClose={handleCreateClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{width:"600px"}}>
        <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: '2rem', color: '#333366' }}
            >
              Service Profile
            </Typography>

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
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
            {/* <InputLabel id="demo-multiple-chip-number">Mobile Number</InputLabel> */}
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
              />
            </FormControl>

            <FormControl fullWidth margin="normal" >
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={type}
          onChange={handleChange}
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
      </FormControl>

      <FormControl fullWidth margin="normal">
            {/* <InputLabel id="demo-multiple-chip-number">Mobile Number</InputLabel> */}
              <TextField
              // labelId="demo-multiple-chip-number"
                id="service-description"
                variant="outlined"
                value={description}
                label="Service Description"
                onChange={(e) => setDescription(e.target.value)}
                
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366',
                    
                  },
                }}
              />
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
              />
              <TextField
                label="Area"
                variant="outlined"
                fullWidth
                value={area}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setArea(e.target.value)
                }}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setCity(e.target.value)
                }}
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
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                value={state}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setState(e.target.value)
                }}
              />

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

            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {/* First Row */}
              <Grid container item xs={12} spacing={2} justifyContent="space-evenly" alignItems="center">
                {images.slice(0, 2).map((image, index) => (
                  <Grid item xs={12} sm={5} md={4} key={index}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`file-input-${index}`}
                      type="file"
                      onChange={(event) => handleImageChange(index, event)}
                    />
                    <label htmlFor={`file-input-${index}`}>
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
              </Grid>
              <Grid  mt={4} container direction="row" justifyContent="flex-end" alignItems="center">
             <Typography>Approve</Typography>
             <Switch
                  checked={newcheck}
                  onChange={handleApproveNew}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
             </Grid>

             <Grid  mt={2} container direction="row" justifyContent="flex-end" alignItems="center">
             <Typography>Freelisting</Typography>
             <Switch
                  checked={newlist}
                  onChange={handleListNew}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
             </Grid>
              <Grid mt={5} container direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="contained" onClick={handleCreateClose} sx={{ borderRadius: 50, fontSize: "12px", backgroundColor: "#282866",marginLeft:"5px" }}>
              Close
            </Button>
         
          <Button
            variant="contained"
            onClick={()=>{
              if(!name){
                setOpen(true);
                setColor('error');
                setMsg('Name required');
                return
              }
              if(!number){
                setOpen(true);
                setColor('error');
                setMsg('Number required');
                return
              }
              if(number.length!==10){
                setOpen(true);
                setColor('error');
                setMsg('Phone Number must have 10 numbers');
                return
              }
              if(!type){
                setOpen(true);
                setColor('error');
                setMsg('Category required');
                return
              }
              if(!images){
                setOpen(true);
                setColor('error');
                setMsg('Images required');
                return
              }
              if(!addressLine1){
                setOpen(true);
                setColor('error');
                setMsg('Address Line 1 required');
                return
              }
              if(!addressLine2){
                setOpen(true);
                setColor('error');
                setMsg('Address Line 2 required');
                return
              }
              if(!area){
                setOpen(true);
                setColor('error');
                setMsg('Area required');
                return
              }
              if(!city){
                setOpen(true);
                setColor('error');
                setMsg('City required');
                return
              }
              if(!state){
                setOpen(true);
                setColor('error');
                setMsg('State required');
                return
              }
              if(!pincode){
                setOpen(true);
                setColor('error');
                setMsg('Pincode required');
                return
              }
              handleNewRegister()
            
            }}
            sx={{ borderRadius: 50, fontSize: "12px", backgroundColor: "#282866",marginRight:"5px" }}
          >
           Submit
          </Button>
         
          </Grid>
              
        </DialogContent>
      </Dialog>
      </Toolbar>
    </AppBar>
  </Box>
      <Grid mb={5} container spacing={2}>
        {Array.isArray(store) && store.length > 0 ? (
          store.map((item) => (
            <Grid item xs={12} md={6} key={item._id}>
              <Card  sx={{ padding: 1, position: 'relative',width:"100%",height:"100%" }}>
                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                  <Grid item xs={5}>
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: "200%" }}
                      image={item.addimages[0]} // Your image source here from item
                      alt={item.servicename} // Your alt text
                    />
                  </Grid>
                  <Grid item xs={6} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Typography sx={{ fontSize: "15px" }}><b>Store Name:</b> {item.servicename}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Phone Number:</b> {item.number}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Category:</b> {item.servicetype.join(', ')}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Address:</b> {item.addressline1}, {item.addressline2}, {item.city}, {item.pincode}</Typography>
                  </Grid>
                </Grid>
                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={(event) => handleMenuOpen(event, item._id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{ 'aria-labelledby': 'long-button' }}
                  anchorEl={anchorEl}
                  open={menuopen}
                  onClose={handleMenuClose}
                  slotProps={{ paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' } } }}
                >
                  <MenuItem onClick={handleClickOpen}>
                    <LibraryBooksIcon sx={{ fontSize: "15px", color: "green", marginRight: "5px" }} /> Show details
                  </MenuItem>
                  <MenuItem onClick={() => handleEditOpen(item._id)}>
                    <EditIcon sx={{ fontSize: "15px", color: "blue", marginRight: "5px" }} /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteOpen(item._id)}>
                    <DeleteIcon sx={{ fontSize: "15px", color: "red", marginRight: "5px" }} /> Delete
                  </MenuItem>
                </Menu>
                <Dialog
                  open={detailsOpen}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{"Store Details"}</DialogTitle>
                  <DialogContent sx={{ width: "500px" }}>
                  {selectedServiceDetails ? (
  <Grid container direction="column" alignItems="center" spacing={2}>
    <Grid mt={2} mb={2} container item direction="row" justifyContent="space-evenly" alignItems="center" >
      {/* Left Column */}
      <Grid item xs={6} container direction="column" alignItems="flex-start">
        <Typography sx={{ fontSize: "12px" }} align="left">
          <b>Name:</b> {selectedServiceDetails.servicename}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          <b>Websitelink:</b> {selectedServiceDetails.websitelink}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          <b>Address:</b> {selectedServiceDetails.addressline1}, {selectedServiceDetails.addressline2}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          <b>Area:</b> {selectedServiceDetails.area}
        </Typography>
      </Grid>

      {/* Right Column */}
      <Grid item xs={6} container direction="column" alignItems="flex-start">
      <Typography  sx={{ fontSize: "12px" }} align="left">
         <b> Phone:</b> {selectedServiceDetails.number}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          City: {selectedServiceDetails.city}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          Pincode: {selectedServiceDetails.pincode}
        </Typography>
        <Typography className='mt-2' sx={{ fontSize: "12px" }} align="left">
          Categories: {selectedServiceDetails.servicetype.join(', ')}
        </Typography>
      </Grid>
    </Grid>

    {/* Centered Image */}
    <Typography align='left' className='mt-2' sx={{ fontSize: "20px",fontWeight:"bold" }}>Gallery</Typography>
    <Grid item xs={8} >
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "auto" }}
        image={selectedServiceDetails.addimages[0]} // Image source here
        alt={selectedServiceDetails.servicename} // Alt text
      />
    </Grid>
  </Grid>
) : (
  <Typography variant="body2">Loading...</Typography>
)}

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
        open={deleteopen}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Services"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure, You want to delete this Service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-between"alignItems="center" >
          <Button  onClick={handleDeleteClose}>
           No
          </Button>
          <Button onClick={handleDelete} >
            Yes
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit Services"}
        </DialogTitle>
        <DialogContent>
        <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: '2rem', color: '#333366' }}
            >
              Service Profile
            </Typography>

            <FormControl fullWidth margin="normal">
              <TextField
                id="service-name"
                variant="outlined"
                value={ename}
                onChange={(e) => setEName(e.target.value)}
                label="Service Name"
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366'
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
            {/* <InputLabel id="demo-multiple-chip-number">Mobile Number</InputLabel> */}
              <TextField
              // labelId="demo-multiple-chip-number"
                id="service-number"
                variant="outlined"
                value={enumber}
                label="Mobile Number"
                onChange={(e) => setENumber(e.target.value)}
                
                InputProps={{
                  style: {
                    color: '#000',
                    borderColor: '#333366',
                    
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal" >
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={etype}
          onChange={handleEditChange}
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
      </FormControl>

      <FormControl fullWidth margin="normal">
  <TextField
    id="service-description"
    variant="outlined"
    value={edescription}
    label="Service Description"
    onChange={(e) => setEDescription(e.target.value)}
    InputLabelProps={{
      shrink: true,  // This will shrink the label
    }}
    InputProps={{
      style: {
        color: '#000',
        borderColor: '#333366',
      },
    }}
  />
</FormControl>
      <Typography  sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: 2,marginTop:2 }}>
                Address:
              </Typography>
              <TextField
                label="Door No"
                variant="outlined"
                value={eaddressLine1}
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setEAddressLine1(e.target.value)
                }}

              />
              <TextField
                label="Street/Colony"
                variant="outlined"
                fullWidth
                value={eaddressLine2}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setEAddressLine2(e.target.value)
                }}
              />
              <TextField
                label="Area"
                variant="outlined"
                fullWidth
                value={earea}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setEArea(e.target.value)
                }}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={ecity}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setECity(e.target.value)
                }}
              />
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                value={epincode}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setEPincode(e.target.value)
                }}
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                value={estate}
                sx={{ marginBottom: 2 }}
                onChange={(e)=>{
                  setEState(e.target.value)
                }}
              />

            <FormControl fullWidth margin="normal">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#333366' }}>*Optional</Typography>
              </Box>
              <TextField
                id="website-link"
                variant="outlined"
                value={elink}
                onChange={(e) => setELink(e.target.value)}
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

            <Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid container item xs={12} spacing={2} justifyContent="space-evenly" alignItems="center">
    {eimages.slice(0, 2).map((image, index) => (
      <Grid item xs={12} sm={5} md={4} key={index}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`edit-file-input-${index}`}
          type="file"
          onChange={(event) => handleEditImageChange(index, event)}
        />
        <label htmlFor={`edit-file-input-${index}`}>
          <IconButton component="span">
            <Card sx={{ width: '200px' }}>
              <CardMedia
                component="img"
                height="140"
                image={image || 'default-image-placeholder.jpg'} // Show existing or updated image
                alt={`Edit Image ${index + 1}`}
                sx={{ cursor: 'pointer', width: '100%' }}
              />
            </Card>
          </IconButton>
        </label>
      </Grid>
    ))}
  </Grid>
</Grid>
              
             <Grid  mt={4} container direction="row" justifyContent="flex-end" alignItems="center">
             <Typography>Approve</Typography>
             <Switch
                  checked={check}
                  onChange={handleApproveChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
             </Grid>

             <Grid  mt={2} container direction="row" justifyContent="flex-end" alignItems="center">
             <Typography>Freelisting</Typography>
             <Switch
                  checked={list}
                  onChange={handleApproveList}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
             </Grid>
              
              <Grid mt={5} container direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="contained" onClick={handleEditClose} sx={{ borderRadius: 50, fontSize: "12px", backgroundColor: "#282866",marginLeft:"5px" }}>
              Close
            </Button>
         
          <Button
            variant="contained"
            onClick={()=>{
              // if(!name){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!number){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(number.length!==10){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Phone Number have 10 number');
              //   return
              // }
              // if(!type){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!images){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!addressLine1){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!addressLine2){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!area){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!city){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!state){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              // if(!pincode){
              //   setOpen(true);
              //   setColor('error');
              //   setMsg('Address required');
              //   return
              // }
              handleEditUpdate()
            
            }}
            sx={{ borderRadius: 50, fontSize: "12px", backgroundColor: "#282866",marginRight:"5px" }}
          >
           Submit
          </Button>
         
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Grid container direction="row" justifyContent="space-between"alignItems="center" >
          <Button  onClick={handleEditClose}>
           No
          </Button>
          <Button onClick={handleDelete} s>
            Yes
          </Button>
          </Grid>
        </DialogActions> */}
      </Dialog>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No Stores available</Typography>
        )}
      </Grid>
    </>
  );
};

export default Collapses;