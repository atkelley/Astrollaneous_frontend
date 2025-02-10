import axios from "axios";

const baseURL = (import.meta.env.MODE === 'development') ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

export const api = axios.create({ baseURL: baseURL, timeout: 5000, headers: { "Content-type": "application/json" } });