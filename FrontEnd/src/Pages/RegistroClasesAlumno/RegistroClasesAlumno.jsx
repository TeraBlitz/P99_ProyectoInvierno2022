import Box from '@mui/material/Box'
import React, { useState, useEffect, useContext } from 'react'
import Clase from '../../Components/Clase/Clase'
import CircularProgress from '@mui/material/CircularProgress'
import { Alert, Button, Link } from '@mui/material'
import { AlertTitle } from '@mui/material'
import { Card, CardContent, Typography, TextField, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Modal from '@mui/material/Modal'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getStudents } from '../../api/students'
import { getClasses } from '../../api/classes'
import { userContext } from './../../App.jsx'
import ConfirmationDialog from '../../Components/Dialog/ConfirmationDialog'
import ClaseModal from '../../Components/Clase/ClaseModal'

function RegistroClasesAlumnos({changeContent}) {
    const [items, setItems] = useState([]);
    const [students, setStudents] = useState(null);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [error, setError] = useState('none');
    const [clases, setClases] = useState(null);
    const [claseRegistrada, setClaseRegistrada] = useState([]); // esto se obtendria de la base de datos
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openMoreInfo, setOpenMoreInfo] = useState(false);
    const [currentClase, setCurrentClase] = useState(); 
    
    const userValues = useContext(userContext)

    // Funcion para calcular edad 
    const calculate_age = (dateString) => {
        var birthday = +new Date(dateString);
        // The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000, which is the length of a year
        const magic_number = 31557600000;
        return ~~((Date.now() - birthday) / (magic_number));
    }

    const nivelDict = {
        '1' : 'Desde cero',
        '2' : 'Con bases',
        '3' : 'Intermedio',
        '4' : 'Avanzado'
    }

    const getNivel = (params) => {
        return  nivelDict[params.row.nivel]
    }

    const getHorario = (params) => {
        return `${params.row.lunes ? `Lun: ${params.row.lunes}` : ''}
                ${params.row.martes ? `Mar: ${params.row.martes}` : ''}
                ${params.row.miercoles ? `Mierc: ${params.row.miercoles}` : ''}
                ${params.row.jueves ? `Juev: ${params.row.jueves}` : ''}
                ${params.row.viernes ? `Vier: ${params.row.viernes}` : ''}
                ${params.row.sabado ? `Sab: ${params.row.sabado}` : ''}`
    }

    const getCupoActual = (params) => {
        return `${Number(params.row.cupo_maximo) - Number(params.row.cupo_actual)}`
    }

    const columns = [
        {
            field: 'clavePeriodo',
            headerName: 'Periodo',
            width: 110,
            editable: false,

        },
        { 
            field: 'clave',
            headerName: 'Clave',
            width: 100 
        },
        {
            field: 'nombre_curso',
            headerName: 'Curso',
            width: 120,
            editable: false,
        },
        {
            field: 'nivel',
            headerName: 'Nivel',
            width: 80,
            editable: false,
            valueGetter: getNivel,
        },
        {
            field: 'area',
            headerName: 'Area',
            width: 120,
            editable: false
        },
        {
            field: 'modalidad',
            headerName: 'Modalidad',
            width: 120,
            editable: false
        },
        {
            field: 'horario',
            headerName: 'Horario',
            width: 150,
            editable: false,
            valueGetter: getHorario,
        },
        {
            field: 'cupo_disponible',
            headerName: 'Lugares disponibles',
            width: 120,
            editable: 'false',
            valueGetter: getCupoActual,
        },
        {
            field: "actions",
            headerName: "Incripción",
            type: "actions",
            width: 115,
            renderCell: (params) => (
                <Button onClick={() => handleOpenDialog(params.row)} variant="contained">Inscribir</Button>
            ),

        }

    ];

    const handleMoreInfo = (clase) => {
        setCurrentClase(clase);
        setOpenMoreInfo(!openMoreInfo);
    };
    
    const changeClaseRegistrada = (classId) => {
        if (claseRegistrada[0]) {
            setError('block')
        } else {
            setClaseRegistrada([classId])
            handleCloseDialog();
        }
    }

    const filterClasses = (student) => {
        console.log(student);
        const age = calculate_age(student.fecha_de_nacimiento);
        const filteredClasses = clases.filter(clase => Number(clase.edad_minima) < age && age < Number(clase.edad_maxima))
        setClases(filteredClasses);
    }

    const handleChange = (e) => {
        setCurrentStudent(e.target.value);
        filterClasses(e.target.value);
    }

    useEffect(() => {
        const getUserStudents = () =>{
             getStudents().then(
                 (data) => {
                     const students = data.filter(student => student.idUsuario === userValues._id);
                     setStudents(students);
                     //console.log(students)
             });
         }
         getUserStudents();
     }, []);

     useEffect(() => {
        const getStudentClasses = () =>{
             getClasses().then(
                 (data) => {
                     setClases(data);
             });
         }
         getStudentClasses();
         console.log(clases)
     }, []);

     
    const handleOpenDialog = (clase) => {
        setClaseRegistrada(clase);
        setOpenConfirmationDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenConfirmationDialog(false);
    };


    if (!students || !clases) {
        return(
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }
    if (students.length === 0 && students !== null){
        return(
            <Box sx={{ height: '100vh', display: 'flex',
                alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Typography variant='h3' component='div' textAlign='center'>
                    No tienes alumnos registrados, ve a  
                     <Link
                    component="button"
                    onClick={() => changeContent('Profile')}
                    variant='h3'
                    sx={{mx: 2}}
                    >
                        <i> Perfil </i>
                    </Link> 
                     para agregar alumnos.
                </Typography>
            </Box>
        )
    }
    return (
        <>
            <Box sx={{m: 2}}>
                <FormControl fullWidth>
                    <InputLabel>Estudiantes</InputLabel>
                    <Select
                        value={currentStudent || ''}
                        label="Estudiantes"
                        onChange={handleChange}
                    >
                        {students.map((student) => (
                            <MenuItem
                                key={student._id}
                                value={student}
                            >
                                {student.nombre} {student.apellido_paterno} {student.apellido_materno}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: error, bgcolor: 'rgba(50, 50, 50, 0.60)', zIndex: '1000', width: { xs: '100vw', sm: '86vw' }, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                <Alert sx={{
                    position: 'absolute', top: '50vh', left: '50%', transform: 'translate(-50%,-50%)', zIndex: '1000', width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
                }} severity="error">
                    <AlertTitle> Error</AlertTitle>
                    Solo puedes Tener <strong>una</strong> clase Registrada
                    <br />
                    <Button onClick={() => setError("none")} sx={{ color: 'error.dark' }}>
                        Cancelar
                    </Button>
                    <Button onClick={() => { setClaseRegistrada([]); setError('none') }} sx={{ color: 'error.dark' }}>
                        Anular Registro
                    </Button>
                </Alert >
            </Box>
            <Box sx={{ textAlign: 'center', width: '100%', paddingX: '20px', height: '100%', paddingBottom: '10px', overflowY: 'scroll', display: { xs: 'block', sm: 'none' } }}>
                {
                    clases.length !== 0 ?    
                        clases.map(e => (
                            <Clase changeClaseRegistrada={changeClaseRegistrada} handleMoreInfo={handleMoreInfo} key={e._id} clase={e} />
                        ))
                    :
                        <Box sx={{ height: '100vh', display: 'flex',
                            alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <Typography variant='h3' component='div' textAlign='center'>
                                No hay clases disponibles por el momento.
                            </Typography>
                        </Box>
                }
            </Box >
            <Box sx={{ width: '100%', visibility: { xs: 'hidden', sm: 'visible' }, display: 'flex', height: '100%', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                <Card
                    sx={{
                        textAlign: "left",
                        marginLeft: "5px",
                        border: "2px solid  rgb(165, 165, 180)",
                        borderRadius: "8px",
                        width: { lg: '30%', sm: '40%' },
                        height: '40%',
                        minHeight: '293px',
                        minWidth: '340px',
                        overflowY: 'scroll'
                    }}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ textAlign: "center", fontFamily: 'arial' }}
                        >
                            Busqueda
                        </Typography>
                        <TextField
                            style={{ paddingBottom: "15px", fontFamily: 'arial', width: '25ch' }}
                            label="Curso"
                            onChange={e => { setItems([{ columnField: 'nombre_curso', operatorValue: 'contains', value: e.target.value }]) }}></TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Nivel"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'nivel', operatorValue: 'contains', value: e.target.value }]) }}
                            select
                        >
                            {["Principiante", "Intermedio", "Avanzado"].map(e => (
                                <MenuItem value={e} key={e}>

                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Periodo"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'clavePeriodo', operatorValue: 'contains', value: e.target.value }]) }}
                        >
                        </TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Cupo Maximo"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'cupo_maximo', operatorValue: 'contains', value: e.target.value }]) }}
                        >
                        </TextField>
                    </CardContent>
                </Card>
                <Box sx={{ width: { lg: '60%', sm: '90%' }, height: { lg: '95%', sm: '50%' }, maxHeight: '100vh', minWidth: '548px' }}>
                    <DataGrid rows={clases} columns={columns} disableSelectionOnClick={true} getRowId={(row) => row._id} getRowHeight={() => 'auto'}
                        filterModel={{
                            items: items
                        }
                        }

                    />
                </Box>
            </Box>
            <ConfirmationDialog clase={claseRegistrada} handleClose={handleCloseDialog} open={openConfirmationDialog} changeClaseRegistrada={changeClaseRegistrada}/>
            <Modal
                open={openMoreInfo}
                onClose={() => setOpenMoreInfo(!openMoreInfo)}
                sx={{overflowY: 'scroll'}}
            >
                <>                
                    <ClaseModal clase={currentClase} />
                </>
            </Modal>
        </>
    )
}

export default RegistroClasesAlumnos
