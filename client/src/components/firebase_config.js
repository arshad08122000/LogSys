/* eslint-disable import/no-anonymous-default-export */
import {initializeApp } from "firebase/app";
import { GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider,getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcAheROLCSipIfPofs1ummElD4VZG5ffs",
  authDomain: "loginsys-3e98b.firebaseapp.com",
  projectId: "loginsys-3e98b",
  storageBucket: "loginsys-3e98b.appspot.com",
  messagingSenderId: "787235634192",
  appId: "1:787235634192:web:3ff668ac1d4a017020de95",
  measurementId: "G-D6P05QP5WF"
};


 const app = initializeApp(firebaseConfig);

 //import socail media authprovider for authentication
 const googleProvider=new GoogleAuthProvider();
 const githubProvider=new GithubAuthProvider();
 const facebookProvider=new FacebookAuthProvider();

 export {app,googleProvider,facebookProvider,githubProvider};