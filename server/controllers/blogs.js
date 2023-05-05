// import express from 'express';
// import Blog from "../models/Blog.js";

// const router = express.Router();

// // Create a blog post
// router.post('/blogs', async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const userId = req.user?._id; // Use optional chaining to prevent errors
//     if (!userId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     const blog = new Blog({ title, body, author: userId });
//     await blog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error1' });
//   }
// });

// // Get all blog posts
// router.get('/blogs', async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate('author', 'firstName lastName');
//     res.json(blogs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error2' });
//   }
// });

// // Get a specific blog post
// router.get('/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate('author', 'firstName lastName');
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }
//     res.json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error3' });
//   }
// });

// // Update a blog post
// router.put('/blogs/:id', async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { title, body },
//       { new: true }
//     ).populate('author', 'firstName lastName');
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }
//     res.json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error4' });
//   }
// });

// // Delete a blog post
// router.delete('/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }
//     res.json({ message: 'Blog post deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error5' });
//   }
// });

// export default router;
// Import the Blog model
// import Blog from '../models/Blog.js';

// // Create a new blog
// export const createBlog = async (req, res) => {
//   try {
//     // Get the title and body of the blog from the request body
//     const { title, body ,author } = req.body;

//     // Create a new blog document using the Blog model and the current user's ID
//     const blog = new Blog({ title, body, author });

//     // Save the blog document to the database
//     await blog.save();

//     // Send a response with the saved blog document
//     res.status(201).json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error1' });
//   }
// };

// // Get all blogs
export const getBlogs = async (req, res) => {
  try {
    // Query the database for all blog documents
    const blogs = await Blog.find().populate('author', 'firstName lastName');

    // Send a response with the array of blog documents
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error2' });
  }
};
import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {

    const { title, body  } = req.body;
    console.log('Request body:', req.body);
    const userId = req.user?.id || req.user?.user?.id;

    // const userId = req.user?._id; // Use optional chaining to prevent errors
    console.log('User ID:', userId);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const blog = new Blog({ title, body, author: userId });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error1' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstName lastName');
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error3' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    console.log(req.body);
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    ).populate('author', 'firstName lastName');
    console.log(blog)
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log(blog)
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error4' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    const userId = req.user?.id || req.user?.user?.id;
    const authorId = blog.author.toString();
    if (userId !== authorId) {
      return res.status(403).json({ message: 'You do not have permission to delete this post' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
