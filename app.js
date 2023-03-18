require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const md5=require("md5");
const bcrypt=require('bcrypt');
const saltround=10;
// const encrypt=require('mongoose-encryption');


const app=express();

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
    const newUser=new User({
        email:req.body.useremail,
        password:md5(req.body.userpassword)
    }); 
    newUser.save()
    res.render('sercet');
});

app.post('/login',(req,res)=>{
    async function checkIfNameExists() {
        const uname=req.body.useremail
        const upass=md5(req.body.userpassword)

        const data = await User.findOne({ email: uname });
        if (data) {
            const pass=data.password
            if(upass===pass){
                res.render('sercet');
            }
            else{
                console.log("Password does not match")
            }
        } else {
          console.log('Error: Name does not exist in the database');
        }
      }
      
      // Call the async function to check if the name exists
      checkIfNameExists();



})

app.listen(3000,()=>{
    console.log("server working in port 3000");
})