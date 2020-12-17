
  import* as firebase from 'firebase'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB9EJ9sVapYObUizoXI3CYzv9ymVXvJNT0",
    authDomain: "wireleibrary-f047c.firebaseapp.com",
    projectId: "wireleibrary-f047c",
    storageBucket: "wireleibrary-f047c.appspot.com",
    messagingSenderId: "459896127052",
    appId: "1:459896127052:web:4fd419e6b47e632edcbee9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()