import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post';
import useStyles from '../../styles/postsStyles';
import { useSelector } from 'react-redux';

export interface PostsProps {
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}
 
const Posts: React.SFC<PostsProps> = ({ setCurrentId }) => {

    const { posts, loading } = useSelector((state: RootState) => state.posts);
    const classes = useStyles();

    if(!posts.length && !loading) return <h1>No Posts</h1>

    return ( 
        loading ? <CircularProgress /> : (
            <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
     );
}
 
export default Posts;