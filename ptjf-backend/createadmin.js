const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://localhost:27017/ptjf')
async function createadmin(){
    try{
        const existingadmin=await User.findOne({role:"admin"})
        if(existingadmin){
            console.log('admin already exists')
            process.exit()
        }
        const hashedPassword=await bcrypt.hash('12345678',10)
        const admin=new User({
            email:"admin@gmail.com",
            password:hashedPassword,
            role:"admin",
        })
        await admin.save()
        console.log('Admin created')
        process.exit()
    }catch(error){
        console.error('error',error)
        console.log("Error creating admin")
        process.exit(1)
    }
}
createadmin()