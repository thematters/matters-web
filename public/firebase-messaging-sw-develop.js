// ref: https://github.com/firebase/quickstart-js/blob/master/messaging/firebase-messaging-sw.js

// Import and configure the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.3/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 315393900359
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
