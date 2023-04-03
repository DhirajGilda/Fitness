import React from 'react'
import { Box  } from '@mui/system'
import { Stack, Typography } from '@mui/material'
import {Button} from '@mui/material'
import HeroBannerImage from '../assets/images/banner.png'
import { Height } from '@mui/icons-material'
import logo from '../assets/images/banner5.jpg'
const Homebanner = () => {
  return (
    <Box sx={{mt:{lg:'200',xs:'70px'},ml:{sm:'50px'}}} position={'relative'} p={'20px'} class="flex justify-between align-center p-[100px]" >
      <div>
      <Typography  color="#00000" fontWeight={600} fontSize="26px" class='text-white text-3xl'>
            Fitness Club
        </Typography>
        <Typography fontWeight={700} sx={{fontSize:{lg:'44px' ,xs :'40px'}}} color={'#5ae717'}mb="23px" mt="20px">
            Sweat, Smile <br/> And Repeat
        </Typography>
        <Typography fontSize={'22px'} lineHeight={'35px'} mb={1} color={'white'}>
          Check out the most effective exercises personalized to Exercises
        </Typography>
        <Stack>
          <a href="#exercises" style={{ marginTop: '35px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#5ae717', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Exercises</a>
       </Stack>
       
      </div>
        
        <div className=" h-fit  mr-6    ">
           <img src={logo} alt={logo} className='hero-banner-img  object-cover w-[300px] rounded-md'></img>
        </div>
        
    </Box>
  )
}

export default Homebanner