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
        setStore(result.data);
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
      if (files.length > 0) {
        uploadedImageUrl = await uploadimages();
      }
      console.log(editServiceId, "id coming in serviceUpdate");
      if (!editServiceId) {
        console.error('No serviceId available');
        return;
      }
      const finalImageUrls = uploadedImageUrl.length > 0 ? uploadedImageUrl : eimages;
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
        const response = await fetch("/api/service", requestOptions);
        const result = {
            status_code: response.status,
            data: await response.json()
        };
        console.log(result.data,"++++++++++")
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
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
        setEImages(newImages);
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
        newEImages[index] = URL.createObjectURL(file); 
        setEImages(newEImages);
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
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setEType(
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
       setDetailsOpen(true);
      await getServiceById(selectedServiceId); 
    }
  };
  const handleClose = () => {
    setDetailsOpen(false);
    setAnchorEl(null);
  };
  const handleDeleteOpen = async () => {
    if (selectedServiceId) {
      setDeleteOPen(true);
      await getServiceById(selectedServiceId); 
    }
  };
  const handleDeleteClose = () => {
    setDeleteOPen(false);
  };
  const handleEditOpen = () => {
    if (selectedServiceId) {
      setEditopen(true);  
      setEditServiceId(selectedServiceId);  
      console.log(selectedServiceId, "id coming in handleEditOpen");
      getServiceById(selectedServiceId);
    }
  };
  useEffect(() => {
    if (selectedServiceId) {
      getServiceById(selectedServiceId);
    }
  }, [selectedServiceId]);
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
      setDeleteOPen(false);
      userDelete(selectedServiceId);
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
              <TextField
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
              <TextField
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
                      image={item.addimages[0]}
                      alt={item.servicename}
                    />
                  </Grid>
                  <Grid item xs={6} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Typography sx={{ fontSize: "15px" }}><b>Store Name:</b> {item.servicename}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Phone Number:</b> {item.number}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Category:</b> {item.servicetype.join(', ')}</Typography>
                    <Typography sx={{ fontSize: "15px", marginTop: "8px" }}><b>Address:</b> {item.addressline1}, {item.addressline2}, {item.city}, {item.pincode}</Typography>
                  </Grid>
                </Grid>
                <IconButton sx={{ position: 'absolute', top: 8, right: 10 }} onClick={(event) => handleMenuOpen(event, item._id)}>
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
    <Typography align='left' className='mt-2' sx={{ fontSize: "20px",fontWeight:"bold" }}>Gallery</Typography>
    <Grid item xs={8} >
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "auto" }}
        image={selectedServiceDetails.addimages[0]}
        alt={selectedServiceDetails.servicename}
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
              <TextField
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
      shrink: true,
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
                image={image || 'default-image-placeholder.jpg'}
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
              handleEditUpdate()
            
            }}
            sx={{ borderRadius: 50, fontSize: "12px", backgroundColor: "#282866",marginRight:"5px" }}
          >
           Submit
          </Button>
          </Grid>
        </DialogContent>
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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const ServiceList = () => {
//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [editingServiceId, setEditingServiceId] = useState(null);
//   const [newService, setNewService] = useState({
//     servicename: '',
//     servicedescription: '',
//     servicetype: [],
//     categories: [],
//     addressline1: '',
//     addressline2: '',
//     city: '',
//     state: '',
//     pincode: '',
//     number: '',
//     logo: null,
//     addimages: []
//   });

//   useEffect(() => {
//     fetchServiceLists();
//     fetchCategories();
//   }, []);

//   const fetchServiceLists = async () => {
//     try {
//       const response = await axios.get('http://localhost:2525/api/servicelists');
//       if (response.data.status === 200) {
//         setServices(response.data.data);
//       } else {
//         setError('No services found.');
//       }
//     } catch (err) {
//       setError('Failed to fetch services.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:2525/api/categories');
//       if (response.status === 200) {
//         setCategories(response.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewService({ ...newService, [name]: value });
//   };

//   const handleCategoryChange = (e) => {
//     const options = Array.from(e.target.selectedOptions, option => option.value);
//     setNewService({ ...newService, categories: options });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === 'addimages') {
//       setNewService({ ...newService, addimages: Array.from(files) });
//     } else {
//       setNewService({ ...newService, [name]: files[0] });
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in newService) {
//       if (key === 'addimages') {
//         newService.addimages.forEach((file) => formData.append('addimages', file));
//       } else if (key === 'categories') {
//         newService.categories.forEach((category) => formData.append('categories', category));
//       } else {
//         formData.append(key, newService[key]);
//       }
//     }

//     try {
//       const url = editingServiceId
//         ? `http://localhost:2525/api/serviceupdate?id=${editingServiceId}`
//         : 'http://localhost:2525/api/service';

//       const method = editingServiceId ? 'put' : 'post';
//       const response = await axios[method](url, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200) {
//         fetchServiceLists();
//         setShowForm(false);
//         setEditingServiceId(null);
//       }
//     } catch (err) {
//       console.error('Failed to submit service:', err);
//     }
//   };

//   const openEditForm = (service) => {
//     setNewService({
//       ...service,
//       categories: service.categories || [],
//       addimages: [],
//       logo: null
//     });
//     setEditingServiceId(service._id);
//     setShowForm(true);
//   };

//   if (loading) return <p>Loading services...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Service List</h1>
//       <button onClick={() => { setShowForm(true); setEditingServiceId(null); }} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Add Service
//       </button>

//       {services.map(service => (
//   <div key={service._id} className="relative mt-2 p-4 border rounded">
//     <button 
//       onClick={() => openEditForm(service)} 
//       className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded">
//       Edit
//     </button>
//     <p><strong>Name:</strong> {service.servicename}</p>
//     <p><strong>Description:</strong> {service.servicedescription}</p>
//     <p><strong>Categories:</strong> {service.categories?.join(', ') || 'No Categories'}</p>
//     <p><strong>Phone:</strong> {service.number}</p>
//     <p><strong>Address:</strong> {`${service.addressline1 || ''}, ${service.addressline2 || ''}, ${service.city || ''}, ${service.state || ''}, ${service.pincode || ''}`}</p>
//   </div>
// ))}


//       {showForm && (
//         <form onSubmit={handleFormSubmit} className="mt-4 p-4 border rounded" encType="multipart/form-data">
//           <input name="servicename" placeholder="Service Name" value={newService.servicename} onChange={handleInputChange} required className="border p-2 mb-2 w-full" />
//           <textarea name="servicedescription" placeholder="Service Description" value={newService.servicedescription} onChange={handleInputChange} required className="border p-2 mb-2 w-full" />
          
//           <select multiple value={newService.categories} onChange={handleCategoryChange} className="border p-2 mb-2 w-full">
//             {categories.map(category => (
//               <option key={category._id} value={category._id}>{category.name}</option>
//             ))}
//           </select>

//           <input name="number" placeholder="Phone Number" value={newService.number} onChange={handleInputChange} required className="border p-2 mb-2 w-full" />
//           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="border p-2 mb-2 w-full" />
//           <input type="file" name="addimages" accept="image/*" multiple onChange={handleFileChange} className="border p-2 mb-2 w-full" />

//           <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editingServiceId ? 'Update' : 'Submit'}</button>
//           <button type="button" onClick={() => setShowForm(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ServiceList;
