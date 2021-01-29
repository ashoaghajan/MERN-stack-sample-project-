import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getPosts = () => API.get('/posts');
export const postPost = (newPost: PostToAdd) => API.post('/posts', newPost);
export const deletePost = (id: string) => API.delete(`${'/posts'}/${id}`);
export const patchPost = (id: string, updatedPost: PostToAdd) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const likePost = (id: string) => API.patch(`${'/posts'}/${id}/like`);

export const signIn = (formData: signinUser) => API.post('/users/signin', formData); 
export const signUp = (formData: signupUser) => API.post('/users/signup', formData); 
