import { api } from "./api";

export const getUser = (userId) => api.get(`/auth/users/${userId}`); 
export const getUserPosts = (userId) => api.get(`/auth/users/${userId}/posts`); 
export const getUserComments = (userId) => api.get(`/auth/users/${userId}/comments`); 