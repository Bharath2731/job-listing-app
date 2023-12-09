const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const dotenv = require ('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.json({
        status:'success',
        message:'server is up and running'
    })
})



app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.mongoDBUrl)
    .then(()=>{
        console.log(`server is up and running at http://localhost:${process.env.PORT}`)
    })
    .catch((error)=>{
        console.log(error)
    })
})