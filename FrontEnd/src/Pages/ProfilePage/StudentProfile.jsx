import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import { createStudent, getStudents } from '../../api/students';
import ParentInfo from './ParentInfo'


const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos',
    'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
    'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
    'Veracruz', 'Yucatán', 'Zacatecas'
    ]

const nivel_escolaridad = [
    'Preescolar',
    'Primaria',
    'Secundaria',
    'Bachillerato',
    'Licenciatura',
    'Universitario',
    'Especialidad o Maestria',
    'Doctorado'
]

const StudentProfile = ({studentInfo, setAddStudent, addStudent, userID, setStudents, setSuccessOpen, setErrorOpen, setAlertMessage, setInfoOpen}) =>{

    studentInfo['idUser'] = userID;
    const [studentData, setStudentInfo] = useState(studentInfo)
    const [newStudentInfo, setNewStudentInfo] = useState(studentInfo);
    const [userStateInput, setUserStateInput] = useState('');
    const [userState, setUserState] = useState(estados[0]);
    const [userEducationInput, setUserEducationInput] = useState('');
    const [userEducation, setUserEducation] = useState(nivel_escolaridad[0]);

    const handleChange = e => setStudentInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        studentData.escolaridad = userEducation;
        studentData.estado = userState; 
        setNewStudentInfo(studentData);
        console.log(studentData);
        if (studentData.num_telefono.length < 10 || studentData.tutor_num_telefono.length < 10) {
            setAlertMessage('Los numeros telefonicos deben tener al menos 10 digitos')
            setInfoOpen(true);
            return
        }
        if (studentData.codigo_postal.length < 5 ) {
            setAlertMessage('El codigo postal contiene 5 digitos')
            setInfoOpen(true);
            return
        }
        createStudent(new URLSearchParams(studentData)).then((data) => {
            //console.log(data);
        })
        .catch((error) => {
            //console.log(error.message);
            if (error.message.includes('Un documen')){
                setAlertMessage('Estudiante agregado correctamente.')
                setAddStudent(!addStudent);
                setSuccessOpen(true);
            }
            else{
                setAlertMessage('Se produjo un error al agregar al estudiante.')
                setErrorOpen(true);
            }
            getStudents().then(
                (data) => {
                    const students = data.filter(student => student.idUser === userID);
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
                <TextField name="num_telefono" label="Núm. Telefonico" value={studentData.num_telefono || ''} onChange={handleChange} helperText=" LADA + 10 Digitos" required/>    
                <FormControl sx={{ m: 1, width: '35ch' }} required>
                    <InputLabel>Nacionalidad</InputLabel>
                    <Select
                        value={studentData.pais}
                        label="Nacionalidad"
                        onChange={handleChange}
                        name='pais'
                    >
                        <MenuItem value="">
                        <em>N/A</em>
                        </MenuItem>
                        <MenuItem value={'Mexico'}>Mexicana</MenuItem>
                        <MenuItem value={'Otro'}>Otro</MenuItem>
                    </Select>
                    <FormHelperText> </FormHelperText>
                </FormControl>
                {
                    studentData.pais === "Mexico" ?
                    <TextField name="curp" label="CURP" value={studentData.curp || ''} onChange={handleChange} required
                        helperText={
                            <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                                    &#9432; Obten tu CURP
                            </Link>
                        }
                    />
                    : null
                }
                <TextField name='fecha_de_nacimiento' label="Fecha de nacimiento" type='date' InputLabelProps={{ shrink: true }} value={studentData.fecha_de_nacimiento || ''} onChange={handleChange}  helperText=" " required/>        
                <Autocomplete
                    value={userEducation || ''}
                    name='escolaridad'
                    onChange={(e, newValue) => {
                        setUserEducation(newValue);
                    }}
                    inputValue={userEducationInput}
                    onInputChange={(event, newInputValue) => {
                        setUserEducationInput(newInputValue);
                    }}
                    options={nivel_escolaridad}
                    renderInput={(params) => <TextField {...params} name='escolaridad' label="Escolaridad" helperText="Escolaridad o equivalente" required/>}
                />
                <TextField name="ultima_escuela" label="Ultima Escuela" value={studentData.ultima_escuela || ''} onChange={handleChange} helperText=" " required/>        
                <Autocomplete
                    value={userState || ''}
                    name='estado'
                    onChange={(e, newValue) => {
                        setUserState(newValue);
                    }}
                    inputValue={userStateInput}
                    onInputChange={(event, newInputValue) => {
                        setUserStateInput(newInputValue);
                    }}
                    options={estados}
                    renderInput={(params) => <TextField {...params} name='estado' label="Estado" helperText=" " required/>}
                />
                <TextField name="ciudad" label="Ciudad" value={studentData.ciudad || ''} onChange={handleChange}  helperText=" "required/>        
                <TextField name="codigo_postal" label="Codigo Postal" type="number" value={studentData.codigo_postal || ''}  onChange={handleChange}  helperText="5 Digitos" required/>
                <TextField name="colonia" label="Colonia" value={studentData.colonia || ''} onChange={handleChange}  helperText=" " required/>
                <ParentInfo studentData={studentData} handleChange={handleChange} underage={calculate_age(studentData.fecha_de_nacimiento) < 18}/> 
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
