import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
const SearchExercise = () => {
  return (
    <Stack alignItems='center' mt='50px' justifyContent='center' p='20px'>
      <Typography fontWeight={700} sx={{fontSize:{lg:'44px',xs:'30px'}}} mb="50px" textAlign={'center'}> 
        Awesome Exercise You <br/> Should Know
      </Typography>
      <Box position={'relative'} mb='72px'>
        <TextField
          height="76px"
          value=""
          onChange={(e)=>{}}
          placeholder="Search Exercises"
        />

      </Box>

      

    </Stack>
  )
}

export default SearchExercise