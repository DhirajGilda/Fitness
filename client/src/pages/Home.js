import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Exercises from '../Components/Exercises'
import Homebanner from '../Components/Homebanner'
import SearchExercise from '../Components/SearchExercise'
const Home = () => {
  const [bodyPart,setBodyPart]=useState('all');
  const[exercises,setExercises]=useState([]);
  return (
    <Box >
      <Homebanner/>
      {/* <SearchExercise 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        />
       <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      /> */}
    </Box>
  )
}

export default Home