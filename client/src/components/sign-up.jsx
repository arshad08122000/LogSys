/* eslint-disable no-unused-vars */
import React,{Component} from 'react';
import {app} from './firebase_config';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import "bootstrap-icons/font/bootstrap-icons.css";
// import {useNavigate} from 'react-router-dom';


const auth=getAuth(app);



export default class Signin extends Component{

 constructor(props){
   super(props);
   
   this.state=
   {
     fname:"",
     lname:"",
     email:"",
     mobile:"",
     password:"",
     verifyButton:false,
     verifyOtp:false,
     otp:"",
     Verifiedmobile:false,
   };
   this.handlesubmit=this.handlesubmit.bind(this);
   this.Onsignin=this.Onsignin.bind(this);
   this.Verifycode=this.Verifycode.bind(this);

 }

//setting and displaying repactcha
 Oncapchaverify(){
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      this.Onsignin();
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
  }, auth);
   }


// sending otp to moibile
 Onsignin()
 {
   this.Oncapchaverify();
   const phoneNumber="+91"+this.state.mobile;
   const appVerifier=window.recaptchaVerifier; 
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    this.setState({verifyOtp:true});
    alert("OTP sended");
    console.log(this.verifyOtp);
    // ...
  }).catch((error) => {
  });

 }
 
Verifycode()
{
  window.confirmationResult.confirm(this.state.otp).then((result) => {
    // User signed in successfully.
    const user = result.user;
    console.log("User : ",user);
    this.setState({Verifiedmobile:true,verifyOtp:false});
    alert("verification done");

    // ...
  }).catch((error) => {
    alert("Invalid OTP");
    // User couldn't sign in (bad verification code?)
    // ...
  });
}






 handlesubmit=async(e)=>{

  e.preventDefault();
  if(this.state.Verifiedmobile)
  {
    const {fname,lname,email,password}=this.state;
    console.log(fname,lname,email,password);
  
    const res=await fetch("http://localhost:5000/sign-up",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({fname,lname,email,password}),
    }); 
     const result=await res.json();
   
     if(res.status === 200)
     {
      console.log("successfull",result.status);
      window.localStorage.setItem("token",result.data);
      window.location.href='/user-profile';
   
     }
     else
     {
      console.log("failed",result);
     }
  }
  else
  {
    alert("plz,fill out required fields");
  }
 }


  
 changemobile(e){
  this.setState({mobile:e.target.value},function()
  {
    if(this.state.mobile.length === 10 )
    {
      this.setState({
        verifyButton:true,
      });
    }
  });
 }





 render(){
   
 return(
  <>
  <div className="row">
   <div className="col-lg-7 mx-auto">
    
  <form onSubmit={this.handlesubmit} className="m-4 p-2 bg-light pb-4 shadow-lg">
   <div className="fw-bold display-3 text-center mb-4 py-4"><span className="text-primary">Register </span>Form</div>
   <div class="form-group pt-3 m-3">
   <label>First Name*</label>
    <input type="text" class="form-control mt-2" required onChange={(e)=>this.setState({fname:e.target.value})} placeholder="Enter ur First name" />
   </div>
   <div class="form-group m-3">
   <label>Last Name</label>
    <input type="text" class="form-control mt-2" onChange={(e)=>this.setState({lname:e.target.value})} placeholder="Enter ur Last name" />
   </div>
  <div class="form-group m-3">
    <label for="exampleInputEmail1">Email address*</label>
    <div class="input-group">
    <input type="email" class="form-control mt-2" id="exampleInputEmail1"  aria-describedby="emailHelp" required onChange={(e)=>this.setState({email:e.target.value})} placeholder="Enter email" />
    </div>
  </div>
  <div class="form-group m-3">
    <label for="exampleInputPassword1">Password*</label>
    <input type="password" class="form-control mt-2" required onChange={(e)=>this.setState({password:e.target.value})} id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div class="form-group m-3">
  <label>Mobile*</label>
  <div class="input-group  mb-3">
    <input type="text" class="form-control mt-2" onChange={(e)=>{this.changemobile(e)}} disabled={this.state.Verifiedmobile ? true : false} placeholder="Enter ur mobile to verify" />
    
    {this.state.verifyButton ? 
    (
      <div class="input-group-append">
        {
        this.state.Verifiedmobile ? (<span class="input-group-text mt-2 bg-success"><i class="bi bi-check-circle text-white"></i></span>) : (<input type="button" value="Verify" onClick={this.Onsignin} class="btn btn-outline-primary  mt-2"/>)
        }
      </div>
    ):null}
   </div>
   </div>
    
    {this.state.verifyOtp ?
    (
      <div class="form-group m-4 ">
        <label>OTP</label>
        <div class="input-group mb-3">
       <input type="number" class="form-control mt-2" onChange={(e)=>this.setState({otp:e.target.value})} placeholder="Enter ur mobile to verify" />   
      <div class="input-group-append">
        <input type="button" value=" OTP " onClick={this.Verifycode} class="btn btn-outline-primary mt-2  "/>
        </div>
      </div>
      </div>
    ): null }
     <div id="recaptcha-container" class="m-4"></div>

  <button type="submit" class="btn btn-md btn-outline-primary mx-4 mt-3 text-center">Submit</button>
</form>
</div>
</div>
  </>
 );
 }
 
 
 

}