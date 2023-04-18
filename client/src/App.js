import React from "react";
import {BrowserRouter,Navigate,Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import './App.css';
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import ExerciseDetail from "./pages/ExerciseDetail";
import Footer from "./Components/Footer";
import RecipeSearch from "./pages/RecipeSearch";
import Login from "./pages/login";
import Signup from "./pages/Signup"
import LandingPage from "./pages/LandingPage"
import { useSelector } from "react-redux";

function App() {
  const isAuth =Boolean(useSelector((state)=>state.token));
  return (
    <Box className="App" width={"400px"} sx={{ width: {xl:'1488px'}}} m='auto'>
      <BrowserRouter>
        {isAuth && <Navbar/>} 
        <div className="min-h-screen">
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={isAuth ? <Home/> : <Navigate to ="/login"/>}/>
            {/* <Route path="/Exercise/:id" element={isAuth ? <ExerciseDetail/> : <Navigate to="/login"/>}/> */}
            <Route path="/Meals" element={isAuth ? <RecipeSearch/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
        {isAuth && <Footer/>}  
      </BrowserRouter>
    </Box>
  );
}

export default App;