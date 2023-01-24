import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Exercises from '../Components/Exercises'
import Homebanner from '../Components/Homebanner'
import SearchExercise from '../Components/SearchExercise'
const Home = () => {
  return (
    <Box>
      <Homebanner/>
      <SearchExercise/>
      <Exercises/>
    </Box>
  )
}

export default Home