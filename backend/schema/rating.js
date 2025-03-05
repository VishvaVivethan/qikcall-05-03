const mongoose = require('mongoose')


module.exports.RatingSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    storename:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        required:false
    },
    comment:{
        type:String,
        required:false
    },
    
},{timestamps:true});