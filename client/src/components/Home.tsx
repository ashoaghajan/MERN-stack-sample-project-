import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from '../styles/homeStyles';
import Form from './Posts/Form';
import Posts from './Posts/Posts';
import { getPosts } from '../actions/postActions';

export interface HomeProps {
    
}
 
const Home: React.SFC<HomeProps> = () => {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
      // eslint-disable-next-line
    },[])
  
    return ( 
        <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item sm={12} lg={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item sm={12} lg={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
     );
}
 
export default Home;
