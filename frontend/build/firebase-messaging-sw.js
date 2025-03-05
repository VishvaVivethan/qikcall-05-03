importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBNo10jsST6iDgRD2w_PAO2zNX1Y-J2_k4",
  authDomain: "qikcall-7b628.firebaseapp.com",
  projectId: "qikcall-7b628",
  storageBucket: "qikcall-7b628.appspot.com",
  messagingSenderId: "800996355334",
  appId: "1:800996355334:web:86bc0102cd0a6b45b3c287",
  measurementId: "G-P686EEJQK3"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();



// Handle background messages
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/firebase-logo.png'  
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
