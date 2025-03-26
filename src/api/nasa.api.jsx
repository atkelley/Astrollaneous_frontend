import axios from 'axios';

const env = await import.meta.env;

export const getDailyPhoto = axios.create({ baseURL: `https://api.nasa.gov/planetary/apod?api_key=${env.VITE_NASA_API_KEY}`, });
export const getMarsWeather = axios.create({ baseURL: `https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=${env.VITE_NASA_API_KEY}`, });
export const getRoverData = axios.create({ baseURL: `https://api.nasa.gov/mars-photos/api/v1/rovers/`, });
export const getNasaData = axios.create({ baseURL: 'https://images-api.nasa.gov', });
export const getTechportData = axios.create({ baseURL: 'https://techport.nasa.gov/api/projects', params: { api_key: env.VITE_NASA_API_KEY }, });
