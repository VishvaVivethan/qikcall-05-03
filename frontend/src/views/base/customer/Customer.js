import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {Table,Typography,Grid,Card,CardMedia,Alert,Snackbar,TextField,Container,TablePagination }from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AppHeader } from '../../../components' 
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

const Accordion = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const[password,setPasssword]=useState('')
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [cname, setCName] = useState('');
  const[cpassword,setCPasssword]=useState('')
  const [cemail, setCEmail] = useState('');
  const [cphonenumber, setCPhonenumber] = useState('');
  const [caddressLine1, setCAddressLine1] = useState('');
  const [caddressLine2, setCAddressLine2] = useState('');
  const [ccity, setCCity] = useState('');
  const [cpincode, setCPincode] = useState('');
  const [cstate, setCState] = useState('');
  const [msgOpen, setMsgOpen] = useState(false);
  const [color, setColor] = useState('');
  const [msg, setMsg] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [deletedata, setDelete] = useState('');
  const [deleteopen, setDeleteOPen] = useState(false);
  const [messageopen, setMessageOPen] = useState(false);
  const [menuOpenUserId, setMenuOpenUserId] = useState(null);
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const[userid,setUserid] = useState('');
  const[fcmtoken,setFcmtoken] = useState('')


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
    getUserData();
  }, []);

  const handleRegister = () => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": cname,
            "email": cemail,
            "password": cpassword,
            "phonenumber": cphonenumber,
            "addressline1": caddressLine1,
"addressline2": caddressLine2,
"city": ccity,
"pincode": cpincode,
"state": cstate,
            "role":"customer"
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
                    console.log(result.data.token, "Token stored");

                    // const token = result.data.token;
                    // Cookies.set('token', token, { expires: 7, secure: true });

                    setOpen(true);
                    setColor('success');
                    setMsg(result.data.msg || "Register Success");
                   
                    // setTimeout(() => {
                    //   navigate('/');
                    // }, "1000");

                } else if (result.status_code === 400) {
                    setOpen(true);
                    setColor('error');
                    setMsg(result.data.msg);

                } else if (result.status_code === 401) {
                    // Handle unauthorized access
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

    } catch (error) {
        console.error(error);
        setOpen(true);
        setColor('error');
        setMsg(error.message || 'An Error Occurred');
    }
};

  const getUserData = async () => {
    try {
      const response = await fetch('/api/userdetails');
      const result = await response.json();
      if (response.status === 200 || response.status === 400) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getDataById = async (userId) => {
    try {
      const response = await fetch(`/api/useradmin?id=${userId}`);
      const result = await response.json();
      if (response.status === 200 || response.status === 400) {
        setUser(result.data);
        setName(result.data.username || '');
        setEmail(result.data.email || '');
        setPhonenumber(result.data.phonenumber || '');
        setAddressLine1(result.data.addressline1 || '');
        setAddressLine2(result.data.addressline2 || '');
        setCity(result.data.city || '');
        setPincode(result.data.pincode || '');
        setState(result.data.state || '');
        setUserid(result.data._id)
        setFcmtoken(result.data.fcmToken)
        console.log(result.data,"databyid")
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
  };

  const EditUser = async (userId) => {
    try {
      const response = await fetch(`/api/user_update?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name || user.username,
          email: email || user.email,
          phonenumber: phonenumber || user.phonenumber,
          city: city || user.city,
          state: state || user.state,
          pincode: pincode || user.pincode,
          addressline1: addressLine1 || user.addressline1,
          addressline2: addressLine2 || user.addressline2,
        }),
      });
  
      const result = await response.json();
      if (response.status === 200) {
        setMsg('User updated successfully');
        setColor('success');
        console.log(result.data,"edit data")
      } else {
        setMsg('Update failed');
        setColor('error');
      }
      setMsgOpen(true);
      getUserData(); // Refresh data after update
    } catch (error) {
      console.error('Error updating user:', error);
      setMsg('Update failed');
      setColor('error');
      setMsgOpen(true);
    }
  };
  
  // User Delete Function
  const userDelete = async (userId) => {
    try {
      const response = await fetch(`/api/userdelete?id=${userId}`, {
        method: "DELETE",
        redirect: "follow",
      });
  
      if (response.status === 200 || response.status === 400) {
        const result = await response.json();
        setDelete(result, "deleted data");
        getUserData(); // Refresh user data after deletion
      } else {
        console.error('Unexpected Error:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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

  const handleClickOpen = (userId) => {
    setOpen(true);
    getDataById(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const handleEditOpen = (userId) => {
  setEdit(true);
  getDataById(userId); 
  console.log(userId,"id")
};


  const handleEditClose = () => {
    setEdit(false);
  };

  const handleDeleteOpen = (userId) => {
    setDeleteOPen(true); // Ensure this state controls the delete modal/dialog
    getDataById(userId); // Get user data if needed for confirmation
  };

  const handleDeleteClose = () => {
    setDeleteOPen(false);
  };

  const handleMessageOpen = (userId) => {
    setMessageOPen(true); // Ensure this state controls the delete modal/dialog
    getDataById(userId); // Get user data if needed for confirmation
  };

  const handleMessageClose = () => {
    setMessageOPen(false);
  };

  const handleDelete = () => {
    userDelete(user._id);
    setDeleteOPen(false);
    handleMenuClose()
  };

  const handleMessage = () => {
    SendMessage()
    handleMessageClose()
    handleMenuClose()
  };

  const [create,setCreate] = useState('')

  const handleCreateOPen = () => {
    setCreate(true);
  };

  const handleCreateClose = () => {
    setCreate(false);
  };

  const handleSubmit = () => {
    EditUser(user._id);
    setEdit(false);
    handleMenuClose()
  };

  const handleSnackClose = () => {
    setMsgOpen(false);
  };

  const handleMenuOpen = (event,userId) => {
    setAnchorEl(event.currentTarget);
    setMenuOpenUserId(userId)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpenUserId(null)
  };

  const [pincodedata, setPincodedata] = useState([]);
  // const [text, setText] = useState('');

  console.log(pincodedata,pincode, "Pincode")

  const pincodeDetails = () => {
    if (!cpincode) return; // Ensure pincode is not empty

    fetch(`https://api.postalpincode.in/pincode/${cpincode}`)
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
    if (cpincode.length === 6) {
      pincodeDetails();
    }
  }, [cpincode]);

  useEffect(() => {
    if (pincodedata.length > 0) {
      // Assuming the first result is what we need
      const postOffice = pincodedata[0];
      setCCity(postOffice.District || '');
      setCState(postOffice.State || '');
    }
  }, [pincodedata]);


  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
  
   
   
      if (!cname) newErrors.cname = "Name is required";
      if (!cemail) {
        newErrors.cemail = "Email is required";
      } else if (!validateEmail(cemail)) {
        newErrors.cemail = "Invalid email address";
      }
      if (!cpassword) {
        newErrors.cpassword = "Password is required";
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
        if (!passwordRegex.test(cpassword)) {
          newErrors.cpassword = "Password must be 8-16 characters, contain uppercase, lowercase, number, and special character.";
        }
      }
      if (!cphonenumber) {
        newErrors.cphonenumber = "Phonenumber is required";
      } else if(!cphonenumber.length===10) {
          newErrors.cphonenumber = "Phone number must be 10 Digits";
      }
      
     
      if (!caddressLine1) newErrors.caddressLine1 = "Door No is required";
      if (!caddressLine2) newErrors.caddressLine2 = "Street/Area  is required";
      
      if (!ccity) newErrors.ccity = "City is required";
      if (!cstate) newErrors.cstate = "State is required";
      if (!cpincode) newErrors.cpincode = "Pincode is required";
   
  
   
  
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      handleRegister();
    }
  };
  

  // const handleDelete = async (userId) => {
  //   try {
  //     await fetch(`/api/user_delete?id=${userId}`, { method: 'DELETE' });
  //     getUserData(); 
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

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
              Customer List
            </Typography>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleCreateOPen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Customer</Button>
          </Grid>
        </Grid>
        <Dialog
          open={create}
          onClose={handleCreateClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create User"}
          </DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <Grid mt={2} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={cname}
                  onChange={(e) => setCName(e.target.value)}
                  error={!!errors.cname}
                  helperText={errors.cname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={cpassword}
                  onChange={(e) => setCPasssword(e.target.value)}
                  error={!!errors.cpassword}
                  helperText={errors.cpassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={cemail}
                  onChange={(e) => setCEmail(e.target.value)}
                  error={!!errors.cemail}
                  helperText={errors.cemail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={cphonenumber}
                  onChange={(e) => setCPhonenumber(e.target.value)}
                  error={!!errors.cphonenumber}
                  helperText={errors.cphonenumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 1"
                  variant="outlined"
                  fullWidth
                  value={caddressLine1}
                  onChange={(e) => setCAddressLine1(e.target.value)}
                  error={!!errors.caddressLine1}
                  helperText={errors.caddressLine1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  variant="outlined"
                  fullWidth
                  value={caddressLine2}
                  onChange={(e) => setCAddressLine2(e.target.value)}
                  error={!!errors.caddressLine2}
                  helperText={errors.caddressLine2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={cpincode}
                  onChange={(e) => setCPincode(e.target.value)}
                  error={!!errors.cpincode}
                  helperText={errors.cpincode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={ccity}
                  onChange={(e) => setCCity(e.target.value)}
                  error={!!errors.ccity}
                  helperText={errors.ccity}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={cstate}
                  onChange={(e) => setCState(e.target.value)}
                  error={!!errors.cstate}
                  helperText={errors.cstate}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Mail</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                item.role === "customer" && (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.phonenumber}</StyledTableCell>
                    <StyledTableCell align="center">{item.email}</StyledTableCell>
                    <StyledTableCell align="center">{item.city}</StyledTableCell>
                    <StyledTableCell align="center">
                      <InfoIcon onClick={() => handleClickOpen(item._id)} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, item._id)}>
  <EditIcon />
</IconButton>
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl) && menuOpenUserId === item._id}
  onClose={handleMenuClose}
  MenuListProps={{
    'aria-labelledby': 'basic-button',
  }}
>
  <MenuItem onClick={() => handleEditOpen(item._id)}>Edit</MenuItem>
  <MenuItem onClick={() => handleDeleteOpen(item._id)}>Delete</MenuItem>
  <MenuItem onClick={() => handleMessageOpen(item._id)}>Message</MenuItem>
</Menu>

        </StyledTableCell>
                  </StyledTableRow>
                )
              ))
            ) : (
              <Typography variant="h6" align="center">
                No results found for customers.
              </Typography>
            )}
          </TableBody>
          {/* <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}

        </Table>

        {/* Details Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"User Details"}
          </DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: "15px" }}>Name:</Typography>
                <Typography sx={{ fontSize: "15px" }}>Phone:</Typography>
                <Typography sx={{ fontSize: "15px" }}>Email:</Typography>
                <Typography sx={{ fontSize: "15px" }}>Address:</Typography>
                <Typography sx={{ fontSize: "15px" }}>City:</Typography>
                <Typography sx={{ fontSize: "15px" }}>Pincode:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: "15px" }}>{user.username}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{user.phonenumber}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{user.email}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{user.addressline1}, {user.addressline2}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{user.city}, {user.state}, {user.pincode}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{user.pincode}</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={edit}
          onClose={handleEditClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Edit User"}
          </DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <Grid mt={2} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 1"
                  variant="outlined"
                  fullWidth
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  variant="outlined"
                  fullWidth
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={deleteopen}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Freelancer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure, You want to delete this User
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-between"alignItems="center" >
          <Button variant='contained' sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}  onClick={handleDeleteClose}>
           No
          </Button>
          <Button variant='contained' sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={handleDelete} s>
            Yes
          </Button>
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
        
        <Snackbar open={msgOpen} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity={color}>
            {msg}
          </Alert>
        </Snackbar>
      </TableContainer>

    </>
  );
};

export default Accordion;