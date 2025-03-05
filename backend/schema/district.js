const mongoose = require('mongoose')


module.exports.DistrictSchema = new mongoose.Schema({

    district:{
        type:String,
        unique:true,
        required:true
    },

})