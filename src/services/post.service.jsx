import { api } from "../api/api";

export const getPost = (id) => api.get(`/blog/posts/${id}`); 
export const getPosts = () => api.get('/blog/posts'); 
export const createPost = (data) => api.post('/blog/posts/create', data);
export const updatePost = (id, data) => api.put(`/blog/posts/update/${id}`, data);
export const deletePost = (id) => api.delete(`/blog/posts/delete/${id}`);
export const deletePosts = () => api.delete(`/blog/posts`);
export const getPostByTitle = (title) => api.get(`/blog/posts?title=${title}`);