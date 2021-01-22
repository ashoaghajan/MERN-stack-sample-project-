import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import useStyles from '../../styles/authStyles';
import InputComponent from './InputComponent';
import Icon from './icon';


export interface AuthProps {
    
}
 
const Auth: React.SFC<AuthProps> = () => {

    const classes = useStyles();
    const [isSignup, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const googleId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;


    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const swithMode = () => {
        setIsSignUp(prevState => !prevState);
        if(showPassword) handleShowPassword();
    }

    const handleChange = () => {

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const googleSuccess = (res: any) => {
        console.log(res);
    }

    const googleFailure = () => {
        console.log("Google Sign In Was unsuccessfull. Try Again Later")
    }

    return ( 
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                            <InputComponent type='text' name='firsName' label='Fist Name' handleChange={handleChange} half autoFocus/>
                            <InputComponent type='text' name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                        <InputComponent type='email' name='email' label='Email Address' handleChange={handleChange}/>
                        <InputComponent type={showPassword ? 'text' : 'password'} name='password' label='Password'
                        handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                        {isSignup && (
                            <InputComponent type='password' name='confirmPassword' label='Repeat Password' handleChange={handleChange}/>
                        )}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId={googleId} render={renderProps => (
                        <Button className={classes.googleButton} color='primary' fullWidth variant='contained'
                        onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>
                            Google Sing In
                        </Button>
                    )} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy='single_host_origin'/>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button onClick={swithMode}>
                              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
     );
}
 
export default Auth;
