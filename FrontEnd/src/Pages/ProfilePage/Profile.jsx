import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
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
        'nombre': 'Juan', 'apellido': 'Perez Perez', 'matricula': 'A01',
        'correo': 'juan@gmail.com', 'telefono': '0000000000', 'lada':'52', 'tipo': 'Student',
        'curp': 'OEAF771012HMCRGR09', 'fecha_nacimiento':'2005-07-22','escolaridad': 'Secundaria', 'ultima_escuela':'CBTIS',
        'estado':'Nuevo Leon', 'ciudad':'Monterrey', 'colonia': 'Centro', 'tutor': 'Carlos Perez' 
    };
    return userData; 
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = ({userID}) =>{
    
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState(fetchUserInfo)

    useEffect(() => {
        const getUserInfo = () =>{
            const userData = fetchUserInfo();
            setUserInfo(userData);
        }
        getUserInfo();
    }, []);
    
    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        console.log(userInfo);
        setIsEditing(!isEditing);
        setOpen(true); 
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };


    return (
        <Box sx={{p: 1, ml: 1}}>
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex', justifyContent: 'space-between'  }}>
                Mi perfil
                <Fab color="primary" aria-label="edit" sx={{ display: isEditing ? 'none' : ''}} 
                        onClick={() => { setIsEditing(!isEditing); }}>
                    <EditIcon />
                </Fab>
            </Box>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default' }}>
                Datos Generales
            </Box>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField name="matricula" label="Matricula" InputProps={{readOnly: true}} value={userInfo.matricula || ''}  onChange={handleChange}/>
                <TextField name="nombre" label="Nombre(s)" InputProps={{readOnly: !isEditing}} value={userInfo.nombre || ''} onChange={handleChange} required/>
                <TextField name="apellido" label="Apellido(s)" InputProps={{readOnly: !isEditing}} value={userInfo.apellido || ''} onChange={handleChange} required/>       
                <TextField name="correo" type="email" label="Correo" InputProps={{readOnly: !isEditing}} value={userInfo.correo || ''} onChange={handleChange} required/> 
                <TextField
                    name="lada"
                    label="LADA" type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                        readOnly: !isEditing
                    }}
                    value={userInfo.lada || ''}
                    onChange={handleChange}
                    required
                />
                <TextField name="telefono" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={userInfo.telefono || ''} onChange={handleChange} required/> 
                {userInfo.tipo === "Student" ? <StudentProfile isEditing={isEditing} userInfo={userInfo} handleChange={handleChange}/> : null }
                
                <Box sx={{width: '100%' }}></Box>

                <Box sx={{display:'flex', m: 1, p: 1, justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" color='error' 
                        sx={{ display: !isEditing ? 'none' : '', mx: 2}}
                        onClick={() => { setIsEditing(!isEditing); }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type='submit' sx={{ display: !isEditing ? 'none' : ''}} size="medium">
                        Guardar
                    </Button>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Información actualizada correctamente
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>  

        </Box>
    )
}

export default Profile
