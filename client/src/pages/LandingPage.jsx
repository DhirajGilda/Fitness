import React from 'react'
import FirstImg from "../assets/images/firstImg.jpg";
import "./landing.css";

const LandingPage = () => {
  return (
     <div>
        <div className='para1'>
          <h1 className='text-white'>Get Fit With Us</h1>
          <p className='text-white'>Each new day is an opportunity to improve yourself. Take it and make the most out of it. Our website will help you to find the best exercises suited to your body and will help you in getting in shape within shortest possible time.</p>
        </div>
        <img className='img1 rounded-xl' src={FirstImg} alt="" />
    </div>
  )
}

export default LandingPage