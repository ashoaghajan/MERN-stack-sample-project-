import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Form from './Posts/Form';
import Posts from './Posts/Posts';
import { getPostsBySearch } from '../actions/postActions';
import Pagination from './Pagination';
import ChipInput from 'material-ui-chip-input';
import useStyles from '../styles/homeStyles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export interface HomeProps {
    
}
 
const Home: React.SFC<HomeProps> = () => {

    const [currentId, setCurrentId] = useState('');
    const [search, setSearch] = useState('');
    const [tags, setTags]: [any[], React.Dispatch<React.SetStateAction<any>>] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();

    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') ? Number(query.get('page')) : 1;
    const searchQuery = query.get('searchQuery');


    const searchPost = () => {
      if(search.trim() || tags.length){
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }
      else{
        history.push('/');
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if(e.key === 'Enter'){
        searchPost();
      }
    }

    const handleAdd = (tag: string) => {
      setTags((prevTags: string[]) => [...prevTags, tag]);
    }

    const handleDelete = (tag: string) => {
      setTags((prevTags: string[]) => prevTags.filter(item => item !== tag));
    }
    
  
    return ( 
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item sm={12} md={8} lg={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name='search' variant='outlined' label='Search Memories' fullWidth 
                  value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
                <ChipInput style={{ margin: '10px 0' }} label='Search Tags' variant='outlined' 
                  value={tags} onAdd={handleAdd} onDelete={handleDelete} />  
                <Button variant='contained' color='primary' onClick={searchPost}>
                  Search
                </Button>  
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6} className={classes.pagination}>
                  <Pagination page={page}/>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
     );
}
 
export default Home;
