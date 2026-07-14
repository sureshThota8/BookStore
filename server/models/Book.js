const mongoose=require("mongoose");

const BookSchema=new mongoose.Schema({

title:{
type:String,
required:true
},

author:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

category:{
type:String,
required:true
},

description:{
type:String
},

image:{
type:String
},

stock:{
type:Number,
default:1
}

});

module.exports=mongoose.model("Book",BookSchema);