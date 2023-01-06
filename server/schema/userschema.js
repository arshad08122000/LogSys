const mongoose = require('mongoose');

const userschema=new mongoose.Schema({
 fname:{type:String},
 lname:{type:String},
 email:{type:String,unique:true},
 password:{type:String},
});

mongoose.model("userinfo",userschema);
