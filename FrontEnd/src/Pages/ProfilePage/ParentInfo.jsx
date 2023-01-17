import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const ParentInfo = ({isEditing, userInfo, handleChange}) =>{

    return (
        <>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%', mt: 2}}>
                    Datos Tutor
            </Box>       
            <TextField name='tutor_nombre' label="Nombre(s)" type='date' InputProps={{readOnly: !isEditing}} value={userInfo.tutor_nombre || ''} required/>        
            <TextField name="tutor_apellido_paterno" label="Primer Apellido" InputProps={{readOnly: !isEditing}} value={userInfo.tutor_apellido_paterno || ''} onChange={handleChange} required/>        
            <TextField name="tutor_apellido_materno" label="Segundo Apellido" InputProps={{readOnly: !isEditing}} value={userInfo.tutor_apellido_materno || ''} onChange={handleChange} required/>        
            <TextField name="tutor_correo" label="Correo" InputProps={{readOnly: !isEditing}} value={userInfo.tutor_correo || ''} onChange={handleChange} required/>   
            <TextField name="tutor_num_telefonico" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={userInfo.tutor_num_telefonico || ''} onChange={handleChange} required/>
        </>
    )
}

export default ParentInfo
