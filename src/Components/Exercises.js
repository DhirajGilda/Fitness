import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import {exerciseoptions,fetchData} from '../utils/fetchData'
import ExerciseCard from './ExerciseCard';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'white',
    },
  },
}));


const Exercises = ({exercises,setExercises,bodyPart}) => {

  

  const [currentPage,setCurrentPage] =useState(1);
  const exercisesPerPage=9;
  const classes = useStyles();

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseoptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseoptions);
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);



    // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };
  

  return (
      <Box id="exercises"
        sx={{
          mt:{lg:'110px'}
        }}
        mt="50px"
        p="20px"
      > 
       <Typography variant="h3" mb="46px" color="white">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{gap:{lg:'110px',xs:'50px '}}}
        flexWrap="wrap" justifyContent="center" color="white"
      >
        {currentExercises.map((exercise,index)=>(
          <ExerciseCard 
            key={index}
            exercise={exercise}
          
          />
        ))}

      </Stack>
      <Stack mt="100px" alignItems="center" color="white" >
        {exercises.length>9 &&(
          <Pagination 
            color='primary'
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length/exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size ="large"
            classes={{root: classes.pagination}} // add the custom style to the Pagination component
          
          />
        )}

      </Stack>
      </Box>
  )
}

export default Exercises