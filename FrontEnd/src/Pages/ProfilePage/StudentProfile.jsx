import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText  from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import ParentInfo from './ParentInfo'

const studentInfo = {
    'nombre': '', 'apellido_paterno': '', 'apellido_materno': '',
    'correo': '', 'num_telefono': '', 'lada':'','curp': '', 'fecha_nacimiento':'',
    'escolaridad': '', 'ultima_escuela':'','estado':'', 'ciudad':'', 'colonia': '',
    'tutor_nombre': '', 'tutor_apellido_paterno':'','tutor_apellido_materno':'',
    'tutor_correo':'', 'tutor_num_telefonico':''
};


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StudentProfile = ({isEditing, setIsEditing, setAddStudent, addStudent}) =>{

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [studentData, setStudentInfo] = useState(studentInfo)
    const [newStudentInfo, setNewStudentInfo] = useState(studentInfo);

    const handleChange = e => setStudentInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        setNewStudentInfo(studentData);
        console.log(studentData);
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
        setStudentInfo(newStudentInfo);
        setIsEditing(!isEditing);
        setAddStudent(!addStudent);
    }

    // Funcion para calcular edad si es menor de 18 se pide
    //  un nombre de Tutor al estudiante
    const calculate_age = (dateString) => {
        var birthday = +new Date(dateString);
        // The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000, which is the length of a year
        const magic_number = 31557600000;
        return ~~((Date.now() - birthday) / (magic_number));
      }


    return (
        <>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' },
                display: 'flex', alignItems: 'center',  flexWrap: 'wrap',
                backgroundColor: 'white', borderRadius: 3}}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Box 
                    sx={{ typography: 'subtitle2',
                        fontWeight: 'light', fontFamily: 'default',
                        width: '100%', mt: 2, display: 'flex',
                        justifyContent: 'space-between'}}
                >
                    Datos Estudiante
                    <IconButton aria-label="edit" color="primary" onClick={() => { setIsEditing(!isEditing); }}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <TextField name="matricula" label="Matricula" InputProps={{readOnly: true}} value={studentData.matricula || ''}  onChange={handleChange}  helperText=" "/>
                <TextField name="nombre" label="Nombre(s)" InputProps={{readOnly: !isEditing}} value={studentData.nombre || ''} onChange={handleChange}  helperText=" " required/>
                <TextField name="apellido_paterno" label="Primer Apellido" InputProps={{readOnly: !isEditing}} value={studentData.apellido_paterno || ''} onChange={handleChange} helperText=" " required/>       
                <TextField name="apellido_materno" label="Segundo Apellido" InputProps={{readOnly: !isEditing}} value={studentData.apellido_materno || ''} onChange={handleChange}  helperText=" " required/>       
                <TextField
                    name="lada"
                    label="LADA" type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                        readOnly: !isEditing
                    }}
                    value={studentData.lada || ''}
                    onChange={handleChange}
                    helperText=" "
                    required
                />
                <TextField name="num_telefono" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={studentData.num_telefono || ''} onChange={handleChange} helperText=" " required/>    
                <TextField name="curp" label="CURP" InputProps={{readOnly: !isEditing}} value={studentData.curp || ''} onChange={handleChange} required
                    helperText={
                        <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                                &#9432; Obten tu CURP
                        </Link>
                    }
                />
                <TextField name='fecha_nacimiento' label="Fecha de nacimiento" type='date' InputProps={{readOnly: !isEditing}} InputLabelProps={{ shrink: true }} value={studentData.fecha_nacimiento || ''} onChange={handleChange}  helperText=" " required/>        
                <TextField name="escolaridad" label="Escolaridad" InputProps={{readOnly: !isEditing}} value={studentData.escolaridad || ''} onChange={handleChange} helperText=" " required/>        
                <TextField name="ultima_escuela" label="Ultima Escuela" InputProps={{readOnly: !isEditing}} value={studentData.ultima_escuela || ''} onChange={handleChange} helperText=" " required/>        
                <TextField name="estado" label="Estado" InputProps={{readOnly: !isEditing}} value={studentData.estado || ''} onChange={handleChange} helperText=" " required/>   
                <TextField name="ciudad" label="Ciudad" InputProps={{readOnly: !isEditing}} value={studentData.ciudad || ''} onChange={handleChange}  helperText=" "required/>        
                <TextField name="colonia" label="Colonia" InputProps={{readOnly: !isEditing}} value={studentData.colonia || ''} onChange={handleChange}  helperText=" " required/>
                {calculate_age(studentData.fecha_nacimiento) < 18 ? <ParentInfo isEditing={isEditing} studentData={studentData} handleChange={handleChange}/> : null}
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
