import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const ParentInfo = ({studentData, handleChange}) =>{

    return (
        <>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%', mt: 2}}>
                Datos Tutor
            </Box>       
            <TextField name='tutor_nombre' label="Nombre(s)" value={studentData.tutor_nombre || ''} onChange={handleChange} helperText=" " required/>        
            <TextField name="tutor_apellido_paterno" label="Primer Apellido" value={studentData.tutor_apellido_paterno || ''} onChange={handleChange} helperText=" " required/>        
            <TextField name="tutor_apellido_materno" label="Segundo Apellido" value={studentData.tutor_apellido_materno || ''} onChange={handleChange} helperText=" " required/>        
            <TextField name="tutor_correo" label="Correo" type='email' value={studentData.tutor_correo || ''} onChange={handleChange} helperText=" " required/>   
            <TextField name="tutor_num_telefono" label="Núm. Telefonico" value={studentData.tutor_num_telefono || ''} onChange={handleChange} helperText=" " required/>
        </>
    )
}

export default ParentInfo
