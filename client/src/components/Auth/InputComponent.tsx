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
    value: string,
    autoComplete?: string | undefined,
    handleChange: (e: any) => void,
    handleShowPassword?: () => void
}
 
const InputComponent: React.SFC<InputComponentProps> = ({ name, label, half, type, autoFocus, value, autoComplete,
    handleChange, handleShowPassword }) => {

    return ( 
        <Grid item xs={6} sm={half ? 6: 12}>
            <TextField variant='outlined' fullWidth required value={value} autoComplete={autoComplete}
            name={name} label={label} type={type} autoFocus={autoFocus} onChange={handleChange} 
            InputProps={name === 'password' ? { 
                endAdornment: ( 
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
