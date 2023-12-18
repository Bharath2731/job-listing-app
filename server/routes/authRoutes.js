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

router.get('/jobs/:skills',isUserAuthorized,async(req,res)=>{
    try {
        const {jobTitle}= req.query;
        const {skills}=req.params;
        const skillsArray = skills.split(',');
        let jobWithSkills = await Job.find({skillsRequired:{ $in: skillsArray}})
        if(jobTitle){
            jobWithSkills= jobWithSkills.filter((job)=>{
                return job.jobPosition === jobTitle;
            })
        }
        res.status(200).json({
            status:'successfull',
            message:'got the jobs with the filters',
            data: jobWithSkills
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:'unsuccessful',
            message:'unable to get the data'
        })
    }
})

router.get('/jobs/byId/:id',isUserAuthorized,async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const jobPost = await Job.findById(id)
        console.log(jobPost)
        res.status(200).json({
            status:'successfull',
            message:'job details retrived successfully',
            data:jobPost
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:'unsuccessfull',
            message:'unable to get the job discreption'
        })
    }
})

module.exports = router