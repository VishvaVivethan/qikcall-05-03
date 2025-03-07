// import React, { useState, useEffect } from 'react';
// import './style.css';
// import { Container, Grid, Typography } from '@mui/material';
// import qrcode from '../../assets/img/qrcode.png';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import {  Link } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";
//     import Cookies from 'js-cookie';
// import Home from '../../assets/qik call mobile view icons/home-mob.png'
// import Business from '../../assets/qik call mobile view icons/business-mob.png'
// import User from '../../assets/qik call mobile view icons/user-mob.png'

// const Footer = () => {
    
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
//     const navigate = useNavigate('')

//     const handleResize = () => {
//         setIsMobile(window.innerWidth <= 599);
//     };

//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handlebusiness = () => {
//       navigate('/registerbusiness');
//     };
  
//     const handlebusinessdetails = () => {
//       navigate('/businessdetails');
//     };

//     const handlesignin = () => {
//       navigate('/signin');
//     };

//     const handleUserprofile = () => {
//       navigate('/userprofile');
//     };
  
//     const handleDetails = () => {
//       navigate('/usersdetails/:token');
//     };

//     const location = useLocation();

//     const tokenFromUrl = new URLSearchParams(location.search).get('token');    

//   let token = Cookies.get('token') ? Cookies.get('token') : undefined;
//   const [decode, SetDecode] = useState(token ? jwtDecode(token) : undefined);
//   console.log(decode, "killer")


//     return (
//         <>
//             {isMobile ? (
//                 <>
//                     <Container>
//                     <Grid mb={3} mt={3}  container id="grid-container-mob">
//       <Grid item xs={8} container id="grid-item-mob">
//         <Grid xs={12} container id="link-container-mob">
//           <Grid xs={7} item container direction="column" justifyContent="space-evenly" alignItems="center" >
  
//     <Grid item xs={4} container direction="row" justifyContent="center" alignItems="center">
//         <img src={qrcode} alt="QR Code" id="qr-code-mob" />
//       </Grid>
      
//             <Typography className='mb-2' component={Link} to="/aboutus" id="typography-link-mob">
//               About Us
//             </Typography>
//             <Typography component={Link} to=" /termsandcondition" id="typography-link-mob">
//                Terms & Conditions
//             </Typography>
//             <Typography className='mb-2'component={Link} to="/contactus" id="typography-link-mob">
//             Contact Us
//             </Typography>
//             <Typography component={Link} to="/privacy" id="typography-link-mob">
//               Privacy Policy
//             </Typography>
//           </Grid>
//           <Grid xs={6} item container 
//   direction="column"
//   justifyContent="space-evenly"
//   alignItems="center">
            
//           </Grid>
//         </Grid>
//       </Grid>
      
//     </Grid>
//                     </Container>
//                     <Container>
//                     <Grid mt={5} mb={2} className="grid-mob" item xs={12} container direction="row" justifyContent="space-around" alignItems="center">
//       <Grid>
//       <Link to="/">
    
//   </Link>
//       </Grid>
//       <Grid>
//         <Grid onClick={() => {
//                 if (decode && decode.user ? decode.user.role == "" : undefined) {
//                   handlebusinessdetails()
//                 } else {
//                   handlebusiness()
//                 }
//               }} >  </Grid>
//       </Grid>
//       <Grid>
//       <Grid onClick={() => {
//                       if (!decode && !tokenFromUrl) {
//                         handlesignin();
//                       } else if (decode) {
//                         handleUserprofile();
//                       } else if (tokenFromUrl) {
//                         handleDetails();
//                       }
//                     }} >
//         </Grid>
//       </Grid>
//     </Grid>
//                     </Container>
//                     <Grid container xs={12} direction="row" justifyContent="center" alignItems="center" className="footer-text-mob">
      
//       </Grid>
//                 </>
//             ) : (
//                 <>
//                    <Container>
//   <Grid container id="footer">
//   <Grid item xs={12} md={12} container direction="row" justifyContent="center" alignItems="center" className="footer-qr">
//       <img src={qrcode} alt="QR Code" />
//     </Grid>
//     <Grid ></Grid>
//     <Grid item xs={12} md={12} container direction="row" justifyContent="flex-end" alignItems="center" id="footer-links">
//       <Typography id="footer-text" component={Link} to="/aboutus">About Us</Typography>
//       <Typography id="footer-text" component={Link} to="/contactus">Contact Us</Typography>
//       <Typography id="footer-text" component={Link} to="/termsandcondition">Terms & Conditions</Typography>
//       <Typography id="footer-text" component={Link} to="/privacy">Privacy Policy</Typography>
//       <Typography id="footer-text" component={Link} to="/emergency">Emergency Services</Typography>
//     </Grid>
    
   
    
//     <Grid mt={2} container item xs={12} direction="row" justifyContent="center" alignItems="center" className="footer-copyright">
//       {/* <Typography id="footer-text">Copyright@2024</Typography> */}
//     </Grid>
//   </Grid>
// </Container>
                   
//                 </>
//             )}
//         </>
//     );
// };

// export default Footer;
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import qrcode from '../../assets/img/qrcode.png';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 599);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tokenFromUrl = new URLSearchParams(location.search).get('token');
  let token = Cookies.get('token') ? Cookies.get('token') : undefined;
  const [decode, setDecode] = useState(token ? jwtDecode(token) : undefined);

  return (
    <>
      {isMobile ? (
        <Container>
          {/* QR Code Section */}
          <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
            <Card 
              style={{
                background: "linear-gradient(135deg, #6B73FF 0%,rgb(16, 172, 196) 100%)",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0,0,255,0.5)"}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)"}
            >
              <img 
                src={qrcode} 
                alt="QR Code" 
                style={{ width: "120px", height: "120px" }} 
              />
              <Typography 
                variant="caption" 
                style={{ color: "white", textAlign: "center", display: "block", marginTop: "8px" }}
              >
                Scan to Download App
              </Typography>
            </Card>
          </Grid>

          {/* Links Section */}
          <Grid container spacing={1} justifyContent="center" style={{ marginTop: '30px' }}>
            <Grid item>
              <Typography component={Link} to="/aboutus" style={{ textDecoration: "none", color: "#000DFF" }}>
                About Us
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/termsandcondition" style={{ textDecoration: "none", color: "#000DFF" }}>
                Terms & Conditions
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/contactus" style={{ textDecoration: "none", color: "#000DFF" }}>
                Contact Us
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/privacy" style={{ textDecoration: "none", color: "#000DFF" }}>
                Privacy Policy
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container>
          {/* Desktop Footer */}
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {/* QR Code */}
            <Grid item xs={12} md={12} style={{ display: "flex", justifyContent: "center" }}>
              <Card 
                style={{
                  background: "linear-gradient(135deg, #6B73FF 0%,rgb(14, 199, 196) 100%)",
                  padding: "15px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0,0,255,0.5)"}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)"}
              >
                <img 
                  src={qrcode} 
                  alt="QR Code" 
                  style={{ width: "140px", height: "140px" }} 
                />
                <Typography 
                  variant="caption" 
                  style={{ color: "white", textAlign: "center", display: "block", marginTop: "8px" }}
                >
                  Scan for More Info
                </Typography>
              </Card>
            </Grid>

            {/* Footer Links */}
            <Grid item xs={12} md={5} container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Typography component={Link} to="/aboutus" style={{ textDecoration: "none", color: "#000DFF" }}>
                  About Us
                </Typography>
              </Grid>
              <Grid item>
                <Typography component={Link} to="/contactus" style={{ textDecoration: "none", color: "#000DFF" }}>
                  Contact Us
                </Typography>
              </Grid>
              <Grid item>
                <Typography component={Link} to="/termsandcondition" style={{ textDecoration: "none", color: "#000DFF" }}>
                  Terms & Conditions
                </Typography>
              </Grid>
              <Grid item>
                <Typography component={Link} to="/privacy" style={{ textDecoration: "none", color: "#000DFF" }}>
                  Privacy Policy
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Footer;
