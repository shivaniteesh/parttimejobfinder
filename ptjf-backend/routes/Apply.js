const express=require('express')
const router=express.Router()
const Apply=require('../models/Applicantions')
router.post('/apply',async (req,res)=>{
    try{
    const {jobid,employerid,userid,from,to,company,title}=req.body
    fromdate=new Date(from)
    todate=new Date(to)
    const studentid=userid
    const existinguser=await Apply.findOne({studentid,jobid})
    if(existinguser){
        return res.status(401).json({message:'already applied'})
    }
    const existing=await Apply.findOne({
        studentid,
        status:'hired',
        $or:[{from:{$lte:todate},to:{$gte:from}}]
    })
    if(existing){
        return res.status(403).json({message:'alredy hired in those dates'})
    }
    const apply=new Apply({jobid,employerid,studentid,from,to,company,title})
    await apply.save()
    res.status(201).json({message:'applied'})
}catch(error){
    console.error('error',error)
    res.status(500).json({message:'server error'})
}
})
router.get('/apply',async (req,res)=>{
    try{
    const {uid}=req.query
    console.log(req.query)
    console.log(uid)
    if(!uid){
        return res.status(400).json({message:'uid missing'})
    }
    const user=await Apply.find({$or:[{studentid:uid},{employerid:uid}]})
    console.log('user')
    res.status(200).json(user)
}
catch(error){
    console.error('error',error)
    res.status(500).json({message:'server error'})
}
})
module.exports=router