import { useEffect } from "react";
import { messaging } from "./firebase"; // Ensure you have your Firebase configuration
import { getToken, onMessage } from "firebase/messaging";


const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notification permission granted.");
        // Now that permission is granted, request the FCM token
        requestFCMToken();
    } else {
        console.log("Notification permission not granted.");
    }
};


// const sendTokenToServer = async (token) => {
//     try {
//         const response = await fetch('http://localhost:2525/send-fcm-token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ token }), // Send only the token
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log('Token sent to server successfully:', data);
//         } else {
//             console.error('Failed to send token:', data.error);
//         }
//     } catch (error) {
//         console.error('Error sending token to server:', error);
//     }
// };

// Function to request the FCM token
const requestFCMToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: "BO7hmcgGX-CD5pX-nYBLfFpQn5OgowRaTF9Zkq589-ohuiat6mpoKTmcgRXsjqNXzL6FHGqxhHZFQ9FNij-vEpE"
        });
        if (token) {
            console.log("FCM Token:", token);
            
        } else {
            console.log("No registration token available.");
        }
    } catch (error) {
        console.error("Error retrieving FCM token:", error);
    }
};

// Component to handle user notifications
const UserNotifications = () => {
    useEffect(() => {
        // Request notification permission on mount
        requestNotificationPermission();

        
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Notification received:", payload);
            alert(`New notification: ${payload.notification.title}`);
        });

        // Clean up the message listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // return <h2>Notifications Setup Complete</h2>;
};

export default UserNotifications;
