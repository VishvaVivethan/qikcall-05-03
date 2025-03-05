const https = require('https');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Notification schema setup
const Notification = require('./schema/notification').notificationSchema;
const notification = mongoose.model("Notificatons", Notification);


// Middleware to parse JSON request bodies
app.use(express.json());


// Endpoint to receive FCM token from frontend
// app.post('/send-fcm-token', (req, res) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(400).json({ success: false, error: 'FCM token is required' });
//   }

//   // Optionally, you can store the token in your database linked to the user
//   console.log('Received FCM token:', token);
//   res.status(200).json({ success: true, message: 'Token received successfully' });
// });

// Function to send notification
const sendNotification = async (req, res) => {
  console.log('Request body:', req.body); 

  const { token, title, body, userId } = req.body; 

  if (!token || !title || !body || !userId) {
    return res.status(400).json({ success: false, error: "Missing token, title, body, or userId" });
  }

  try {
    const auth = new GoogleAuth({
      keyFile: path.join(__dirname, './serviceAccountKey.json'),
      scopes: 'https://www.googleapis.com/auth/firebase.messaging',
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const message = JSON.stringify({
      message: {
        token: token,
        notification: {
          title: title,
          body: body,
        },
      },
    });

    const options = {
      hostname: 'fcm.googleapis.com',
      path: '/v1/projects/qikcall-7b628/messages:send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
        'Content-Length': message.length,
      },
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', async () => {
        if (response.statusCode === 200) {
          const newNotification = new notification({
            userId: userId,
            title: title,
            body: body,
            date: new Date(),
          });
          await newNotification.save();
          res.status(200).json({ success: true, messageId: JSON.parse(data).name });
        } else {
          res.status(response.statusCode).json({ success: false, error: data });
        }
      });
    });

    request.on('error', (error) => {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.message });
    });

    request.write(message);
    request.end();
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = { sendNotification };
