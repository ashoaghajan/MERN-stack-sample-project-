import * as api from '../api/axiosRequests';

// Action Creators
export const getPosts = () => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.getPosts();
        dispatch({ type: 'GET_POSTS', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const addPost = (newPost: PostToAdd) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.postPost(newPost);
        dispatch({ type: 'CREATE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const deletePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.deletePost(id);
        dispatch({ type: 'DELETE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const updatePost = (id: string, updatedPost: PostToAdd) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.patchPost(id, updatedPost);
        dispatch({ type: 'UPDATE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const likePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({ type: 'UPDATE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}