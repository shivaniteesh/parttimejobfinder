const mongoose=require('mongoose')
const IssueSchema=mongoose.Schema({
    role:String,
    name:String,
    issue:String,
})

module.exports=mongoose.model('Issue',IssueSchema)