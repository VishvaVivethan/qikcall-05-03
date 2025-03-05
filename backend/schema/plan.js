const mongoose = require('mongoose');

module.exports.PlanSchema = new mongoose.Schema({
    
    planname:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    features:{
        type:String,
        required:true,
    },
   
},{timestamps:true});