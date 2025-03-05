import { initializeApp } from "firebase/app";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNo10jsST6iDgRD2w_PAO2zNX1Y-J2_k4",
    authDomain: "qikcall-7b628.firebaseapp.com",
    projectId: "qikcall-7b628",
    storageBucket: "qikcall-7b628.appspot.com",
    messagingSenderId: "800996355334",
    appId: "1:800996355334:web:86bc0102cd0a6b45b3c287",
    measurementId: "G-P686EEJQK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Function to check if IndexedDB is supported
const isIndexedDBAvailable = () => {
    try {
        return !!window.indexedDB;
    } catch (e) {
        return false;
    }
};

// Function to retrieve the token
export const retrieveToken = async (userId) => {
    if (!isIndexedDBAvailable()) {
        console.warn("IndexedDB is not supported on this browser.");
        // Handle unsupported browsers (e.g., show a message or disable notifications)
        return;
    }

    try {
        const currentToken = await getToken(messaging, { 
            vapidKey: "BHF-4cyzDrfKgSAOQdCLojOb9o8I3-PlMJk9V6Jap5mwLTXSxEMfpK_frH3UIFWYz8rA-6HRRekeVQkte-FvLyY" 
        });

        if (currentToken) {
            // Send the token to your backend
            sendTokenToServer(currentToken, userId);
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (err) {
        console.error('An error occurred while retrieving token.', err);
        // Additional handling for specific errors if needed
    }
};

// Function to send token to the backend
const sendTokenToServer = (token, userId) => {
    fetch('/send-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId }),
    })
    .then(response => response.json())
    .then(data => console.log('Token sent to server successfully:', data))
    .catch(error => console.error('Error sending token to server:', error));
};

// You can periodically call retrieveToken to refresh the token
export { messaging };
