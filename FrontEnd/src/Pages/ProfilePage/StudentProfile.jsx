import React, {useState} from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'


const StudentProfile = ({isEditing, userInfo, handleChange}) =>{

    return (
        <>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%', mt: 2}}>
                    Datos Personales
            </Box>
            <TextField name="curp" label="CURP" InputProps={{readOnly: !isEditing}} value={userInfo.curp || ''} onChange={handleChange} required/>
            <TextField label="Fecha de nacimiento" type='date' InputProps={{readOnly: !isEditing}} InputLabelProps={{ shrink: true }} required/>        
            <TextField name="escolaridad" label="Escolaridad" InputProps={{readOnly: !isEditing}} value={userInfo.escolaridad || ''} onChange={handleChange} required/>        
            <TextField name="ultima_escuela" label="Ultima Escuela" InputProps={{readOnly: !isEditing}} value={userInfo.ultima_escuela || ''} onChange={handleChange} required/>        
            <TextField name="estado" label="Estado" InputProps={{readOnly: !isEditing}} value={userInfo.estado || ''} onChange={handleChange} required/>   
            <TextField name="ciudad" label="Ciudad" InputProps={{readOnly: !isEditing}} value={userInfo.ciudad || ''} onChange={handleChange} required/>        
            <TextField name="colonia" label="Colonia" InputProps={{readOnly: !isEditing}} value={userInfo.colonia || ''} onChange={handleChange} required/>        
        </>
    )
}

export default StudentProfile
