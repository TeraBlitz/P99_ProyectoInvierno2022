import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const ParentInfo = ({isEditing, studentData, handleChange}) =>{

    return (
        <>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%', mt: 2}}>
                    Datos Tutor
            </Box>       
            <TextField name='tutor_nombre' label="Nombre(s)"  InputProps={{readOnly: !isEditing}} value={studentData.tutor_nombre || ''} onChange={handleChange} required/>        
            <TextField name="tutor_apellido_paterno" label="Primer Apellido" InputProps={{readOnly: !isEditing}} value={studentData.tutor_apellido_paterno || ''} onChange={handleChange} required/>        
            <TextField name="tutor_apellido_materno" label="Segundo Apellido" InputProps={{readOnly: !isEditing}} value={studentData.tutor_apellido_materno || ''} onChange={handleChange} required/>        
            <TextField name="tutor_correo" label="Correo" type='email' InputProps={{readOnly: !isEditing}} value={studentData.tutor_correo || ''} onChange={handleChange} required/>   
            <TextField name="tutor_num_telefonico" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={studentData.tutor_num_telefonico || ''} onChange={handleChange} required/>
        </>
    )
}

export default ParentInfo
