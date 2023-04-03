import React, { useState } from "react";
import "../App.css"
import {
  TextareaAutosize,
  TableContainer,
  Table,TableBody,TableCell,TableRow,TableHead
} from "@material-ui/core";
import { Paper } from "@material-ui/core";


const API_ID = "be37375e";
const API_KEY = "0a276ca008d0b91c3ac163f1c41b8e7a";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [nutrients, setNutrients] = useState(0);
  const [tdaily,setTdaily] =useState(0);
  const [calories,setCalories]=useState(0);
  const [table,SetTable] =useState([]);
  const [show,SetShow] =useState(false);

  const handleFetch = async () => {
    const ingrList = ingredients.split(",").map((ingr) => encodeURIComponent(ingr.trim()));
    const fetchPromises = ingrList.map((ingr) => {
      return fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=${API_ID}&app_key=${API_KEY}&ingr=${ingr}`
      ).then((response) => response.json());
    });


    const data = await Promise.all(fetchPromises);
    const totalNutrients = data.reduce((acc, curr) => {
      for (const key in curr.totalNutrients) {
        if (acc[key]) {
          acc[key].quantity += curr.totalNutrients[key].quantity;
        } else {
          acc[key] = curr.totalNutrients[key];
        }
      }
      return acc;
    }, {});


    const totalDaily = data.reduce((acc,curr)=>{
      for(const key in curr.totalDaily){
        if(acc[key]){
          acc[key].quantity += curr.totalDaily[key].quantity;
        } else {
          acc[key] = curr.totalDaily[key];
        }
      }
      return acc;
    })


    const totalCalories = data.reduce((acc, curr) => {
      return acc + curr.calories;
    }, 0);

    const tabel=data.map((d, index) => {
      const input = ingredients.split(",")[index].trim();
      return {
        id: index + 1,
        qty: input.split(" ")[0],
        unit: input.split(" ")[1],
        food: input.split(" ")[2],
        calories: d.calories,
        weight: d.totalWeight.toFixed(1),
      };
    });

    console.log(tabel);
    console.log(data);
    console.log(totalDaily);
    console.log(totalNutrients);
    console.log(totalCalories);
    SetTable(tabel)
    setCalories(totalCalories)
    setTdaily(totalDaily);
    setNutrients(totalNutrients);
    
  };
  const resetState = async () => {
    setIngredients("");
    setNutrients(0);
    setTdaily(0);
    setCalories(0);
    SetTable([]);
  }
  const handleToggleClick = () => {
    SetShow(!show);
  }
  const handleClickAnalyse=()=>{
    handleToggleClick();
    handleFetch();
  }
  const handleClickNew=()=>{
    resetState();
    handleToggleClick();
  }
  return (
    <>
      <div>
        <p className="text-white flex justify-between items-center p-10 text-[20px] font-bold">Enter an ingredient list  for what you are cooking, like "1 cup rice, 10 oz chickpeas", etc.
            Enter each ingredient on a new line seperated by commas.</p>
      </div>
      <div className={` flex justify-center items-center   px-10 ${show ?"flex flex-col sm:flex-row justify-between items-center  px-10":""} `}>
        <div className="flex flex-col pr-10 ">
          <div className="max-[600px]:ml-10">
            <TextareaAutosize
                  rowsMin={10}
                  placeholder="Enter a food"
                  value={ingredients}
                  onChange={(event) => setIngredients(event.target.value)}
                  style={{width:"40vw",height: "300px", padding: "10px", fontSize: "16px" ,borderRadius:'10px'}}
                  className="textarea" 
                  
                />

            </div>
            <div className='flex items-center justify-between p-10 px-[60px] max-[600px]:flex-col'>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full " onClick={handleClickAnalyse} >Analyze</button>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full max-[600px]:mt-3" onClick={handleClickNew} >New Recipe</button>
            </div>
            {
              table.length>0 && (
              <div style={{ margin: "20px" }}>
                  <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table aria-label="nutrients table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Qty</TableCell>
                          <TableCell align="center">Unit</TableCell>
                          <TableCell align="center">Food</TableCell>
                          <TableCell align="center">Calories</TableCell>
                          <TableCell align="center">Weight</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {table.map((tables) => (
                          <TableRow key={tables.id}>
                            <TableCell align="center">{tables.qty}</TableCell>
                            <TableCell align="center">{tables.unit}</TableCell>
                            <TableCell align="center">{tables.food}</TableCell>
                            <TableCell align="center">{tables.calories}</TableCell>
                            <TableCell align="center">{tables.weight}</TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                      </TableContainer>
                </div>
              )
            }
            
        </div>
        {
          show ?<div className="pl-10 pr-[15%]   ">
           
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white  ">
            <div className="px-6 py-4">
              <div className="font-bold text-black text-xl mb-2 border-b-[15px] pb-2 items-center flex justify-center">Nutrition Facts</div>
              <div className="mb-2">
                <span className="font-bold  pb-1">Amount Per Serving</span>
              </div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2">
                  <div className="flex justify-between mb-1 border-b-[15px]">
                      <span className="fact-name font-bold text-black text-[30px] ">Calories </span>
                      <span className="fact-value font-bold text-black text-[30px]">{calories} </span>
                  </div>
                  <div className="flex justify-end text-[10px] border-b mb-1">
                    <span>% Daily Value*</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className="fact-name font-bold text-black pr-1 ">Total Fat</span>
                      {nutrients.FAT && (
                          <span className="fact-value pl-1 ">{nutrients.FAT.quantity.toFixed(1)} g</span>
                      )}
                    </div>
                      {tdaily.FAT && (
                          <span className="fact-percent font-bold text-black">{tdaily.FAT.quantity.toFixed(0)} %</span>
                      )}
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className="fact-name text-bold text-black pl-[12px] p-1 ">Saturated Fat</span>
                      {nutrients.FASAT && (
                            <span className="fact-value text-bold text-black ">{nutrients.FASAT.quantity.toFixed(1)} g</span>
                      )}
                    </div>
                    {tdaily.FASAT && (
                        <span className="fact-percent font-bold text-black ">{tdaily.FASAT.quantity.toFixed(1)} %</span> 
                    )}
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <span className='pl-[12px]' >Trans Fat -</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className='text-black font-bold p-1'>Cholesterol</span>
                      {nutrients.CHOLE && (
                          <span className="fact-value text-bold text-black">{nutrients.CHOLE.quantity.toFixed(1)}g</span>
                        )}
                    </div>
                    {tdaily.CHOLE && (
                          <span className="fact-percent font-bold text-black ">{tdaily.CHOLE.quantity.toFixed(1)} %</span> 
                      )}
                    
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className="fact-name font-bold text-black p-1">Sodium</span>
                      {nutrients.NA && (
                          <span className="fact-value text-bold text-black">{nutrients.NA.quantity.toFixed(1)} mg</span>
                        )}
                    </div>
                    {tdaily.NA && (
                        <span className="fact-percent font-bold text-black">{tdaily.NA.quantity.toFixed(1)} %</span>
                      )}
                  </div>
                  <div className="flex justify-between mb-1 border-b ">
                    <div className="pr-2">
                      <span className="fact-name font-bold text-black p-1">Total Carbohydrate</span>
                      {nutrients.CHOCDF && (
                          <span className="fact-value text-black ">{nutrients.CHOCDF.quantity.toFixed(1)} g</span>
                      )}
                    </div> 
                    <div className="pl-2">
                      {tdaily.CHOCDF && (
                        <span className="fact-percent font-bold text-black ">{tdaily.CHOCDF.quantity.toFixed(1)} %</span> 
                      )}    
                    </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                        <span className='pl-[12px] p-1'>Dietary Fiber</span>
                        {
                          nutrients.FIBTG && (
                            <span className="fact-name  text-black ">{nutrients.FIBTG.quantity.toFixed(2)} g</span>
                          )
                        } 
                    </div>
                    <div>
                          {
                            tdaily.FIBTG && (
                              <span className="fact-percent font-bold text-black ">{tdaily.FIBTG.quantity.toFixed(2)} %</span> 
                            )
                          }
                    </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className='pl-[12px] p-1'>Total Sugars</span>
                      {
                        nutrients.SUGAR && (
                          <span className="fact-name  text-black">{nutrients.SUGAR.quantity.toFixed(1)}g</span>
                        )
                      }
                    </div>
                    <span></span>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <span className='pl-[12px]'>Includes - Added Sugars</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className='text-black font-bold p-1'>Protein</span>
                      {nutrients.PROCNT && (
                        <span fact-name  text-black>{nutrients.PROCNT.quantity.toFixed(1)}g</span>
                      )}
                    </div>
                    <div>
                      {tdaily.PROCNT &&(
                        <span className="fact-percent font-bold text-black">
                          {tdaily.PROCNT.quantity.toFixed(2)} %
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                    <div>
                      <span className="p-1">Vitamin D</span>
                      {nutrients.VITD && (
                        <span className="fact-name text-black">{nutrients.VITD.quantity.toFixed(1)} µg</span>
                      )}
                    </div>
                    <div>
                      {
                        tdaily.VITD &&(
                          <span className="fact-percent font-bold text-black">{tdaily.VITD.quantity.toFixed(1)}%</span>
                        )
                      }
                    </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                      <div>
                          <span className="p-1">Calcium</span>
                          {nutrients.CA && (
                            <span className="fact-name text-black">{nutrients.CA.quantity.toFixed(1)} µg</span>
                          )}
                        </div>
                        <div>
                          {
                            tdaily.CA &&(
                              <span className="fact-percent font-bold text-black">{tdaily.CA.quantity.toFixed(1)}%</span>
                            )
                          }
                      </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                      <div>
                          <span className="p-1">Iron</span>
                          {nutrients.FE && (
                            <span className="fact-name text-black">{nutrients.FE.quantity.toFixed(1)} µg</span>
                          )}
                        </div>
                        <div>
                          {
                            tdaily.FE &&(
                              <span className="fact-percent font-bold text-black">{tdaily.FE.quantity.toFixed(1)}%</span>
                            )
                          }
                      </div>
                  </div>
                  <div className="flex justify-between mb-1 border-b">
                        <div>
                            <span className="p-1">Potassium</span>
                            {nutrients.K && (
                              <span className="fact-name text-black">{nutrients.K.quantity.toFixed(1)} µg</span>
                            )}
                          </div>
                          <div>
                            {
                              tdaily.K &&(
                                <span className="fact-percent font-bold text-black">{tdaily.K.quantity.toFixed(1)}%</span>
                              )
                            }
                        </div>
                  </div>

                  <div className="p-2 ">
                    <span className="text-black text-[10px]">*Percent Daily Values are based on a 2000 calorie diet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>:'hidden'
        }
       
        <style>
          {
            ` @media screen and (max-width: 600px) {
              .textarea {
                width: 100%;
                height: 150px;
              }
            }
            }`
          }
        </style>
        
      </div>

    </>
  );
}

export default App;



