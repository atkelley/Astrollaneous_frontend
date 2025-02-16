import { api } from "../api/api";

export const getSatellites = () => api.get(`/space/satellites`); 
export const getSatellite = (name) => api.get(`/space/satellites/${name}`); 
