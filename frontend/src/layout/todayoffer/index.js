// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   IconButton,
//   Button,
//   Grid,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { LocationOn, Phone, CheckCircle, FavoriteBorder } from '@mui/icons-material';
// import { Container } from 'react-bootstrap';
// import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
// import Sales from '../../assets/img/Sale1.jpg'
// import NavBar from '../navbar/index';
// import Foot from '../footer/index';
// import Footer from '../footer/index';
// import ad from '../../assets/image/sidead1.png'
// import ad1 from '../../assets/image/sidead2.png'
// const HotelCard = () => {
//   const [data,setData]= useState('')
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 599);
//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 599);
//   };
//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
// console.log(data,"data comming")
//   useEffect(() => {
//     getOffer()
//   }, []); 
// const getOffer =()=>{
//   try{
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };
//     fetch("/api/offerdetail", requestOptions)
//     .then(async (response) => {
//       if (response.status === 200 || response.status === 400) {
//         return { status_code: response.status, data: await response.json() };
//       } else {
//         return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//       }
//     })
//     .then((result) => {
//       setData(result.data.data)
//       console.log(result.data.data,"advertise data")
//      })
//     .catch(error => console.log('error', error));
//   }catch(error){
//     console.error(error);
//   }
// }
  
//   return (
//     <>
//     {isMobile ? (
//     <>
//    {Array.isArray(data) && data.map((offer, index) => (
//   offer.isapprove === true && (
//     <Grid 
//       container
      
//       item 
//       xs={12} 
//       direction="row" 
//       justifyContent="flex-start" 
//       alignItems="flex-start" 
      
//     >
//       <Grid mb={2}   item xs={12} spacing={2}  >   
//         <Card
         
//           style={{
//             display: 'flex',
//             backgroundColor: '#ffffe0',
//             borderRadius: '15px',
//             padding: 2,
//             width: "100%",
//             height: "auto",
//           }}
//         >
//           {/* Image */}
//           <CardMedia
//             component="img"
//             sx={{ width: 150, borderRadius: '10px' }}
//             src={offer.addimages}
//             alt="banner"
//           />

//           {/* Content */}
//           <Grid 
//             item xs={12} 
//             sx={{ padding: 2 }} 
//             container 
//             direction="column" 
//             justifyContent="space-evenly" 
//             alignItems="flex-start"
//           >
//             <Typography component="div" variant="h6">
//               {offer.title}
//             </Typography>

//             <Typography className='mt-1' color="secondary" component="div" sx={{ fontSize: "13px" }}>
//               {offer.description}
//             </Typography>

//             <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
//               <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
//                 Offer starts on:{" "}
//                 <span style={{ color: "green" }}>
//                   {new Date(offer.startdate).toLocaleDateString()}
//                 </span>
//               </Typography>
//               <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
//                 Offer ends on:{" "}
//                 <span style={{ color: "red" }}>
//                   {new Date(offer.enddate).toLocaleDateString()}
//                 </span>
//               </Typography>
//             </Grid>

//             <Button
//               variant="contained"
//               startIcon={<LocationOn />}
//               sx={{
//                 marginTop: "10px",
//                 borderColor: 'white',
//                 color: 'white',
//                 backgroundColor: "#282866"
//               }}
//             >
//               Visit Store
//             </Button>
//           </Grid>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// ))}
//     </>
//   ):(
//   <>
//  {Array.isArray(data) && data.map((offer, index) => (
//   offer.isapprove === true && (
//     <Grid 
//       container
//       spacing={2}
//       key={index}
//       item 
//       xs={12} 
//       direction="row" 
//       justifyContent="flex-start" 
//       alignItems="flex-start" 
      
//     >
//       <Grid mb={2}   item xs={6} spacing={2}  >   
//         <Card
         
//           style={{
//             display: 'flex',
//             backgroundColor: '#ffffe0',
//             borderRadius: '15px',
//             padding: 2,
//             width: "100%",
//             height: "auto",
//           }}
//         >
//           {/* Image */}
//           <CardMedia
//             component="img"
//             sx={{ width: 150, borderRadius: '10px' }}
//             src={offer.addimages}
//             alt="banner"
//           />

//           {/* Content */}
//           <Grid 
//             item xs={6} 
//             sx={{ padding: 2 }} 
//             container 
//             direction="column" 
//             justifyContent="space-evenly" 
//             alignItems="flex-start"
//           >
//             <Typography component="div" variant="h6">
//               {offer.title}
//             </Typography>

//             <Typography className='mt-1' color="secondary" component="div" sx={{ fontSize: "13px" }}>
//               {offer.description}
//             </Typography>

//             <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
//               <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
//                 Offer starts on:{" "}
//                 <span style={{ color: "green" }}>
//                   {new Date(offer.startdate).toLocaleDateString()}
//                 </span>
//               </Typography>
//               <Typography className="mt-2" component="div" sx={{ fontSize: "12px" }}>
//                 Offer ends on:{" "}
//                 <span style={{ color: "red" }}>
//                   {new Date(offer.enddate).toLocaleDateString()}
//                 </span>
//               </Typography>
//             </Grid>

//             <Button
//               variant="contained"
//               startIcon={<LocationOn />}
//               sx={{
//                 marginTop: "10px",
//                 borderColor: 'white',
//                 color: 'white',
//                 backgroundColor: "#282866"
//               }}
//             >
//               Visit Store
//             </Button>
//           </Grid>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// ))}
//   </>)}
//     </>
//   );
// };

// function TodayOffer() {

//   const navigate = useNavigate();

//   // const handleDetails=()=>{
//   //   navigate('/categories-details');
//   // }

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 425);
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

  

  

//   return (
//    <>
//    {isMobile ? (
//    <>
//      <NavBar/>
//     <Container>
//       <Grid mt={5} container >
//         <Grid container direction="row" justifyContent="flex-start" alignItems="center"  item xs={12} >
//           <HotelCard  />
//         </Grid>
//       </Grid>
//     </Container>
//     <Container>
//     <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
//               <Grid item xs={12} >
//               <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//                         <CCarousel  controls transition="crossfade" style={{ height: '140px',width:"100%" }}>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad} alt="slide 1" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad} alt="slide 3" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                         </CCarousel>
//                       </Box>
//               </Grid>
//             </Grid>
//     </Container>
//     <Foot/>
//    </>
//   ):(
//   <>
//    <NavBar/>
//     <Container>
//       <Grid mt={5} container >
//         <Grid container direction="row" justifyContent="flex-start" alignItems="center"  item xs={12} >
//           <HotelCard  />
//         </Grid>
//       </Grid>
//     </Container>
//     <Container>
//     <Grid container direction="row" justifyContent="center" alignItems="center" mt={3} >
//               <Grid item xs={12} >
//               <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//                         <CCarousel  controls transition="crossfade" style={{ height: '140px',width:"100%" }}>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad} alt="slide 1" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad1} alt="slide 2" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                           <CCarouselItem>
//                             <CImage className="d-block w-100" src={ad} alt="slide 3" style={{ height: '140px',width:"100%", objectFit: 'cover' }} />
//                           </CCarouselItem>
//                         </CCarousel>
//                       </Box>
//               </Grid>
//             </Grid>
//     </Container>
//     <Foot/>
//   </>
// )}
//    </>
//   );
// }

// export default TodayOffer;




// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { LocationOn } from '@mui/icons-material';
// import { Container } from 'react-bootstrap';
// import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
// import NavBar from '../navbar/index';
// import Foot from '../footer/index';
// import ad from '../../assets/image/sidead1.png';
// import ad1 from '../../assets/image/sidead2.png';

// const HotelCard = () => {
//   const [offers, setOffers] = useState([]);  
//   const [loading, setLoading] = useState(true);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = async () => {
//     try {
//       const response = await fetch("/api/offerdetail");
//       const result = await response.json();

//       if (response.ok) {
//         setOffers(result.data);
//       } else {
//         console.error("Error fetching data:", result.msg);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVisitStore = (offer) => {
//     setSelectedOffer(offer);
//     setModalOpen(true);
//   };

//   if (loading) {
//     return <Typography variant="h5" align="center">Loading offers...</Typography>;
//   }

//   return (
//     <>
//       <Grid container spacing={3}>
//         {Array.isArray(offers) && offers.map((offer, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Card
//               style={{
//                 backgroundColor: '#ffffe0',
//                 borderRadius: '15px',
//                 padding: '10px',
//                 height: "100%",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 sx={{ width: "100%", height: 150, borderRadius: '10px', objectFit: 'cover' }}
//                 src={offer.addimages}
//                 alt="Offer Image"
//               />

//               <CardContent>
//                 <Typography variant="h6">{offer.title}</Typography>
//                 <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
//                   {offer.description}
//                 </Typography>
//                 <Typography sx={{ fontSize: "12px" }}>
//                   Offer starts: <span style={{ color: "green" }}>{new Date(offer.startdate).toLocaleDateString()}</span>
//                 </Typography>
//                 <Typography sx={{ fontSize: "12px" }}>
//                   Offer ends: <span style={{ color: "red" }}>{new Date(offer.enddate).toLocaleDateString()}</span>
//                 </Typography>

//                 <Button
//                   variant="contained"
//                   startIcon={<LocationOn />}
//                   sx={{ marginTop: "10px", backgroundColor: "#282866", color: "white", width: "100%" }}
//                   onClick={() => handleVisitStore(offer)}
//                 >
//                   Visit Store
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modal for Offer Details */}
//       {/* <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
//         <DialogTitle>{selectedOffer?.title}</DialogTitle>
//         <DialogContent>
//           <img src={selectedOffer?.addimages} alt="Offer" style={{ width: '100%', borderRadius: '10px' }} />
//           <Typography sx={{ marginTop: "10px" }}>{selectedOffer?.description}</Typography>
//           <Typography>Offer starts: <span style={{ color: "green" }}>{new Date(selectedOffer?.startdate).toLocaleDateString()}</span></Typography>
//           <Typography>Offer ends: <span style={{ color: "red" }}>{new Date(selectedOffer?.enddate).toLocaleDateString()}</span></Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setModalOpen(false)} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog> */}

// <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
//   {/* Header */}
//   <DialogTitle sx={{ 
//     textAlign: "center", 
//     fontWeight: "bold", 
//     fontSize: "18px", 
//     color: "#333" 
//   }}>
//     {selectedOffer?.title}
//   </DialogTitle>

//   {/* Content Section */}
//   <DialogContent sx={{ padding: "15px" }}>
    
//     {/* Small Image */}
//     <Box 
//       sx={{ 
//         width: "100%", 
//         height: "180px", 
//         borderRadius: "10px", 
//         overflow: "hidden",
//         marginBottom: "15px",
//       }}
//     >
//       <img 
//         src={selectedOffer?.addimages} 
//         alt="Offer" 
//         style={{ width: "100%", height: "100%", objectFit: "cover" }} 
//       />
//     </Box>

//     {/* Offer Description */}
//     <Typography sx={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
//       {selectedOffer?.description}
//     </Typography>

//     {/* Store Details */}
//     <Box mt={2} p={2} bgcolor="#F9FAFB" borderRadius="8px" boxShadow="0px 2px 4px rgba(0,0,0,0.1)">
//       <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#222" }}>
//         Store Details:
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "#444", mt: 1 }}>
//         <b>Store Name:</b> {selectedOffer?.storename}
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "#444", mt: 1 }}>
//         <b>Category:</b> {selectedOffer?.category}
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "#444", mt: 1 }}>
//         <b>Location:</b> {selectedOffer?.location}
//       </Typography>
//     </Box>

//     {/* Contact Information */}
//     <Box mt={2} p={2} bgcolor="#F1F8E9" borderRadius="8px" boxShadow="0px 2px 4px rgba(0,0,0,0.1)">
//       <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#222" }}>
//         Contact Information:
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "#444", mt: 1 }}>
//         <b>Contact:</b> {selectedOffer?.contactnumber}
//       </Typography>
//     </Box>

//     {/* Offer Start & End Dates */}
//     <Box mt={2} p={2} bgcolor="#E3F2FD" borderRadius="8px" boxShadow="0px 2px 4px rgba(0,0,0,0.1)">
//       <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#222" }}>
//         Offer Validity:
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "green", fontWeight: "500", mt: 1 }}>
//         Starts: {new Date(selectedOffer?.startdate).toLocaleDateString()}
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "red", fontWeight: "500", mt: 1 }}>
//         Ends: {new Date(selectedOffer?.enddate).toLocaleDateString()}
//       </Typography>
//     </Box>
//   </DialogContent>

//   {/* Close Button */}
//   <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
//     <Button 
//       onClick={() => setModalOpen(false)} 
//       variant="contained" 
//       sx={{ 
//         backgroundColor: "#333", 
//         color: "white", 
//         fontWeight: "bold", 
//         px: 3, 
//         py: 1, 
//         borderRadius: "20px",
//         "&:hover": { backgroundColor: "#555" } 
//       }}
//     >
//       Close
//     </Button>
//   </DialogActions>
// </Dialog>

//     </>
//   );
// };

// function TodayOffer() {
//   return (
//     <>
//       <NavBar />
//       <Container>
//         <Grid mt={5} container>
//           <Grid item xs={12}>
//             <HotelCard />
//           </Grid>
//         </Grid>
//       </Container>

//       <Container>
//         <Grid container justifyContent="center" mt={3}>
//           <Grid item xs={12}>
//             <Box display="flex" flexDirection="column" alignItems="center">
//               <CCarousel controls transition="crossfade" style={{ height: '140px', width: "100%" }}>
//                 {[ad, ad1, ad].map((src, index) => (
//                   <CCarouselItem key={index}>
//                     <CImage className="d-block w-100" src={src} alt={`slide ${index + 1}`} 
//                       style={{ height: '140px', width: "100%", objectFit: 'cover' }} 
//                     />
//                   </CCarouselItem>
//                 ))}
//               </CCarousel>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
      
//       <Foot />
//     </>
//   );
// }

// export default TodayOffer;
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocationOn } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import NavBar from '../navbar/index';
import Foot from '../footer/index';
import ad from '../../assets/image/sidead1.png';
import ad1 from '../../assets/image/sidead2.png';

const HotelCard = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("/api/advertisedetail");
      const result = await response.json();

      if (response.ok) {
        setOffers(result.data);
      } else {
        console.error("Error fetching data:", result.msg);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisitStore = async (id) => {
    try {
      const response = await fetch(`/api/advertisedata/${id}`);
      const result = await response.json();
      if (response.ok) {
        setSelectedOffer(result.data);
        setModalOpen(true);
      } else {
        console.error("Error fetching offer details:", result.msg);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (loading) {
    return <Typography variant="h5" align="center">Loading offers...</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {Array.isArray(offers) && offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={offer._id}>
            <Card
              style={{
                backgroundColor: '#ffffe0',
                borderRadius: '15px',
                padding: '10px',
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "100%", height: 150, borderRadius: '10px', objectFit: 'cover' }}
                src={offer.addimages}
                alt="Offer Image"
              />

              <CardContent>
                <Typography variant="h6">{offer.title}</Typography>
                <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                  {offer.description}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<LocationOn />}
                  sx={{ marginTop: "10px", backgroundColor: "#282866", color: "white", width: "100%" }}
                  onClick={() => handleVisitStore(offer._id)}
                >
                  Visit Store
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedOffer?.title}</DialogTitle>
        <DialogContent>
          <img src={selectedOffer?.addimages} alt="Offer" style={{ width: '100%', borderRadius: '10px' }} />
          <Typography>{selectedOffer?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function TodayOffer() {
  return (
    <>
      <NavBar />
      <Container>
        <Grid mt={5} container>
          <Grid item xs={12}>
            <HotelCard />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CCarousel controls transition="crossfade" style={{ height: '140px', width: "100%" }}>
                {[ad, ad1, ad].map((src, index) => (
                  <CCarouselItem key={index}>
                    <CImage className="d-block w-100" src={src} alt={`slide ${index + 1}`} 
                      style={{ height: '140px', width: "100%", objectFit: 'cover' }} 
                    />
                  </CCarouselItem>
                ))}
              </CCarousel>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Foot />
    </>
  );
}

export default TodayOffer;
