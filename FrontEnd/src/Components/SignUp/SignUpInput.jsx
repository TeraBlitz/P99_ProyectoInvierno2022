import React from 'react'
import TextField from '@mui/material/TextField';


const SignUpInput = ({name, label, type, value, handleChange}) => (
    <TextField name={name} required 
        fullWidth label={label}
        sx={{input: {color: 'black'}, mt: 1}}
        InputLabelProps={{style: {color: '#3a4856'}, shrink: true}}
        onChange={handleChange}
        onInvalid={e => e.target.setCustomValidity(`Ingresa tu ${label}`)} 
        onInput={e => e.target.setCustomValidity('')}
        type={type}
        value={value}
    />
)

export default SignUpInput