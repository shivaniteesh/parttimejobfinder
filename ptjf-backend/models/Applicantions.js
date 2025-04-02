const mongoose=require('mongoose')
const uuid=require('uuid')
const ApplicationsSchema=mongoose.Schema({
    
    applicationid:{type: String, unique: true, default: () => uuid.v4()},
    employerid:String,
    studentid:String,
    jobid:String,
    status:{type:String,enum:['applied','hired'],default:'applied'},
    from:Date,
    to:Date,
    company:String,
})
ApplicationsSchema.pre('save', async function(next) {
  
    if (!this.applicationid) {
        this.applicationid = uuid.v4();  
      }
    next();
});
module.exports=mongoose.model('Applications',ApplicationsSchema)