import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { GrPlan } from "react-icons/gr";
import admin from '../../adminassets/images/avatars/admin.png'
import { Grid,Card, Typography,Button,Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';

const AppHeaderDropdown = () => {


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
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={admin} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="/admin/subscription">
          <GrPlan className="me-2" />
        Plans
          {/* <CBadge color="info" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          {/* <CBadge color="success" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Approve
          {/* <CBadge color="danger" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          {/* <CBadge color="secondary" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem onClick={handleClickOpen}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
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
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
