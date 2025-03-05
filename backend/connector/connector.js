const mongoose = require('mongoose');
const fetch = require('node-fetch');
// const { Auth, LoginCredentials } = require("two-step-auth");
var returnResponseJson = require('../helper').returnResponseJson;
const UserRegister = require('../schema/registeruser').UserRegister;
const registerUser = mongoose.model("registeruser", UserRegister);
const Advertise = require ('../schema/advertise').AdvertiseSchema;
const AdvertisePost = mongoose.model("advertise",Advertise)
const Service = require('../schema/service') .ServiceSchema;
const serviceRegister = mongoose.model("servicelist",Service)
const Category = require('../schema/category').CategorySchema;
const categoryRegister = mongoose.model("Category",Category)
const Rating = require('../schema/rating').RatingSchema;
const ratingRegister = mongoose.model("Rating",Rating)
const Admin = require('../schema/admin').AdminSchema;
const registerAdmin = mongoose.model("adminregister",Admin)
const Wishlist = require('../schema/wishlist').WishlistSchema
const wishlistRegister= mongoose.model("Wishlist",Wishlist)
const Offer = require('../schema/todayoffer').OfferSchema
const offeregister = mongoose.model("Todayoffer",Offer)
const Bizsales = require('../schema/bizsales').BizsalesSchema
const bizsalesRegister = mongoose.model("Bizsales",Bizsales)
const Plansubscription = require('../schema/plan').PlanSchema
const planRegister = mongoose.model("Membership",Plansubscription)
const Notification = require('../schema/notification').notificationSchema;
const notification = mongoose.model("Notificatons",Notification)
const District = require('../schema/district').DistrictSchema
const registerDistrict = mongoose.model("Districts",District)
const JobPost = require('../schema/jobposting').JobPostingSchema
const postJobs = mongoose.model("JobPost",JobPost)
const ApplyJob = require('../schema/jobapplying').JobApplyingSchema
const jobApply = mongoose.model("ApplyJob",ApplyJob)
const ObjectId = mongoose.Types.ObjectId;





module.exports.registerUser = async function (object) {
  try {

    let userData = {
      username: object.username,
      email: object.email,
      password: object.password,
      phonenumber: object.phonenumber,
      addressline1: object.addressline1,
      addressline2: object.addressline2,
      pincode: object.pincode,
          city: object.city,
          state: object.state,
          
          isdelete:object.isdelete
  };
  
  // Add additional fields based on role
  if (object.role === "customer") {
      userData.role = object.role;
      // Include any other fields that are specific to customers
  } else if (object.role === "businessman") {
      userData = {
        ...userData,
          role: object.role,
          pannumber: object.pannumber,
          // servicename: object.servicename,
          // servicetype: object.servicetype,
          // servicecategory: object.servicecategory,
          // servicedescription: object.servicedescription,
          // websitelink: object.websitelink,
          // addimages1: object.addimages1,
          // addimages2: object.addimages2,
          membership: object.membership,
          aadharnumber: object.aadharnumber,
          gstnumber: object.gstnumber,
          upload: object.upload,
          landmark: object.landmark,
          isapprove:object.isapprove,
          alterphonenumber: object.alterphonenumber,
      };
  } else if (object.role === "freelancer") {
      userData = {
          ...userData,
          role: object.role,
          alterphonenumber: object.alterphonenumber,
          aadharnumber: object.aadharnumber,
          pannumber: object.pannumber,
          membership: object.membership,
          earning: object.earning,
          isapprove:object.isapprove,
      };
  }
  

    var user = new registerUser(userData);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.userlogin = async function (value) {
  try {
    const user = await registerUser.findOne({ phonenumber: value.phonenumber})

    // const data = [user.password,user.role,user.phonenumber]

    if (!user) {
      return returnResponseJson('User Not Found', 400);
    }
    return returnResponseJson('Login sucessfull', 200,user);
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500);
  }
}



module.exports.LoginbyEmail = async function (emailId) {
  try {
    const isAdded = await registerUser.findOne({ email: emailId });
    console.log(isAdded, "SSSSSSSSSSS");

    if (isAdded) {
      return {
        status: 200,
        message: "Verification email sent!",
        data: isAdded // Changed to `data` to match with the controller.
      };
    } else {
      return {
        status: 404,
        message: "This Email is not registered!",
      };
    }
  } catch (error) {
    console.error("Error during search:", error);
    return {
      status: 500,
      message: "Server Error",
      error: error.message || "Unknown error",
    };
  }
};





module.exports.userUpdate = async function (update, ids) {
  try {
    console.log(update, ids, "update, ids");
    
    const { username, email, phonenumber, addressline1, addressline2, city, state, pincode, isapprove, profilepicture,membership,gstnumber,aadharnumber,pannumber,role,alterphonenumber } = update;
    console.log('Updating user data with isapprove:', isapprove); // Ensure isapprove is being logged

    // Find if email already exists for another user
    const existingUser = await registerUser.findOne({ email: email, _id: { $ne: ids } });
    if (existingUser) {
      return returnResponseJson('Email already in use', 400, null);
    }

    // Proceed with updating the user
    const updatedUser = await registerUser.findByIdAndUpdate(
      ids,
      { 
        username, 
        email, 
        phonenumber,
        addressline1,
        addressline2,
        city,
        membership,
        state,
        pincode,
        isapprove, 
        profilepicture,
        gstnumber,
        aadharnumber,
        pannumber,
        role,
        alterphonenumber 
      },
      { new: true } 
    );

    return returnResponseJson('Update successful', 200, updatedUser);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: email already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};



module.exports.getuserdata = async function () {
  try {
    
  var user = await registerUser.find()  ;
if(user){
  return returnResponseJson('Fetch success', 200, user );
}else{
  return returnResponseJson('Data not found', 404 );
}
    
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.userAdmin = async function (id) {
  try {
    const data = await registerUser.aggregate([
      {
        '$match': { '_id': new mongoose.Types.ObjectId(id) }
      },
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");
      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};


module.exports.getuserdataById = async function (id) {
  try {
    const data = await registerUser.aggregate([
      {
        '$match': { '_id': new mongoose.Types.ObjectId(id) }
      },
      {
        '$lookup': {
          'from': 'servicelists', 
          'localField': 'phonenumber', 
          'foreignField': 'number', 
          'as': 'servicelist'
        }
      }, {
        '$unwind': {
          'path': '$servicelist', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'ratings', 
          'localField': 'servicelist.servicename', 
          'foreignField': 'storename', 
          'as': 'rating'
        }
      }
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");
      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.userDelete = async function (id) {
  try {

    const user = await registerUser.findByIdAndDelete(id);

    if (!user) {
      return returnResponseJson('User not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, user);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};






module.exports.ratingRegister = async function (data) {
  try {

    let Data = {
      username: data.username,
      storename:data.storename,
      rating: data.rating,
      comment: data.comment,
  };

  
  
  var user = new ratingRegister(Data);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.getSearch = async function (body) {
  try {
    const { servicename, number, city } = body;

    // Build the search conditions
    let conditions = [];

    if (servicename) {
      conditions.push({ servicename: new RegExp(servicename, "i") }); // Case-insensitive partial match
    }
    if (number) {
      conditions.push({ number: number }); // Exact match
    }
    if (city) {
      conditions.push({ city: new RegExp(city, "i") }); // Case-insensitive partial match
    }

    // Use $or to match any of the conditions
    const filter = conditions.length > 0 ? { $or: conditions } : {};

    // Perform the search using the filter object
    const users = await serviceRegister.find(filter);

    // Map the results to the desired format
    const userList = users.map(user => ({
      id: user._id,
      servicename: user.servicename,
      city: user.city,
      area: user.area,
      number: user.number,
      addressline1: user.addressline1,
      addressline2: user.addressline2,
      pincode: user.pincode,
      state: user.state,
      addimages: user.addimages,
    }));

    // Return the response with a success message
    return returnResponseJson("Fetch Successful", 200, userList);
  } catch (error) {
    console.error("Error during search:", error);

    // Return an error response with a relevant message
    return returnResponseJson("Server Error", 500, error.message || "Unknown error");
  }
};


module.exports.SearchbyPin = async function (body) {
  try {
    const { pincode } = body;

    // Build the search conditions
    let conditions = [];

    if (pincode) {
      conditions.push({ pincode: new RegExp(pincode, "i") }); // Case-insensitive partial match
    }
   

    // Use $or to match any of the conditions
    const filter = conditions.length > 0 ? { $or: conditions } : {};

    // Perform the search using the filter object
    const users = await serviceRegister.find(filter);

    // Map the results to the desired format
    const userList = users.map(user => ({
      id: user._id,
      servicename: user.servicename,
      city: user.city,
      number: user.number,
      addressline1: user.addressline1,
      addressline2: user.addressline2,
      area:user.area,
      pincode: user.pincode,
      state: user.state,
      addimages: user.addimages,
    }));

    // Return the response with a success message
    return returnResponseJson("Fetch Successful", 200, userList);
  } catch (error) {
    console.error("Error during search:", error);

    // Return an error response with a relevant message
    return returnResponseJson("Server Error", 500, error.message || "Unknown error");
  }
};

module.exports.wishlistRegister = async function (object) {
  try {
    const { storeId, customerId, isfavorite } = object;
    console.log(object, "data received");

    // Check if the wishlist entry already exists
    const existingWishlist = await wishlistRegister.findOne({ storeId, customerId });

    if (isfavorite) {
      if (existingWishlist) {
        return returnResponseJson('Already in Wishlist', 400, existingWishlist);
      }
      // Add to wishlist
      const wishlistData = new wishlistRegister({
        storeId,
        customerId,
        isfavorite
      });

      await wishlistData.save();
      return returnResponseJson('Added to Wishlist', 200, wishlistData);
    } else {
      // Remove from wishlist
      if (existingWishlist) {
        await wishlistRegister.deleteOne({ storeId, customerId });
        return returnResponseJson('Removed from Wishlist', 200, null);
      } else {
        return returnResponseJson('Not in Wishlist', 400, null);
      }
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};

module.exports.getwishlistdata = async function (userId) {
  try {
    const data = await registerUser.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(userId)
        }
      }, {
        '$lookup': {
          'from': 'wishlists', 
          'localField': '_id', 
          'foreignField': 'customerId', 
          'as': 'wishlist'
        }
      }, {
        '$unwind': {
          'path': '$wishlist', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$unwind': {
          'path': '$wishlist.storeId', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'servicelists', 
          'localField': 'wishlist.storeId', 
          'foreignField': '_id', 
          'as': 'service'
        }
      }, {
        '$unwind': {
          'path': '$service', 
          'preserveNullAndEmptyArrays': true
        }
      }
    ]);

    console.log(data, "show data");
    if (data.length > 0) {
      return returnResponseJson('Fetch data success', 200, data);
    } else {
      return returnResponseJson('No Wishlist Data Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};




module.exports.Deletewishlist = async function (id) {
  try {
    const wishlist = await wishlistRegister.findByIdAndDelete(id);

    if (!wishlist) {
      return returnResponseJson('wishlist not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, wishlist);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};


// module.exports.getwishlistdata = async function (req, res, next) {
//    try {
//      // Fetch the user ID from the query params
//      var formresponce = await userConnector.wishlistRegister(req.query.id);
  
//      if (formresponce) {
//        return res.status(formresponce.status).send(formresponce);
//      } else {
//        return res.status(404).send(returnResponseJson('User Not Found', 404));
//      }
//    } catch (error) {
//      console.error(error);
//      return res.status(500).send(returnResponseJson('Server Error', 500));
//    }
//  };

module.exports.getArea = async function (object) {
  try {
    // Ensure 'area' is provided in the request body
    if (!object || !object.area) {
      return returnResponseJson("Area is required", 400, null);
    }

    const { area, pincodename } = object;

    // Fetch postal data based on the area
    const response = await fetch(`https://api.postalpincode.in/postoffice/${area}`);
    const postalData = await response.json();

    // Check if postalData has valid data
    if (postalData && postalData[0].PostOffice) {
      // Filter data if pincodename is provided
      let filteredData = pincodename 
        ? postalData[0].PostOffice.filter(post => post.Pincode.toString() === pincodename) 
        : postalData[0].PostOffice;

      // Limit the data to 100 entries
      filteredData = filteredData.slice(0, 100);

      // Return the response
      return returnResponseJson("Fetch success", 200, filteredData);
    } else {
      return returnResponseJson("Fetch failed", 400, null);
    }

  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Server error', error: error.message };
  }
}




module.exports.getAreaData = async function (object) {
  try {
    const { area, pincodename } = object;
    console.log(`Fetching postal data for area: ${area}`);

    // Fetch postal data based on the area name
    const response = await fetch(`https://api.postalpincode.in/postoffice/${area}`);
    const postalData = await response.json();

    console.log(postalData, "Postal data fetched");

    // Check if the postal API returns valid data
    if (response.ok && postalData[0].Status === 'Success') {
      const areaData = postalData[0].PostOffice;

      console.log(areaData, "Area data");

      if (!areaData || areaData.length === 0) {
        return { status: 404, message: 'Area not found in postal API' };
      }

      // Check if the fetched area data contains the desired pincode
      const matchingAreas = areaData.filter(item => item.Pincode === pincodename);

      console.log(matchingAreas,"compared pincode")
      
      if (matchingAreas.length === 0) {
        return { status: 404, message: 'No matching pincode found for the area' };
      }

      // Get the pincode from the matched area
      const pincode = matchingAreas[0].Pincode;
      console.log(`Found matching pincode: ${pincode}`);

      // Fetch related areas based on the matching pincode
      const pincodeResponse = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const pincodeData = await pincodeResponse.json();

      console.log(pincodeData, "Pincode data fetched");

      if (pincodeResponse.ok && pincodeData[0].Status === 'Success') {
        const areasByPincode = pincodeData[0].PostOffice;
        console.log(areasByPincode, "Areas by Pincode fetched");

        // Database query for the area
        const areaInDB = await serviceRegister.findOne({ area: matchingAreas[0].Name });
        console.log(areaInDB, "Area in local DB");

        if (!areaInDB) {
          return { status: 404, message: 'Area not found in local database' };
        }

        const relatedAreas = await serviceRegister.find({ pincode: areaInDB.pincode });
        console.log(relatedAreas, "Related areas in local DB");

        return {
          status: 200,
          pincode: areaInDB.pincode,
          services: areaInDB,
          relatedAreas: relatedAreas.map(a => a.area),
          postalAPIResult: areasByPincode,
          postalData
        };
      } else {
        return { status: 404, message: 'Pincode not found in postal API' };
      }
    } else {
      return { status: 404, message: 'Area not found in postal API' };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Server error', error: error.message };
  }
};

// ADMIN SIDE


module.exports.registerAdmin = async function (object) {
  try {

   const userData = {
      username: object.username,
      email: object.email,
      password: object.password,
      phonenumber: object.phonenumber,
      role:object.role
  };

    var user = new registerAdmin(userData);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.adminlogin = async function (value) {
  try {
    const user = await registerAdmin.findOne({ email: value.email})

    // const data = [user.password,user.role,user.phonenumber]

    console.log(user,"love")
    if (!user) {
      return returnResponseJson('User Not Found', 400);
    }
    return returnResponseJson('Login sucessfull', 200,user);
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500);
  }
}

module.exports.getAdmin = async function () {
  try {

  var user = await registerAdmin.find()  ;

    return returnResponseJson('Register success', 200, user );
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};




// CATEGORY SIDE

module.exports.categoryRegister = async function (data) {
  try {

    let Data = {
      categoryname: data.categoryname,
      addimages: data.addimages,
  };
  
  var user = new categoryRegister(Data);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.getCategory = async function () {
  try {

  var user = await categoryRegister.find()  ;

    return returnResponseJson('Register success', 200, user );
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.getcategorydata = async function (id) {
  try {
    const data = await categoryRegister.aggregate([
      {
        '$match': { '_id': new mongoose.Types.ObjectId(id) }  
      },
      
        {
          '$lookup': {
            'from': 'servicelists', 
            'localField': 'categoryname', 
            'foreignField': 'servicetype', 
            'as': 'result'
          }
        }
      
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");

      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.categoryUpdate = async function (update, ids) {
  try {
    var { categoryname,addimages } = update;
    console.log(update, 'its update');

    // Find if email already exists for another user
    const existingUser = await categoryRegister.findOne({ categoryname: categoryname, _id: { $ne: ids } });
    if (existingUser) {
      return returnResponseJson('Category already in use', 400, null);
    }

    // Proceed with updating the user
    const users = await categoryRegister.findByIdAndUpdate(ids, { 
      categoryname: categoryname, 
      addimages: addimages, 
    }, { new: true });

    return returnResponseJson('Update successful', 200, users);
  } catch (error) {
    console.error(error);

    // Check if error is a duplicate key error
    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: email already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};


module.exports.categoryDelete = async function (id) {
  try {
    const category = await categoryRegister.findByIdAndDelete(id);

    if (!category) {
      return returnResponseJson('Category not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, category);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};





// SERVICE SIDE

module.exports.serviceRegister = async function (data) {
  try {

    var user = await serviceRegister.findOne({ servicename: data.servicename });
    console.log(user,"???????????")
    if (user) {
      return returnResponseJson('Already Registered', 400);
    }

    let serviceData = {
      servicename: data.servicename,
      number:data.number,
      logo: data.logo,
      servicetype: data.servicetype,
      servicedescription:data.servicedescription,
      addressline1: data.addressline1,
      addressline2: data.addressline2,
      area:data.area,
      landmark:data.landmark,
      pincode: data.pincode,
          city: data.city,
          state: data.state,
      websitelink: data.websitelink,
      addimages: data.addimages,
      freelisting:data.freelisting
  };
  
  var user = new serviceRegister(serviceData);

    if(user){
      return returnResponseJson('Register success', 200, await user.save());
    }else{
      return returnResponseJson('Register failed', 400, null);
    }
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.serviceUpdate = async function (update, ids) {
  try {
    console.log(update, ids, "update, ids");
    
    const { servicename, servicetype, number, servicedescription, addressline1, addressline2, pincode, landmark, isapprove, city,state,websitelink, addimages,freelisting } = update;
    console.log('Updating user data with isapprove:', isapprove); // Ensure isapprove is being logged

    const updatedservice = await serviceRegister.findByIdAndUpdate(
      ids,
      { 
        servicename, 
        servicetype, 
        number,
        addressline1,
        addressline2,
        city,
        state,
        pincode,
        isapprove, 
        servicedescription,
        landmark,
        websitelink,
        addimages,
        freelisting
      },
      { new: true } 
    );

    return returnResponseJson('Update successful', 200, updatedservice);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: email already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};


module.exports.getServicelists = async function () {
  try {
    const data = await serviceRegister.aggregate([
      {
        '$lookup': {
          'from': 'ratings', 
          'localField': 'servicename', 
          'foreignField': 'storename', 
          'as': 'ratings'
        }
      }
    ]);

    

      return returnResponseJson('Fetch data success', 200, data);
   
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.getServicedata = async function (id) {
  try {
    const data = await serviceRegister.aggregate([
      {
        '$match': { '_id': new ObjectId(id) }  
      },
      
        {
          '$lookup': {
            'from': 'ratings', 
            'localField': 'servicename', 
            'foreignField': 'storename', 
            'as': 'ratings'
          }
        }
      
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");

      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.DeleteServicedata = async function (id) {
  try {
    const Servicedata = await serviceRegister.findByIdAndDelete(id);

    if (!Servicedata) {
      return returnResponseJson('Servicedata not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, Servicedata);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};

// ADVERTISE SIDE

module.exports.AdvertisePost = async function (data) {
  try {
    // Structure the advertisement data
    let advertiseData = {
      adtitle: data.adtitle,
      addescription: data.addescription,
      adcategory: data.adcategory,
      location: data.location,
      storename: data.storename,
      pannumber: data.pannumber,
      aadharnumber: data.aadharnumber,
      gstnumber: data.gstnumber,
      emailid: data.emailid,
      contactnumber: data.contactnumber,
      startdate: data.startdate,
      enddate: data.enddate,
      upload: data.upload,          
      addimages: data.addimages,    
    };

    // Validation checks
    const missingFields = [];

    // Check for required fields
    if (!advertiseData.adtitle) missingFields.push('adtitle');
    if (!advertiseData.addescription) missingFields.push('addescription');
    if (!advertiseData.adcategory) missingFields.push('adcategory');
    if (!advertiseData.location) missingFields.push('location');
    if (!advertiseData.storename) missingFields.push('storename');
    if (!advertiseData.pannumber) missingFields.push('pannumber');
    if (!advertiseData.aadharnumber) missingFields.push('aadharnumber');
    if (!advertiseData.gstnumber) missingFields.push('gstnumber');
    if (!advertiseData.emailid) missingFields.push('emailid');
    if (!advertiseData.contactnumber) missingFields.push('contactnumber');
    if (!advertiseData.startdate) missingFields.push('startdate');
    if (!advertiseData.enddate) missingFields.push('enddate');
    if (!advertiseData.upload) missingFields.push('upload');

    // If there are missing fields, return an error
    if (missingFields.length > 0) {
      return returnResponseJson(
        `Validation Error: Missing fields`,
        400,
        null
      );
    }

    // Proceed with saving the data if validation passed
    var user = new AdvertisePost(advertiseData);
    if (user) {
      return returnResponseJson('Register success', 200, await user.save());
    } else {
      return returnResponseJson('Registration not successful', 400, null);
    }
  } catch (error) {
    console.error(error);

    // Check for duplicate key error
    if (error.code === 11000) {
      return returnResponseJson('Already Registered', 400);
    }

    // Generic server error
    return returnResponseJson('Server Error', 500, error.message || 'An unexpected error occurred');
  }
};


module.exports.getAdvertise = async function () {
  try {

    const data = await AdvertisePost.aggregate([
      {
        '$lookup': {
          'from': 'servicelists', 
          'localField': 'contactnumber', 
          'foreignField': 'number', 
          'as': 'service'
        }
      }
    ]);

    return returnResponseJson('Fetch success', 200, data );
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getAvertiseData = async function (id) {
  try {
    
    
      var user = await AdvertisePost.findById(id)  ;

      if(user){
        return returnResponseJson('Fetch success', 200, user );
      }else{
        return returnResponseJson('User not found', 400, null );
      }
    
       
     
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.advertiseUpdate = async function (update, ids) {
  try {
    var { adcategory, addescription, location, startdate, enddate, adtitle,isapprove,addimages,storename,contactnumber } = update;
    console.log(update, 'its update');

    // Find if email already exists for another user
    // const existingAdvertise = await AdvertisePost.findOne({ adtitle: adtitle });
    // if (existingAdvertise) {
    //   return returnResponseJson('Ad Title already in use', 400, null);
    // }

    // Proceed with updating the user
    const users = await AdvertisePost.findByIdAndUpdate(ids, { 
      adtitle: adtitle,
      adcategory: adcategory, 
      addescription: addescription, 
      storename:storename,
      location: location,
      contactnumber:contactnumber,
      startdate: startdate,
      enddate: enddate,
      isapprove:isapprove,
      addimages:addimages
    }, { new: true });

    return returnResponseJson('Update successful', 200, users);
  } catch (error) {
    console.error(error);

    // Check if error is a duplicate key error
    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: title already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};


module.exports.DeleteAdvertise = async function (id) {
  try {
    const Advertise = await AdvertisePost.findByIdAndDelete(id);

    if (!Advertise) {
      return returnResponseJson('Advertise not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, Advertise);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};

// TodayOffer side

module.exports.OfferPost = async function (data) {
  try {
    // Structure the advertisement data
    let OfferData = {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      storename: data.storename,
      pannumber: data.pannumber,
      aadharnumber: data.aadharnumber,
      gstnumber: data.gstnumber,
      emailid: data.emailid,
      contactnumber: data.contactnumber,
      startdate: data.startdate,
      enddate: data.enddate,
      upload: data.upload,          
      addimages: data.addimages,    
    };

   
    var user = new offeregister(OfferData);

    return returnResponseJson('Register success', 200,await user.save());
  } catch (error) {
    console.error(error);
    
    if ("E11000 duplicate key error collection") {
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.message || 'An unexpected error occurred');
  }
};

module.exports.getOffer = async function () {
  try {

    const data = await offeregister.aggregate([
      {
        '$lookup': {
          'from': 'servicelists', 
          'localField': 'contactnumber', 
          'foreignField': 'number', 
          'as': 'servicelist'
        }
      }, {
        '$unwind': {
          'path': '$servicelist', 
          'preserveNullAndEmptyArrays': true
        }
      }
    ]);

    return returnResponseJson('Fetch success', 200, data );
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getOfferData = async function (id) {
  try {
    
    
      var user = await offeregister.findById(id)  ;

      if(user){
        return returnResponseJson('Fetch success', 200, user );
      }else{
        return returnResponseJson('User not found', 400, null );
      }
    
       
     
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.OfferUpdate = async function (update, ids) {
  try {
    var { category, description, location, startdate, enddate, title,isapprove,addimages,storename } = update;
    console.log(update, 'its update');

    // Find if email already exists for another user
    // const existingAdvertise = await offeregister.findOne({ adtitle: adtitle });
    // if (existingAdvertise) {
    //   return returnResponseJson('Ad Title already in use', 400, null);
    // }

    // Proceed with updating the user
    const users = await offeregister.findByIdAndUpdate(ids, { 
      title: title,
      category: category, 
      description: description, 
      location: location,
      startdate: startdate,
      enddate: enddate,
      storename: storename,
      isapprove:isapprove,
      addimages:addimages
    }, { new: true });

    return returnResponseJson('Update successful', 200, users);
  } catch (error) {
    console.error(error);

    // Check if error is a duplicate key error
    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: title already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};


module.exports.DeleteOffer = async function (id) {
  try {
    const Advertise = await offeregister.findByIdAndDelete(id);

    if (!Advertise) {
      return returnResponseJson('Advertise not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, Advertise);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};

// Bizsales side

module.exports.bizsalesRegister = async function (data) {
  try {
    // Structure the advertisement data
    let OfferData = {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      pannumber: data.pannumber,
      aadharnumber: data.aadharnumber,
      gstnumber: data.gstnumber,
      emailid: data.emailid,
      contactnumber: data.contactnumber,
      startdate: data.startdate,
      enddate: data.enddate,
      upload: data.upload,          
      addimages: data.addimages,    
    };

   
    var user = new bizsalesRegister(OfferData);

    return returnResponseJson('Register success', 200,await user.save());
  } catch (error) {
    console.error(error);
    
    if ("E11000 duplicate key error collection") {
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.message || 'An unexpected error occurred');
  }
};

module.exports.getBizsales = async function () {
  try {

  var user = await bizsalesRegister.find()  ;

    return returnResponseJson('Fetch success', 200, user );
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.getBizsalesData = async function (id) {
  try {
    
    
      var user = await bizsalesRegister.findById(id)  ;

      if(user){
        return returnResponseJson('Fetch success', 200, user );
      }else{
        return returnResponseJson('User not found', 400, null );
      }
    
       
     
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.bizsalesUpdate = async function (update, ids) {
  try {
    var { category, description, location, startdate, enddate, title,isapprove,addimages } = update;
    console.log(update, 'its update');

    // Find if email already exists for another user
    // const existingAdvertise = await offeregister.findOne({ adtitle: adtitle });
    // if (existingAdvertise) {
    //   return returnResponseJson('Ad Title already in use', 400, null);
    // }

    // Proceed with updating the user
    const users = await bizsalesRegister.findByIdAndUpdate(ids, { 
      title: title,
      category: category, 
      description: description, 
      location: location,
      startdate: startdate,
      enddate: enddate,
      isapprove:isapprove,
      addimages:addimages
    }, { new: true });

    return returnResponseJson('Update successful', 200, users);
  } catch (error) {
    console.error(error);

    // Check if error is a duplicate key error
    if (error.code === 11000) {
      return returnResponseJson('Duplicate key error: title already exists', 400, null);
    }

    return returnResponseJson('Server Error', 500, error.message);
  }
};


module.exports.DeleteBizsales = async function (id) {
  try {
    const Advertise = await bizsalesRegister.findByIdAndDelete(id);

    if (!Advertise) {
      return returnResponseJson('Advertise not found', 404, null);
    }

    return returnResponseJson('Delete successful', 200, Advertise);
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500, error.message);
  }
};


// For Plan

module.exports.planRegister = async function (data) {
  try {
    
    let planData = {
      planname: data.planname,
      amount: data.amount,
      features: data.features 
    };
   
    var user = new planRegister(planData);

    return returnResponseJson('Register success', 200,await user.save());
  } catch (error) {
    console.error(error);
    
    if ("E11000 duplicate key error collection") {
      return returnResponseJson('Already Registered', 400);
    }
    return returnResponseJson('Server Error', 500, error.message || 'An unexpected error occurred');
  }
};

module.exports.getPlan = async function () {
  try {

  var user = await planRegister.find()  ;

  if(user){
    return returnResponseJson('Fetch success', 200, user );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


// For Notifications

module.exports.getNotiifcation = async function (id) {
  try {
    const data = await registerUser.aggregate([
      {
        '$match': {
          '_id': new  mongoose.Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'notificatons', 
          'localField': '_id', 
          'foreignField': 'userId', 
          'as': 'notification'
        }
      }
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");

      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.registerDistrict = async function (data) {
  try {

    let Data = {
      district: data.district,
     
  };

  var user = new registerDistrict(Data);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Not Found', 404);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getDistrict = async function () {
  try {

  var user = await registerDistrict.find()  ;

  if(user){
    return returnResponseJson('Fetch success', 200, user );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getdistrictdata = async function (id) {
  try {
    const data = await registerDistrict.aggregate([
      {
        '$match': { '_id': new mongoose.Types.ObjectId(id) }  
      },
      
      {
        '$lookup': {
          'from': 'servicelists', 
          'localField': 'district', 
          'foreignField': 'city', 
          'as': 'service'
        }
      }
      
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");

      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('Data Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

// For Statstics

module.exports.Countuser = async function () {
  try {

  var usercount = await registerUser.countDocuments({ role: 'customer' });  
  const freelancerCount = await registerUser.countDocuments({ role: 'freelancer' });
  const businessmanCount = await registerUser.countDocuments({ role: 'businessman' });

  console.log(`Total users: ${usercount}`);
  console.log(`Total freelancers: ${freelancerCount}`);
  console.log(`Total businessmen: ${businessmanCount}`);

  if(usercount,freelancerCount,businessmanCount){
    return returnResponseJson('Fetch success', 200, [usercount,freelancerCount,businessmanCount] );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
    
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.CountServices = async function () {
  try {

  var servicecount = await serviceRegister.countDocuments();
  var freelistingcount = await serviceRegister.countDocuments({ freelisting:'true' });  
  
  if(servicecount,freelistingcount){
    return returnResponseJson('Fetch success', 200, [servicecount,freelistingcount] );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
    
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.CountAdvertise = async function () {
  try {

  var advertisecount = await AdvertisePost.countDocuments();
  
  
  if(advertisecount){
    return returnResponseJson('Fetch success', 200, advertisecount );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
    
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.CountOffers = async function () {
  try {

  var offercount = await offeregister.countDocuments();
  
  
  if(offercount){
    return returnResponseJson('Fetch success', 200, offercount );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
    
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.CountBizsales = async function () {
  try {

  var bizsalescount = await bizsalesRegister.countDocuments();
  
  
  if(bizsalescount){
    return returnResponseJson('Fetch success', 200, bizsalescount );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
    
  } catch (error) {
    console.error(error)
    
    return returnResponseJson('Server Error', 500, error.msg);
  }
};


module.exports.getTodayRegisteredUsers = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);  

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);  

    // Query users registered today
    const todayUsers = await registerUser.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if(todayUsers){
      return returnResponseJson('Fetch success', 200,todayUsers );
    }else{
      return returnResponseJson('No Users Registered today', 404,null);
    }
      
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch today\'s registered users' });
  }
};

module.exports.getTodayRegisteredAdvertise = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);  

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);  

    // Query users registered today
    const todayUsers = await AdvertisePost.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if(todayUsers){
      return returnResponseJson('Fetch success', 200,todayUsers );
    }else{
      return returnResponseJson('No Users Registered today', 404,null);
    }
      
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch today\'s registered users' });
  }
};

// Jobs side

module.exports.postJobs = async function (data) {
  try {

    let Data = {
      customerId:data.customerId,
      title: data.title,
      category: data.category,
      companyname:data.companyname,
      location:data.location,
      city:data.city,
      state:data.state,
      jobdescription:data.jobdescription,
      experiance:data.experiance,
      salary:data.salary,
      companydetails:data.companydetails  
  };

  var user = new postJobs(Data);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400,error);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getPostJobs = async function () {
  try {

  var user = await postJobs.find()  ;

  if(user){
    return returnResponseJson('Fetch success', 200, user );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getAppliedPost = async function (id) {
  try {
    const data = await registerUser.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'jobposts', 
          'localField': '_id', 
          'foreignField': 'customerId', 
          'as': 'jobposted'
        }
      }, {
        '$unwind': {
          'path': '$jobposted', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'applyjobs', 
          'localField': 'jobposted._id', 
          'foreignField': 'jobId', 
          'as': 'appliedpost'
        }
      }
    ]);

    if (data.length > 0) {
      console.log(data[0], "[][]");

      return returnResponseJson('Fetch data success', 200, data[0]);
    } else {
      return returnResponseJson('User Not Found', 404);
    }
  } catch (error) {
    console.error(error);
    return returnResponseJson('Server Error', 500);
  }
};

module.exports.applyJobs = async function (data) {
  try {

    let Data = {
      jobId: data.jobId,
      name:data.name,
      number:data.number,
      email:data.email,
      addressline1:data.addressline1,
      addressline2:data.addressline2,
      city:data.city,
      state:data.state,
      pincode:data.pincode,
      role:data.role,
      jobrole:data.jobrole,
      experiance:data.experiance,
      degree:data.degree,
      department:data.department,
      passedout:data.passedout,  
      uploadresume:data.uploadresume  
  };

  var user = new jobApply(Data);

    return returnResponseJson('Register success', 200, await user.save());
  } catch (error) {
    console.error(error)
    if("E11000 duplicate key error collection"){
      return returnResponseJson('Already Registered', 400,error);
    }
    return returnResponseJson('Server Error', 500, error.msg);
  }
};

module.exports.getApplyJobs = async function () {
  try {

  var user = await jobApply.find()  ;

  if(user){
    return returnResponseJson('Fetch success', 200, user );
  }else{
    return returnResponseJson('Not Found', 404,null);
  }
  } catch (error) {
    console.error(error)
    return returnResponseJson('Server Error', 500, error.msg);
  }
};
