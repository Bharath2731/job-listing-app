const express = require ('express');
const mongoose = require ('mongoose')
const isUserAuthorized = require('../middlewares/isUserAuthorized')
const errorHandler = require('../middlewares/errorHandler')

const Job = require ('../models/jobModel')
const router = express.Router()

router.post('/jobs',isUserAuthorized,async (req,res)=>{
    try {
        const {companyName,addLogoUrl,jobPosition, monthlySalary,jobType,remoteOrOffice,location, jobDescription,aboutCompany,skillsRequired, information} = req.body
    
        if (companyName && addLogoUrl && jobPosition && monthlySalary && jobType && remoteOrOffice && location && jobDescription && aboutCompany && skillsRequired && information)
        {
            const skillsRequiredInArray = skillsRequired.split(',');
            await Job.create({companyName,addLogoUrl,jobPosition, monthlySalary,jobType,remoteOrOffice,location, jobDescription,aboutCompany,skillsRequired:skillsRequiredInArray, information})

            res.status(200).json({
                status:'successful',
                message: 'job post created successfully',
                // userData: req.body.user
            })

        }
        else{
            res.status(400).json({
                status : 'unsuccessful',
                message:'all fields are required'
            });
        }
        
    } catch (error) {
        console.log (error);
        errorHandler(error,res)
    }
})


router.patch('/jobs/:id',isUserAuthorized,async(req,res)=>{
    try {
        const id = req.params.id;
        const data= req.body;
        const updatedJob = await Job.findByIdAndUpdate(id,data,{new:true,runValidators:true})
        res.status(200).json({
            status:'successful',
            message:'Job post updated successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:'error',
            message:'some internal error'
        })
    }
})


module.exports = router