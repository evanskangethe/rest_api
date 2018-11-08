const Users = require('users.dao');
const bcrypt = require('bcrypt');
const saltRounds = 10

exports.createUser = function (req,res,next) {

  bcrypt.hash(req.body.password,saltRounds,function (err,hash) {
    let user = {
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      password:hash
    }
    Users.create(user,(err,user)=>{
      if (err) res.json({error:err})

      res.json({message: 'User created successfully'})
    })
  })
}

exports.getUsers = function(req,res,next) {

  Users.get({},(err,users)){
    if (err) res.json({error:err})

    res.json({users: users})
  }
}

exports.getUser = function (req,res,next) {

  Users.getByName({username:req.body.username},(err,user)=>{
    bcrypt.compare(req.body.password,user.password,(err,res)=>{
      if (err) res.json({error:err})

      if (!res){
        res.json({message:'user name or password is wrong'})
      }else{
        res.json({id:user._id})
      }
    })
  })
}

exports.updateUser = function (req,res,next) {

  bcrypt.hash(req.body.password,saltRounds,function (err,hash){
    let user = {
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      password:hash
    }
    Users.update({_id:req.params.id},user,(err,user)=>{
      if (err) res.json({error:err})

      res.json({message: 'User updated successfully'})
    })
  }
}

exports.removeUser = function (req,res,next) {
  Users.remove({username:req.body.username},(err,msg)=>{
    if (err) res.json({error:err})

    res.json({message: 'User deleted successfully'})
  })
}
