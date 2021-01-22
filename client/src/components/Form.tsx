import React, { useState, ChangeEvent, useEffect } from 'react';
import useStyles from '../styles/formStyles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../actions/postActions';
import { useSelector } from 'react-redux';

export interface FormProps {
    currentId: string,
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}
 
const Form: React.SFC<FormProps> = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => currentId ? state.posts.find(post => post._id === currentId) : null);
    const classes = useStyles();
    const emptyState = {
        creator: '',
        title: '',
        message: '',
        tags: [''],
        selectedFile: ''

    };

    const [postData, setPostData] = useState(emptyState);

    useEffect(() => {
        if(post){
            setPostData({
                creator: post.creator,
                title: post.title,
                message: post.message,
                tags: post.tags,
                selectedFile: post.selectedFile
            })
        }
    },[post]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPostData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const changeStateKey = (key: string, value: string | string[]) => {
        setPostData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        });
    }

    const handleAddTag = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const tagArray = e.target.value ? e.target.value.split(', ') : [];
        changeStateKey('tags', tagArray);
    }

    const handleFileChange = (file: string) => {
        changeStateKey('selectedFile', file);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
        }
        else{
            dispatch(addPost(postData));
        }
        reset();
    }

    const reset = () => {
        setCurrentId('');
        setPostData(emptyState);
    }

    return ( 
        <Paper className='classes.paper'>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : `Creating`} a memory</Typography>
                <TextField name='creator' variant='outlined' label="Creator" fullWidth 
                    value={postData.creator} onChange={handleChange}/>
                <TextField name='title' variant='outlined' label="Title" fullWidth 
                    value={postData.title} onChange={handleChange}/>
                <TextField name='message' variant='outlined' label="Message" fullWidth 
                    value={postData.message} onChange={handleChange}/>
                <TextField name='tags' variant='outlined' label="Tags" fullWidth 
                    value={postData.tags.join(', ')} onChange={handleAddTag}/>
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} 
                        onDone={({base64}) => handleFileChange(base64)} />
                </div>    
                <Button className={classes.buttonSubmit} color='primary' variant='contained' 
                    size='large' type='submit' fullWidth>Submit
                </Button>
                <Button color='secondary' variant='contained' size='small' 
                    fullWidth onClick={reset}>Clear
                </Button>
            </form>
        </Paper>
     );
}
 
export default Form;