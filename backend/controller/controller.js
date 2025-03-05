var userConnector = require('../connector/connector')
var returnResponseJson = require('../helper').returnResponseJson;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { token } = require('morgan');
const{sendEmail} = require('../emailsender/sender')
const{customerRegisterBody} = require('../emailsender/message')


module.exports.registerUser = async function (req, res, next) {
   try {
      
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.password)
      var connectResponse = await userConnector.registerUser(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200) {
            const payload = {
               user: {
                  id: connectResponse.data._id,
                  role: connectResponse.data.role 
               },
              
            };
            jwt.sign(
               payload,
               process.env.SECERT_KEY,
               {
                  expiresIn: 36000,
               },
               async (err, token) => {
                  if (err) throw err;
                  delete connectResponse.data;
                  connectResponse.token = token;
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
            )
               }else if( connectResponse.status == 400){
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.userlogin = async function (req, res, next) {
  try {
    if (!req.body.phonenumber) {
       return res.status(400).send(returnResponseJson('Phon number Required', 400))
    }
    if (!req.body.password) {
       return res.status(400).send(returnResponseJson('Password required', 400))
    }
    var signin = await userConnector.userlogin(req.body);
    console.log(signin, " data")
    if (signin) {
       if (signin.status == 200) {
          const checkpass = await bcrypt.compare(req.body.password, signin.data.password)
          console.log(checkpass, 'password')
          if (!checkpass) {
             return res.status(400).send(returnResponseJson('Invalid Password', 400))
          }
          const payload = {
             user: {
                id: signin.data._id,
                role: signin.data.role 
             },
            
          };
          jwt.sign(
             payload,
             process.env.SECERT_KEY,
             {
                expiresIn: 36000,
             },
             async (err, token) => {
                if (err) throw err;
                delete signin.data;
                signin.token = token;
                res.status(signin.status).send(signin);
                return;
             }
          )
       }else if(signin.status == 400){
         res.status(signin.status).send(signin);
                return;
       }
    }
 } catch (error) {
    console.error(error)
    return res.send(returnResponseJson('Server Error', 500));

 }
 };

 module.exports.LoginbyEmail = async function (req, res) {
   try {
     // Check if email is provided in the request body
     if (!req.body.email) {
       return res.status(400).send({
         message: 'Email Required',
       });
     }
 
     const emailId = req.body.email; // Store email for reuse
     const signin = await userConnector.LoginbyEmail(emailId);
     console.log(signin, "PPPPPPPPPPPPPPPPPP");
 
     if (signin.status === 200) {
       const isAdded = signin.data;
 
       // Generate JWT token payload
       const payload = {
         user: {
           id: signin.data._id,
           role: signin.data.role,
           email: signin.data.email,
         },
       };
 
       jwt.sign(
         payload,
         process.env.SECERT_KEY,
         { expiresIn: 36000 },
         async (err, token) => {
           if (err) throw err;
 
           // Prepare the email option
           const option = {
             id: isAdded._id,
             name: isAdded.username,
             email: emailId,
             token: token,
           };
 
           // Generate email body and send email
           const body = {
             from: process.env.EMAIL_USER,
             to: emailId,
             subject: "Verify Your Email",
             html: customerRegisterBody(option),
           };
           
           const message = "Please check your email to verify your account!";
           await sendEmail(body, message);
 
           // Send success response with token
           return res.status(200).send({
             status: 200,
             message: "Verification email sent!",
             token: token,
           });
         }
       );
     } else {
       return res.status(signin.status).send({
         message: signin.message,
       });
     }
   } catch (error) {
     console.error("Server Error:", error);
     return res.status(500).send({
       message: 'Server Error',
       error: error.message || "Unknown error",
     });
   }
 };
 
 

 module.exports.getuserdataById = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getuserdataById( req.query.userid,);
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('User Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 }

 module.exports.deleteUser = async function (req, res, next) {
  try {
    // Use req.params.id if you pass id via route params instead of query
    const deleteResponse = await userConnector.userDelete(req.query.id);
    console.log(deleteResponse, "User Data");

    if (deleteResponse) {
      return res.status(deleteResponse.status).json(deleteResponse);
    }

    return res.status(400).json(returnResponseJson('Delete Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).json(returnResponseJson('Server Error', 500));
  }
};


 module.exports.userAdmin = async function (req, res, next) {
  try {
    var formresponce = await userConnector.userAdmin( req.query.id);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}

 module.exports.getuserdata = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getuserdata( );

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}


module.exports.userUpdate = async function (req, res, next) {
  try {
    
    const userId = req.query.id;
    
    
    const update = await userConnector.userUpdate(req.body, userId);
    console.log(update, "User Data");

    if (update) {
      return res.status(update.status).send(update);
    }

    return res.status(400).send(returnResponseJson('Update Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};


 module.exports.wishlistRegister = async function (req, res, next) {
   try {
     // Call the connector function
     const connectResponse = await userConnector.wishlistRegister(req.body);

     console.log(connectResponse,"wishlist data")
 
     // Check if there was a valid response from the connector
     if (connectResponse) {
       // Send appropriate response based on the status code
       return res.status(connectResponse.status).send(connectResponse);
     } else {
       // If no response is received, send a generic error response
       return res.status(500).send(returnResponseJson('Unexpected response', 500));
     }
   } catch (error) {
     console.error(error);
     // Return a generic server error message
     return res.status(500).send(returnResponseJson('Server Error', 500, error.message));
   }
 };
 
 module.exports.wishlistData = async function (req, res, next) {
   try {
     // Call the connector function
     const connectResponse = await userConnector.getwishlistdata(req.query.id);


     console.log(connectResponse,"wishlist data")
 
     // Check if there was a valid response from the connector
     if (connectResponse) {
       // Send appropriate response based on the status code
       return res.status(connectResponse.status).send(connectResponse);
     } else {
       // If no response is received, send a generic error response
       return res.status(500).send(returnResponseJson('Unexpected response', 500));
     }
   } catch (error) {
     console.error(error);
     // Return a generic server error message
     return res.status(500).send(returnResponseJson('Server Error', 500, error.message));
   }
 };

 module.exports.Deletewishlist = async function (req, res, next) {
  try {
    var Delete = await userConnector.Deletewishlist(req.query.id);
    console.log(Delete, "User Data");

    if (Delete) {
      return res.status(Delete.status).send(Delete);
    }

    return res.status(400).send(returnResponseJson('Delete Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};

 


 module.exports.ratingRegister = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.ratingRegister(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200 || connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.getSearchDetails = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.getSearch(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200 || connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.getSearchPincode = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.SearchbyPin(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200 || connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.getArea = async function (req, res, next) {
  try {
    // Retrieve the area data from the connector
    const formresponce = await userConnector.getArea(req.body);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send({ message: 'Area not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server Error', error: error.message });
  }
};


module.exports.getareadata = async function (req, res, next) {
  try {
    // Retrieve the area data from the connector
    const formresponce = await userConnector.getAreaData(req.body);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send({ message: 'Area not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server Error', error: error.message });
  }
};

//  ADMIN SIDE

module.exports.registerAdmin = async function (req, res, next) {
   try {
      
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.password)
      var connectResponse = await userConnector.registerAdmin(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200) {
            const payload = {
               user: {
                  id: connectResponse.data._id,
                  role: connectResponse.data.role 
               },
              
            };
            jwt.sign(
               payload,
               process.env.SECERT_KEY,
               {
                  expiresIn: 36000,
               },
               async (err, token) => {
                  if (err) throw err;
                  delete connectResponse.data;
                  connectResponse.token = token;
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
            )
               }else if( connectResponse.status == 400){
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.adminLogin = async function (req, res, next) {
   try {
     if (!req.body.email) {
        return res.status(400).send(returnResponseJson('Email Required', 400))
     }
     if (!req.body.password) {
        return res.status(400).send(returnResponseJson('Password required', 400))
     }
     var signin = await userConnector.adminlogin(req.body);
     console.log(signin, " data")
     if (signin) {
        if (signin.status == 200) {
           const checkpass = await bcrypt.compare(req.body.password, signin.data.password)
           console.log(checkpass, 'password')
           if (!checkpass) {
              return res.status(400).send(returnResponseJson('Invalid Password', 400))
           }
           const payload = {
              user: {
                 id: signin.data._id,
                 role: signin.data.role 
              },
             
           };
           jwt.sign(
              payload,
              process.env.SECERT_KEY,
              {
                 expiresIn: 36000,
              },
              async (err, token) => {
                 if (err) throw err;
                 delete signin.data;
                 signin.token = token;
                 res.status(signin.status).send(signin);
                 return;
              }
           )
        }else if(signin.status == 400){
          res.status(signin.status).send(signin);
                 return;
        }
     }
  } catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
 
  }
  };

 module.exports.getAdmin = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getAdmin();
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('User Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 }


//  FOR SERVICE

module.exports.serviceRegister = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.serviceRegister(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200|| connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.serviceUpdate = async function (req, res, next) {
  try {
    
    const userId = req.query.id;
    
    
    const update = await userConnector.serviceUpdate(req.body, userId);
    console.log(update, "User Data");

    if (update) {
      return res.status(update.status).send(update);
    }

    return res.status(400).send(returnResponseJson('Update Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};


module.exports.getServicelists = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getServicelists();
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('Service Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 }

 module.exports.getServicedata = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getServicedata( req.query.id,);
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('User Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 };

 module.exports.DeleteServicedata = async function (req, res, next) {
  try {
    var Delete = await userConnector.DeleteServicedata(req.query.id);
    console.log(Delete, "User Data");

    if (Delete) {
      return res.status(Delete.status).send(Delete);
    }

    return res.status(400).send(returnResponseJson('Delete Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};


//  FOR CATEGORY

module.exports.categoryRegister = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.categoryRegister(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200 || connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.getCategory = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getCategory();
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('User Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 }

 module.exports.getcategorydata = async function (req, res, next) {
   try {
     var formresponce = await userConnector.getcategorydata( req.query.id,);
 
     if (formresponce) {
       return res.status(formresponce.status).send(formresponce);
     } else {
       return res.status(404).send(returnResponseJson('User Not Found', 404));
     }
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 }

 module.exports.categoryUpdate = async function (req, res, next) {
   try {
     var update = await userConnector.categoryUpdate(req.body, req.query.id);
     console.log(update, "User Data");
 
     if (update) {
       return res.status(update.status).send(update);
     }
 
     return res.status(400).send(returnResponseJson('Update Error', 400));
   } catch (error) {
     console.error(error);
     return res.status(500).send(returnResponseJson('Server Error', 500));
   }
 };
 module.exports.categoryDelete = async function (req, res, next) {
  try {
    var Delete = await userConnector.categoryDelete(req.query.id);
    console.log(Delete, "User Data");

    if (Delete) {
      return res.status(Delete.status).send(Delete);
    }

    return res.status(400).send(returnResponseJson('Delete Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};



//  FOR ADVERTISE

module.exports.AdvertisePost = async function (req, res, next) {
   try {
      
      var connectResponse = await userConnector.AdvertisePost(req.body);
      if (connectResponse) {
         if (connectResponse.status == 200 || connectResponse.status == 400) {
                  res.status(connectResponse.status).send(connectResponse);
                  return;
               }
         } else {
            return res.status(connectResponse.status).send(connectResponse);
         }
      }
    catch (error) {
      console.error(error)
      return res.send(returnResponseJson('Server Error', 500));
   }
};

module.exports.getAdvertise = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getAdvertise();

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}

module.exports.getadvertisedata = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getcategorydata( req.query.id,);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}

module.exports.advertiseUpdate = async function (req, res, next) {
  try {
    var update = await userConnector.advertiseUpdate(req.body, req.query.id);
    console.log(update, "User Data");

    if (update) {
      return res.status(update.status).send(update);
    }

    return res.status(400).send(returnResponseJson('Update Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getadvertisedataById = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getAvertiseData( req.query.id,);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}

module.exports.DeleteAdvertise = async function (req, res, next) {
  try {
    var Delete = await userConnector.DeleteAdvertise(req.query.id);
    console.log(Delete, "User Data");

    if (Delete) {
      return res.status(Delete.status).send(Delete);
    }

    return res.status(400).send(returnResponseJson('Delete Error', 400));
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};


// for todayoffer

module.exports.PostOffer = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.OfferPost(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getOffer = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getOffer();

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

module.exports.getofferdata = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getOfferData( req.query.id,);

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

module.exports.OfferUpdate = async function (req, res, next) {
 try {
   var update = await userConnector.OfferUpdate(req.body, req.query.id);
   console.log(update, "User Data");

   if (update) {
     return res.status(update.status).send(update);
   }

   return res.status(400).send(returnResponseJson('Update Error', 400));
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
};

module.exports.getofferById = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getOfferData( req.query.id,);

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

module.exports.OfferAdvertise = async function (req, res, next) {
 try {
   var Delete = await userConnector.DeleteOffer(req.query.id);
   console.log(Delete, "User Data");

   if (Delete) {
     return res.status(Delete.status).send(Delete);
   }

   return res.status(400).send(returnResponseJson('Delete Error', 400));
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
};

// For Bizsales

module.exports.PostBizsales = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.bizsalesRegister(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getBizsales = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getBizsales();

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

module.exports.getBizsalesData = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getBizsalesData( req.query.id,);

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

module.exports.bizsalesUpdate = async function (req, res, next) {
 try {
   var update = await userConnector.bizsalesUpdate(req.body, req.query.id);
   console.log(update, "User Data");

   if (update) {
     return res.status(update.status).send(update);
   }

   return res.status(400).send(returnResponseJson('Update Error', 400));
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
};


module.exports.DeleteBizsales = async function (req, res, next) {
 try {
   var Delete = await userConnector.DeleteBizsales(req.query.id);
   console.log(Delete, "User Data");

   if (Delete) {
     return res.status(Delete.status).send(Delete);
   }

   return res.status(400).send(returnResponseJson('Delete Error', 400));
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
};

// For Plan

module.exports.PlanPost = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.planRegister(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getPlan = async function (req, res, next) {
 try {
   var formresponce = await userConnector.getPlan();

   if (formresponce) {
     return res.status(formresponce.status).send(formresponce);
   } else {
     return res.status(404).send(returnResponseJson('User Not Found', 404));
   }
 } catch (error) {
   console.error(error);
   return res.status(500).send(returnResponseJson('Server Error', 500));
 }
}

// For Notifications

module.exports.getNotificaton = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getNotiifcation( req.query.id,);
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }
 
 module.exports.districtRegister = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.registerDistrict(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getdistrictdata = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getdistrictdata( req.query.id,);

    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
}

module.exports.getDistrict = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getDistrict();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }


//  For Statstics

module.exports.Countuser = async function (req, res, next) {
  try {
    var formresponce = await userConnector.Countuser();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.CountServices = async function (req, res, next) {
  try {
    var formresponce = await userConnector.CountServices();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.CountAdvertise = async function (req, res, next) {
  try {
    var formresponce = await userConnector.CountAdvertise();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.CountOffers = async function (req, res, next) {
  try {
    var formresponce = await userConnector.CountOffers();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.CountBizsales = async function (req, res, next) {
  try {
    var formresponce = await userConnector.CountBizsales();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }


 module.exports.getTodayRegisteredUsers = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getTodayRegisteredUsers();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.getTodayRegisteredAdvertise = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getTodayRegisteredAdvertise();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

//  PostJobs side 

module.exports.PostJobs = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.postJobs(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getPostJobs = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getPostJobs();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

 module.exports.getAppliedPost = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getAppliedPost( req.query.id,);
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }

//  Apply jobs side

module.exports.ApplyJobs = async function (req, res, next) {
  try {
     
     var connectResponse = await userConnector.applyJobs(req.body);
     if (connectResponse) {
        if (connectResponse.status == 200 || connectResponse.status == 400) {
                 res.status(connectResponse.status).send(connectResponse);
                 return;
              }
        } else {
           return res.status(connectResponse.status).send(connectResponse);
        }
     }
   catch (error) {
     console.error(error)
     return res.send(returnResponseJson('Server Error', 500));
  }
};

module.exports.getApplyJobs = async function (req, res, next) {
  try {
    var formresponce = await userConnector.getApplyJobs();
 
    if (formresponce) {
      return res.status(formresponce.status).send(formresponce);
    } else {
      return res.status(404).send(returnResponseJson('User Not Found', 404));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
 }



