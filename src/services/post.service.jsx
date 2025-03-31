import { api } from "../api/api";

export const getPosts = () => api.get('/blog/'); 
export const getPost = (id) => api.get(`/blog/${id}`); 

export const addPost = (data) => api.post('/blog/create', data);
export const editPost = (data) => api.put(`/blog/update/${data.id}`, data);
export const removePost = (id) => api.delete(`/blog/delete/${id}`);

export const addComment = (data, id) => api.post(`/blog/comment/create/${id}`, data);
export const editComment = (id, data) => api.put(`/blog/comment/update/${id}`, data);
export const removeComment = (id) => api.delete(`/blog/comment/delete/${id}`);