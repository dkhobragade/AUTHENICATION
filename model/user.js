require('dotenv').config()
const mongoose=require('mongoose');
// const encrypt=require('mongoose-encryption');

const session=require("express-session");
const passport =require("passport");
const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

// var a=process.env.SECRETEN
// var b=process.env.API_KEY

// userSchema.plugin(encrypt,{encryptionKey:a,signingKey:b,encryptedFields:["password"]});
userSchema.plugin(passportLocalMongoose);



const User=new mongoose.model('User',userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports=User;