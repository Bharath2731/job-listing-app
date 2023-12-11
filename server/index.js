const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

const User= require('./models/userModel');
const { JsonWebTokenError } = require("jsonwebtoken");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "server is up and running",
    time: new Date()
  });
});

app.post('/register',async(req,res) => {
    try {
        const {name,email,phone,password}=req.body;
        //check user with same email already exists
        const user= await User.findOne({email})        
        if(!(user)){
            const encryptedPassword= await bcrypt.hash(password,10)
            await User.create({name,email,phone,password:encryptedPassword})  
            res.json({
            status:'successful',
            message:'user created successfully'
           }) 
        }
        else{
            res.json({
                status : 'unsuccessful',
                message: 'email already registered'
            })
        }
    } 
    catch (error) {
        console.log(error)
       res.json({
        status:'unsuccessful',
        message:'user not created successfully'
       }) 
    }
})

app.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        let isValidUser = await User.findOne({email});
        if(isValidUser){
            let isPasswordCorrect = await bcrypt.compare(password,isValidUser.password)
            if(isPasswordCorrect){
                const jwtoken = jwt.sign(isValidUser.toJSON(),process.env.jwtSecretKey,{expiresIn:60*60*24})
                res.json({
                    status:'successful',
                    message:'logged in successfully',
                    jwtoken
                })
            }
            else{
                res.json({
                    status:'error',
                    message: 'incorrect password'
                })
            }
        }
        else{
            res.json({
                status:'error',
                message:'email doesnot exist'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            status:'error',
            message:'login failed'
        })
    }
})

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.mongoDBUrl)
    .then(() => {
      console.log(
        `server is up and running at http://localhost:${process.env.PORT}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
});