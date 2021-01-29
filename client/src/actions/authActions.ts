import * as api from '../api/axiosRequests';

// google & local storage
export const googleAuth = (result: any, token: string) => (dispatch: Dispatch) => {
    try{
        dispatch({ type: "SET_USER", payload: { result, token } })
    }
    catch(err){
        console.log(err);
    }
}

export const getUser = () => (dispatch: Dispatch) => {
    dispatch({ type: "GET_USER", payload: { } })
}

export const userLogout = () => (dispatch: Dispatch) => {
    dispatch({ type: "LOGOUT", payload: { } })
}


// backend and mongoDB
export const userSignin = (formData: signinUser, history: any) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.signIn(formData) 
        dispatch({ type: "SET_USER", payload: data });
        history.push('/');
    }
    catch(err){
        console.log(err);
    }
}

export const userSignup = (formData: signupUser, history: any) => async(dispatch: Dispatch) => {
    try{
        const { data } = await api.signUp(formData) 
        dispatch({ type: "SET_USER", payload: data });
        history.push('/');
    }
    catch(err){
        console.log(err);
    }
}