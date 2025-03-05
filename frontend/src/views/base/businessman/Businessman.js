import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, Typography, Grid, Paper, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Menu, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { tableCellClasses } from '@mui/material/TableCell';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, InputLabel, Select, OutlinedInput, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const Accordion = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDeleteOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    alterphonenumber: '',
    gstnumber: '',
    aadharnumber: '',
    pannumber: '',
    membership: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pincode: '',
    state: '',
   
  });
  const [cname,setCName]=useState('')
  const [cemail,setCEmail]=useState('')
  const [cphonenumber,setCPhonenumber]=useState('')
  const [calterphonenumber,setCAlternumber]=useState('')
  const [cselectedPlan,setCSelectedplan]=useState('')
  const [cpannumber,setCPannumber]=useState('')
  const [caddressLine1,setCAddressLine1]=useState('')
  const [caddressLine2,setCAddressLine2]=useState('')
  const [ccity,setCCity]=useState('')
  const [cpincode,setCPincode]=useState('')
  const [cstate,setCState]=useState('')
  const [caadhar,setCAadharnumber]=useState('')
  const [cgstNumber,setCGstnumber]=useState('')
  const [type,setType] = useState('')
  const [etype,setEType] = useState('')
  const [open,setOpen] = useState('');
  const[color,setColor] = useState('');
  const[password,setPasssword]=useState('')
  const [plan,getPlan]= useState('')

console.log(etype,"etype")

const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const[userid,setUserid] = useState('');
  const[fcmtoken,setFcmtoken] = useState('')
  const [messageopen, setMessageOPen] = useState(false);



  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpenUserId, setMenuOpenUserId] = useState(null);

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
    fetchUserData();
    getMembership();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/userdetails');
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`/api/useradmin?id=${userId}`);
      const result = await response.json();
      setUser(result.data);
      
      // Set form data and 'isapprove' switch state
      setFormData({
        name: result.data.username || '',
        email: result.data.email || '',
        phonenumber: result.data.phonenumber || '',
        alterphonenumber: result.data.alterphonenumber || '',
        gstnumber: result.data.gstnumber || '',
        aadharnumber: result.data.aadharnumber || '',
        pannumber: result.data.pannumber || '',
        addressLine1: result.data.addressline1 || '',
        addressLine2: result.data.addressline2 || '',
        city: result.data.city || '',
        pincode: result.data.pincode || '',
        state: result.data.state || '',
      });
  
      // Set the 'isapprove' checkbox state from fetched data
      setChecked(result.data.isapprove || false);
      setEType(result.data.membership,)
      setFcmtoken(result.data.fcmToken)
  
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
  };
  

  const updateUser = async (userId) => {
    try {
      const response = await fetch(`/api/user_update?id=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isapprove: checked,
          membership: etype
        }),
      });
      const result = await response.json();
      console.log(result,"wear")
      setMsg(result.message || 'Update successful');
      setMsgOpen(true);
      setColor('success')
      setEditDialogOpen(false);
      handleMenuClose()
      fetchUserData(); // Refresh the user data after the update
    } catch (error) {
      console.error('Error updating user:', error);
      setMsg('Error updating user');
      setMsgOpen(true);
    }
  };
  

  const userDelete = async (userId) => {
    try {
      const response = await fetch(`/api/userdelete?id=${userId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      setMsg(result.message || 'Delete successful');
      setMsgOpen(true);
      setColor('success')
      setDeleteDialogOpen(false);
      fetchUserData();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMsg('Error deleting user');
      setColor('error')
      setMsgOpen(true);
    }
  };

  const handleBusiness = async () => {
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // const uploaddocs = await uploadDocs();

     
      
      const raw = JSON.stringify({
        "username": cname,
  "email": cemail,
  "phonenumber": cphonenumber,
  "password": password,
  "role": "businessman",
  "alterphonenumber": calterphonenumber,
  "membership": type,
  "pannumber": cpannumber,
  "addressline1": caddressLine1,
  "addressline2":caddressLine2,
  "isapprove":approve,
  // "landmark": clandmark,
  "city": ccity,
  "pincode": cpincode,
  "state": cstate,
  "aadharnumber": caadhar,
  "gstnumber": cgstNumber,
  // "upload": uploaddocs
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

            // const token = result.data.token;
            // Cookies.set('token', token, { expires: 7, secure: true });

            fetchUserData()
            setMsgOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");
            // setTimeout(() => {
            //   navigate('/');
            // }, "1000");
           
            

        } else if (result.status_code === 400) {
          setMsgOpen(true);
            setColor('error');
            setMsg(result.data.msg);

        } else if (result.status_code === 401) {
          setMsgOpen(true);
            setColor('error');
            setMsg("Unauthorized access");
        }
    })
    .catch((error) => {
        console.error(error);
        setMsgOpen(true);
        setColor('error');
        setMsg(error.response?.data?.message || 'An Error Occurred');
    });
    }catch(error){
      console.error(error);
      setMsgOpen(true);
      setColor('error');
      setMsg(error.response?.data?.message || 'An Error Occurred');
    }
   }

   console.log(plan,"plan data")

   const getMembership =()=>{
    try{
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("/api/plandetail", requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
        } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
    })
    .then((result) => {
      getPlan(result.data.data)
            console.log(result.data.data,"plan comming")                  
    })
    .catch((error) => {
        console.error(error);
        setMsgOpen(true);
        setColor('error');
        setMsg(error.response?.data?.message || 'An Error Occurred');
    });
    }catch(error){
      console.error(error);
      setMsgOpen(true);
      setColor('error');
      setMsg(error.response?.data?.message || 'An Error Occurred');
    }
   }

   const  SendMessage =()=>{
    try{
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "token":fcmtoken,
  "title": tittle,
  "body": description,
  "userId": userid
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/notifications/send", requestOptions)
.then(async (response) => {
  if (response.status === 200 || response.status === 400) {
      return { status_code: response.status, data: await response.json() };
  } else {
      return { status_code: response.status, data: { msg: 'Unexpected Error' } };
  }
})
.then((result) => {
  if (result.status_code === 200) {
      console.log(result.data, "Token stored")

      setMsgOpen(true);
      setColor('success');
      
      setMsg("Message Sended");
      
  } else if (result.status_code === 400) {
    setMsgOpen(true);
      setColor('error');
      setMsg("Permisson not granted");
  } 
})
.catch((error) => {
  console.error(error);
  setMsgOpen(true);
  setColor('error');
  setMsg(error.response?.data?.message );
});

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

  const [checked, setChecked] = React.useState('');
  const [approve, setApprove] = React.useState('');
  console.log(checked,"approve")

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setApprove(event.target.checked)
  };


  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuOpenUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpenUserId(null);
  };

  const handleEditClick = (userId) => {
    setEditDialogOpen(true);
    fetchUserById(userId);
  };

  const handleDeleteOpen = (userId) => {
    setDeleteDialogOpen(true);
    fetchUserById(userId);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleMessageOpen = (userId) => {
    setMessageOPen(true); // Ensure this state controls the delete modal/dialog
    fetchUserById(userId); // Get user data if needed for confirmation
  };

  const handleMessageClose = () => {
    setMessageOPen(false);
  };

  const handleDelete = () => {
    if (user) {
      userDelete(user._id);
      handleDeleteClose()
    }
  };

  const handleMessage = () => {
    SendMessage()
    handleMessageClose()
    handleMenuClose()
  };

  const handleRegister=()=>{
    handleBusiness()
    handleCreateClose()

  }

  const theme = useTheme();

  const handleMembership = (event) => {
    const {
      target: { value },
    } = event;
    setEType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
     <Box mb={5} sx={{ flexGrow: 1 }}>
    <AppBar style={{backgroundColor:"#2d2859",color:"#fff"}}  position="static">
      <Toolbar  variant="dense">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} container direction="row" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
              <CategoryIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Businessman List
            </Typography>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleCreateOpen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Businessman</Button>
          </Grid>
        </Grid>
        <Dialog open={create} onClose={handleCreateClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Create Businessman"}</DialogTitle>
                <DialogContent>
                  <Grid mt={2} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={cname}
                        onChange={(e) => setCName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPasssword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={cemail}
                        onChange={(e) => setCEmail(e.target.value)}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" >
        <InputLabel id="demo-multiple-chip-label">Membership</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={type}
          onChange={handleMembership}
          input={<OutlinedInput id="select-multiple-chip" label="Membership" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Array.isArray(plan)&& plan.map((member) => (
            <MenuItem
              key={member._id}
              value={member.planname}
              style={getStyles( cname,type, theme)}
            >
              {member.planname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                    </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Membership"
                        variant="outlined"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        value={cphonenumber}
                        onChange={(e) => setCPhonenumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Alter Phone Number"
                        variant="outlined"
                        value={calterphonenumber}
                        onChange={(e) => setCAlternumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Aadhar Number"
                        variant="outlined"
                        value={caadhar}
                        onChange={(e) => setCAadharnumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="GST Number"
                        variant="outlined"
                        value={cgstNumber}
                        onChange={(e) => setCGstnumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="PAN Number"
                        variant="outlined"
                        value={cpannumber}
                        onChange={(e) => setCPannumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        variant="outlined"
                        value={caddressLine1}
                        onChange={(e) => setCAddressLine1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        variant="outlined"
                        value={caddressLine2}
                        onChange={(e) => setCAddressLine2(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        value={ccity}
                        onChange={(e) => setCCity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Pincode"
                        variant="outlined"
                        value={cpincode}
                        onChange={(e) => setCPincode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="State"
                        variant="outlined"
                        value={cstate}
                        onChange={(e) => setCState(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid mt={1} item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={approve}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Approve status' }}
            />
          }
          label="Approve User"
        />
      </Grid>
                  <Grid mt={2} container direction="row" justifyContent="space-between" alignItems="center" sx={{padding:2}}  >
                  <Button variant='contained' sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}  onClick={handleCreateClose}>
                    Cancel
                  </Button>
                  <Button variant='contained' sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={()=>{
                  if(!cname){
                    setMsgOpen(true);
                    setColor('error');
                    setMsg( "Name Required");
                    return; 
                  }
                  if(!password){
                    setMsgOpen(true);
                    setColor('error');
                    setMsg( "Password Required");
                    return; 
                  }if (password.length !== 8) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Password must be 8 Digit');
                    return;
                  }
                  if(!cemail){
                    setMsgOpen(true);
                    setColor('error');
                    setMsg( "Email Required");
                    return; 
                  }
                  if (!cphonenumber) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Phone Number required');
                    return;
                  }
                  if (cphonenumber.length !== 10) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Phone Number must be 10 digits');
                    return;
                  }
                  if (!calterphonenumber) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Alternate Phone Number required');
                    return;
                  }
                  if (calterphonenumber.length !== 10) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Alternate Phone Number must be 10 digits');
                    return;
                  }
                  if (!cgstNumber) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('GST Number required');
                    return;
                  }
                  if (cgstNumber.length !== 12) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('GST Number must be 12 digits');
                    return;
                  }
                  if (!cpannumber) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('PAN Number required');
                    return;
                  }
                  if (cpannumber.length !== 10) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('PAN Number must be 10 digits');
                    return;
                  }
                  if (!caddressLine1) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Address Line 1 required');
                    return;
                  }
                  if (!caddressLine2) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Address Line 2 required');
                    return;
                  }
                  if (!ccity) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('City required');
                    return;
                  }
                  if (!cstate) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('State required');
                    return;
                  }
                  if (!cpincode) {
                    setMsgOpen(true);
                    setColor('error');
                    setMsg('Pincode required');
                    return;
                  }

                    handleRegister()
                  }}>Save</Button>
                  </Grid>
                </DialogContent>
                
              </Dialog>
      </Toolbar>
    </AppBar>
  </Box>
      <TableContainer sx={{marginBottom:"20px"}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Mail</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Membership</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => item.role === 'businessman' && (
                <StyledTableRow key={index}>
                  <StyledTableCell>{item.username}</StyledTableCell>
                  <StyledTableCell align="center">{item.phonenumber}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.city}</StyledTableCell>
                  <StyledTableCell align="center">{item.membership}</StyledTableCell>
                 
                  <StyledTableCell align="center">
                    <IconButton onClick={() => { setDialogOpen(true); fetchUserById(item._id); }}>
                      <InfoIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, item._id)}>
                      <EditIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuOpenUserId === item._id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEditClick(item._id)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDeleteOpen(item._id)}>Delete</MenuItem>
                      <MenuItem onClick={() => handleMessageOpen(item._id)}>Message</MenuItem>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Typography>No data available</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} TransitionComponent={Transition}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          {user && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Name: {user.username}</Typography>
                <Typography>Phone: {user.phonenumber}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Address: {user.addressline1}, {user.addressline2}</Typography>
                <Typography>City: {user.city}</Typography>
                <Typography>Pincode: {user.pincode}</Typography>
                <Typography>Aadhar Number: {user.aadharnumber}</Typography>
                <Typography>Pan Number: {user.pannumber}</Typography>
                <Typography>Membership: {user.membership}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
     
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} TransitionComponent={Transition}>
  <DialogTitle>Manage User Profile</DialogTitle>
  <DialogContent>
    <Grid container>
      {Object.keys(formData).map(key => (
        <Grid item xs={12} key={key}>
          <TextField
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            fullWidth
            margin="normal"
            name={key}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
      <TextField
            label="Membership"
            fullWidth
            margin="normal"
            
            value={type}
            onChange={(e) => setEType( e.target.value )}
          />
                    </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Approve status' }}
            />
          }
          label="Approve User"
        />
      </Grid>
      <Grid mt={2} sx={{padding:1}} container direction="row" justifyContent="space-between" alignItems="center" >
      <Button  sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}} onClick={() => setEditDialogOpen(false)}>Cancel</Button>
    <Button  sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={() => { updateUser(user._id); }}>Save</Button>
      </Grid>
    </Grid>
  </DialogContent>
</Dialog>

      <Dialog open={editDeleteOpen} onClose={handleDeleteClose} TransitionComponent={Transition}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" >
          <Button sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}} onClick={handleDeleteClose}> Cancel</Button>
          <Button sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={handleDelete}>Delete</Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={messageopen}
        onClose={handleMessageClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{width:"400px"}}>
          
            <Typography className='mb-4' sx={{fontSize:"16px",width:"100%"}}>Send Message</Typography>
           <Grid xs={12} container direction="column" justifyContent="center" alignItems="center" >
            <TextField
            label='Tittle'
            className='mb-4'
            onChange={(e)=>setTittle(e.target.value)}
            />

            <TextField
            label='Message'
            className='mb-2'
            onChange={(e)=>setDescription(e.target.value)}
            />
           </Grid>
           <Grid mt={5} container direction="row" justifyContent="space-between"alignItems="center" >
          <Button variant='contained' sx={{ fontSize:"10px", backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}  onClick={handleMessageClose}>
           Cancel
          </Button>
          <Button variant='contained' sx={{ fontSize:"10px", backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={handleMessage} s>
            Send
          </Button>
          </Grid>
          
        </DialogContent>
        
      </Dialog>

      <Snackbar open={msgOpen} autoHideDuration={2000} onClose={() => setMsgOpen(false)}>
        <Alert onClose={() => setMsgOpen(false)} severity={color} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Accordion;
