const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); 

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qikcall-7b628.firebaseio.com" 
});

module.exports = admin;