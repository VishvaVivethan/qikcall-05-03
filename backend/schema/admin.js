const mongoose = require('mongoose');

module.exports.AdminSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true,
        default: "Admin",
        enum: [
          "Admin",
          "Super Admin"
        ],
      },
    phonenumber:{
        type:Number,
        required:true
    },
    isdelete:{
       type:Boolean,
       default:false
    }
   
},{timestamps:true});