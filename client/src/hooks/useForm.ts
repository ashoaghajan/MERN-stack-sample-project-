import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from '../styles/formStyles';
import { addPost, updatePost } from '../actions/postActions';
import { useSelector } from 'react-redux';
import { emptyPost } from '../global/globalVariables';
import { changeStateKey } from '../global/globalFunctions';

export const useForm = (currentId: string, setCurrentId: React.Dispatch<React.SetStateAction<string>>) => {

    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => currentId ? state.posts.find(post => post._id === currentId) : null);
    const classes = useStyles();
    const [postData, setPostData] = useState(emptyPost);


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

    const handleAddTag = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const tagArray = e.target.value ? e.target.value.split(', ') : [];
        changeStateKey('tags', tagArray, setPostData);
    }

    const handleFileChange = (file: string) => {
        changeStateKey('selectedFile', file, setPostData);
    }

    const reset = () => {
        setCurrentId('');
        setPostData(emptyPost);
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

    return { classes, postData, handleChange, handleAddTag, handleFileChange, handleSubmit, reset }
}