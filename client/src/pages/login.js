import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home'

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
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
      <button className='rounded  bg-red-500' type="submit">Log In</button>
    </form>
  );
};


const LoginSignupPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Home/>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Log In</h2>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
          <h2>Sign Up</h2>
          {/* <SignupForm setIsLoggedIn={setIsLoggedIn} /> */}
        </div>
      )}
    </div>
  );
};

export default LoginSignupPage;
