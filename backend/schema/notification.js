const mongoose = require('mongoose');

module.exports.notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'registeruser', 
    required: true 
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
});


 
