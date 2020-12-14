import * as api from '../api/axiosRequests'

// Action Creators
export const getPosts = () => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.getData();
        dispatch({ type: 'GET_POSTS', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const addPost = (newPost: PostToAdd) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.postData(newPost);
        dispatch({ type: 'CREATE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const updatePost = (id: string, updatedPost: PostToAdd | { likeCount: number }) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.patchData(id, updatedPost);
        dispatch({ type: 'UPDATE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}

export const deletePost = (id: string) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.deleteData(id);
        dispatch({ type: 'DELETE_POST', payload: data })
    }
    catch(err){
        console.log(err.message);
    }
}