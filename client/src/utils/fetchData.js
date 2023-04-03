export const exerciseoptions={
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
}

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

// export const mealsOptions={
//   method: 'GET',
//   url: 'https://edamam-recipe-search.p.rapidapi.com/search',
//   headers: {
//     'X-RapidAPI-Key': '57d63493d2msh6e5e16f4f245b89p165239jsn8eb7d50c1cea',
//     'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
//   }
// }


export const fetchData =async (url,options) =>{
    const response=await fetch(url,options);
    const data =await response.json();
    return data;
}


