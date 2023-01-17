import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import StudentProfile from './StudentProfile';

// Possible function to get user data, this goes in another file
const fetchUserInfo = () => {
    //const res = await fetch(`http://localhost:3000/${userID}`);
    //const userData = res.json();
    // Cambiar 'tipo' a un valor distinto a Student para ver el perfil de administrador

    const userData = {
        'usuario': 'Username', 
        'correo': 'user@gmail.com'
    }

    const studentData = {
        'nombre': 'Juan', 'apellido': 'Perez Perez', 'matricula': 'A01',
        'correo': 'juan@gmail.com', 'telefono': '0000000000', 'lada':'52', 'tipo': 'Student',
        'curp': 'OEAF771012HMCRGR09', 'fecha_nacimiento':'2005-07-22','escolaridad': 'Secundaria', 'ultima_escuela':'CBTIS',
        'estado':'Nuevo Leon', 'ciudad':'Monterrey', 'colonia': 'Centro', 'tutor': 'Carlos Perez' 
    };
    return userData; 
};

const Profile = ({userID}) =>{
    
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState(fetchUserInfo);
    const [newUserInfo, setNewUserInfo] = useState(fetchUserInfo);

    useEffect(() => {
        const getUserInfo = () =>{
            const userData = fetchUserInfo();
            setUserInfo(userData);
        }
        getUserInfo();
    }, []);
    
    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


    return (
        <Box sx={{p: 1, ml: 1}}>
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                <Box>
                    Mi perfil
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute',  bottom: 16,  right: 16}}>
                    <Fab color="primary" aria-label="add" sx={{ display: isEditing ? 'none' : ''}} 
                            onClick={() => { setIsEditing(!isEditing); }}>
                        <AddIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="edit" sx={{ display: isEditing ? 'none' : '', mt: 2}} 
                            onClick={() => { setIsEditing(!isEditing); }}>
                        <EditIcon />
                    </Fab>
                </Box>
            </Box>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default' }}>
                Datos Usuario
            </Box> 
            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}>
                <TextField name="usuario" label="Usuario" InputProps={{readOnly: true}} value={userInfo.usuario || ''} />
                <TextField name="correo" label="Correo" InputProps={{readOnly: true}} value={userInfo.correo || ''}/>
            </Box>
            <StudentProfile 
                setUserInfo={setUserInfo}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                userInfo={userInfo}
                handleChange={handleChange}  
            />
        </Box>
    )
}

export default Profile
