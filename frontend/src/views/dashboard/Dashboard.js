import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons';

import avatar1 from '../../adminassets/images/avatars/1.jpg';
import avatar2 from '../../adminassets/images/avatars/2.jpg';
import avatar3 from '../../adminassets/images/avatars/3.jpg';
import avatar4 from '../../adminassets/images/avatars/4.jpg';
import avatar5 from '../../adminassets/images/avatars/5.jpg';
import avatar6 from '../../adminassets/images/avatars/6.jpg';

import WidgetsBrand from '../widgets/WidgetsBrand';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

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

  const[todayuser,setTodayuser]=useState('')
  const[todayadvertise,setTodayAdvertise]=useState('')

  useEffect(()=>{
    const registerToday =()=>{
      try{
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch("/api/todayregisteruser", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
      })
      .then((result) => {
        setTodayuser(result.data.data);
        console.log(result.data.data,"registerToday");
      })
      .catch((error) => console.log("error", error));
      }catch(error){
        console.log("error", error)
      }
    }
    const registerTodayAdvertise =()=>{
      try{
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch("/api/todayregisteradvertise", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
      })
      .then((result) => {
        setTodayAdvertise(result.data.data);
        console.log(result.data.data,"registerToday");
      })
      .catch((error) => console.log("error", error));
      }catch(error){
        console.log("error", error)
      }
    }
    registerToday()
    registerTodayAdvertise()
  },[])

  // Rest of your Dashboard component code remains the same...
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                 Registered Users
              </h4>
              <div className="small text-body-secondary">Today</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup> */}
            </CCol>
          </CRow>
          <Grid mt={2} >
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Registration Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {todayuser.length > 0 ? (
        todayuser.map(user => (
          <TableRow key={user._id} hover>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phonenumber}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No users registered today</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</Grid>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            {/* Render progress bars */}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand className="mb-4" withCharts />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader></CCardHeader>
            <CCardBody>
            <Grid mt={2} >
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Registration Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {todayadvertise.length > 0 ? (
        todayadvertise.map(user => (
          <TableRow key={user._id} hover>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phonenumber}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No Advertise Registered Today</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</Grid>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
