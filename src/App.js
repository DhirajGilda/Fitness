import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import './App.css';
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import ExerciseDetail from "./pages/ExerciseDetail";
import Footer from "./Components/Footer";

function App() {
  return (
    <Box className="App" width={"400px"} sx={{ width: {xl:'1488px'}}} m='auto'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Exercise/:id" element={<ExerciseDetail/>}/>
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;
