const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require ('../models/User')
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../midleware/fetchuser');
const jwt_secret ="umairis$goodhandsome"
//rout=1 creating uing user  post login "/api/auth/createuser"
router.post  ('/createuser',[
  body('name','Enter a valid name').isLength({ min: 3 }),
  body('email','Enter a valid email').isEmail(),
  body('password','password must be at least 5 character').isLength({ min: 5 }),
],async (req,res) =>{
  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });}
  // cheak with email already exist 
  try{
  
    let user= await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({ success, error:'Sorry a user with ths  email is already exist'})
    }
    const salt = await bcrypt.genSaltSync(10);
   const secPass = await bcrypt.hash( req.body.password, salt);
    // creat a new user
    user=await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data ={
      user:{
       id:user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_secret);
    
    
  //  res.json(user)}
  success=true;
  res.json({ success, authtoken})}
   //catch error
   catch(error){ console.log(error.message)
    res.status(500).send("internal server error")}
  
}  )

     //routh=2 creating uing user  post  "/api/auth/login"
   router.post  ('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password be not blank').exists(),
]
  ,async (req,res) =>{
    let success=false
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })}

      const {email,password}= req.body;
      try {
        let user= await User.findOne({email});
        if(!user){
          success=false
          return res.status(400).json({ success ,error: "please try to login correct credentionls"})
        }
        const comparepassword = await bcrypt.compare(password,user.password)
        if(!comparepassword){
          success=false
          return res.status(400).json({ success ,error: "please try to login correct credentionls"})
        }
        const data ={
          user:{
           id:user.id
          }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        success=true
        res.json({ success, authtoken})
      } catch (error) 
        { console.log(error.message)
          res.status(500).send(" internal server error ")}
      })
   
     //routh=3 loggedin iin user  post  "/api/auth/getuser"
     router.post  ('/getuser',fetchuser
  ,async (req,res) =>{const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })}
     try {
         userId=req.user.id
         const user=  await User.findById(userId).select('-password')
         res.send(user)
     } catch (error) 
        { console.log(error.message)
          res.status(500).send(" internal server error ")}})
module.exports=router