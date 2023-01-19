import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createStudent, getStudents } from '../../api/students';
import ParentInfo from './ParentInfo'




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StudentProfile = ({studentInfo, setAddStudent, addStudent, userID, setStudents, setSuccessOpen, setErrorOpen, setAlertMessage}) =>{

    studentInfo['idUsuario'] = userID;
    const [studentData, setStudentInfo] = useState(studentInfo)
    const [newStudentInfo, setNewStudentInfo] = useState(studentInfo);

    const handleChange = e => setStudentInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const urlEncondeRespose = (studentData) => {
        let body = [];
        for (let property in studentData) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(studentData[property]);
            body.push(encodedKey + "=" + encodedValue);
        }
        body = body.join("&");
        return body;
    }

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        setNewStudentInfo(studentData);
        console.log(studentData);
        setAddStudent(!addStudent);
        createStudent(urlEncondeRespose(studentData)).then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error.message);
            if (error.message.includes('Un documen')){
                setAlertMessage('Estudiante agregado correctamente.')
                setSuccessOpen(true);
            }
            else{
                setAlertMessage('Se produjo un error al agregar al estudiante.')
                setErrorOpen(true);
            }
            getStudents().then(
                (data) => {
                    const students = data.filter(student => student.idUsuario === studentInfo.idUsuario);
                    setStudents(students);
            });
        });
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
                backgroundColor: 'white', borderRadius: 3, m: 2, p: 2}}
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
                </Box>
                <TextField name="nombre" label="Nombre(s)" value={studentData.nombre || ''} onChange={handleChange}  helperText=" " required/>
                <TextField name="apellido_paterno" label="Primer Apellido" value={studentData.apellido_paterno || ''} onChange={handleChange} helperText=" " required/>       
                <TextField name="apellido_materno" label="Segundo Apellido" value={studentData.apellido_materno || ''} onChange={handleChange}  helperText=" " required/>       
                <TextField name="num_telefono" label="Núm. Telefonico" value={studentData.num_telefono || ''} onChange={handleChange} helperText=" " required/>    
                <TextField name="curp" label="CURP" value={studentData.curp || ''} onChange={handleChange} required
                    helperText={
                        <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                                &#9432; Obten tu CURP
                        </Link>
                    }
                />
                <TextField name='fecha_de_nacimiento' label="Fecha de nacimiento" type='date' InputLabelProps={{ shrink: true }} value={studentData.fecha_de_nacimiento || ''} onChange={handleChange}  helperText=" " required/>        
                <TextField name="escolaridad" label="Escolaridad" value={studentData.escolaridad || ''} onChange={handleChange} helperText=" " required/>        
                <TextField name="ultima_escuela" label="Ultima Escuela" value={studentData.ultima_escuela || ''} onChange={handleChange} helperText=" " required/>        
                <TextField name="estado" label="Estado" value={studentData.estado || ''} onChange={handleChange} helperText=" " required/>   
                <TextField name="ciudad" label="Ciudad" value={studentData.ciudad || ''} onChange={handleChange}  helperText=" "required/>        
                <TextField name="codigo_postal" label="Codigo Postal" type="number" value={studentData.codigo_postal || ''}  onChange={handleChange}  helperText=" "/>
                <TextField name="colonia" label="Colonia" value={studentData.colonia || ''} onChange={handleChange}  helperText=" " required/>
                {calculate_age(studentData.fecha_de_nacimiento) < 18 ? <ParentInfo studentData={studentData} handleChange={handleChange}/> : null}
                <Box sx={{width: '100%' }}></Box>

                <Box sx={{display:'flex', m: 1, p: 1, justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" color='error' 
                        sx={{mx: 2}}
                        onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type='submit'  size="medium">
                        Guardar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default StudentProfile
