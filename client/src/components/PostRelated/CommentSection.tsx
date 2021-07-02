import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';
import useStyles from '../../styles/commentStyles';
import { commentPost } from '../../actions/postActions';

export interface CommentSectionProps {
    post: Post
}
 
const CommentSection: React.SFC<CommentSectionProps> = ({ post }) => {

    const classes = useStyles();
    const [comment, setComment] = useState('');
    const { authData: { result } } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const commentsRef: any = useRef();

    const handleClick = async() => {
        const finalComment = `${result.name}: ${comment}`;
        // ts warning is false, await does have an effect(checked)
        await dispatch(commentPost(post._id, finalComment));
        setComment('');
        // scroll to the last comment, once it's been added
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return ( 
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {post?.comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {result && <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField fullWidth rows={4} variant='outlined' label='Comment' multiline
                        value={comment} onChange={e => setComment(e.target.value)} />
                    <Button style={{ marginTop: 10 }} fullWidth variant='contained' color='primary'
                        disabled={!comment} onClick={handleClick}>
                        Comment
                    </Button>    
                </div>}
            </div>
        </div>
    );
}
 
export default CommentSection;
