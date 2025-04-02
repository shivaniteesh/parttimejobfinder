const User=require('../models/User')
const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router=express.Router()
const Job=require('../models/Job')
router.post('/login',async (req,res)=>{
    try{
    const {email,password,role}=req.body
    console.log('Received login request:', { email, role,password });
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"invalid data"})
    }
    
    const match=await bcrypt.compare(password,user.password)
    console.log('Password ',password );
    console.log('user,password',user.password)
    if(!match){
        
        return res.status(401).json({message:"invalid password"})
    }
    if (user.role !== role) {
      return res.status(403).json({ message: "Unauthorized role" });
  }
    const token=jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('token',token,{httpOnlytrue:true,secure:process.env.NODE_ENV})
    res.status(200).json({message:'login suucesful',token})
}catch(error){
    console.error('error',error)
    res.status(500).json({message:'server error'})
}
})
router.post('/userDetails',async (req,res)=>{
    const {name,email,password,phone,role,address,district,qualification,company,aadhar}=req.body
    try{
        const existing=await User.findOne({email})
        if(existing){
          return  res.status(401).json({message:'user exists'})
        }
         const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({name,email,role,password:hashedPassword,address,district,qualification,company,aadhar,phone})
       await user.save()
        res.status(201).json({message:'user registered'})
    }catch(error){
        console.log('error',error)
        res.status(500).json({message:'server error'})
    }
})
const authenticateToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user
        next()
    })
}
const authorizeRoles=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.sendStatus(403)
        }
        next()
    }
}
router.get('/user',async (req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:'no token'})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decode.id).select("-password")
        if(!user){
        res.status(404).json({message:'user not found'})
        }
        res.status(200).json(user)
        }catch(error){
        console.error('error',error)
        res.status(401).json({message:'invalid token'})
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        const jobid = req.params.id
        const job=await Job.findByIdAndDelete(jobid)
        await job.save()
        res.status(200).json({message:'job deleted'})
    }catch(error){
        console.error('error',error)
    }
})
router.get('/userdata', async (req,res)=>{
    try{
        const {userid}=req.query
        const user = await User.findOne({userid})
        res.json(user)
    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
router.post('/Employer',authenticateToken,authorizeRoles(['employer']),(req,res)=>{
    res.json({message:'this is employer route',email:req.user.email,role:req.user.role})
})
router.post('/Admin',authenticateToken,authorizeRoles(['admin']),(req,res)=>{
    res.json({message:'this is admin route',email:req.user.email,role:req.user.role})
})
router.post('/Student',authenticateToken,authorizeRoles(['student']),(req,res)=>{
    res.json({message:'this is student route',email:req.user.email,role:re.user.role})
})
router.post('/logout',(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({message:"logged out successfully"})
})
module.exports=router