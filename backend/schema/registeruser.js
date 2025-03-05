const mongoose = require('mongoose');

module.exports.UserRegister = new mongoose.Schema({
     // Common fields for all roles
     username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    addressline1: {
        type: String,
        required: true,
    },
    addressline2: {
        type: String,
        required: true,
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
        default: "customer", 
        enum: ["customer", "businessman", "freelancer"], 
    },
    dateofbirth: {
        type: String,
        required: false // Only required for customer
    },
    profilepicture: {
        type: Array,
        required: false // Only required for customer
    },
    
    // Fields specific to businessmen and freelancers
    aadharnumber: {
        type: Number,
       required:false
    },
    pannumber: {
        type: String,
        required:false
    },
    earning: {
        type: Number,
        required: false // Only for freelancers (optional)
    },
    membership: {
        type: Array,
        required: function() {
            return this.role === 'businessman' || this.role === 'freelancer';
        }
    },
    gstnumber: {
        type: String,
        required:false
    },
    upload: {
        type: Array,
        required:false
    },
    alterphonenumber: {
        type: Number,
        required: function() {
            return this.role === 'businessman'|| this.role === 'freelancer'; // Required for businessmen
        }
    },
    isapprove:{
        type:Boolean,
        default:false
    },
    isdelete:{
       type:Boolean,
       default:false
    },
    fcmToken:{ 
        type:String,
        required:false},
    
}, { timestamps: true });

 
