import decode from 'jwt-decode';
import { userLogout } from '../actions/authActions';

export const changeStateKey = (key: string, value: any, setState: (value: React.SetStateAction<any>) => void) => {
    setState((prevState: any) => {
        return {
            ...prevState,
            [key]: value
        }
    });
}

export const checkToken = (token: string, dispatch: Function, history: any) => {
    if(token){
        const decodedToken: any = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){
            dispatch(userLogout()); 
            history.push('/');
        }
    }
}