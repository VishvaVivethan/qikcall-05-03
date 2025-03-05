const mongoose = require('mongoose')


module.exports.ServiceSchema = new mongoose.Schema({

    servicename:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:false
    },
    logo:{
        type:String,
        required:false
    },
    servicetype:{
        type:Array,
        required:true
    },
    servicedescription:{
        type:String,
        required:true
    },
    
    addressline1: {
        type: String,
        required: true,
    },
    addressline2: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    websitelink:{
        type:String,
        required:false
    },
    addimages:{
        type:Array,
        required:true
     },
     isapprove:{
        type:Boolean,
        default:false
     },
     freelisting:{
        type:Boolean,
        default:false
     }
})