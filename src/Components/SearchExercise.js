import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import { exerciseoptions,fetchData } from '../utils/fetchData'
import Exercises from './Exercises'
import HorizontalScrollbar from './HorizontalScrollbar'
const SearchExercise = ({setExercises,bodyPart,setBodyPart}) => {
  const[search,setSearch]=useState('');
 
  const[bodyParts,setBodyParts]=useState([]);

  useEffect(()=>{
    const fetchExercisesData= async ()=>{
      const bodyPartsData=await fetchData ('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseoptions);

      setBodyParts(['all', ...bodyPartsData]);
    }

    fetchExercisesData();
  },[])

  const handleSearch=async()=>{
    if(search){
      const exercisesData = await fetchData ('https://exercisedb.p.rapidapi.com/exercises',exerciseoptions);
      // const searchedExercises = exerciseData.filter(
      //   (exercise)=>exercise.name.toLowerCase().includes(search)
      //   ||exercise.target.toLowerCase().includes(search)
      //   ||exercise.equipment.toLowerCase().includes(search)
      //   ||exercise.bodypart.toLowerCase().includes(search)
      // )
      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
               || exercise.target.toLowerCase().includes(search)
               || exercise.equipment.toLowerCase().includes(search)
               || exercise.bodyPart.toLowerCase().includes(search),
      );
      console.log(exercisesData);
      setSearch('');
      setExercises(searchedExercises);
    }
  }
  
  return (
    <Stack alignItems='center' mt='50px' justifyContent='center' p='20px'>
      <Typography fontWeight={700} sx={{fontSize:{lg:'44px',xs:'30px'}}} mb="50px" textAlign={'center'} className="text-white"> 
        Awesome Exercise You <br/> Should Know
      </Typography>
      <Box position={'relative'} mb='72px'>
        <TextField
        sx={{
          input:{fontWeight:'700' ,border:'none',borderRadius:'4px'}, width:{lg:'800px',xs:'350px'}, backgroundColor:'#fff'
        }}
          height="76px"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Exercises By Muscle"
          type="text"
          className='bg-white'
        />
        <Button className='search-btn' sx={{bgcolor:'#5ae717', color:'#fff',textTransform:'none',width:{lg:'170px',xs:'80px'},fontSize:{lg:'20px',xs:'12px'},height:'56px',position:'absolute',right:'0'}} onClick={handleSearch}  >
          Search
        </Button>

      </Box>
      <Box sx={{position:'relative' ,width:'100%', p:'20px'}}>
        <HorizontalScrollbar data={bodyParts}
          bodyPart={bodyPart} setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercise