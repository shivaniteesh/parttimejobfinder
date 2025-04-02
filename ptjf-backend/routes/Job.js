const Job=require('../models/Job')
const express=require('express')
const router=express.Router()
router.post('/jobdetails',async (req,res)=>{
    const {title,companyname,from,to,workinghours,qualification,address,district,totalpay,userid}=req.body
    try{
    const job=new Job({
        title,
        companyname,
        from,
        to,
        workinghours,
        qualification,
        address,
        district,
        totalpay,
        userid,
    })
    await job.save()
    console.log('job',job)
    res.status(201).json({message:'job registered'})
    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
router.get('/jobdetails',async(req,res)=>{
    try{
        const job=await Job.find()
        res.json(job)
    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
module.exports=router