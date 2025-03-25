import axios from 'axios';

const env = await import.meta.env;

export const getDailyPhoto = axios.create({ baseURL: `https://api.nasa.gov/planetary/apod?api_key=${env.VITE_NASA_API_KEY}`, });
export const getMarsWeather = axios.create({ baseURL: `https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=${env.VITE_NASA_API_KEY}`, });
export const getRoverData = axios.create({ baseURL: `https://api.nasa.gov/mars-photos/api/v1/rovers/`, });
export const getNasaData = axios.create({ baseURL: 'https://images-api.nasa.gov', });
export const getTechportData = axios.create({ baseURL: `https://techport.nasa.gov/api/projects?api_key=${env.VITE_NASA_API_KEY}`, });

// As of 9/2023, NASA's Techport API throws CORS error, even with response/request headers explicitly set ('Access-Control-Allow-Origin': '*')
// Therefore, in lieu of a better work-around, CORS Anywhere proxy was created in Heroku (https://tranquil-brook-10610-ff1772faa4fb.herokuapp.com) 
// and prepended to all Techport API calls (as per: https://stackoverflow.com/questions/47076743/cors-anywhere-herokuapp-com-not-working-503-what-else-can-i-try).
// export const getTechportData = axios.create({
//   baseURL: `https://tranquil-brook-10610-ff1772faa4fb.herokuapp.com/https://techport.nasa.gov/api/projects?api_key=${env.VITE_NASA_API_KEY}`,
// });

// export const getTechportProjectData = axios.create({
//   baseURL: 'https://tranquil-brook-10610-ff1772faa4fb.herokuapp.com/https://techport.nasa.gov/api/projects/',
// });

