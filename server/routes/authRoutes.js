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
                message: 'job post created successfully'
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

module.exports = router