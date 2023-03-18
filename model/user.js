require('dotenv').config()
const mongoose=require('mongoose');
// const encrypt=require('mongoose-encryption');


const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

// var a=process.env.SECRETEN
// var b=process.env.API_KEY

// userSchema.plugin(encrypt,{encryptionKey:a,signingKey:b,encryptedFields:["password"]});




const User=new mongoose.model('User',userSchema);

module.exports=User;