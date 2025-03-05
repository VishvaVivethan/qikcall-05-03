const mongoose = require('mongoose')


module.exports.CategorySchema = new mongoose.Schema({

    categoryname:{
        type:String,
        unique:true,
        required:true
    },
    addimages:{
        type:Array,
        required:false
    },
    
})