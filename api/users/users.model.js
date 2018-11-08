const mongoose = require('mongoose')
const Schema = mongoose.Schema
const usersSchema = new Schema({

  name:{
    type:String,
    unique:false,
    required: true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    unique:true,
    required:true,
    minlength:8
  },
  username:{
    type:String,
    unique:true,
    required:true,
    minlength:4
  }  
})

module.exports = usersSchema
