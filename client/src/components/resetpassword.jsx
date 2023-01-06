import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Forget extends Component {

 constructor(props)
 {
  super(props);
  this.state={
   email:"",
  };
  this.handlesubmit=this.handlesubmit.bind(this);
 }



 handlesubmit=async(e)=>
 {
  e.preventDefault();

  const { email }=this.state;
  console.log(email);
  const res=await fetch("http://localhost:5000/forget",{
   method:"POST",
   headers:{
     "Content-Type":"application/json",
   },
   body:JSON.stringify({email}),
 }); 
  const data=await res.json();

  if(res.status === 201)
  {
   console.log("successfull : ",data);
   alert("Link sended");
  }
  else
  {
   console.log("failed : ",data);
  }

 }

 render() {
  return (
   <>
    <div className="row">
     <div className="col-lg-5 col-md-11 m-auto mt-5">
      <div className="container">
       <form onSubmit={this.handlesubmit} className="m-2 p-2 bg-light shadow-lg">
        <div className="fw-bold display-3 text-center mb-5 mt-3 py-4 "><span className="text-primary">Password Reset </span>Form</div>
        <div class="form-group m-3">
         <label>Email*</label>
         <input type="email" class="form-control mt-2" required onChange={(e) => this.setState({ email: e.target.value })} placeholder="Enter ur email id" />
        </div>
        <div class="d-grid m-3">
         <button type="submit" class="btn btn-md btn-outline-primary">Reset Password</button>
        </div>
        <div className="text-end mx-3 text-decoration-none">
        <Link  to={'/sign-Up'}>Sign Up</Link>
        </div>
       </form>
      </div>
     </div>
    </div>

   </>
  );
 }


}



