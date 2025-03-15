// import React, { useEffect, useState, useRef } from 'react';
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   Grid,
//   TextField,
//   Tooltip,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   Skeleton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from '@mui/material';
// import { AddCircle, Delete, FileUpload, Category } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// // Custom styled components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #1c305c 30%, #4a90e2 90%)',
//   padding: theme.spacing(2),
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   borderRadius: '16px',
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   width: '300px', // Fixed width
//   height: '300px', // Fixed height
//   display: 'flex',
//   flexDirection: 'column',
//   background: 'rgba(255, 255, 255, 0.8)', // Glass-morphism effect
//   backdropFilter: 'blur(10px)',
//   border: '1px solid rgba(255, 255, 255, 0.3)',
//   '&:hover': {
//     transform: 'scale(1.05)',
//     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
//   },
// }));

// const GradientText = styled(Typography)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #1c305c, #4a90e2)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   fontWeight: 'bold',
// }));

// const ImagePlaceholder = styled(Skeleton)(({ theme }) => ({
//   height: '200px',
//   width: '100%',
//   borderRadius: '12px',
// }));

// const Carousels = () => {
//   const [open, setOpen] = useState(false);
//   const [images, setImages] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [category, setCategory] = useState('');
//   const [msgOpen, setMsgOpen] = useState(false);
//   const [color, setColor] = useState('');
//   const [loading, setLoading] = useState(true); // Loading state
//   const fileInputRef = useRef(null);

//   const handleImageChange = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         const newImages = [...images];
//         newImages[index] = URL.createObjectURL(file);
//         setImages(newImages);

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
//           formData.append('upload_preset', 'ae1kvvqp');

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
//             return data.secure_url;
//           } else {
//             setMsgOpen(true);
//             setColor('error');
//             setMsg('Failed to upload image');
//             throw new Error('Failed to upload image.');
//           }
//         })
//       );

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

//   const categoryRegister = async () => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");

//       const uploadimage = await uploadImage();

//       const raw = JSON.stringify({
//         "categoryname": category,
//         "addimages": uploadimage
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//       };

//       fetch("/api/category", requestOptions)
//         .then(async (response) => {
//           if (response.status === 200 || response.status === 400) {
//             return { status_code: response.status, data: await response.json() };
//           } else {
//             return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//           }
//         })
//         .then((result) => {
//           setCategories(result.data.data);
//           window.location.reload();
//           console.log(result, "category");
//         })
//         .catch(error => console.log('error', error));

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getCategory();
//   }, []);

//   const getCategory = () => {
//     try {
//       const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };

//       fetch("/api/categorylist", requestOptions)
//         .then(async (response) => {
//           if (response.status === 200 || response.status === 400) {
//             return { status_code: response.status, data: await response.json() };
//           } else {
//             return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//           }
//         })
//         .then((result) => {
//           setCategories(result.data.data);
//           setLoading(false); // Stop loading
//           console.log(result.data.data, "category data");
//         })
//         .catch(error => console.log('error', error));

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteCategory = (categoryid) => {
//     try {
//       const requestOptions = {
//         method: "DELETE",
//         redirect: "follow"
//       };

//       fetch(`/api/category_delete?id=${categoryid}`, requestOptions)
//         .then(async (response) => {
//           if (response.status === 200 || response.status === 400) {
//             return { status_code: response.status, data: await response.json() };
//           } else {
//             return { status_code: response.status, data: { msg: 'Unexpected Error' } };
//           }
//         })
//         .then((result) => {
//           setCategories((prev) => prev.filter((cat) => cat._id !== categoryid));
//           console.log(result, "Delete data");
//         })
//         .catch(error => console.log('error', error));

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }}>
//         <StyledAppBar position="static">
//           <Toolbar>
//             <Grid container direction="row" justifyContent="space-between" alignItems="center">
//               <Grid item container direction="row" alignItems="center" xs={6}>
//                 <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0.5 }}>
//                   <Category />
//                 </IconButton>
//                 <GradientText variant="h6" component="div">
//                   Category List
//                 </GradientText>
//               </Grid>
//               <Grid item container direction="row" justifyContent="flex-end" alignItems="center" xs={6}>
//                 <Button onClick={handleClickOpen} color="inherit">
//                   <AddCircle sx={{ mr: 0.5 }} /> Add Category
//                 </Button>
//               </Grid>
//             </Grid>
//           </Toolbar>
//         </StyledAppBar>
//       </Box>

//       <Grid mt={5} mb={5} container spacing={3} sx={{ padding: '0 24px' }}>
//         {loading ? (
//           // Loading skeleton
//           Array.from({ length: 4 }).map((_, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <StyledCard>
//                 <ImagePlaceholder variant="rectangular" />
//                 <CardContent>
//                   <Skeleton variant="text" width="60%" height={30} />
//                 </CardContent>
//               </StyledCard>
//             </Grid>
//           ))
//         ) : Array.isArray(categories) && categories.length > 0 ? (
//           categories.map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <StyledCard>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     sx={{ height: 250, objectFit: 'cover' }}
//                     image={item.addimages || 'https://via.placeholder.com/300'}
//                     alt={item.categoryname}
//                   />
//                   <CardContent>
//                     <Grid container direction="row" justifyContent="space-between" alignItems="center">
//                       <GradientText variant="h6" component="div">
//                         {item.categoryname}
//                       </GradientText>
//                       <Tooltip title="Delete Category">
//                         <IconButton onClick={() => deleteCategory(item._id)}>
//                           <Delete color="error" />
//                         </IconButton>
//                       </Tooltip>
//                     </Grid>
//                   </CardContent>
//                 </CardActionArea>
//               </StyledCard>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
//             No categories available
//           </Typography>
//         )}
//       </Grid>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             background: 'rgba(255, 255, 255, 0.8)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.3)',
//           },
//         }}
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Create New Category"}
//         </DialogTitle>
//         <DialogContent sx={{ width: "600px" }}>
//           <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
//             <Grid mt={2} item xs={12} sm={6} container direction="column" justifyContent="space-evenly" alignItems="center">
//               <TextField
//                 label="Category Name"
//                 variant="outlined"
//                 fullWidth
//                 onChange={(e) => setCategory(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6} container direction="column" justifyContent="space-between" alignItems="flex-start">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={(event) => handleImageChange(0, event)}
//                 accept="image/*"
//                 style={{ display: 'none' }}
//               />
//               <Button variant="contained" sx={{ backgroundColor: "#1c305c" }} onClick={handleUploadClick}>
//                 <FileUpload sx={{ mr: 0.5 }} /> Upload
//               </Button>

//               {msgOpen && <div style={{ color: color === 'error' ? 'red' : 'green', marginTop: "10px" }}>{msg}</div>}

//               {images[0] && <img src={images[0]} alt="Preview" style={{ width: '200px', height: '200px', marginTop: "10px", borderRadius: '8px' }} />}
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Grid container direction="row" justifyContent="space-between" alignItems="center">
//             <Button onClick={handleClose}>Close</Button>
//             <Button onClick={categoryRegister}>Save</Button>
//           </Grid>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Carousels;


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
import { AddCircle, Delete, FileUpload, Category, Edit } from '@mui/icons-material';
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
  const [editOpen, setEditOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState('');
  const [category, setCategory] = useState('');
  const [editCategory, setEditCategory] = useState(null);
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

  const updateCategory = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const uploadimage = await uploadImage();

      const raw = JSON.stringify({
        "categoryname": category,
        "addimages": uploadimage
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`/api/category_update?id=${editCategory._id}`, requestOptions)
        .then(async (response) => {
          if (response.status === 200 || response.status === 400) {
            return { status_code: response.status, data: await response.json() };
          } else {
            return { status_code: response.status, data: { msg: 'Unexpected Error' } };
          }
        })
        .then((result) => {
          setCategories((prev) => prev.map((cat) => cat._id === editCategory._id ? result.data.data : cat));
          setEditOpen(false);
          console.log(result, "category updated");
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

  const handleEditOpen = (category) => {
    setEditCategory(category);
    setCategory(category.categoryname);
    setImages([category.addimages]);
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setEditCategory(null);
    setCategory('');
    setImages([]);
    setFiles([]);
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
                      <Tooltip title="Edit Category">
                        <IconButton onClick={() => handleEditOpen(item)}>
                          <Edit color="primary" />
                        </IconButton>
                      </Tooltip>
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
        open={open || editOpen}
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
          {editOpen ? "Edit Category" : "Create New Category"}
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
            <Grid mt={2} item xs={12} sm={6} container direction="column" justifyContent="space-evenly" alignItems="center">
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                value={category}
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
            <Button onClick={editOpen ? updateCategory : categoryRegister}>{editOpen ? "Update" : "Save"}</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Carousels;