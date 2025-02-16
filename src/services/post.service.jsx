import { api } from "../api/api";

export const getPosts = () => api.get('/blog/'); 
export const getPost = (id) => api.get(`/blog/${id}`); 
export const createPost = (data) => api.post('/blog/create', data);
export const updatePost = (id, data) => api.put(`/blog/update/${id}`, data);
export const deletePost = (id) => api.delete(`/blog/delete/${id}`);
export const deletePosts = () => api.delete(`/blog`);
export const getPostByTitle = (title) => api.get(`/blog?title=${title}`);