import React,{Component} from 'react';

export default class Signin extends Component{

 constructor(props){
   super(props);
   
   this.state=
   {
     email:"",
     password:"",
   };
 }


 handlesubmit=async(e)=>{
  e.preventDefault();
  const {email,password}=this.state;
  console.log(email,password);

  const res=await fetch("http://localhost:5000/sign-in",{
   method:"POST",
   headers:{
     "Content-Type":"application/json",
   },
   body:JSON.stringify({email,password}),
 }); 

  const data=await res.json();

  if(res.status === 200)
  {
   console.log("successfull",data);
   alert("login Successfull");
   window.localStorage.setItem("token",data.data);
   window.location.href='/user-profile';
  }
  else
  {
   console.log("failed",data);
   alert("login failed");

  }
}


 render(){
 return(
  <>
  <div className="row">
   <div className="col-lg-6 mx-auto">
  <form onSubmit={this.handlesubmit} className="m-5 p-3 bg-light shadow-lg">
   <div className="fw-bold display-3 py-3 pb-4 text-center"><span className="text-primary">SignIn</span> Form</div>
  <div class="form-group pt-4 m-4">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control mt-2"  onChange={(e)=>this.setState({email:e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group m-4">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control mt-2"  onChange={(e)=>this.setState({password:e.target.value})} id="exampleInputPassword1" placeholder="Password" />
  </div>
  <button type="submit" class="btn btn-md btn-outline-primary mx-4 mt-3 text-center">Submit</button>
</form>
</div>
</div>
  </>
 );
 } 
}