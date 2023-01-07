import React, {useState} from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'


const StudentProfile = ({isEditing, userInfo}) =>{

    const [userCurp, setUserCurp] = useState(userInfo.curp)
    const [userEducation, setUserEducation] = useState(userInfo.escolaridad)
    const [userLastSchool, setUserLastSchool] = useState(userInfo.ultima_escuela)
    const [userState, setUserState] = useState(userInfo.estado)
    const [userCity, setUserCity] = useState(userInfo.ciudad)
    const [userNeighborhood, setUserNeighborhood] = useState(userInfo.colonia)

    return (
        <>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%' }}>
                    Datos Personales
            </Box>
            <TextField label="CURP" InputProps={{readOnly: isEditing}} value={userCurp} onChange={(e) => setUserCurp(e.target.value)}/>
            <TextField label="Fecha de nacimiento" type='date' InputProps={{readOnly: isEditing}} InputLabelProps={{ shrink: true }}/>        
            <TextField label="Escolaridad" InputProps={{readOnly: isEditing}} value={userEducation} onChange={(e) => setUserEducation(e.target.value)}/>        
            <TextField label="Ultima Escuela" InputProps={{readOnly: isEditing}} value={userLastSchool} onChange={(e) => setUserLastSchool(e.target.value)}/>        
            <TextField label="Estado" InputProps={{readOnly: isEditing}} value={userState} onChange={(e) => setUserState(e.target.value)}/>   
            <TextField label="Ciudad" InputProps={{readOnly: isEditing}} value={userCity} onChange={(e) => setUserCity(e.target.value)}/>        
            <TextField label="Colonia" InputProps={{readOnly: isEditing}} value={userNeighborhood} onChange={(e) => setUserNeighborhood(e.target.value)}/>        
        </>
    )
}

export default StudentProfile
