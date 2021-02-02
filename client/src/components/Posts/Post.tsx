import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from '../../styles/postStyles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../actions/postActions';
import Likes from './Likes';
import { checkToken } from '../../global/globalFunctions';

export interface PostProps {
    post: Post,
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}
 
const Post: React.SFC<PostProps> = ({ post, setCurrentId }) => {

    const user: User = useSelector((state: RootState) => state.auth.authData);
    const token = user.token ? user.token : '';
    const userId = user.result?._id || user.result?.googleId;
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();


    const handleEdit = () => {
        checkToken(token, dispatch, history);
        setCurrentId(post._id);
    }

    const handleDelete = () => {
        checkToken(token, dispatch, history);
        dispatch(deletePost(post._id));
    }

    const handleLike = () => {
        checkToken(token, dispatch, history);
        dispatch(likePost(post._id));
    }
    
    
    return ( 
        <Card className={classes.card}>
            {post.selectedFile && <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>}
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {userId === post.creator && <Button style={{color: 'white'}} size='small' onClick={handleEdit}>
                    <MoreHorizIcon fontSize='default'/>
                </Button>}
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' disabled={!user?.result} color='primary' onClick={handleLike}>
                    <Likes post={post}/>
                </Button>
                {userId === post.creator && <Button size='small' color='primary' onClick={handleDelete}>
                    <DeleteIcon fontSize='small'/>&nbsp; Delete
                </Button>}
            </CardActions>
        </Card>
     );
}
 
export default Post;