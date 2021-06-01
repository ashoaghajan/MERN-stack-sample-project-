import * as api from '../api/axiosRequests';

// Action Creators
export const getPosts = (page: number) => async(dispatch: Dispatch) => {
    try{
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.get_posts(page);
        dispatch({ type: 'GET_POSTS', payload: data });
        dispatch({ type: 'END_LOADING' });
    }
    catch(err){
        console.log(err.message);
    }
}

export const getSinglePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.get_single_post(id);
        dispatch({ type: 'GET_SINGLE_POST', payload: data });
        dispatch({ type: 'END_LOADING' });
    }
    catch(err){
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery: SearchQuery) => async(dispatch: Dispatch) => {
    try{
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.get_posts_by_search(searchQuery);
        dispatch({ type: 'GET_POSTS_BY_SEARCH', payload: data });
        dispatch({ type: 'END_LOADING' });
    }
    catch(err){
        console.log(err.message);
    }
}

export const addPost = (newPost: PostToAdd) => async(dispatch: Dispatch) => {
    try{
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.post_post(newPost);
        dispatch({ type: 'CREATE_POST', payload: data });
        dispatch({ type: 'END_LOADING' });
    }
    catch(err){
        console.log(err.message);
    }
}

export const deletePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.delete_post(id);
        dispatch({ type: 'DELETE_POST', payload: data });
    }
    catch(err){
        console.log(err.message);
    }
}

export const updatePost = (id: string, updatedPost: PostToAdd) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.patch_post(id, updatedPost);
        dispatch({ type: 'UPDATE_POST', payload: data });
    }
    catch(err){
        console.log(err.message);
    }
}

export const likePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.like_post(id);
        dispatch({ type: 'UPDATE_POST', payload: data });
    }
    catch(err){
        console.log(err.message);
    }
}