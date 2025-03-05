import React, { useEffect, useState } from 'react';
import { Card, Container, CardMedia, Typography, Grid, Button, Box, Rating } from '@mui/material';
import './style.css';
import NavBar from '../navbar';
import Footer from '../footer';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Wishlist() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const [data, setData] = useState([]); // Initialize as an empty array
    const [wishlist, setWishlist] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Token handling logic inside useEffect
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                setToken(decodedToken);
            } catch (error) {
                console.error("Invalid token:", error);
                setToken(null); // Set token to null if it's invalid
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            getWishlist();
        }
    }, [token]);

    const getWishlist = () => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`/api/wishlistdata?id=${token?.user.id}`, requestOptions)
                .then(async (response) => {
                    if (response.status === 200 || response.status === 400) {
                        return { status_code: response.status, data: await response.json() };
                    } else {
                        return { status_code: response.status, data: { msg: 'Unexpected Error' } };
                    }
                })
                .then((result) => {
                    setData([result.data.data[0]?.service] ); // Use optional chaining
                    setWishlist(result.data.data[0]?.wishlist || []); // Use optional chaining
                    setLoading(false); // Set loading to false after fetching
                })
                .catch(error => {
                    console.log('error', error);
                    setLoading(false); // Set loading to false on error
                });
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setLoading(false); // Set loading to false on error
        }
    };

    return (
        <>
            {isMobile ? (
                <>
                   <NavBar />
                    <Container>
                        <Grid item xs={12} mt={5} container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={8} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography id="header-mob">My Favorites</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 0 }}>
                                <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                            </Grid>
                        </Grid>
                    </Container>

                    <Container sx={{ marginTop: "20px" }}>
                        <Grid mb={5} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                            {data && Array.isArray(data) && data.length > 0 ? (
                                data.map((item, index) => (
                                    item && item.addimages && item.addimages.length > 0 ? ( 
                                        <Grid item xs={6} key={index}>
                                            <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2 }}>
                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                    <Grid item xs={5}>
                                                        <CardMedia
                                                            component="img"
                                                            className="product-image"
                                                            src={item.addimages[0]}
                                                            alt="Product Image"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                                                        <Typography id="text-head">{item.servicename}</Typography>
                                                        <Box className="mt-1">
                                                            <Typography id="text">Address:</Typography>
                                                            <Typography>{`${item.addressline1}, ${item.addressline2}, ${item.area}, ${item.city}, ${item.state}`}</Typography>
                                                        </Box>
                                                        <Box className="rating-box">
                                                            <Typography id="text">Rating:</Typography>
                                                            <Rating id="rate" name="rating" value={4} readOnly />
                                                        </Box>
                                                    </Grid>
                                                    {/* <Grid item xs={4} container justifyContent="center" alignItems="center">
                                                        <Button variant="contained" className="add-cart-button">Delete</Button>
                                                    </Grid> */}
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    ) : (
                                        <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
                                            <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
                                                <Typography variant="h6" align="center">No items in your wishlist</Typography>
                                            </Card>
                                        </Grid>
                                    )
                                ))
                            ) : (
                                <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
                                    <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "200px" }}>
                                        <Typography sx={{fontSize:"12px"}} align="center">No items in your wishlist</Typography>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                <Footer/>
                </>
            ) : (
                <>
                    <NavBar />
                    <Container>
                        <Grid item xs={12} mt={5} container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={6} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography id="header">My Favorites</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 0 }}>
                                <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                            </Grid>
                        </Grid>
                    </Container>

                    <Container sx={{ marginTop: "20px" }}>
                        <Grid mb={5} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                            {data && Array.isArray(data) && data.length > 0 ? (
                                data.map((item, index) => (
                                    item && item.addimages && item.addimages.length > 0 ? ( 
                                        <Grid item xs={6} key={index}>
                                            <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2 }}>
                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                    <Grid item xs={5}>
                                                        <CardMedia
                                                            component="img"
                                                            className="product-image"
                                                            src={item.addimages[0]}
                                                            alt="Product Image"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                                                        <Typography id="text-head">{item.servicename}</Typography>
                                                        <Box className="mt-1">
                                                            <Typography id="text">Address:</Typography>
                                                            <Typography>{`${item.addressline1}, ${item.addressline2}, ${item.area}, ${item.city}, ${item.state}`}</Typography>
                                                        </Box>
                                                        <Box className="rating-box">
                                                            <Typography id="text">Rating:</Typography>
                                                            <Rating id="rate" name="rating" value={4} readOnly />
                                                        </Box>
                                                    </Grid>
                                                    {/* <Grid item xs={4} container justifyContent="center" alignItems="center">
                                                        <Button variant="contained" className="add-cart-button">Delete</Button>
                                                    </Grid> */}
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    ) : (
                                        <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
                                            <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
                                                <Typography variant="h6" align="center">No items in your wishlist</Typography>
                                            </Card>
                                        </Grid>
                                    )
                                ))
                            ) : (
                                <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
                                    <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
                                        <Typography variant="h6" align="center">No items in your wishlist</Typography>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </>
            )}
            <Footer/>
        </>
    );
}

export default Wishlist;
