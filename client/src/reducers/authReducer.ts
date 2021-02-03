const initState = {
    authData: {}
}

export const authReducer = (state: any = initState, action: Action) => {
    switch(action.type){

        case 'GET_USER':
            // get user from localstorage if any
            const user = localStorage.getItem('profile');
            const userData = user ? JSON.parse(user) : state.authData;
            return {
                ...state,
                authData: userData 
            }

        case 'SET_USER':
            // save user data to localstorage
            const data = JSON.stringify({...action?.payload});
            localStorage.setItem('profile', data);
            return {
                ...state,
                authData: action?.payload
            }

        case 'LOGOUT':
            // delete user from localstorage
            localStorage.clear();
            return {
                ...state,
                authData: {}
            }

        default:
            return state;
    }
}