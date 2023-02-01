import React from 'react'
import TextField from '@mui/material/TextField';


const SignUpInput = ({name, label, type, value, handleChange, helperTextContent}) => (
    <TextField name={name} required 
        variant="filled"
        fullWidth label={label}
        sx={{input: {color: 'black', backgroundColor: 'white', borderRadius: 1}, my: 1}}
        InputLabelProps={{style: {color: 'black'}}}
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