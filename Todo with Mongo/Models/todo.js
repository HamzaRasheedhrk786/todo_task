// defining todo schema here
// aquring mongoose here
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
// define attributes
const todoSchema= new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('tbltodos',todoSchema)

