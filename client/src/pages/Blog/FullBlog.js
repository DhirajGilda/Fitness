import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FullBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

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
    const getBlog = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3001/auth/blogs/${id}`);
        console.log(response.data);
        setBlog(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getBlog();
  }, [id]);

  if (!blog) {
    return <div className='text-[50px] text-white'>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-white'>{blog.title}</h1>
      <p className='text-white'>{blog.body}</p>
      <p className='text-white'>Author: {blog.author.firstName} {blog.author.lastName}</p>
      <p className='text-white'>Created on: {new Date(blog.date).toLocaleDateString()}</p>
    </div>
  );
};

export default FullBlog;
