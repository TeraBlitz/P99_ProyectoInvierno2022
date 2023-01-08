import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import StudentProfile from './StudentProfile';

// Possible function to get user data, this goes in another file
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

const Profile = ({userID}) =>{
    
    const [isEditing, setIsEditing] = useState(true)
    const [userInfo, setUserInfo] = useState(fetchUserInfo)

    useEffect(() => {
        const getUserInfo = () =>{
            const userData = fetchUserInfo();
            setUserInfo(userData);
        }
        getUserInfo();
    }, []);
    
    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
        // Enviar esta informacion a bd
        console.log(userInfo);
        setIsEditing(!isEditing); 
    };

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
                <TextField name="matricula" label="Matricula" InputProps={{readOnly: isEditing}} value={userInfo.matricula || ''}  onChange={handleChange}/>
                <TextField name="nombre" label="Nombre(s)" InputProps={{readOnly: isEditing}} value={userInfo.nombre || ''} onChange={handleChange}/>
                <TextField name="apellido" label="Apellido(s)" InputProps={{readOnly: isEditing}} value={userInfo.apellido || ''} onChange={handleChange}/>       
                <TextField name="correo" label="Correo" InputProps={{readOnly: isEditing}} value={userInfo.correo || ''} onChange={handleChange}/> 
                <TextField
                    name="lada"
                    label="LADA" sx={{ m: 1, width: '5ch' }} type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                        readOnly: isEditing
                    }}
                    value={userInfo.lada || ''}
                    onChange={handleChange}
                />
                <TextField name="telefono" label="Núm. Telefonico" InputProps={{readOnly: isEditing}} value={userInfo.telefono || ''} onChange={handleChange}/> 
                {userInfo.tipo === "Student" ? <StudentProfile isEditing={isEditing} userInfo={userInfo} handleChange={handleChange}/> : null }
 

            </Box>  

            <Box sx={{display:'flex', m: 1, p: 1}}>
                <Button variant="contained" sx={{ mr: 1, display: !isEditing ? 'none' : ''}} onClick={() => { setIsEditing(!isEditing); }}>
                    Editar
                </Button>
                <Button variant="contained" type='submit'
                 sx={{ display: isEditing ? 'none' : '', mr: 1}}
                 onClick={handleSubmit}>
                    Guardar
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
