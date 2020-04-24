import firebase from "firebase";

let db;

if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDl4J_mjBmFgSSLzZOg_ph_GoqoswUylHA",
    authDomain: "live-brazil-16835.firebaseapp.com",
    databaseURL: "https://live-brazil-16835.firebaseio.com",
    projectId: "live-brazil-16835",
    storageBucket: "live-brazil-16835.appspot.com",
    messagingSenderId: "202516189996",
    appId: "1:202516189996:web:0c209443d05cc85e285289",
    measurementId: "G-HH639BZ7YQ",
  });

  db = firebaseApp.firestore();
}

export { db };
