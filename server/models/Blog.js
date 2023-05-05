// const mongoose = require('mongoose');
import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  body: {
    type: String,
    required: true,
    minlength: 10,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
