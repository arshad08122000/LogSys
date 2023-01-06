// require("dotenv").config();
const mongoose=require('mongoose');
const cors=require('cors');
const express=require("express");
const dotenv=require('dotenv');
const {OAuth2Client}=require('google-auth-library');
require('./schema/userschema');

dotenv.config();

//creating oauth for phone number verification
const client=new OAuth2Client(process.env.REACT_APP_GO0GLE_CLIENT_ID);

const bcrypt =require("bcrypt");
const PORT=5000;
const app=express();

var nodemailer = require('nodemailer');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


//creating loguser array to store user
const logusers=[];
function upsert(array,item){
   const i=array.findIndex((_item)=>_item.email===item.email);
   if(i>-1) array[i]=item;
   else array.push(item);
}


app.listen(PORT,()=>console.log(`Server running in port ${PORT}`));

const url="mongodb+srv://arshad:arshad0812@cluster0.feksdpj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true}).then(()=>{console.log("Database connected")}).catch(()=>{console.log("Failed to connect with database")});


const users=mongoose.model("userinfo");


//jwt token and secret;
const jwt=require("jsonwebtoken");
const jwtSecret="ffdsfds53wsx54";


//setting app.js to redirects index.ejs
app.set("view engine","ejs");


// one-tap login Section
app.post("/api/google-login",async(req,res)=>{
   const { token }= req.body;
   console.log(token);

   const ticket=await client.verifyIdToken({
      idToken: token,audience:process.env.CLIENT_ID,
   });

   const {name,email,picture}=ticket.getPayload();
   upsert(logusers,{name,email,picture});
   res.status(201).json({name,email,picture});
})

//New user Signup section
app.post('/sign-up',async(req,res)=>{
 const {fname,lname,email,password}=req.body;
 try
 {
   const olduser=await users.findOne({email:email});
    if(olduser)
    {
       return res.status(422).send({status:"user already present"});
    }
   //   Encrypting passwrod
     const encryptpassword=await bcrypt.hash(password,10);
    
     const adduser=new users({fname,lname,email,password:encryptpassword});
     const token=jwt.sign({email:email},jwtSecret);
     console.log("Token Created for New user : ",token);
     await adduser.save();
     res.status(200).send({status:"Signed up successfully",data:token});
     console.log("suceesss");
 }
 catch(error)
 {
    res.status(400).send({status:"Failed"});
    console.log("Data failed :"+ error);
 }
});

//Old User Sigin Section
app.post('/sign-in',async(req,res)=>{
   const {email,password}=req.body;
   console.log(email,password);
   try{
      const userfound=await users.findOne({email});
      const passcheck=await bcrypt.compare(password,userfound.password);
      if(userfound && passcheck)
      {
         //creating jwt token with jwt.sign in cmd
         //jwt token contain data and secret
         const token=jwt.sign({email:userfound.email},jwtSecret);
         console.log("User found")
         console.log("Tokencreated for Existing User : ",token);
         //passing jwt token to windows laocalstorage named as data 
         return res.status(200).send({status:"Found",data:token});
      }
      console.log("User not found");
      res.status(404).send({status:"Not Found"});
   }
   catch(error)
   {
      console.log("Error : ",error);
      res.status(422).send({status:"Error"});
   }
});

//user profile section 
app.post('/user-profile',async(req,res)=>{
   const {token}=req.body;
   try{
      //verifying token with jwtsecret to check show user details 
      const user=await jwt.verify(token,jwtSecret);
      console.log("Token,name and Password : ",token,user.email,user.password);
      const chkuser=await users.findOne({email:user.email});
      if(chkuser)
      {
         return res.status(200).send({status:"Authorized User",data:chkuser});
      }
      res.status(400).send({status:"UnAuthorized User"});
   }
   catch(error)
   {
      console.log("Error");
      res.status(404).send({status:"Error"});
   }
});

//sending password reset link section 
app.post('/forget',async(req,res)=>
{
   const {email}=req.body;
   try{
      const olduser=await users.findOne({email:email});
      if(!olduser)
      {
         console.log("User not Found");
         return res.status(404).send({status:"Email Not found"});
      }
      console.log("User founded");
      //creating new secret with old secret and email of user who as forgotten password
      const secret=jwtSecret+olduser.password;
      //creating token whith emial,id which expires in 5min
      const token=jwt.sign({email:olduser.email,id:olduser._id},secret,{expiresIn:"5m"});
      
      const link=`http://localhost:5000/reset/${olduser._id}/${token}`;

      res.status(201).send({status:"link created"});
      console.log(link);
      try{
         //creating transporter attribute values
         var transporter=nodemailer.createTransport({
            service : 'gmail.com',
            port : 465,
            secure : true,
            logger : true, 
            secureConnection : true,
            auth: {
              user: 'adarshadaashish@gmail.com',
              //two step authentication app pass key 
              pass: 'rszhzcvskvfznjbu',
            }
          })
          
          var info=await transporter.sendMail({
               from: 'adarshadaashish@gmail.com',
               to: olduser.email,
               subject: 'LoginSys,Reset Password with this link',
               text: link,
          });
      }
      catch(error)
      {
         console.log("error : ",error);
      }
       
       
   }
   catch(error)
   {
      console.log("Error",error);
      res.status(400).send({status:"Connection error"});
   }
});


//Opening the reset link and vetifying token 
app.get('/reset/:id/:token',async(req,res)=>{
   //the id and token passed as a params in the reset link in password reset link section
   const {id,token}=req.params;
   console.log("Id and token : ",req.params);

   try{
      const olduser=await users.findOne({_id:id});
      if(!olduser)
      {
         console.log("User not Found");
         return res.status(404).send({status:"Email Not found"});
      }
      const secret=jwtSecret+olduser.password;
      try{
         const verify=await jwt.verify(token,secret);
         console.log("Jwt Verified");
         //redirect user to password reset page index.ejs
         res.render("index",{email:verify.email,status:"not verified"});
         console.log("User ",verify.email," are taken to ejs password reset form");
      }
      catch(error)
      {
         console.log("Token error : ",error);
         res.status(400).send({status:"Jwt Token error"});
      }

   }
   catch(error)
   {
      console.log("error : ",error);
      res.status(400).send({status:"Connection failed"});
   }
})

//password reset page or index.ejs dont need submit button to call post request
app.post('/reset/:id/:token',async(req,res)=>{
   const {id,token}=req.params;
   console.log(req.params);

   const { password }=req.body;
   console.log("New Password : ",password);

   try{
      const olduser=await users.findOne({_id:id});
      if(!olduser)
      {
         console.log("User not Found");
         return res.status(404).send({status:"Email Not found"});
      }
      const secret=jwtSecret+olduser.password;
      try{
        
         const verrify=jwt.verify(token,secret);
         const encryptpass=await bcrypt.hash(password,10);
         console.log("Jwt Verified");
         await users.updateOne({_id:id},{$set:{password:encryptpass,}});
         res.render("index",{email:verrify.email,status:"verified"});
      }
      catch(error)
      {
         console.log("Token error : ",error);
         res.status(400).send({status:"Jwt Token error"});
      }

   }
   catch(error)
   {
      console.log("error : ",error);
      res.status(400).send({status:"Connection failed"});
   }
})


