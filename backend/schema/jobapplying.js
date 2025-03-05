const mongoose = require('mongoose')


module.exports.JobApplyingSchema = new mongoose.Schema({

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:false
    },  
    addressline2: {
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
    role: {
        type: String,
        required: true,
        default: 0, 
        enum: [0,1], 
    },
    jobrole: {
        type: String,
        required: function() {
            return this.role === 'Experiance'; 
        }
    },
    experiance: {
        type: String,
        required: function() {
            return this.role === 'Experiance'; 
        }
    },
    degree:{
        type:String,
        required: function() {
            return this.role === 'Fresher'; 
        }
    },
    department:{
        type:String,
        required: function() {
            return this.role === 'Fresher'; 
        }
     },
     passedout:{
        type:String,
        required: function() {
            return this.role === 'Fresher'; 
        }
     },
     uploadresume: {
        type: Array,
        required: true,
    },
}, { timestamps: true })