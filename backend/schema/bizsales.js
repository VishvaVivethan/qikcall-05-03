const mongoose = require('mongoose')


module.exports.BizsalesSchema = new mongoose.Schema({

    title:{
        type:String,
        unique:true,
        required:true
    },
    category:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    pannumber:{
        type:String,
        required:true
    },
    aadharnumber:{
        type:Number,
        required:true
    },
    contactnumber:{
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:false
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    upload:{
        type:Array,
        required:true   
    },

    addimages:{
        type:Array,
        required:true
     },
     isapprove:{
        type:Boolean,
        default:false
     }


})