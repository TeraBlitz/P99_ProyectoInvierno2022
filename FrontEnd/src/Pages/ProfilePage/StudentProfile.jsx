import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StudentProfile = ({setUserInfo, isEditing, userInfo, handleChange, setIsEditing}) =>{
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState(userInfo);


    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        setNewUserInfo(userInfo);
        console.log(userInfo);
        setIsEditing(!isEditing);
        // Validación para que ver si se establecio la conexión de manera exitosa
        // y se actualizaron los datos 
        const success = true;
        success ? setSuccessOpen(true) : setErrorOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
    };

    const handleCancel = () => {
        setUserInfo(newUserInfo);
        setIsEditing(!isEditing);
    }

    return (
        <>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default', width: '100%', mt: 2}}>
                    Datos Estudiante
                </Box>
                <TextField name="matricula" label="Matricula" InputProps={{readOnly: true}} value={userInfo.matricula || ''}  onChange={handleChange}/>
                <TextField name="nombre" label="Nombre(s)" InputProps={{readOnly: !isEditing}} value={userInfo.nombre || ''} onChange={handleChange} required/>
                <TextField name="apellido_paterno" label="Primer Apellido" InputProps={{readOnly: !isEditing}} value={userInfo.apellido_paterno || ''} onChange={handleChange} required/>       
                <TextField name="apellido_materno" label="Segundo Apellido" InputProps={{readOnly: !isEditing}} value={userInfo.apellido_materno || ''} onChange={handleChange} required/>       
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
                <TextField name="num_telefono" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={userInfo.num_telefono || ''} onChange={handleChange} required/>    
                <TextField name="curp" label="CURP" InputProps={{readOnly: !isEditing}} value={userInfo.curp || ''} onChange={handleChange} required/>
                <TextField name='fecha_nacimiento' label="Fecha de nacimiento" type='date' InputProps={{readOnly: !isEditing}} value={userInfo.fecha_nacimiento || ''} required/>        
                <TextField name="escolaridad" label="Escolaridad" InputProps={{readOnly: !isEditing}} value={userInfo.escolaridad || ''} onChange={handleChange} required/>        
                <TextField name="ultima_escuela" label="Ultima Escuela" InputProps={{readOnly: !isEditing}} value={userInfo.ultima_escuela || ''} onChange={handleChange} required/>        
                <TextField name="estado" label="Estado" InputProps={{readOnly: !isEditing}} value={userInfo.estado || ''} onChange={handleChange} required/>   
                <TextField name="ciudad" label="Ciudad" InputProps={{readOnly: !isEditing}} value={userInfo.ciudad || ''} onChange={handleChange} required/>        
                <TextField name="colonia" label="Colonia" InputProps={{readOnly: !isEditing}} value={userInfo.colonia || ''} onChange={handleChange} required/>
                    
                <Box sx={{width: '100%' }}></Box>

                <Box sx={{display:'flex', m: 1, p: 1, justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" color='error' 
                        sx={{ display: !isEditing ? 'none' : '', mx: 2}}
                        onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type='submit' sx={{ display: !isEditing ? 'none' : ''}} size="medium">
                        Guardar
                    </Button>
                    <Snackbar open={successOpen} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Información actualizada correctamente.
                        </Alert>
                    </Snackbar>
                    <Snackbar open={errorOpen} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Se produjo un error al actualizar la información.
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </>
    )
}

export default StudentProfile
