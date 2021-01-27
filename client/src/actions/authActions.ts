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
export const userSignin = (formData: signinUser, history: any) => (dispatch: Dispatch) => {
    try{
        dispatch({ type: "SIGN_IN", payload: { } });
        history.push('/');
    }
    catch(err){
        console.log(err);
    }
}

export const userSignup = (formData: signupUser, history: any) => (dispatch: Dispatch) => {
    try{
        dispatch({ type: "SIGN_UP", payload: { } });
        history.push('/');
    }
    catch(err){
        console.log(err);
    }
}