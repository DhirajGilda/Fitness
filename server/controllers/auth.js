// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* REGISTER USER */

export const register=async(req,res)=>{
    try {
        const{
            firstName,
            lastName,
            email,
            password,
        }=req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newuser =new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        });

        const savedUser =await newuser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

/* LOGGING IN */

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user =await User.findOne({email:email});
        console.log(req.body);
        console.log("asdasd",user);
        if(!user) return res.status(400).json({msg:"user does not exist"});
    
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credentials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password; //for safety not to sent back at frontend
        res.status(200).json({token,user});

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}