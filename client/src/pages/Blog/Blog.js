import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
const store = require('../../state/index')

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');


  // Set up an axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
  });
  const token = useSelector((state) => state.token);

  // Add an interceptor to the axios instance that adds the token to every request
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3001/auth/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogs();
  }, []);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/blog', { title, body });
      setBlogs([...blogs, response.data]);
      setTitle('');
      setBody('');
      setMessage('Blog post created successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to create blog post');
    }
  };

  const handleUpdateBlog = async (id, newTitle, newBody) => {
    try {
      const response = await axiosInstance.put(`http://localhost:3001/auth/blogsupdate/${id}`, { title: newTitle, body: newBody });
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === response.data._id) {
          return response.data;
        }
        return blog;
      });
      setBlogs(updatedBlogs);
      setMessage('Blog post updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update blog post');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:3001/auth/blogs/${id}`);
      const updatedBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(updatedBlogs);
      setMessage('Blog post deleted successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete blog post');
    }
  };

  // return (
    // <div className='p-[10px]'>
    //   <h1 className='text-[24px] text-white flex justify-center items-center'>Blogs</h1>
    //   <div className='flex justify-between items-center'>
    //     <div>
    //         <form onSubmit={handleCreateBlog}>
    //             <div>
    //               <label className='text-white' htmlFor="title">Title:</label>
    //               <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
    //             </div>
    //             <div>
    //             <label className='text-white' htmlFor="body">Body:</label>
    //             <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
    //             </div>
    //             <button className='text-white' type="submit">Create</button>
    //         </form>
    //     </div>
        
    //     <div className=''>
    //         <ul>
    //             {blogs.map((blog) => (
    //             <li key={blog._id}>
    //                 <h2 className='text-white'>{blog.title}</h2>
    //                 <p className='text-white'>{blog.body}</p>
    //                 <p className='text-white'>Author: {blog.author.firstName} {blog.author.lastName}</p>
    //                 <p className='text-white'>Created on: {new Date(blog.date).toLocaleDateString()}</p>
    //                 <button className='bg-red-200' onClick={() => handleUpdateBlog(blog._id, 'New Title', 'New Body')}>Update</button>
    //                 <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
    //             </li>
    //             ))}
    //         </ul>
    //     </div>
    //   </div>
      
    // </div>
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Blogs</h1>
          {message && <div className="text-red-500 mb-4">{message}</div>}
          <form onSubmit={handleCreateBlog} className="mb-8">
            <div className="flex flex-col mb-4">
              <label htmlFor="title" className="text-xl mb-2 font-semibold">Title:</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-lg py-2 px-4" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="body" className="text-xl mb-2 font-semibold">Body:</label>
              <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} className="border rounded-lg py-2 px-4" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700">Create</button>
          </form>
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-lg">{blog.body.substring(0, 100)}...</p>
                <p className="text-gray-500 text-lg mt-2">Author: {blog.author.firstName} {blog.author.lastName}</p>
                <p className="text-gray-500 text-lg">Created on: {new Date(blog.date).toLocaleDateString()}</p>
                <div className="flex justify-end mt-4">
                  <button onClick={() => handleUpdateBlog(blog._id, 'New Title', 'New Body')} className="bg-green-500 text-white rounded-lg py-2 px-4 mr-4 hover:bg-green-700">Update</button>
                  <button onClick={() => handleDeleteBlog(blog._id)} className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-700">Delete</button>
                  <a href={`/blogs/${blog._id}`}>Read More</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
    
};

export default Blog;
