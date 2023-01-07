import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import StudentProfile from './StudentProfile';

const Profile = ({userID}) =>{

    useEffect(() => {
        const getUserInfo = () =>{
          const userData = fetchUserInfo();
          setUserInfo(userData);
        }
        getUserInfo();
      }, []);

    // Possible function to get user data
    const fetchUserInfo = () => {
        //const res = await fetch(`http://localhost:3000/${userID}`);
        //const userData = res.json();
        // Cambiar 'tipo' a un valor distinto a Student para ver el perfil de administrador
        const userData = {
            'nombre': 'Juan', 'apellido': 'Perez Perez', 'matricula': 'A01',
            'correo': 'juan@gmail.com', 'telefono': '0000000000', 'lada':'52', 'tipo': 'Student',
            'curp': 'OEAF771012HMCRGR09', 'escolaridad': 'Secundaria', 'ultima_escuela':'CBTIS',
            'estado':'Nuevo Leon', 'ciudad':'Monterrey', 'colonia': 'Centro' 
        };
        return userData; 
    };

    const [isEditing, setIsEditing] = useState(true)
    const [userInfo, setUserInfo] = useState(fetchUserInfo)
    const [userTag, setUserTag] = useState(userInfo.matricula)
    const [userName, setUserName] = useState(userInfo.nombre)
    const [userLastName, setUserLastName] = useState(userInfo.apellido)
    const [userMail, setUserMail] = useState(userInfo.correo)
    const [userLada, setUserLada] = useState(userInfo.lada)
    const [userPhone, setUserPhone] = useState(userInfo.telefono)

    //

    return (
        <Box sx={{border: 1, p: 1, borderRadius: 1}}>
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2}}>
                Mi perfil
            </Box>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default' }}>
                Datos Generales
            </Box>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}
                noValidate
                autoComplete="off"
            >
                <TextField label="Matricula" InputProps={{readOnly: isEditing}} value={userTag}  onChange={(e) => setUserTag(e.target.value)}/>
                <TextField label="Nombre(s)" InputProps={{readOnly: isEditing}} value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <TextField label="Apellido(s)" InputProps={{readOnly: isEditing}} value={userInfo.apellido} onChange={(e) => setUserLastName(e.target.value)}/>       
                <TextField label="Correo" InputProps={{readOnly: isEditing}} value={userMail} onChange={(e) => setUserMail(e.target.value)}/> 
                <TextField
                    label="LADA" sx={{ m: 1, width: '5ch' }} type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                        readOnly: isEditing
                    }}
                    value={userLada}
                    onChange={(e) => setUserLada(e.target.value)}
                />
                <TextField label="Núm. Telefonico" InputProps={{readOnly: isEditing}} value={userPhone} onChange={(e) => setUserPhone(e.target.value)}/> 
                {userInfo.tipo === "Student" ? <StudentProfile isEditing={isEditing} userInfo={userInfo}/> : null }
 

            </Box>  

            <Box sx={{display:'flex', m: 1, p: 1}}>
                <Button variant="contained" sx={{ mr: 1}} onClick={() => { setIsEditing(!isEditing); }}>
                    {isEditing ? "Editar" : "Guardar"}
                </Button>
                <Button variant="contained" color='error' 
                    sx={{ display: isEditing ? 'none' : '', mx: 2}}
                    onClick={() => { setIsEditing(!isEditing); }}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    )
}

export default Profile
