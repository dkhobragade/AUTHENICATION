require('dotenv').config()
const mongoose=require('mongoose');
// const encrypt=require('mongoose-encryption');

const session=require("express-session");
const passport =require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const findOrCreate=require("mongoose-findorcreate");

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

// var a=process.env.SECRETEN
// var b=process.env.API_KEY

// userSchema.plugin(encrypt,{encryptionKey:a,signingKey:b,encryptedFields:["password"]});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User=new mongoose.model('User',userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECERT,
    callbackURL: "https://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


module.exports=User;