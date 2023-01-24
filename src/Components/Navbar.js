import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import logo1 from '../assets/icons/name_logo.png'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { fontSize } from '@mui/system'

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with falsenp
  const hamburgerIcon = <div className="HAMBURGER-ICON space-y-2 mr-2  " onClick={() => setIsNavOpen((prev) => !prev)} >  
                                <span className="block h-0.5 w-8 animate-pulse bg-gray-600 "></span>
                                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                          </div>

const closeicon = <div className="CROSS-ICON space-y-2 mr-2" onClick={() => setIsNavOpen(false)}>   
                        <svg
                          className="h-8 w-8 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        > 
                            <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg> 
                    </div>
  return (
    <div>
      <section className="MOBILE-MENU flex lg:hidden  items-center justify-between mt-4  ">
        <div class='flex flex-row justify-between items-center   ' >
          <Link to={"/"}> <img src={logo1} alt="logo" style={{ width :"58px" ,height:'58px' ,margin :"0 0 0 10px",borderRadius:'10px'}}/></Link>
          <p className='text-green-500 font-bold text-5xl '>Fit</p>
          <p className='text-white font-bold text-5xl '>Next</p>
     
        </div>
        {isNavOpen ? closeicon:hamburgerIcon}
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
            <Link to={"/"} style={{textDecoration:'none' , mb:'20px' ,fontSize:'25px'}} class='text-white'>Home</Link>
            <a href='#exercise' style={{textDecoration:'none',fontSize:'25px'}} class='text-white'>Exercise</a>
            <a href='#blog' style={{textDecoration:'none',fontSize:'25px'}} class='text-white'>Blog</a>
            <a href='#blog' style={{textDecoration:'none',fontSize:'25px'}} class='text-white'>About Us</a>
            </ul>
          </div>
      </section>
      <div  className="DESKTOP-MENU hidden lg:flex justify-between items-center mt-5 ">
        {/* <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={'20px'}> */}
          <div class='flex flex-row justify-between items-center  ' >
            <Link to={"/"}> <img src={logo1} alt="logo" style={{ width :"58px" ,height:'58px' ,margin :"0 0 0 10px",borderRadius:'10px'}}/></Link>
            <p className='text-green-500 font-bold text-5xl '>Fit</p>
            <p className='text-white font-bold text-5xl '>Next</p>
          </div>
        <Stack direction="row" gap={'40px'} fontSize="24px" alignItems={'flex-end'} >
          <Link to={"/"} style={{textDecoration:'none' , borderBottom:'3px solid #FF0000', mb:'20px'}} class='text-white'>Home</Link>
          <a href='#exercise' style={{textDecoration:'none'}} class='text-white'>Exercise</a>
          <a href='#blog' style={{textDecoration:'none'}} class='text-white'>Blog</a>
          <a href='#blog' style={{textDecoration:'none'}} class='text-white'>About Us</a>
          
        </Stack>
        <Stack direction={'row'} alignItems={'flex-end'}>
        <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log in</button>
        </Stack>
        
        {/* </Stack> */}
      </div>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          // border-radius:20px;
          width: 100%;
          position:absolute;
          height: 50%;
          top: 80px;
          right :0;
          background:#00072D;
          //linear-gradient(to right, rgb(34, 197, 94), rgb(21, 128, 61));
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

// import { useState } from "react"; // import state

// const Navbar = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

//   return (
//     <div className="flex items-center justify-between border-b border-gray-400 py-8">
//       <a href="/">
//         <img src="https://designbygio.it/images/logo.png" alt="logo" />
//       </a>
//       <nav>
//         <section className="MOBILE-MENU flex lg:hidden">
//           <div
//             className="HAMBURGER-ICON space-y-2"
//             onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
//           >
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//           </div>

//           <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> // toggle class based on isNavOpen state
//             <div
//               className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
//               onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
//             >
//               <svg
//                 className="h-8 w-8 text-gray-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </div>
//             <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/about">About</a>
//               </li>
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/portfolio">Portfolio</a>
//               </li>
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/contact">Contact</a>
//               </li>
//             </ul>
//           </div>
//         </section>

//         <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
//           <li>
//             <a href="/about">About</a>
//           </li>
//           <li>
//             <a href="/portfolio">Portfolio</a>
//           </li>
//           <li>
//             <a href="/contact">Contact</a>
//           </li>
//         </ul>
//       </nav>
//       <style>{`
//       .hideMenuNav {
//         display: none;
//       }
//       .showMenuNav {
//         display: block;
//         position: absolute;
//         width: 100%;
//         height: 100vh;
//         top: 0;
//         left: 0;
//         background: white;
//         z-index: 10;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         align-items: center;
//       }
//     `}</style>
//     </div>
//   );
// }

export default Navbar