import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useForm } from '../../hooks/useForm';


export interface FormProps {
    currentId: string,
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}
 
const Form: React.SFC<FormProps> = ({ currentId, setCurrentId }) => {

    const { classes, postData, userName, handleChange, handleAddTag, handleFileChange, handleSubmit, reset } = useForm(currentId, setCurrentId);

    if(!userName){
        return (
            <Paper className='classes.paper'>
                <Typography variant='h6' align='center'>
                    Please Sign in in order to create/like memories.
                </Typography>
            </Paper>
        )
    }

    return ( 
        <Paper className='classes.paper'>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : `Creating`} a memory</Typography>
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