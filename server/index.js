const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");
dotenv.config();

const User= require('./models/userModel')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "server is up and running",
  });
});

app.post('/signup',async(req,res) => {
    try {
        const {name,email,phone,password}=req.body;
        const encryptedPassword= await bcrypt.hash(password,10)
        console.log(encryptedPassword)
        await User.create({name,email,phone,password:encryptedPassword})  
        res.json({
            status:'successful',
            message:'user created successfully'
           }) 
    } 
    catch (error) {
        console.log(error)
       res.json({
        status:'unsuccessful',
        message:'user not created successfully'
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
