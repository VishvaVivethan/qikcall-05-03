import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from '../../../components'
import { Grid,Card, Typography,Button,Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';

const Tables = () => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {

        Cookies.remove("token")
    
        navigate('/')
    
      };

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

  return (
    <>
   <Container>
   <Grid xs={10} container direction="row" justifyContent="space-evenly" alignItems="center" > 
        <Card sx={{width:"600px",padding:2}} >
            <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start">
              <Typography sx={{fontSize:"25px",fontWeight:"bold"}} >
                Admin Logout
              </Typography>
              <Grid item onClick={handleClickOpen}>
                  <Button align="center" variant="contained" sx={{ fontSize: "15px", backgroundColor: "#2d2859", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", textDecoration: "none", color: "#fff" }}>
                    <IoIosLogOut /> Logout
                  </Button>
                </Grid>
              <Dialog

open={open}
onClose={handleClose}
padding="10px"
aria-labelledby="responsive-dialog-title"
>
<DialogTitle id="responsive-dialog-title">
  {"Are you Sure?"}
</DialogTitle>
<DialogContent>
  <DialogContentText>
    Are you want to logout your account
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button sx={{ color: "red" }} autoFocus onClick={handleClose}>
    cancel
  </Button>
  <Button color="success" onClick={handleLogout} >
    yes
  </Button>
</DialogActions>
</Dialog>

            </Grid>
        </Card>
    </Grid>
   </Container>
    </>
  )
}

export default Tables
