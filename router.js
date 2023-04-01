const express=require('express');
const userModel = require('./model');
const router=express.Router();
const jsonwebtoken=require('jsonwebtoken');
// const UserModel=require('./model')
const bcrypt=require('bcrypt');

router.post('/auth/signup',async(req,res)=>{
    const {name,password}=req.body;
  console.log(name,password);
    console.log(typeof(name),typeof(password));
  if(name==undefined  ||password==undefined)
  {
    res.status(400).json({
        status:'Data is not complete'
    })
    return
  }
  else if(typeof(name)!="string" || typeof(password)!="string")
  {
    res.status(400).json({
        status:'Please enter the string only'
    })
    return
  }
    const newuser=await userModel.create({
        name,
        password
    })
    // const jwt=jsonwebtoken.create('secret')
    res.status(200).json({
        status:'Created new user',
        result:newuser
    })

})

const createToken=(id)=>{
    jsonwebtoken.sign({id},'secret key');
}

router.post('/auth/login',async(req,res)=>{
    const {name,password}=req.body;
    console.log(name,password);
    console.log(typeof(name),typeof(password));
  if(name==undefined  ||password==undefined)
  {
    res.status(400).json({
        status:'Data is not complete'
    })
    return
  }
  else if(typeof(name)!="string" || typeof(password)!="string")
  {
    res.status(400).json({
        status:'Please enter the string only'
    })
    return
  }
  const user=await userModel.find({name});
  console.log(user[0].password);
  if(user)
  {
  const authpassword=await bcrypt.compare(password,user[0].password);
  if(authpassword)
  {
    const token=createToken(user._id);
    res.json({
        status:'Password matched',
        result:token    
    })
  }
  else{
    res.status(400).json({
    status:'password does not match'
    })
  }
  }

})

module.exports=router
