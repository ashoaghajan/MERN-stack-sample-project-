import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from '../styles/navbarStyles';
import { Link, useHistory } from 'react-router-dom';
import { getUser, userLogout } from '../actions/authActions';

export interface NavbarProps {
    
}
 
const Navbar: React.SFC<NavbarProps> = () => {

    const classes = useStyles();
    const userData: User = useSelector((state: RootState) => state.auth.authData);
    const userInfo = userData.result ? userData.result : null;
    const dispatch = useDispatch();
    const history = useHistory();
    const avatarText = userInfo?.name && userInfo?.name.split(' ')[0].charAt(0) + userInfo.name.split(' ')[1].charAt(0);


    useEffect(() => {
        dispatch(getUser());
        // eslint-disable-next-line
    },[]);


    const logout = () => {
        dispatch(userLogout());
        history.push('/');
    }

    return ( 
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
                {/* <img className={classes.image} src={memories} alt='memories' height='60' /> */}
            </div>
            <Toolbar className={classes.toolbar}>
                {userData.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={userInfo?.name} src={userInfo?.imageUrl}>{avatarText}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{userInfo?.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
     );
}
 
export default Navbar;
