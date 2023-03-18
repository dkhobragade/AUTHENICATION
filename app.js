require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const md5=require("md5");
const bcrypt=require('bcrypt');
const saltround=10;
// const encrypt=require('mongoose-encryption');

const session=require("express-session");
const passport =require("passport");
const passportLocalMongoose=require("passport-local-mongoose");



const app=express();

app.use(session({
    secret: 'our little secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','ejs')
app.use(express.static('public'));


mongoose.connect("mongodb://0.0.0.0:27017/UserDB");
const User=require('./model/user');

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/register',(req,res)=>{
    res.render('register');
});


app.post('/register',(req,res)=>{
   
});

app.post('/login',(req,res)=>{
    



})

app.listen(3000,()=>{
    console.log("server working in port 3000");
})