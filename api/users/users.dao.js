const mongoose = require('mongoose')
const usersSchema = require('./users.model');

//assign a function to the static object of our usersSchema
usersSchema.statics = {
  create: function (data,cb) {
    const user = new this(data)
    user.save(cb)
  },

  get: function (query,cb) {
    this.find(query,cb)
  },

  getByName: function (query,cb) {
    this.findOne(query,cb)
  },

  update: function(query,updateData,cb) {
    this.findOneAndUpdate(query,{$set:updateData},{new:true},cb)
  },

  remove: function (query,cb) {
    this.findOneAndDelete(query,cb)
  }
}

const Users = mongoose.model('Users',usersSchema)
module.exports =  Users
