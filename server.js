require('dotenv').config();
const express=require('express')
const app =express()
const mongoose=require('mongoose')
const cors=require('cors')
const urlencoded=require('express')
const cookieParser=require('cookie-parser')
const port=5000;
const mongo_url='mongodb://localhost:27017/ptjf'
const JobRoute=require('./routes/Job')
const AuthRoutes=require('./routes/Auth')
const ApplyRoutes=require('./routes/Apply')
const User=require('./models/User')
const Job=require('./models/Job')
const Apply=require('./models/Applicantions')
const Issue=require('./models/Issue')
//Middleware
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json());
app.use(urlencoded({extended:true}))

//mongodb connection
mongoose.connect(mongo_url)
.then(()=>console.log('MongoDB is connected'))
.catch((err)=>console.log('error',err))

//Routes
app.use('/Job',JobRoute)
app.use('/Auth',AuthRoutes)
app.use('/Apply',ApplyRoutes)
app.post('/issue',async(req,res)=>{
    try{
        const {role,name,issue}=req.body
        const issues=new Issue({role,name,issue})
        await issues.save()
        res.status(201).json({message:'complaint filed'})
    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
app.get('/stats',async (req,res)=>{
    try{
        const users=await User.countDocuments()
        const student=await User.countDocuments({role:'student'})
        const employer=await User.countDocuments({role:'employer'})
        const job=await Job.countDocuments()
        const apply=await Apply.countDocuments()
        res.json({users,student,employer,job,apply})

    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
app.get('/data',async (req,res)=>{
    try{
        const student=await User.find({role:'student'})
        const employer=await User.find({role:'employer'})
        const job=await Job.find()
        const issue=await Issue.find()
        res.json({student,employer,job,issue})
    }catch(error){
        console.error('error',error)
        res.status(500).json({message:'server error'})
    }
})
//localhost 5000 entry
app.get('/',(req,res)=>{
    res.send('Server')
    console.log('server')
})
app.listen(port,()=>{
    console.log(`server is running on port :${port}`)
})
