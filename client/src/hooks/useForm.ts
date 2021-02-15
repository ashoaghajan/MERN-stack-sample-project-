import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from '../styles/formStyles';
import { addPost, updatePost } from '../actions/postActions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emptyPost } from '../global/globalVariables';
import { changeStateKey, checkToken } from '../global/globalFunctions';

export const useForm = (currentId: string, setCurrentId: React.Dispatch<React.SetStateAction<string>>) => {

    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => currentId ? state.posts.find(post => post._id === currentId) : null);
    const userData: User = useSelector((state: RootState) => state.auth.authData);
    const token = userData.token ? userData.token : '';
    const userName = userData.result ? userData.result.name : '';
    const userId = userData.result?._id || userData.result?.googleId;

    const classes = useStyles();
    const [postData, setPostData] = useState(emptyPost);
    const history = useHistory();


    useEffect(() => {
        if(post){
            setPostData({
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
        checkToken(token, dispatch, history);
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: userName, creator: userId }));
        }
        else{
            dispatch(addPost({ ...postData, name: userName, creator: userId }));
        }
        reset();
    }

    return { classes, postData, userName, handleChange, handleAddTag, handleFileChange, handleSubmit, reset }
}