import { api } from "../api/api";

export const getPosts = () => api.get('/blog/'); 
export const getPost = (id) => api.get(`/blog/${id}`); 

export const addPost = (data, config) => api.post('/blog/create', data, config);
export const editPost = (data, config) => api.put(`/blog/update/${data.id}`, data, config);
export const removePost = (id, config) => api.delete(`/blog/delete/${id}`, config);

export const addComment = (data, config) => api.post(`/blog/comment/create`, data, config);
export const editComment = (id, data, config) => api.put(`/blog/comment/update/${id}`, data, config);
export const removeComment = (id, config) => api.delete(`/blog/comment/delete/${id}`, config);