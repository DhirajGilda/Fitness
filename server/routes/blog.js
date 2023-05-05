import express from 'express';
import { verifytoken } from '../middleware/auth.js';
import { createBlog , deleteBlog, updateBlog ,getBlogs, getBlogById} from '../controllers/blogs.js';

const router = express.Router();

// Protected routes
// router.use(verifytoken);

// Create a new blog
router.post('/blog',verifytoken, createBlog);
// Get all blogs
router.get('/blogs',verifytoken, getBlogs);
// get blog by id
router.get('/blogs/:id',verifytoken,getBlogById)
//delete blog
router.delete('/blogs/:id', verifytoken, deleteBlog)
//update blog
router.put('/blogsUpdate/:id',verifytoken, updateBlog)

export default router;
