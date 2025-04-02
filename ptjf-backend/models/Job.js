const mongoose=require('mongoose')

const uuid=require('uuid')
const JobSchema=mongoose.Schema({
    jobid:{ type: String, unique: true, default: () => uuid.v4() },
    companyname:String,
    qualification:String,
    from:Date,
    title:String,
    to:Date,
    totalpay:String,
    workinghours:String,
    address:String,
    district:String,
    userid:String,
})
JobSchema.pre('save', async function(next) {
  
    if (!this.jobid) {
        this.jobid = uuid.v4();  
      }
    next();
});
module.exports=mongoose.model('Job',JobSchema)