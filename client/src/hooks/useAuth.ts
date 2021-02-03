import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from '../styles/authStyles';
import { googleAuth, userSignup, userSignin } from '../actions/authActions';
import { initSignForm } from '../global/globalVariables';


export const useAuth = () => {
    const classes = useStyles();
    const googleId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignup, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initSignForm)


    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const swithMode = () => {
        setIsSignUp(prevState => !prevState);
        setFormData(initSignForm);
        if(showPassword) handleShowPassword();
    }

    const handleChange = (e: any) => {
        const { name: key, value } = e.target;
        setFormData(prevState => ({ ...prevState, [key]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isSignup){
            dispatch(userSignup(formData, history));
        }
        else{
            dispatch(userSignin(formData, history));
        }
    }

    const googleSuccess = (res: any) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        dispatch(googleAuth(result, token));
        history.push('/');
    }

    const googleFailure = () => {
        console.log("Google Sign In Was unsuccessfull. Try Again Later")
    }

    return { classes, isSignup, googleId, showPassword, formData, handleShowPassword,
        swithMode, handleChange, handleSubmit, googleSuccess, googleFailure }
}