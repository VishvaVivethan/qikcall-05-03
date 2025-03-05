var express = require('express');
var router = express.Router();
var controller = require("../controller/controller")
var {sendNotification} = require("../sendNotification")
var auth = require('../helper').verfication;
const{emailVerificationLimit} = require('../emailsender/sender');




// USER SIDE

router.post('/register', controller.registerUser);

router.post('/login', controller.userlogin);

router.post('/verifyemail',emailVerificationLimit, controller.LoginbyEmail);

router.put('/user_update', controller.userUpdate);

router.get('/userdetails',controller.getuserdata);

router.get('/details',auth,controller.getuserdataById);

router.delete('/userdelete', controller.deleteUser);

router.get('/useradmin',controller.userAdmin);

router.post('/rating', controller.ratingRegister);

router.post('/wishlist', controller.wishlistRegister);

router.delete('/delete_wishlist', controller.Deletewishlist);

router.get('/wishlistdata', controller.wishlistData);

router.post('/search', controller.getSearchDetails);

router.post('/search_pincode', controller.getSearchPincode);

router.post('/district', controller.districtRegister);

router.get('/getdistrict', controller.getDistrict);


router.get('/districtdata',controller.getdistrictdata);

router.post('/area', controller.getArea);

router.post('/areadata', controller.getareadata);



// ADMIN SIDE

router.post('/admin', controller.registerAdmin);

router.post('/adminlogin', controller.adminLogin);

router.get('/admindetails',controller.getAdmin);


// FOR CATEGORY 

router.post('/category', controller.categoryRegister);

router.get('/categorylist',controller.getCategory);

router.get('/categorydata',controller.getcategorydata);

router.put('/category_update', controller.categoryUpdate);

router.delete('/category_delete', controller.categoryDelete);

// FOR SERVICE

router.post('/service', controller.serviceRegister);

router.put('/serviceupdate', controller.serviceUpdate);

router.get('/servicelists',controller.getServicelists);

router.get('/servicedata',controller.getServicedata);

router.delete('/delete_service',controller.DeleteServicedata);

// ADVERTISE SIDE

router.post('/advertise', controller.AdvertisePost);

router.get('/advertisedetail',controller.getAdvertise); 

router.get('/advertisedata',controller.getadvertisedataById);

router.put('/advertise_update', controller.advertiseUpdate);

router.delete('/delete_advertise', controller.DeleteAdvertise);

// For Offers

router.post('/offer', controller.PostOffer);

router.get('/offerdetail',controller.getOffer); 

router.get('/offerdata',controller.getofferById);

router.put('/offer_update', controller.OfferUpdate);

router.delete('/delete_offer', controller.OfferAdvertise);

// For Bizsales

router.post('/bizsales', controller.PostBizsales);

router.get('/bizsalesdetail',controller.getBizsales); 

router.get('/bizsalesdata',controller.getBizsalesData);

router.put('/bizsales_update', controller.bizsalesUpdate);

router.delete('/delete_bizsales', controller.DeleteBizsales);

// For Plan

router.post('/plan', controller.PlanPost);

router.get('/plandetail',controller.getPlan); 

// For Notification

router.post('/send', sendNotification);

router.get('/getnotification',controller.getNotificaton)

// For Statstics

router.get('/usercount',controller.Countuser)

router.get('/servicecount',controller.CountServices)

router.get('/advertisecount',controller.CountAdvertise)

router.get('/offercount',controller.CountOffers)

router.get('/salescount',controller.CountBizsales)

router.get('/todayregisteruser',controller.getTodayRegisteredUsers)

router.get('/todayregisteradvertise',controller.getTodayRegisteredAdvertise)

// For PostJobs

router.post('/postjobs', controller.PostJobs);

router.get('/getpostjobs', controller.getPostJobs);

router.get('/getappliedjobs', controller.getAppliedPost);

// For ApplyJobs

router.post('/applyjobs', controller.ApplyJobs);

router.get('/getapplyjobs', controller.getApplyJobs);




module.exports = router;
