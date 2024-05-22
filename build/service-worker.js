importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
)




const firebaseConfig = {
    apiKey: "AIzaSyDNo05ZmLnjCn37f8TE2o0CUunSt4JScgA",
    authDomain: "automated-irrigation-sys-8655c.firebaseapp.com",
    databaseURL: "https://automated-irrigation-sys-8655c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "automated-irrigation-sys-8655c",
    storageBucket: "automated-irrigation-sys-8655c.appspot.com",
    messagingSenderId: "157394465274",
    appId: "1:157394465274:web:4e339c769edd4e5d3ef443",
    measurementId: "G-SZQQ3LD1SQ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
