import React, { useEffect, useState } from 'react';
import memories from './images/memories.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/postActions';

function App() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    dispatch(getPosts());
  },[dispatch])

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </AppBar>
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
    </Container>
  );
}

export default App;
