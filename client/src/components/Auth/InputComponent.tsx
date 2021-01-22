import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export interface InputComponentProps {
    name: string,
    label: string,
    type: string,
    half?: boolean,
    autoFocus?: boolean,
    handleChange: () => void,
    handleShowPassword?: () => void
}
 
const InputComponent: React.SFC<InputComponentProps> = ({ name, label, half, type, autoFocus, handleChange, handleShowPassword }) => {

    return ( 
        <Grid item xs={6} sm={half ? 6: 12}>
            <TextField variant='outlined' fullWidth required
            name={name} label={label} type={type} autoFocus={autoFocus} onChange={handleChange} 
            inputProps={name === 'password' ? { 
                endadorement: ( 
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment> 
                )} : undefined
            }/>
        </Grid>
     );
}
 
export default InputComponent;
