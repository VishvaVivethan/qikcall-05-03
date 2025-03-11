// import React, { useEffect, useState,useRef  } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCarousel,
//   CCarouselCaption,
//   CCarouselItem,
//   CCol,
//   CRow,
// } from '@coreui/react'
// // import { DocsExample } from 'src/components'

// // import AngularImg from 'src/assets/images/angular.jpg'
// // import ReactImg from 'src/assets/images/react.jpg'
// // import VueImg from 'src/assets/images/vue.jpg'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import {Typography,Button,Grid,TextField,Tooltip,Card,CardMedia,CardContent} from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import CategoryIcon from '@mui/icons-material/Category';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import UploadIcon from '@mui/icons-material/Upload';
// import { Container } from 'postcss'
// import DeleteIcon from '@mui/icons-material/Delete';
// import FileUploadIcon from '@mui/icons-material/FileUpload';

// const slidesLight = [
//   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23AAA%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F5F5F5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23BBB%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23E5E5E5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
// ]

// const Carousels = () => {

//   const [open, setOpen] = React.useState(false);
//   const [images, setImages] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [data, setData] = useState([]);
//   const [Delete, setDelete] = useState([]);
//   const [deleteopen,DeleteOpen] = useState('')
//   const [categories, setCategories] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [category, setCategory] = useState('');
//   const [msgOpen, setMsgOpen] = useState(false);
//   const [color, setColor] = useState(''); // Success or error
//   const fileInputRef = useRef(null);

//   const handleImageChange = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         // Create a preview URL and update the images array
//         const newImages = [...images];
//         newImages[index] = URL.createObjectURL(file); 
//         setImages(newImages);

//         // Store the actual file object for uploading later
//         const newFiles = [...files];
//         newFiles[index] = file;
//         setFiles(newFiles);
//       } else {
//         alert('Please select a valid image file.');
//       }
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const uploadedImageUrls = await Promise.all(
//         files.map(async (file) => {
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('upload_preset', 'ae1kvvqp'); // Your Cloudinary preset

//           const response = await fetch(
//             'https://api.cloudinary.com/v1_1/qikcall/image/upload',
//             {
//               method: 'POST',
//               body: formData,
//             }
//           );

//           const data = await response.json();

//           if (data.secure_url) {
//             console.log(data.secure_url, 'Image uploaded successfully');
//             return data.secure_url; // Return the secure URL from Cloudinary
//           } else {
//             setMsgOpen(true);
//             setColor('error');
//             setMsg('Failed to upload image');
//             throw new Error('Failed to upload image.');
//           }
//         })
//       );

//       // All images uploaded successfully
//       setMsgOpen(true);
//       setColor('success');
//       setMsg('Images uploaded successfully');
//       return uploadedImageUrls;
//     } catch (error) {
//       setMsgOpen(true);
//       setColor('error');
//       setMsg('Error uploading images');
//       throw error;
//     }
//   };

// const categoryRegister= async()=>{
//   try{
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const uploadimage = await uploadImage();
    
//     const raw = JSON.stringify({
//       "categoryname": category,
//       "addimages": uploadimage
//     });
    
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };
    
//     fetch("/api/category", requestOptions)
//     .then(async (response) => {
//       if (response.status === 200 || response.status === 400) {
//         return { status_code: response.status, data: await response.json() };
//       } else {
//         return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//       }
//     })
//     .then((result) => {
//       setData(result)
//       window.location.reload()
//       console.log(result,"category")
//      })
//     .catch(error => console.log('error', error));

//   }catch(error){
//     console.error(error);
//   }
// }

// useEffect(() => {
//   getCategory()
// }, []); 

// const getCategory =()=>{
//   try{
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };
    
//     fetch("/api/categorylist", requestOptions)
//     .then(async (response) => {
//       if (response.status === 200 || response.status === 400) {
//         return { status_code: response.status, data: await response.json() };
//       } else {
//         return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//       }
//     })
//     .then((result) => {
//       setCategories(result.data.data)
//       console.log(result.data.data,"category data")
//      })
//     .catch(error => console.log('error', error));

//   }catch(error){
//     console.error(error);
//   }
// }

// const deleteCategory = (categoryid)=>{
//   try{
//     const requestOptions = {
//       method: "DELETE",
//       redirect: "follow"
//     };
    
//     fetch(`/api/category_delete?id=${categoryid}`, requestOptions)
//     .then(async (response) => {
//       if (response.status === 200 || response.status === 400) {
//         return { status_code: response.status, data: await response.json() };
//       } else {
//         return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//       }
//     })
//     .then((result) => {
//       setDelete(result)
//       window.location.reload()
//       console.log(result,"Delete data")
//      })
//     .catch(error => console.log('error', error));

//   }catch(error){
//     console.error(error);
//   }
// }



// const handleDeleteOpen = (categoryid) => {
//   deleteCategory(categoryid)
//   console.log(categoryid,"grow up")
// };

// const handleDeleteClose = () => {
//   DeleteOpen(false);
// };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click(); // Programmatically trigger the file input click
//   };


//   return (
//    <>
//     <Box sx={{ flexGrow: 1 }}>
//     <AppBar position="static">
//       <Toolbar variant="dense">
//         <Grid container direction="row" justifyContent="space-between" alignItems="center">
//           <Grid item xs={6} container direction="row" alignItems="center">
//             <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
//               <CategoryIcon />
//             </IconButton>
//             <Typography variant="h6" color="inherit" component="div">
//               Category List
//             </Typography>
//           </Grid>
//           <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
//             <Button onClick={handleClickOpen} color="inherit"> <AddCircleIcon sx={{ mr: 0.5 }}/> Add Category</Button>
//           </Grid>
//         </Grid>
//         <Dialog
       
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Create New Category"}
//         </DialogTitle>
//         <DialogContent sx={{width:"600px"}}>
//         <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
//       <Grid mt={2} item xs={12} sm={6} container direction="column" justifyContent="space-evenly" alignItems="center">
//         <TextField
//           label="Category Name"
//           variant="outlined"
//           fullWidth
//           onChange={(e) => {
//             setCategory(e.target.value);
//           }}
//         />
//       </Grid>

//       <Grid item xs={12} sm={6} container direction="column" justifyContent="space-between" alignItems="flex-start">
//         <input
//           type="file"
//           ref={fileInputRef} // Attach ref to the input
//           onChange={(event) => handleImageChange(0, event)}
//           accept="image/*"
//           style={{ display: 'none' }} // Hide the file input
//         />
//         <Button variant='contained' sx={{backgroundColor:"#1c305c"}} onClick={handleUploadClick}><FileUploadIcon/>Upload</Button>

//         {msgOpen && <div style={{ color: color === 'error' ? 'red' : 'green',marginTop:"10px" }}>{msg}</div>}

//         {/* Image Preview */}
//         {images[0] && <img src={images[0]} alt="Preview" style={{ width: '200px', height: '200px',marginTop:"10px" }} />}
//       </Grid>
//     </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Grid container direction="row" justifyContent="space-between" alignItems="center">
//           <Button  onClick={handleClose}>
//             Close
//           </Button>
//           <Button onClick={categoryRegister} >
//             Save
//           </Button>
//           </Grid>
//         </DialogActions>
//       </Dialog>
//       </Toolbar>
//     </AppBar>
//   </Box>

//   <Grid mt={5} mb={5} container spacing={2}>
//   {Array.isArray(categories) && categories.length > 0 ? (
//     categories.map((item, index) => (
//       <Grid item xs={12} sm={6} md={3} key={index}> {/* Changed to md={3} to fit 4 cards per row */}
//         <Card sx={{ display: 'flex', padding: 1, }}>
//           <CardMedia
//             component="img"
//             sx={{ width: 50, height: 50 }}
//             image={item.addimages} // Your image source here from item
//             alt={item.categoryname} // Your alt text
//           />
//           <Grid container direction="row" justifyContent="space-around" alignItems="center">
//             <Typography sx={{ marginLeft: "10px",fontSize:"15px" }} >{item.categoryname}</Typography>
//             <IconButton onClick={() => { handleDeleteOpen(item._id) }}>
//               <DeleteIcon sx={{fontSize:"15px"}} color='error' />
//             </IconButton>
//           </Grid>
//         </Card>
//       </Grid>
//     ))
//   ) : (
//     <Typography variant="body2" color="text.secondary">
//       No categories available
//     </Typography>
//   )}
// </Grid>


//    </>
//   )
// }
// export default Carousels
import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  Tooltip,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AddCircle, Delete, FileUpload, Category } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1c305c 30%, #4a90e2 90%)',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  width: '300px', // Fixed width
  height: '300px', // Fixed height
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.8)', // Glass-morphism effect
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1c305c, #4a90e2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const ImagePlaceholder = styled(Skeleton)(({ theme }) => ({
  height: '200px',
  width: '100%',
  borderRadius: '12px',
}));

const Carousels = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState('');
  const [category, setCategory] = useState('');
  const [msgOpen, setMsgOpen] = useState(false);
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const fileInputRef = useRef(null);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);

        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const uploadImage = async () => {
    try {
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'ae1kvvqp');

          const response = await fetch(
            'https://api.cloudinary.com/v1_1/qikcall/image/upload',
            {
              method: 'POST',
              body: formData,
            }
          );

          const data = await response.json();

          if (data.secure_url) {
            console.log(data.secure_url, 'Image uploaded successfully');
            return data.secure_url;
          } else {
            setMsgOpen(true);
            setColor('error');
            setMsg('Failed to upload image');
            throw new Error('Failed to upload image.');
          }
        })
      );

      setMsgOpen(true);
      setColor('success');
      setMsg('Images uploaded successfully');
      return uploadedImageUrls;
    } catch (error) {
      setMsgOpen(true);
      setColor('error');
      setMsg('Error uploading images');
      throw error;
    }
  };

  const categoryRegister = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const uploadimage = await uploadImage();

      const raw = JSON.stringify({
        "categoryname": category,
        "addimages": uploadimage
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/category", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setCategories(result.data.data);
          window.location.reload();
          console.log(result, "category");
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("/api/categorylist", requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setCategories(result.data.data);
          setLoading(false); // Stop loading
          console.log(result.data.data, "category data");
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = (categoryid) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

      fetch(`/api/category_delete?id=${categoryid}`, requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setCategories((prev) => prev.filter((cat) => cat._id !== categoryid));
          console.log(result, "Delete data");
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item container direction="row" alignItems="center" xs={6}>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
                  <Category />
                </IconButton>
                <GradientText variant="h6" component="div">
                  Category List
                </GradientText>
              </Grid>
              <Grid item container direction="row" justifyContent="flex-end" alignItems="center" xs={6}>
                <Button onClick={handleClickOpen} color="inherit">
                  <AddCircle sx={{ mr: 0.5 }} /> Add Category
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </StyledAppBar>
      </Box>

      <Grid mt={5} mb={5} container spacing={3} sx={{ padding: '0 24px' }}>
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StyledCard>
                <ImagePlaceholder variant="rectangular" />
                <CardContent>
                  <Skeleton variant="text" width="60%" height={30} />
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : Array.isArray(categories) && categories.length > 0 ? (
          categories.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StyledCard>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: 250, objectFit: 'cover' }}
                    image={item.addimages || 'https://via.placeholder.com/300'}
                    alt={item.categoryname}
                  />
                  <CardContent>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <GradientText variant="h6" component="div">
                        {item.categoryname}
                      </GradientText>
                      <Tooltip title="Delete Category">
                        <IconButton onClick={() => deleteCategory(item._id)}>
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
            No categories available
          </Typography>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create New Category"}
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
            <Grid mt={2} item xs={12} sm={6} container direction="column" justifyContent="space-evenly" alignItems="center">
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} container direction="column" justifyContent="space-between" alignItems="flex-start">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(event) => handleImageChange(0, event)}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <Button variant="contained" sx={{ backgroundColor: "#1c305c" }} onClick={handleUploadClick}>
                <FileUpload sx={{ mr: 0.5 }} /> Upload
              </Button>

              {msgOpen && <div style={{ color: color === 'error' ? 'red' : 'green', marginTop: "10px" }}>{msg}</div>}

              {images[0] && <img src={images[0]} alt="Preview" style={{ width: '200px', height: '200px', marginTop: "10px", borderRadius: '8px' }} />}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={categoryRegister}>Save</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Carousels;