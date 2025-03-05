import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from '../../../adminassets/images/mainlogo.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {

  const[email,setEmail]=useState('')
  const[password,setPasssword]=useState('')
  const[data,setData]=useState('')
  const navigate = useNavigate();

const AdminLogin =()=>{
  try{
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/adminlogin", requestOptions)
.then(async (response) => {
  if (response.status === 200 || response.status === 400) {
    return { status_code: response.status, data: await response.json() };
  } else {
    return { status_code: response.status, data: { msg: 'Unexpected Error' } };
  }
})
.then((result) => {
  console.log(result.data.token);

            const token = result.data.token;
            Cookies.set('token', token, { expires: 7, secure: true });

  setData(result)
  navigate('/dashboard')
  console.log(result,"admin")
 })
.catch(error => console.log('error', error));
}catch(error){
console.error("Request Error:", error);
}
}

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="Email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={password} onChange={(e)=>{setPasssword(e.target.value)}}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={()=>{AdminLogin()}} color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={logo} alt="logo" width="100px" />
                    <h2>Qikcall Admin</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
