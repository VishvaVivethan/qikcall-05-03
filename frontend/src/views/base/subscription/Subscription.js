import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CPopover, CRow, CCol, CFormTextarea } from '@coreui/react'
import { DocsExample } from '../../../components'
import { Typography,Grid,Button,TextField, TextareaAutosize } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const Popovers = () => {

  const [plan,getPlan] = useState('')
  const [subscribe,getSubscribe] = useState('')
  const [name,setName] = useState('')
  const [amount,setAmount] = useState('')
  const [features,setFeatures] = useState('')
  const [create,setCreate] = useState('')

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


  const handleCreateOPen = () => {
    setCreate(true);
  };

  const handleCreateClose = () => {
    setCreate(false);
  };

  const handleRegister=()=>{
    subscribeRegister()
    handleCreateClose()
  }



  useEffect(()=>{
    getMembership()
  },[])
 
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
        
    });
    }catch(error){
      console.error(error);
      
    }
   }

   const subscribeRegister =()=>{
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "planname": name,
        "amount": amount,
        "features": features
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch("/api/plan", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
              return { status_code: response.status, data: await response.json() };
          } else {
              return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
      })
      .then((result) => {
        getSubscribe(result.data.data)
              console.log(result.data.data,"plan comming")
              getMembership()                  
      })
      .catch((error) => {
          console.error(error);
          
      });
      }catch(error){
      console.error(error)
    }
  }


  return (
<>
    <Box mb={5} sx={{ flexGrow: 1}}>
    <AppBar sx={{backgroundColor:"#2d2859",color:"#fff"}}   position="static">
      <Toolbar  variant="dense">
        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
          <Grid item xs={6} container direction="row" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
              <CategoryIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
             Subscription List
            </Typography>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleCreateOPen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Subscription</Button>
          </Grid>
        </Grid>
        <Dialog
          open={create}
          onClose={handleCreateClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create Subscription Plan"}
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
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CFormTextarea
                  label="Features"
                  variant="outlined"
                  fullWidth
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid  container direction="row" justifyContent="space-between" alignItems="center" sx={{padding:2}}  >
            <Button sx={{ backgroundColor: '#FC4343', color: '#fff','&:hover': {backgroundColor: '#FC4343' }}}  onClick={handleCreateClose}>Cancel</Button>
            <Button sx={{ backgroundColor: 'green', color: '#fff','&:hover': {backgroundColor: 'green' }}}  onClick={handleRegister}>Save</Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  </Box>

    <CRow>
      <CCol xs={12}>
      {Array.isArray(plan)&&plan.map((subscribe,index)=>(
        <CCard className="mb-4" key={index}>
            <CCardHeader >
            <Grid sx={{padding:1}} container direction="row" justifyContent="space-between" alignItems="center"   >
            <Typography sx={{fontSize:"15px",fontWeight:"bold"}} >Subscription:{subscribe.planname}</Typography> <Typography sx={{fontSize:"15px",fontWeight:"bold"}} >Amount:{subscribe.amount}</Typography>
            </Grid>
          </CCardHeader>
          <CCardBody>
          <Grid  container direction="column" justifyContent="space-between" alignItems="flex-start"   >
            <Typography sx={{fontSize:"15px",fontWeight:"bold"}} >Features:</Typography> 
            <Typography className='mt-2' >{subscribe.features}</Typography>
            </Grid>
          </CCardBody>
        </CCard>
         ))}
      </CCol>
    </CRow>
    </>
  )
}

export default Popovers
