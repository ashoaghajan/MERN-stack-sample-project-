import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post';
import useStyles from '../../styles/postsStyles';
import { useSelector } from 'react-redux';

export interface PostsProps {
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}
 
const Posts: React.SFC<PostsProps> = ({ setCurrentId }) => {

    const posts = useSelector((state: RootState) => state.posts);
    const classes = useStyles();

    return ( 
        posts.length ? (
            <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item sm={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        ) : <CircularProgress />
     );
}
 
export default Posts;