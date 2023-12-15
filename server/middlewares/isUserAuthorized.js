const express = require ('express');
const dotenv = require ('dotenv');
dotenv.config();
const jwt = require ('jsonwebtoken');

const errorHandler = require('./errorHandler')

const isUserAuthorized = (req,res,next)=>{
    try {
        const { jwtoken }= req.headers
        let decodedUser = jwt.verify(jwtoken,process.env.jwtSecretKey);   
        if (decodedUser){
            req.body.user = decodedUser;
            next()
        }
    } catch (error) {
        console.log ( error );
        res.status(400).json({
            status:'unsuccessful',
            message: 'please login'
        });
    }
}

module.exports = isUserAuthorized;