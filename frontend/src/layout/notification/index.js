
import { Container, Typography, Box, Grid, Button,useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import NavBar from '../navbar';
import Footer from '../footer';
import './style.css';

const OrderCard = ({ notifications }) => {
  return (
      <>
          {Array.isArray(notifications) && notifications.map((notify, index) => (
              <Card key={index} style={{ display: 'flex', marginBottom: '10px', backgroundColor: "#f7f4cd", position: 'relative' }}>
                  <CardContent>
                      <Typography sx={{ fontSize: "15px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000" }} variant="body1" component="div">
                          {notify.title}
                      </Typography>
                      <Typography className='mt-1' sx={{ fontSize: "12px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} variant="body2" color="text.secondary">
                          {notify.body}
                      </Typography>
                      <Typography className='mt-2' sx={{ fontSize: "12px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic" }} variant="body2" color="text.secondary">
                          {new Date(notify.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                  </CardContent>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', color: 'black' }}>
                      {new Date(notify.date).toLocaleDateString()}
                  </div>
              </Card>
          ))}
      </>
  );
}

const Notification = () => {
  const [token, setToken] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState("Today");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const mobileView = useMediaQuery('(max-width:320px)');

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 725);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
          try {
              const decodedToken = jwtDecode(storedToken);
              setToken(decodedToken);
          } catch (error) {
              console.error("Invalid token:", error);
              setToken(null); 
          }
      }
  }, []);

  useEffect(() => {
      if (token) {
          getNotification();
      }
  }, [token]);

  const getNotification = () => {
      try {
          const requestOptions = {
              method: "GET",
              redirect: "follow"
          };

          fetch(`/api/getnotification?id=${token ? token.user.id : undefined}`, requestOptions)
              .then(async (response) => {
                  if (response.status === 200 || response.status === 400) {
                      return { status_code: response.status, data: await response.json() };
                  } else {
                      return { status_code: response.status, data: { msg: 'Unexpected Error' } };
                  }
              })
              .then((result) => {
                  setNotifications(result.data.data.notification);
                  filterNotifications(result.data.data.notification, selectedTimeline);
              })
              .catch(error => console.log('error', error));
      } catch (error) {
          console.error(error);
      }
  }

  const filterNotifications = (allNotifications, timeline) => {
      const now = new Date();
      let filtered = [];
      if (timeline === "Today") {
          filtered = allNotifications.filter((notification) => {
              const notificationDate = new Date(notification.date);
              return notificationDate.toDateString() === now.toDateString();
          });
      } else if (timeline === "Yesterday") {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          filtered = allNotifications.filter((notification) => {
              const notificationDate = new Date(notification.date);
              return notificationDate.toDateString() === yesterday.toDateString();
          });
      } else if (timeline === "1 Week") {
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          filtered = allNotifications.filter((notification) => {
              const notificationDate = new Date(notification.date);
              return notificationDate >= oneWeekAgo;
          });
      } else if (timeline === "2 Week") {
          const twoWeeksAgo = new Date(now);
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          filtered = allNotifications.filter((notification) => {
              const notificationDate = new Date(notification.date);
              return notificationDate >= twoWeeksAgo;
          });
      }

      // Sort notifications by date in descending order
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      setFilteredNotifications(filtered);
  };

  const handleTimelineChange = (newTimeline) => {
      setSelectedTimeline(newTimeline);
      filterNotifications(notifications, newTimeline);
  };

  const ListItem = ({ delay, children, onClick }) => (
      <li style={{ '--delay': `${delay}s` }}>
          <a href="#!" onClick={onClick}>{children}</a>
      </li>
  );

  return (
      <>
         {isMobile ? (
         <>
          <NavBar />
          <Container>
              <Grid item xs={12} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-end">
                      <Typography id="header">Notifications</Typography>
                  </Grid>
              </Grid>
              <Grid item xs={10} sx={{ mt: 0 }} >
                  <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
              </Grid>
              <Grid item xs={12} mt={1}  container direction="row" justifyContent="space-between" alignItems="center" >
                  <Grid item xs={12} mb={5} container direction="row" justifyContent="flex-end" alignItems="center">
                      <div className="drop">
                          <button className="drop-btn" aria-haspopup="menu">
                              <span>Timeline <ArrowDropDownIcon /></span>
                          </button>
                          <ul className="drop-content" role="menu">
                              <ListItem delay={1} onClick={() => handleTimelineChange("Today")}>Today</ListItem>
                              <ListItem delay={2} onClick={() => handleTimelineChange("Yesterday")}>Yesterday</ListItem>
                              <ListItem delay={3} onClick={() => handleTimelineChange("1 Week")}>1 Week</ListItem>
                              <ListItem delay={4} onClick={() => handleTimelineChange("2 Week")}>2 Week</ListItem>
                          </ul>
                      </div>
                  </Grid>
              </Grid>
          </Container>
          <Container>
              <Grid mt={2} mb={5} container spacing={2}>
                  <Grid mb={5} item xs={12}>
                      <Typography sx={{fontSize: "25px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000"}} gutterBottom>
                          {selectedTimeline}
                      </Typography>
                  </Grid>
                  <Grid item mb={5} xs={12}>
                    
                          {filteredNotifications.length > 0 ? (
                              <OrderCard notifications={filteredNotifications} />
                          ) : (
                              <Typography variant="body1" sx={{ color: '#000', textAlign: 'center' }}>
                                  No notifications received.
                              </Typography>
                          )}
                      
                  </Grid>
              </Grid>
          </Container>
          <Footer />
         </>
        ):(
        <>
         <NavBar />
          <Container>
              <Grid item xs={12} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-end">
                      <Typography id="header">Notifications</Typography>
                  </Grid>
              </Grid>
              <Grid item xs={10} sx={{ mt: 0 }} >
                  <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
              </Grid>
              <Grid item xs={12} mt={1}  container direction="row" justifyContent="space-between" alignItems="center" >
                  <Grid item xs={12} mb={5} container direction="row" justifyContent="flex-end" alignItems="center">
                      <div className="drop">
                          <button className="drop-btn" aria-haspopup="menu">
                              <span>Timeline <ArrowDropDownIcon /></span>
                          </button>
                          <ul className="drop-content" role="menu">
                              <ListItem delay={1} onClick={() => handleTimelineChange("Today")}>Today</ListItem>
                              <ListItem delay={2} onClick={() => handleTimelineChange("Yesterday")}>Yesterday</ListItem>
                              <ListItem delay={3} onClick={() => handleTimelineChange("1 Week")}>1 Week</ListItem>
                              <ListItem delay={4} onClick={() => handleTimelineChange("2 Week")}>2 Week</ListItem>
                          </ul>
                      </div>
                  </Grid>
              </Grid>
          </Container>
          <Container>
              <Grid mt={2} mb={5} container spacing={2}>
                  <Grid mb={5} item xs={12}>
                      <Typography sx={{fontSize: "25px", fontFamily: "Anton, sans-serif", fontWeight: "bold", fontStyle: "italic", color: "#000"}} gutterBottom>
                          {selectedTimeline}
                      </Typography>
                  </Grid>
                  <Grid item mb={5} xs={12}>
                    
                          {filteredNotifications.length > 0 ? (
                              <OrderCard notifications={filteredNotifications} />
                          ) : (
                              <Typography variant="body1" sx={{ color: '#000', textAlign: 'center' }}>
                                  No notifications received.
                              </Typography>
                          )}
                      
                  </Grid>
              </Grid>
          </Container>
          <Footer />
        </>
    ) }
      </>
  );
}

export default Notification;