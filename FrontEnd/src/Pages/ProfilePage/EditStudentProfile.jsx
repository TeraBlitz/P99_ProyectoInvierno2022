import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'
import { updateStudent, getStudents } from '../../api/students';
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

const EditStudentProfile = ({
    openEditModal, setOpenEditModal, studentInfo, isEditing, setIsEditing,
    setStudents, setSuccessOpen, setErrorOpen, setAlertMessage, setInfoOpen}) =>{

    const [studentData, setStudentInfo] = useState(studentInfo)
    const [newStudentInfo, setNewStudentInfo] = useState(studentInfo);
    const [userStateInput, setUserStateInput] = useState(studentInfo.estado);
    const [userState, setUserState] = useState(estados[estados.indexOf(studentInfo.estado)]);
    const [userEducationInput, setUserEducationInput] = useState(studentInfo.escolaridad);
    const [userEducation, setUserEducation] = useState(nivel_escolaridad[nivel_escolaridad.indexOf(studentInfo.escolaridad)]);

    const handleChange = e => setStudentInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        studentData.escolaridad = userEducation;
        studentData.estado = userState; 
        studentData.curp === null ? delete studentData.curp : studentData.curp; 
        setNewStudentInfo(studentData);
        //console.log(studentData);
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
        setOpenEditModal(!openEditModal)
        setIsEditing(!isEditing);
        updateStudent(new URLSearchParams(studentData)).then((data) => {
            //console.log(data);
        })
        .catch((error) => {
            
            if (error.message.includes('Documento')){
                setAlertMessage('Información del estudiante actualizada correctamente.');
                setSuccessOpen(true);
            }
            else{
                setAlertMessage('Se produjo un error al actualizar al estudiante.');
                setErrorOpen(true);
            }
            getStudents().then(
                (data) => {
                    const students = data.filter(student => student.idUser === studentInfo.idUser);
                    setStudents(students);
            });
        });
    };

    const handleCancel = () => {
        setStudentInfo(newStudentInfo);
        setIsEditing(!isEditing);
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
                    <IconButton aria-label="edit" color="primary" onClick={() => { setIsEditing(!isEditing); }}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <TextField name="nombre" label="Nombre(s)" InputProps={{readOnly: !isEditing}} value={studentData.nombre || ''} onChange={handleChange}  helperText=" " required/>
                <TextField name="apellido_paterno" label="Primer Apellido" InputProps={{readOnly: !isEditing}} value={studentData.apellido_paterno || ''} onChange={handleChange} helperText=" " required/>       
                <TextField name="apellido_materno" label="Segundo Apellido" InputProps={{readOnly: !isEditing}} value={studentData.apellido_materno || ''} onChange={handleChange}  helperText=" " required/>       
                <TextField name="num_telefono" label="Núm. Telefonico" InputProps={{readOnly: !isEditing}} value={studentData.num_telefono || ''} onChange={handleChange} helperText=" " required/>    
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
                    <TextField name="curp" label="CURP" value={studentData.curp ? studentData.curp :  ''} InputProps={{readOnly: !isEditing}} onChange={handleChange} required
                        helperText={
                            <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                                    &#9432; Obten tu CURP
                            </Link>
                        }
                    />
                    : null
                }
                <TextField name='fecha_de_nacimiento' label="Fecha de nacimiento" type='date' InputProps={{readOnly: !isEditing}} InputLabelProps={{ shrink: true }} value={studentData.fecha_de_nacimiento || ''} onChange={handleChange}  helperText=" " required/>        
                <Autocomplete
                    value={userEducation || ''}
                    onChange={(e, newValue) => {
                        setUserEducation(newValue)
                    }}
                    inputValue={userEducationInput}
                    onInputChange={(event, newInputValue) => {
                        setUserEducationInput(newInputValue);
                    }}
                    options={nivel_escolaridad}
                    renderInput={(params) => <TextField {...params} name='escolaridad' label="Escolaridad" InputProps={{readOnly: !isEditing}} helperText="Escolaridad o equivalente" required/>}
                />
                <TextField name="ultima_escuela" label="Ultima Escuela" InputProps={{readOnly: !isEditing}} value={studentData.ultima_escuela || ''} onChange={handleChange} helperText=" " required/>        
                <Autocomplete
                    value={userState || ''}
                    onChange={(e, newValue) => {setUserState(newValue)}}
                    inputValue={userStateInput}
                    onInputChange={(event, newInputValue) => {
                        setUserStateInput(newInputValue);
                    }}
                    options={estados}
                    renderInput={(params) => <TextField {...params} InputProps={{readOnly: !isEditing}} name='estado' label="Estado" helperText=" " required/>}
                />
                <TextField name="ciudad" label="Ciudad" InputProps={{readOnly: !isEditing}} value={studentData.ciudad || ''} onChange={handleChange}  helperText=" "required/>        
                <TextField name="codigo_postal" label="Codigo Postal" type="number" InputProps={{readOnly: !isEditing}} value={studentData.codigo_postal || ''}  onChange={handleChange}  helperText=" " required/>
                <TextField name="colonia" label="Colonia" InputProps={{readOnly: !isEditing}} value={studentData.colonia || ''} onChange={handleChange}  helperText=" " required/>
                <ParentInfo studentData={studentData} handleChange={handleChange} underage={calculate_age(studentData.fecha_de_nacimiento) < 18}/> 
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
                </Box>
            </Box>
        </>
    )
}

export default EditStudentProfile
