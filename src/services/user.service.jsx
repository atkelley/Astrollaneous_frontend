import { api } from "../api/api";

export const getUser = (userId) => api.get(`/users/${userId}`); 
export const getUserPosts = (userId) => api.get(`/users/${userId}/posts`); 
export const getUserComments = (userId) => api.get(`/users/${userId}/comments`); 