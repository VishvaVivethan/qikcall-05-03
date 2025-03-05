const mongoose = require('mongoose')


module.exports.JobPostingSchema = new mongoose.Schema({

    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:Array,
        required:false
    },
    companyname:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    jobdescription:{
        type:String,
        required:true
    },
    
    experiance: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    companydetails: {
        type: String,
        required: true,
    },
    
}, { timestamps: true })