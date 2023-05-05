// const mongoose = require('mongoose');
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const User = mongoose.model('User', UserSchema);
  // module.exports=User;
  export default User;

  