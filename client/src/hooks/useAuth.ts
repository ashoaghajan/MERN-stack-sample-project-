import { useState, useEffect } from 'react';
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
    const [formData, setFormData] = useState(initSignForm);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    },[])


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
            formData.password !== formData.confirmPassword 
            ? setError('Passwords do not match') 
            : dispatch(userSignup(formData, history, setError));
        }
        else{
            dispatch(userSignin(formData, history, setError));
        }
    }

    const googleSuccess = (res: any) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        dispatch(googleAuth(result, token));
        history.push('/');
    }

    const googleFailure = (err: any) => {
        console.log(err)
        console.log("Google Sign In Was unsuccessfull. Try Again Later")
    }

    return { error, classes, isSignup, googleId, showPassword, formData, handleShowPassword,
        swithMode, handleChange, handleSubmit, googleSuccess, googleFailure }
}