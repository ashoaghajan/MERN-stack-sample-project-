import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import InputComponent from './InputComponent';
import Icon from './icon';
import { useAuth } from '../../hooks/useAuth';



export interface AuthProps {
    
}
 
const Auth: React.SFC<AuthProps> = () => {

    const { error, classes, isSignup, googleId, showPassword, formData, handleShowPassword,
        swithMode, handleChange, handleSubmit, googleSuccess, googleFailure } = useAuth();

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
                            <InputComponent type='text' name='firstName' value={formData.firstName} label='Fist Name' handleChange={handleChange} half autoFocus/>
                            <InputComponent type='text' name='lastName' value={formData.lastName} label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                        <InputComponent type='email' name='email' autoComplete="email" value={formData.email} label='Email Address' handleChange={handleChange}/>
                        <InputComponent type={showPassword ? 'text' : 'password'} name='password' autoComplete="password" value={formData.password} label='Password'
                        handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                        {isSignup && (
                            <InputComponent type='password' name='confirmPassword' value={formData.confirmPassword} label='Repeat Password' handleChange={handleChange}/>
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
                <Typography variant='h6' color='error'>{error}</Typography>
            </Paper>
        </Container>
     );
}
 
export default Auth;
