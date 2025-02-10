import { api } from "../api/api";

export const getSatellite = (name) => api.get(`/space/satellites/${name}`); 
