import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
const Signup = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <h1 class="text-gray-200 text-center font-extrabold -mt-3 text-3xl">FitNext</h1>
              <div class="container py-5 max-w-md mx-auto">
              <form onSubmit={handleSubmit}>
                      <div class="mb-4">
                          <input placeholder="Username"
                              class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                      </div>
                      <div class="mb-6">
      
                          <input placeholder="Password"
                              class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
      
                      </div>
                      <div class="flex items-center justify-center">
                          <button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit">
                              Sign UP
                          </button>
                      </div>
                      <div className='p-4 flex justify-center items-center'>
                      <Link to={"/Login"} style={{textDecoration:'none' , borderBottom:'3px solid #ffff', mb:'20px'}} class='text-white'>continue to login page</Link>
                      </div>
                  </form>
              </div>
          </div>
        </div>
        </section>
  );
};

export default Signup

{/* <form onSubmit={handleSubmit}>
<input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Username"
/>
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
/>
<button className='bg-red-500' type="submit">Sign Up</button>
</form> */}