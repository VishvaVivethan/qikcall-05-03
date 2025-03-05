import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Grid, Typography } from '@mui/material';
import qrcode from '../../assets/img/qrcode.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
    import Cookies from 'js-cookie';
import Home from '../../assets/qik call mobile view icons/home-mob.png'
import Business from '../../assets/qik call mobile view icons/business-mob.png'
import User from '../../assets/qik call mobile view icons/user-mob.png'

const Footer = () => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
    const navigate = useNavigate('')

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 599);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlebusiness = () => {
      navigate('/registerbusiness');
    };
  
    const handlebusinessdetails = () => {
      navigate('/businessdetails');
    };

    const handlesignin = () => {
      navigate('/signin');
    };

    const handleUserprofile = () => {
      navigate('/userprofile');
    };
  
    const handleDetails = () => {
      navigate('/usersdetails/:token');
    };

    const location = useLocation();

    const tokenFromUrl = new URLSearchParams(location.search).get('token');    

  let token = Cookies.get('token') ? Cookies.get('token') : undefined;
  const [decode, SetDecode] = useState(token ? jwtDecode(token) : undefined);
  console.log(decode, "killer")


    return (
        <>
            {isMobile ? (
                <>
                    <Container>
                    <Grid mb={3} mt={3}  container id="grid-container-mob">
      <Grid item xs={8} container id="grid-item-mob">
        {/* <Grid xs={12} container id="link-container-mob">
          <Grid xs={6} item container 
  direction="column"
  justifyContent="space-evenly"
  alignItems="center">
            <Typography className='mb-2' component={Link} to="/aboutus" id="typography-link-mob">
              About Us
            </Typography>
            <Typography component={Link} to=" /termsandcondition" id="typography-link-mob">
               Terms & Conditions
            </Typography>
          </Grid>
          <Grid xs={6} item container 
  direction="column"
  justifyContent="space-evenly"
  alignItems="center">
            <Typography className='mb-2'component={Link} to="/contactus" id="typography-link-mob">
            Contact Us
            </Typography>
            <Typography component={Link} to="/privacy" id="typography-link-mob">
              Privacy Policy
            </Typography>
          </Grid>
        </Grid> */}
      </Grid>
      <Grid item xs={4} container direction="row" justifyContent="center" alignItems="center">
        <img src={qrcode} alt="QR Code" id="qr-code-mob" />
      </Grid>
    </Grid>
                    </Container>
                    <Container>
                    <Grid mt={5} mb={2} className="grid-mob" item xs={12} container direction="row" justifyContent="space-around" alignItems="center">
      <Grid>
      <Link to="/">
    <img src={Home} alt="" className="img-home-mob" />
  </Link>
      </Grid>
      <Grid>
        <Grid onClick={() => {
                if (decode && decode.user ? decode.user.role == "businessman" : undefined) {
                  handlebusinessdetails()
                } else {
                  handlebusiness()
                }
              }} >  <img src={Business} alt="" className="img-business-mob" /></Grid>
      </Grid>
      <Grid>
      <Grid onClick={() => {
                      if (!decode && !tokenFromUrl) {
                        handlesignin();
                      } else if (decode) {
                        handleUserprofile();
                      } else if (tokenFromUrl) {
                        handleDetails();
                      }
                    }} >
        <img src={User} alt="" className="img-user-mob" />
        </Grid>
      </Grid>
    </Grid>
                    </Container>
                    <Grid container xs={12} direction="row" justifyContent="center" alignItems="center" className="footer-text-mob">
        Copyright@2024
      </Grid>
                </>
            ) : (
                <>
                   <Container>
  <Grid container id="footer">
    {/* <Grid item xs={12} md={8} container direction="row" justifyContent="flex-end" alignItems="center" id="footer-links">
      <Typography id="footer-text" component={Link} to="/aboutus">About Us</Typography>
      <Typography id="footer-text" component={Link} to="/contactus">Contact Us</Typography>
      <Typography id="footer-text" component={Link} to="/termsandcondition">Terms & Conditions</Typography>
      <Typography id="footer-text" component={Link} to="/privacy">Privacy Policy</Typography>
      <Typography id="footer-text" component={Link} to="/emergency">Emergency Services</Typography>
    </Grid> */}
    
    <Grid item xs={12} md={4} container direction="row" justifyContent="center" alignItems="center" className="footer-qr">
      <img src={qrcode} alt="QR Code" />
    </Grid>
    
    <Grid mt={2} container item xs={12} direction="row" justifyContent="center" alignItems="center" className="footer-copyright">
      <Typography id="footer-text">Copyright@2024</Typography>
    </Grid>
  </Grid>
</Container>
                   
                </>
            )}
        </>
    );
};

export default Footer;
