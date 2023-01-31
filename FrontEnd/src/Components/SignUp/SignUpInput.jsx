import React from 'react'
import TextField from '@mui/material/TextField';


const SignUpInput = ({name, label, type, value, handleChange, helperTextContent}) => (
    <TextField name={name} required 
        fullWidth label={label}
        sx={{input: {color: 'white'}, my: 1}}
        InputLabelProps={{style: {color: '#E6F4F1'}}}
        onChange={handleChange}
        onInvalid={e => e.target.setCustomValidity(`Ingresa tu ${label}`)} 
        onInput={e => e.target.setCustomValidity('')}
        type={type}
        value={value}
        helperText={helperTextContent}
        FormHelperTextProps={{sx: {color: 'white'}}}
    />
)

export default SignUpInput