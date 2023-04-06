import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Box className="App" width={"400px"} sx={{ width: {xl:'1488px'}}} m='auto'>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<LandingPage/>}/>
        {/* <Route path="/Exercise/:id" element={<ExerciseDetail/>}/> */}
        <Route path="/Meals" element={<RecipeSearch/>}/>
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;
