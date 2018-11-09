import firebase from 'firebase/app';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKSgPtXQ4dNi4SgznN2IY_qLV_YjgYr1I",
    authDomain: "potholes-qro-1540532116830.firebaseapp.com",
    databaseURL: "https://potholes-qro-1540532116830.firebaseio.com",
    projectId: "potholes-qro-1540532116830",
    storageBucket: "potholes-qro-1540532116830.appspot.com",
    messagingSenderId: "37862787545"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }