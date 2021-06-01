import axios, { AxiosRequestConfig } from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req: AxiosRequestConfig) => {
    const profile = localStorage.getItem('profile')
    if(profile){
        const { token } = JSON.parse(profile);
        req.headers.authorization = `Bearer ${token}`;
    }
    
    return req
});

// post requests
export const get_posts = (page: number) => API.get(`/posts?page=${page}`);
export const get_single_post = (id: string) => API.get(`/posts/${id}`);
export const get_posts_by_search = (searchQuery: SearchQuery) => 
    API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const post_post = (newPost: PostToAdd) => API.post('/posts', newPost);
export const delete_post = (id: string) => API.delete(`posts/${id}`);
export const patch_post = (id: string, updatedPost: PostToAdd) => API.patch(`/posts/${id}`, updatedPost);
export const like_post = (id: string) => API.patch(`/posts/${id}/like`);

// user requests
export const signIn = (formData: signinUser) => API.post('/users/signin', formData); 
export const signUp = (formData: signupUser) => API.post('/users/signup', formData); 
