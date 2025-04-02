const mongoose=require('mongoose')
const uuid=require('uuid')
const UserSchema=mongoose.Schema({
    email:String,
    name:String,
    role:{type:String,enum:['admin','student','employer']},
    phone:String,
    aadhar:String,
    address:String,
    district:String,
    qualificatiom:String,
    company:String,
    password:String,
    userid:{type: String, unique: true, default: () => uuid.v4()},
})
UserSchema.pre('save', async function(next) {
  
    if (!this.userid) {
        this.userid = uuid.v4();  
      }
    next();
});
module.exports=mongoose.model('User',UserSchema)