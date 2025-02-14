import { api } from "../api/api";

export const getSatellites = () => api.get(`/satellites/`); 
export const getSatellite = (name) => api.get(`/satellites/${name}`); 
