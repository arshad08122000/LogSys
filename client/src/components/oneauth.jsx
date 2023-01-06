import React,{useState} from 'react';
import {getAuth,signInWithPopup} from "firebase/auth";
import { app,googleProvider,facebookProvider,githubProvider } from './firebase_config';
import "../App.css";
// import "../App.css";
const OneAuth=()=>{
 const [user,setuser]=useState("");
 const auth=getAuth(app);

 const googlelogin=async()=>{
  try{
   await signInWithPopup(auth,googleProvider);
   setuser(await auth.currentUser);
  }catch(error)
  {
   console.log(error);
  }
 };

 const facebooklogin=async()=>{
  try{
   await signInWithPopup(auth,facebookProvider);
   setuser(await auth.user);
  }catch(error)
  {
   console.log(error);
  }
 };


 const githublogin=async()=>{
  try{
   await signInWithPopup(auth,githubProvider);
   setuser(await auth.currentUser);
  }catch(error)
  {
   console.log(error);
  }
 };


  console.log(user);

 return(<>
 <section>
  <div className="container">
   <div className="buttonContainer">
    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"} alt=""></img>
    <button type="button" onClick={googlelogin}>Google</button>
   </div>
   <div className="buttonContainer">
    <img src={"https://www.nicepng.com/png/detail/0-4820_15-logo-facebook-png-for-free-download-on.png"} alt=""></img>
    <button type="button" onClick={facebooklogin} >Facebook</button>
   </div>
   <div className="buttonContainer">
    <img src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"} alt=""></img>
    <button type="button" onClick={githublogin}>Github</button>
   </div>
  </div>
  <div className="text-center display-6 fw-bold pt-5 mb-3">User Details</div>
  <div className="rounded mt-4">
   <img src={user?.photoURL} className="profile" alt=""/>
   </div>
   <div className="text-start align-items-start pt-3 mt-2">
  <h3>Name : {user?.displayName}</h3>
  </div>
  <div className="text-start align-items-start pt-4 ">
  <h3>Email : {user?.email}</h3>
  </div>
 </section>

 </>
 );
}

export default OneAuth;