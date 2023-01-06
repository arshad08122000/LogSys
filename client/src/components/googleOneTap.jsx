import googleOneTap from 'google-one-tap';
import {useState,useEffect} from "react";
import OneAuth from './oneauth';

const options={
 client_id:"23754616781-084glb6gcu136e05g0e7sraks7e59636.apps.googleusercontent.com",
 auto_select:false,
 cancel_on_tap_outside:false,
 context:"signin"
};


 function GoogleOneTap(){
 const [loginData,setLoginData]=useState(localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")):null);

 useEffect(()=>{
  if(!loginData)
  {
   googleOneTap(options,async(response)=>
   {
    console.log(response);
    const res=await fetch("http://localhost:5000/api/google-login",{
     method:"POST",
     body:JSON.stringify({
      token:response.credential,
     }),
     headers:{
      "Content-Type":"application/json",
     }
    });
    const data=await res.json();
    setLoginData(data);
    localStorage.setItem("loginData",JSON.stringify(data));
   });
  }
 },[loginData]);

 const handleLogout=()=>{
  localStorage.removeItem("loginData");
  setLoginData(null);
 }

 return (
 <>
 <div className="row">
   <div className="fw-bold display-4 text-center py-5"><div className="text-primary ">OAuthGoogleOneTap</div> Login Authentication service</div>
  <div className="col-md-5 col-sm-12 mt-4 mx-auto shadow-lg">
   <div className="container-sm m-3 p-3">
    <div className="fw-bold display-2 text-center"><div>One Tap LogIn</div>
     {loginData ? 
     (<><div className="text-center m-2 mt-5 ">
         <div className="text-center display-6 fw-bold pt-3 ">User Details</div>
      <img alt="sdf" className="profile mt-5" src={loginData.picture}/>
      <h2 className="pt-4 mt-3">Username : {loginData.name} </h2>
      <h2 className="pt-2 mt-3 ">Email : {loginData.email}</h2>
      <button  class="btn btn-md  mt-4 btn-outline-primary" onClick={handleLogout}>Logout</button></div></>) 
      : 
      (<><div className="h5 text-center pt-5 mt-4">User Not LoggedIn Yet</div></>)}
      
    </div>
   </div>
  </div>
  <div className="col-md-5 mt-4 mx-auto shadow-lg p-2">
    <p className="display-2 fw-bold text-center pt-4">Sign in Options</p>
  <OneAuth/>
  </div>
 </div>
 </>
 );
}

export default GoogleOneTap; 