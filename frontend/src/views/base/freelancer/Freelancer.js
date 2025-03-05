import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {Table,Typography,Grid,Card,CardMedia,Alert,Snackbar,TextField }from '@mui/material';
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
import Switch from '@mui/material/Switch';
import { FormControl, InputLabel, Select, OutlinedInput, Chip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
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


const Freelancer = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const[detailsopen,setDetailsOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const [deletedata, setDelete] = useState('');
  const [deleteopen, setDeleteOPen] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [aadharnumber, setAadharnumber] = useState('');
  const [pannumber, setPannumber] = useState('');
  const [membership, setMembership] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [cname, setCName] = useState('');
  const [cemail, setCEmail] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [calterphonenumber,setCAlternumber]=useState('')
  const [cphonenumber, setCPhonenumber] = useState('');
  const [caadharnumber, setCAadharnumber] = useState('');
  const [cpannumber, setCPannumber] = useState('');
  const [cmembership, setCMembership] = useState('');
  const [caddressLine1, setCAddressLine1] = useState('');
  const [caddressLine2, setCAddressLine2] = useState('');
  const [ccity, setCCity] = useState('');
  const [cpincode, setCPincode] = useState('');
  const [cstate, setCState] = useState('');
  const [editData, setEditData] = useState([]);
  const [msgOpen, setMsgOpen] = useState(false);
  const [color, setColor] = useState('');
  const [msg, setMsg] = useState('');
  const [type,setType] = useState('')
  const [etype,setEType] = useState('')
  const [plan,getPlan]= useState('')
  const theme = useTheme();
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const[userid,setUserid] = useState('');
  const[fcmtoken,setFcmtoken] = useState('')
  const [messageopen, setMessageOPen] = useState(false);

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


  // Fetch user data
  useEffect(() => {
    getUserData();
    getMembership();
  }, []);

  console.log(user,"user data")

  const getUserData = () => {
    fetch('/api/userdetails', { method: 'GET', redirect: 'follow' })
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setData(result.data.data);
      })
      .catch((error) => console.log('error', error));
  };

  // Fetch user data by ID
  const getDataById = (userId) => {
    fetch(`/api/useradmin?id=${userId}`, { method: 'GET', redirect: 'follow' })
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setUser(result.data.data);
        setName(result.data.data.username || '');
        setEmail(result.data.data.email || '');
        setPhonenumber(result.data.data.phonenumber || '');
        setAadharnumber(result.data.data.aadharnumber || '');
        setPannumber(result.data.data.pannumber || '');
        setMembership(result.data.data.membership || '');
        setAddressLine1(result.data.data.addressline1 || '');
        setAddressLine2(result.data.data.addressline2 || '');
        setCity(result.data.data.city || '');
        setPincode(result.data.data.pincode || '');
        setState(result.data.data.state || '');
        setChecked(result.data.data.isapprove);
        setFcmtoken(result.data.fcmToken)
      })
      .catch((error) => console.log('error', error));
  };


  // Edit user details
  const EditUser = async (userId) => {
    try{
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

console.log(checked,"checked")

const raw = JSON.stringify({
   username: name ,
      email: email ,
      phonenumber: phonenumber,
      city: city ,
      state: state ,
      pincode: pincode ,
      addressline1: addressLine1 ,
      addressline2: addressLine2 ,
      aadharnumber: aadharnumber ,
      pannumber: pannumber ,
      membership: etype,
      isapprove: checked  
});



const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`/api/user_update?id=${userId ? userId : undefined}`, requestOptions)
  .then(async (response) => {
                    if (response.status === 200 || response.status === 400) {
                        return { status_code: response.status, data: await response.json() };
                    } else {
                        return { status_code: response.status, data: { msg: 'Unexpected Error' } };
                    }
                })
                .then((result) => {
                    if (result.status_code === 200) {
                        setEditData([result.data]);
                        getUserData(userId)
                        setMsgOpen(true);
                        setColor('success');
                        setMsg(result.data.msg || "Register Success");
    
                    } else if (result.status_code === 400) {
                        setMsgOpen(true);
                        setColor('error');
                        setMsg(result.data.msg);
    
                    } else if (result.status_code === 401) {
                        // Handle unauthorized access
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
    }catch(error) {
      console.error(error);
      setMsgOpen(true);
      setColor('error');
      setMsg(error.response?.data?.message || 'An Error Occurred');
  };
  };

  const userDelete=(userId)=>{
    try{
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };
      
      fetch(`/api/userdelete?id=${userId}`, requestOptions)
      .then(async (response) => {
        if (response.status === 200 || response.status === 400) {
          return { status_code: response.status, data: await response.json() };
        } else {
          return { status_code: response.status, data: { msg: 'Unexpected Error' } };
        }
      })
      .then((result) => {
        setDelete(result,"deleted data");
        getUserData()
      })
      .catch((error) => console.log('error', error));
    }catch(error){

    }
  }

  const handlefreelancer = () => {
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "username": cname,
        "email": cemail,
        "phonenumber": cphonenumber,
        "password": cpassword,
        "alterphonenumber": calterphonenumber,
        "aadharnumber": caadharnumber,
        "pannumber": cpannumber,
        "membership":type,
        "addressline1": caddressLine1,
  "addressline2": caddressLine2,
  "city": ccity,
  "pincode": cpincode,
  "state": cstate,
  "isapprove":approve,
        "role":"freelancer"
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

            getUserData()
            setOpen(true);
            setColor('success');
            setMsg(result.data.msg || "Register Success");
           
            

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



   
   const [create,setCreate]=useState('')

   const handleCreateOpen = () => {
    setCreate(true);
    
  };

  const handleCreateClose = () => {
    setCreate(false);
  };


  // Open and close dialogs
  const handleClickOpen = (userId) => {
    setDetailsOpen(true);
    getDataById(userId);
  };

  const handleClose = () => {
    setDetailsOpen(false);
  };

  const handleEditOpen = (userId) => {
    setEdit(true);
    getDataById(userId);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const handleDeleteOpen = (userId) => {
    setDeleteOPen(true);
    getDataById(userId);
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

  const handleSubmit = () => {
    EditUser(user._id);
    setEdit(false);
    getUserData();
    handleMenuClose()
    
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

  

  const handleSnackClose = () => {
    setMsgOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [checked, setChecked] = React.useState(false); // Boolean for Switch
  const [approve, setApprove] = React.useState(false); // Boolean for Switch


  // Handle checkbox change
  const handleChange = (event) => {
    console.log(event.target.checked,"event.target.checked")
    setChecked(event.target.checked);  // Update the state when toggled
  };

  const handleApprove = (event) => {
    console.log(event.target.checked,"event.target.checked")
    setApprove(event.target.checked);  // Update the state when toggled
  };

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

  const [pincodedata, setPincodedata] = useState([]);
  // const [text, setText] = useState('');

  console.log(pincodedata,pincode, "Pincode")

  const pincodeDetails = () => {
    if (!cpincode) return;
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
      setCity(postOffice.District || '');
      setState(postOffice.State || '');
    }
  }, [pincodedata]);

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


   

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
        if (!calterphonenumber) {
          newErrors.calterphonenumber = "Alterphonenumber is required";
        } else if(!calterphonenumber.length===10) {
            newErrors.calterphonenumber = "Phone number must be 10 Digits";
        }
        if (!cpannumber) {
          newErrors.cpannumber = "Pan number is required";
        } else if(!cpannumber.length===10) {
            newErrors.cpannumber = "Pan number must be 10 Digits";
        }
        if (!caadharnumber) {
          newErrors.caadharnumber = "Aadhar number is required";
        } else if(!caadharnumber.length===12) {
            newErrors.caadharnumber = "Aadhar number must be 12 Digits";
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
        handlefreelancer()
    handleCreateClose()
      }
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
              Freelancer List
            </Typography>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleCreateOpen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Freelancer</Button>
          </Grid>
        </Grid>
        <Dialog open={create} onClose={handleCreateClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Create Freelancer"}</DialogTitle>
                <DialogContent>
                  <Grid mt={2} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={cname}
                        onChange={(e) => setCName(e.target.value)}
                        error={!!errors.cname}
                        helperText={errors.cname}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={cemail}
                        onChange={(e) => setCEmail(e.target.value)}
                        error={!!errors.cemail}
                        helperText={errors.cemail}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        error={!!errors.cpassword}
                        helperText={errors.cpassword}
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
                        error={!!errors.cphonenumber}
                        helperText={errors.cphonenumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Alter Phone Number"
                        variant="outlined"
                        value={calterphonenumber}
                        onChange={(e) => setCAlternumber(e.target.value)}
                        error={!!errors.calterphonenumber}
                        helperText={errors.calterphonenumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Aadhar Number"
                        variant="outlined"
                        value={caadharnumber}
                        onChange={(e) => setCAadharnumber(e.target.value)}
                        error={!!errors.caadharnumber}
                        helperText={errors.caadharnumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="PAN Number"
                        variant="outlined"
                        value={cpannumber}
                        onChange={(e) => setCPannumber(e.target.value)}
                        error={!!errors.cpannumber}
                        helperText={errors.cpannumber}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        variant="outlined"
                        value={caddressLine1}
                        onChange={(e) => setCAddressLine1(e.target.value)}
                        error={!!errors.caddressLine1}
                        helperText={errors.caddressLine1}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        variant="outlined"
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
              InputProps={{ readOnly: true }}
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
              InputProps={{ readOnly: true }}
              error={!!errors.cstate}
              helperText={errors.cstate}
            />
            </Grid>
                    <Grid mt={2} container direction="row" justifyContent="flex-end" alignItems="center" >
                      <Typography>Approve</Typography>
                    <Switch
  checked={approve}
  onChange={handleApprove}
  inputProps={{ 'aria-label': 'controlled' }}
/>
                    </Grid>
                    <Grid mt={2} sx={{padding:1}} container direction="row" justifyContent="space-between" alignItems="center" >
                  <Button autoFocus onClick={handleCreateClose} sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}  sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} >Save</Button>
                  </Grid>
                  </Grid>
                </DialogContent>
               
              </Dialog>
      </Toolbar>
    </AppBar>
  </Box>
     
            <TableContainer  component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>User Name</StyledTableCell>
                    <StyledTableCell align="center">Phone Number</StyledTableCell>
                    <StyledTableCell align="center">Mail</StyledTableCell>
                    <StyledTableCell align="center">Earnings</StyledTableCell>
                    <StyledTableCell align="center">Membership</StyledTableCell>
                    <StyledTableCell align="center">Details</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data.length > 0 ? (
  data
    .filter((item) => item.role === 'freelancer')
    .map((item, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {item.username}
        </StyledTableCell>
        <StyledTableCell align="center">{item.phonenumber}</StyledTableCell>
        <StyledTableCell align="center">{item.email}</StyledTableCell>
        <StyledTableCell align="center">{item.earning}</StyledTableCell>
        <StyledTableCell align="center">{item.membership}</StyledTableCell>
        <StyledTableCell align="center">
          <InfoIcon onClick={() => handleClickOpen(item._id)} />
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton onClick={handleMenuOpen}>
            <EditIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
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
    ))
) : (
  <Typography>No data available</Typography>
)}
                </TableBody>
              </Table>

              {/* User Details Dialog */}
              <Dialog open={detailsopen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"User Details"}</DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                      {/* Left Column */}
                      <Grid item xs={6} container direction="column" justifyContent="center" alignItems="center">
                        <Typography sx={{ fontSize: '15px' }} align="center">Name:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">Phone:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">Email:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">Address:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">City:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">State:</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">Pincode:</Typography>
                      </Grid>

                      {/* Right Column */}
                      <Grid item xs={6} container direction="column" justifyContent="center" alignItems="center">
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.username || ''}</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.phonenumber || ''}</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.email || ''}</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">
                          {user.addressline1 || ''} {user.addressline2 || ''}
                        </Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.city || ''}</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.state || ''}</Typography>
                        <Typography sx={{ fontSize: '15px' }} align="center">{user.pincode || ''}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Edit User Dialog */}
              <Dialog open={edit} onClose={handleEditClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Edit Freelancer"}</DialogTitle>
                <DialogContent>
                  <Grid mt={2} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" >
        <InputLabel id="demo-multiple-chip-label">Membership</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={etype}
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
              style={getStyles( cname,etype, theme)}
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
                        value={etype}
                        onChange={(e) => setEType(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Aadhar Number"
                        variant="outlined"
                        value={aadharnumber}
                        onChange={(e) => setAadharnumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="PAN Number"
                        variant="outlined"
                        value={pannumber}
                        onChange={(e) => setPannumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Membership"
                        variant="outlined"
                        value={membership}
                        onChange={(e) => setMembership(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        variant="outlined"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        variant="outlined"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Pincode"
                        variant="outlined"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="State"
                        variant="outlined"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Grid>
                    <Grid mt={2} container direction="row" justifyContent="flex-end" alignItems="center" >
                      <Typography>Approve</Typography>
                    <Switch
  checked={checked}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
                    </Grid>
                    <Grid mt={2} container direction="row" justifyContent="space-between" alignItems="center"  >
                    <Button autoFocus sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}} onClick={handleEditClose}>
                    Cancel
                  </Button>
                  <Button sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}} onClick={handleSubmit}>Save</Button>
                    </Grid>
                  </Grid>
                </DialogContent>
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

              {/* Snackbar for messages */}
              <Snackbar open={msgOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={color}>
                  {msg}
                </Alert>
              </Snackbar>
            </TableContainer>
         
        
    </>
  );
};

export default Freelancer;