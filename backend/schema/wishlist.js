// const mongoose = require('mongoose')


// module.exports.WishlistSchema = new mongoose.Schema({

//     storeId:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             required:true
//         }
//     ],
//     customerId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true
//     },
//     isfavorite:{
//         type:Boolean,
//         default:"false"
//     }
// })


const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isfavorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Wishlist", WishlistSchema);