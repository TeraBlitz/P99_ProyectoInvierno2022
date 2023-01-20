import Box from '@mui/material/Box'
import React, { useState, useEffect } from 'react'
import Clase from '../../Components/Clase/Clase'
import CircularProgress from '@mui/material/CircularProgress'
import { Alert, Button } from '@mui/material'
import { AlertTitle } from '@mui/material'
import { Card, CardContent, Typography, TextField, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const userValues = {
    '_id': '63c85788d7f5ef2ec08b41',
    'correo': '',
    'rol': 'student'
}

function RegistroClasesAlumnos({changeContent}) {
    const [items, setItems] = useState([]);
    const [students, setStudents] = useState(null)

    const columns = [
        { field: 'id', headerName: 'ID', width: 110 },
        {
            field: 'title',
            headerName: 'Curso',
            width: 190,
            editable: false,
        },
        {
            field: 'periodo',
            headerName: 'Periodo',
            width: 180,
            editable: false,

        },
        {
            field: 'cupoMax',
            headerName: 'Cupo Maximo',
            width: 180,
            editable: 'false'
        },
        {
            field: 'nivel',
            headerName: 'Nivel',
            width: 180,
            editable: false
        },
        {
            field: "actions",
            headerName: "Acciones",
            type: "actions",
            width: 115,
            renderCell: (params) => (
                <AddCircleIcon sx={{ color: params.id == claseRegistrada[0] ? "green" : "black" }} onClick={() => changeClaseRegistrada(params.id)}></AddCircleIcon>
            ),

        }

    ];
    const [claseRegistrada, setClaseRegistrada] = useState([]) // esto se obtendria de la base de datos
    const changeClaseRegistrada = (classId) => {
        if (claseRegistrada[0]) {
            setError('block')
        } else {
            setClaseRegistrada([classId])
        }
    }
    const [error, setError] = useState('none')
    const [data, setData] = useState([
        {
            key: 1,
            id: '1',
            title: 'Clase 1',
            periodo: 1,
            cupo: 30,
            cupoMax: 30,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 2,
            id: '2',
            title: 'Clase 2',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 3,
            id: '3',
            title: 'Clase 3',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 4,
            id: '4',
            title: 'Clase 4',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 5,
            id: '5',
            title: 'Clase 5',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 6,
            id: '6',
            title: 'Clase 6',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 7,
            id: '7',
            title: 'Clase 7',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 8,
            id: '8',
            title: 'Clase 8',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 9,
            id: '9',
            title: 'Clase 9',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 10,
            id: '10',
            title: 'Clase 10',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 11,
            id: '11',
            title: 'Clase 11',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 12,
            id: '12',
            title: 'Clase 12',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 13,
            id: '13',
            title: 'Clase 13',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 14,
            id: '14',
            title: 'Clase 14',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 15,
            id: '15',
            title: 'Clase 15',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 16,
            id: '16',
            title: 'Clase 16',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 17,
            id: '17',
            title: 'Clase 17',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 18,
            id: '18',
            title: 'Clase 18',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 19,
            id: '19',
            title: 'Clase 19',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 20,
            id: '20',
            title: 'Clase 20',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 21,
            id: '21',
            title: 'Clase 21',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 22,
            id: '22',
            title: 'Clase 22',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 23,
            id: '23',
            title: 'Clase 23',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 24,
            id: '24',
            title: 'Clase 24',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 25,
            id: '25',
            title: 'Clase 25',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 26,
            id: '26',
            title: 'Clase 26',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 27,
            id: '27',
            title: 'Clase 27',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 28,
            id: '28',
            title: 'Clase 28',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 29,
            id: '29',
            title: 'Clase 29',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 30,
            id: '30',
            title: 'Clase 30',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 31,
            id: '31',
            title: 'Clase 31',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 32,
            id: '32',
            title: 'Clase 32',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 33,
            id: '33',
            title: 'Clase 33',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 34,
            id: '34',
            title: 'Clase 34',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 35,
            id: '35',
            title: 'Clase 35',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 36,
            id: '36',
            title: 'Clase 36',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 37,
            id: '37',
            title: 'Clase 37',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 38,
            id: '38',
            title: 'Clase 38',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 39,
            id: '39',
            title: 'Clase 39',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 40,
            id: '40',
            title: 'Clase 40',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 41,
            id: '41',
            title: 'Clase 41',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 42,
            id: '42',
            title: 'Clase 42',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 43,
            id: '43',
            title: 'Clase 43',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 44,
            id: '44',
            title: 'Clase 44',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 45,
            id: '45',
            title: 'Clase 45',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 46,
            id: '46',
            title: 'Clase 46',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 47,
            id: '47',
            title: 'Clase 47',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 48,
            id: '48',
            title: 'Clase 48',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        },
        {
            key: 49,
            id: '49',
            title: 'Clase 49',
            periodo: 1,
            cupo: 11,
            cupoMax: 40,
            edadMin: 10,
            edadMax: 15,
            nivel: 'avanzado'
        },
        {
            key: 50,
            id: '50',
            title: 'Clase 50',
            periodo: 1,
            cupo: 11,
            cupoMax: 20,
            edadMin: 10,
            edadMax: 15,
            nivel: 'intermedio'
        }
    ])

    useEffect(() => {
        const getUserStudents = () =>{
            fetch(`http://127.0.0.1:3000/v1/alumnos/find`,
            {
                method: 'POST',
                redirect: 'follow',
                body: new URLSearchParams(
                    {
                        idUsuario : userValues._id
                    }
                )
            })
            .then(response => response.json())
            .then(result => {
                setStudents(result)
            })
            .catch(error =>{
                console.log(error)
            })
        }
        getUserStudents();
    }, []);


    if (!students) {
        return(
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }
    if (students.length === 0 && students !== null){
        return(
            <Box>
                <Button onClick={() => changeContent('Profile')}>
                    Ir a perfil
                </Button>
            </Box>
        )
    }
    return (
        <>
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
                    data.map(e => (
                        <Clase changeClaseRegistrada={changeClaseRegistrada} key={e.id} title={e.title} periodo={e.periodo.toString()} cupo={e.cupo} cupoMax={e.cupoMax} edadMin={e.edadMin.toString()} edadMax={e.edadMax.toString()} />
                    ))
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
                        minWidth: '340px'
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
                            onChange={e => { setItems([{ columnField: 'title', operatorValue: 'contains', value: e.target.value }]) }}></TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Nivel"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'nivel', operatorValue: 'contains', value: e.target.value }]) }}
                            select
                        >
                            {["Principiante", "intermedio", "Avanzado"].map(e => (
                                <MenuItem value={e} key={e}>

                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Periodo"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'periodo', operatorValue: 'contains', value: e.target.value }]) }}
                        >
                        </TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Cupo Maximo"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'cupoMax', operatorValue: 'contains', value: e.target.value }]) }}
                        >
                        </TextField>
                    </CardContent>
                </Card>
                <Box sx={{ width: { lg: '60%', sm: '90%' }, height: { lg: '95%', sm: '50%' }, maxHeight: '100vh', minWidth: '548px' }}>
                    <DataGrid rows={data} columns={columns} disableSelectionOnClick={true}
                        filterModel={{
                            items: items
                        }
                        }

                    />

                </Box>
            </Box>


        </>
    )
}

export default RegistroClasesAlumnos
