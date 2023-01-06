import React,{Component} from 'react';

export default class UserDetails extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      userdata:""
    }
  }


 componentDidMount=async()=>
 {
   const res=await fetch("http://localhost:5000/user-profile",{
   method:"POST",
   headers:{
     "Content-Type":"application/json",
   },
   body:JSON.stringify({token:window.localStorage.getItem("token")}),
 }); 
  const data=await res.json();

  if(res.status === 200)
  {
   console.log("successfull",data.data);
   this.setState({userdata:data.data})
  }
  else
  {
   console.log("failed",data);
  }

 }



 render()
 {
  return(
  <>
  <div className="row"><div className="col-lg-6 mx-auto">
  <div className="container shadow-lg m-3 mt-5 p-5">
    <p className="fw-bold fs-5 text-center">User Details</p>
   
   <p className="p-3 m-3 fs-5 fw-bold">Name : {this.state.userdata.fname} {this.state.userdata.lname}</p>
   <p className="p-3 m-3 fs-5 fw-bold">Email : {this.state.userdata.email}</p>
   </div>
   </div>
  </div>
  </>
  )
 }
}