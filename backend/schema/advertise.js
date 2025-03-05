const mongoose = require('mongoose')


module.exports.AdvertiseSchema = new mongoose.Schema({

    adtitle:{
        type:String,
        required:true
    },
    adcategory:{
        type:String,
        required:true
    },
    addescription:{
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
    aadharnumber:{
        type:Number,
        required:true
    },storename:{
        type:String,
        required:true
    },
    gstnumber:{
        type:String,
        required:false
    },
    contactnumber:{
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:true
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