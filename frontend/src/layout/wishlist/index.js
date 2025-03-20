// import React, { useEffect, useState } from 'react';
// import { Card, Container, CardMedia, Typography, Grid, Button, Box, Rating } from '@mui/material';
// import './style.css';
// import NavBar from '../navbar';
// import Footer from '../footer';
// import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";

// function Wishlist() {
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
//     const [data, setData] = useState([]);
//     const [wishlist, setWishlist] = useState([]);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const handleResize = () => {
//         setIsMobile(window.innerWidth <= 425);
//     };

//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//     useEffect(() => {
//         const storedToken = Cookies.get('token');
//         if (storedToken) {
//             try {
//                 const decodedToken = jwtDecode(storedToken);
//                 setToken(decodedToken);
//             } catch (error) {
//                 console.error("Invalid token:", error);
//                 setToken(null); 
//             }
//         }
//     }, []);

//     useEffect(() => {
//         if (token) {
//             getWishlist();
//         }
//     }, [token]);

//     // const getWishlist = () => {
//     //     try {
//     //         const requestOptions = {
//     //             method: "GET",
//     //             redirect: "follow"
//     //         };

//     //         fetch(`/api/wishlistdata?id=${token?.user.id}`, requestOptions)
//     //             .then(async (response) => {
//     //                 if (response.status === 200 || response.status === 400) {
//     //                     return { status_code: response.status, data: await response.json() };
//     //                 } else {
//     //                     return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//     //                 }
//     //             })
//     //             .then((result) => {
//     //                 setData([result.data.data[0]?.service] );
//     //                 setWishlist(result.data.data[0]?.wishlist || []);
//     //                 setLoading(false);
//     //             })
//     //             .catch(error => {
//     //                 console.log('error', error);
//     //                 setLoading(false);
//     //             });
//     //     } catch (error) {
//     //         console.error('Error fetching wishlist:', error);
//     //         setLoading(false);
//     //     }
//     // };
//     const getWishlist = () => {
//         try {
//             const requestOptions = {
//                 method: "GET",
//                 redirect: "follow"
//             };
    
//             fetch(`/api/wishlistdata?id=${token?.user.id}`, requestOptions)
//                 .then(async (response) => {
//                     if (response.status === 200 || response.status === 400) {
//                         return { status_code: response.status, data: await response.json() };
//                     } else {
//                         return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//                     }
//                 })
//                 .then((result) => {
//                     const wishlistData = result.data.data || [];
                    
//                     // Extract all services from the wishlist
//                     const allServices = wishlistData.flatMap(item => item.service || []);
                    
//                     setData(allServices);
//                     setWishlist(wishlistData.map(item => item.wishlist || []));
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.log('error', error);
//                     setLoading(false);
//                 });
//         } catch (error) {
//             console.error('Error fetching wishlist:', error);
//             setLoading(false);
//         }
//     };
    
//     return (
//         <>
//             {isMobile ? (
//                 <>
//                    <NavBar />
//                     <Container>
//                         <Grid item xs={12} mt={5} container direction="row" justifyContent="space-between" alignItems="center">
//                             <Grid item xs={8} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
//                                 <Typography id="header-mob">My Favorites</Typography>
//                             </Grid>
//                             <Grid item xs={12} sx={{ mt: 0 }}>
//                                 <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
//                             </Grid>
//                         </Grid>
//                     </Container>

//                     <Container sx={{ marginTop: "20px" }}>
//                         <Grid mb={5} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
//                             {data && Array.isArray(data) && data.length > 0 ? (
//                                 data.map((item, index) => (
//                                     item && item.addimages && item.addimages.length > 0 ? ( 
//                                         <Grid item xs={6} key={index}>
//                                             <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2 }}>
//                                                 <Grid container direction="row" justifyContent="space-between" alignItems="center">
//                                                     <Grid item xs={5}>
//                                                         <CardMedia
//                                                             component="img"
//                                                             className="product-image"
//                                                             src={item.addimages[0]}
//                                                             alt="Product Image"
//                                                         />
//                                                     </Grid>
//                                                     <Grid item xs={5} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
//                                                         <Typography id="text-head">{item.servicename}</Typography>
//                                                         <Box className="mt-1">
//                                                             <Typography id="text">Address:</Typography>
//                                                             <Typography>{`${item.addressline1}, ${item.addressline2}, ${item.area}, ${item.city}, ${item.state}`}</Typography>
//                                                         </Box>
//                                                         <Box className="rating-box">
//                                                             <Typography id="text">Rating:</Typography>
//                                                             <Rating id="rate" name="rating" value={4} readOnly />
//                                                         </Box>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Card>
//                                         </Grid>
//                                     ) : (
//                                         <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
//                                             <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
//                                                 <Typography variant="h6" align="center">No items in your wishlist</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )
//                                 ))
//                             ) : (
//                                 <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
//                                     {/* <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "200px" }}>
//                                         <Typography sx={{fontSize:"12px"}} align="center">No items in your wishlist</Typography>
//                                     </Card> */}
//                                 </Grid>
//                             )}
//                         </Grid>
//                     </Container>
//                 </>
//             ) : (
//                 <>
//                     <NavBar />
//                     <Container>
//                         <Grid item xs={12} mt={5} container direction="row" justifyContent="space-between" alignItems="center">
//                             <Grid item xs={6} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
//                                 <Typography id="header">My Favorites</Typography>
//                             </Grid>
//                             <Grid item xs={12} sx={{ mt: 0 }}>
//                                 <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
//                             </Grid>
//                         </Grid>
//                     </Container>

//                     <Container sx={{ marginTop: "20px" }}>
//                         <Grid mb={5} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
//                             {data && Array.isArray(data) && data.length > 0 ? (
//                                 data.map((item, index) => (
//                                     item && item.addimages && item.addimages.length > 0 ? ( 
//                                         <Grid item xs={6} key={index}>
//                                             <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2 }}>
//                                                 <Grid container direction="row" justifyContent="space-between" alignItems="center">
//                                                     <Grid item xs={5}>
//                                                         <CardMedia
//                                                             component="img"
//                                                             className="product-image"
//                                                             src={item.addimages[0]}
//                                                             alt="Product Image"
//                                                         />
//                                                     </Grid>
//                                                     <Grid item xs={5} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
//                                                         <Typography id="text-head">{item.servicename}</Typography>
//                                                         <Box className="mt-1">
//                                                             <Typography id="text">Address:</Typography>
//                                                             <Typography>{`${item.addressline1}, ${item.addressline2}, ${item.area}, ${item.city}, ${item.state}`}</Typography>
//                                                         </Box>
//                                                         <Box className="rating-box">
//                                                             <Typography id="text">Rating:</Typography>
//                                                             <Rating id="rate" name="rating" value={4} readOnly />
//                                                         </Box>
//                                                     </Grid>
//                                                     {/* <Grid item xs={4} container justifyContent="center" alignItems="center">
//                                                         <Button variant="contained" className="add-cart-button">Delete</Button>
//                                                     </Grid> */}
//                                                 </Grid>
//                                             </Card>
//                                         </Grid>
//                                     ) : (
//                                         <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
//                                             <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
//                                                 <Typography variant="h6" align="center">No items in your wishlist</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )
//                                 ))
//                             ) : (
//                                 <Grid mb={4} mt={4} container direction="row" justifyContent="center" alignItems="center">
//                                     <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "500px" }}>
//                                         <Typography variant="h6" align="center">No items in your wishlist</Typography>
//                                     </Card>
//                                 </Grid>
//                             )}
//                         </Grid>
//                     </Container>
//                 </>
//             )}
//             <Footer/>
//         </>
//     );
// }
// export default Wishlist;
















import React, { useEffect, useState } from 'react';
import { Card, Container, CardMedia, Typography, Grid, IconButton, Box, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavBar from '../navbar';
import Footer from '../footer';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Wishlist() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 425);
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
                    const wishlistData = result.data.data || [];
                    const allServices = wishlistData.flatMap(item => item.service || []);
                    setData(allServices);
                    setLoading(false);
                })
                .catch(error => {
                    console.log('error', error);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setLoading(false);
        }
    };

    // const removeWishlistItem = (id) => {
    //     const confirmDelete = window.confirm("Are you sure you want to remove this item from your wishlist?");
    //     if (!confirmDelete) return;
    //     console.log("Deleting wishlist item with ID:", id);
    //     fetch(`/api/delete_wishlist`, {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ id }),
    //     })
    //     .then(response => response.json())
    //     .then(() => {
    //         setData(prevData => prevData.filter(item => item._id !== id));
    //     })
    //     .catch(error => console.error('Error deleting wishlist item:', error));
    // };
    const removeWishlistItem = async (wishlistId) => {
    console.log("Deleting wishlist item with ID:", wishlistId); // Debugging

    const confirmDelete = window.confirm("Are you sure you want to remove this item from your wishlist?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/delete_wishlist`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: wishlistId }), // ✅ Send `_id`, NOT `storeId`
        });

        const result = await response.json();

        if (response.ok) {
            setData(prevData => prevData.filter(item => item._id !== wishlistId));
            alert("Item removed from wishlist successfully!");
        } else {
            alert(result.message || "Failed to remove item. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
        alert("An error occurred while removing the item.");
    }
};
    return (
        <>
            <NavBar />
            <Container>
                <Grid item xs={12} mt={5} container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={isMobile ? 8 : 6} mt={5} container direction="row" justifyContent="flex-start" alignItems="center">
                        <Typography id={isMobile ? "header-mob" : "header"}>My Favorites</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 0 }}>
                        <hr style={{ margin: '0', padding: '0', border: 'none', borderBottom: '1px solid #000' }} />
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{ marginTop: "20px" }}>
                <Grid mb={5} container spacing={2}>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card sx={{
                                    backgroundColor: "#f7f4cd",
                                    border: "1px solid black",
                                    padding: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={5}>
                                            <CardMedia
                                                component="img"
                                                sx={{ 
                                                    width: "100%", 
                                                    height: 150, 
                                                    objectFit: "cover", 
                                                    borderRadius: 2 
                                                }}
                                                src={item.addimages[0]}
                                                alt="Product Image"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <Typography id="text-head" variant="subtitle1" noWrap>
                                                {item.servicename}
                                            </Typography>
                                            <Typography id="text" variant="body2" noWrap>
                                                Address:
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    overflow: "hidden", 
                                                    textOverflow: "ellipsis", 
                                                    display: "-webkit-box", 
                                                    WebkitLineClamp: 2, 
                                                    WebkitBoxOrient: "vertical" 
                                                }}
                                            >
                                                {`${item.addressline1}, ${item.addressline2}, ${item.area}, ${item.city}, ${item.state}`}
                                            </Typography>
                                            <Typography variant="body2" mt={1}>Wishlist ID: {item._id}</Typography>
                                            <Box mt={1}>
                                                <Typography id="text" variant="body2">Rating:</Typography>
                                                <Rating id="rate" name="rating" value={4} readOnly />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={2} container justifyContent="center" alignItems="center">
                                            <IconButton color="error" onClick={() => removeWishlistItem(item._id)}>
                                                <FavoriteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid mb={4} mt={4} container justifyContent="center">
                            <Card sx={{ backgroundColor: "#f7f4cd", border: "1px solid black", padding: 2, width: "100%", maxWidth: 500 }}>
                                <Typography variant="h6" align="center">No items in your wishlist</Typography>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Wishlist;



