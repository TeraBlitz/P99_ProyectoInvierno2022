import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Clase from '../../Components/Clase/Clase'


function RegistroClasesAlumnos() {
    const [clases, setClases] = useState([
        {
            key: '1',
            title: 'Clase 1',
            periodo: 1,
            cupo: 30,
            cupoMax: 30,
            edadMin: 10,
            edadMax: 15,

        },
        {

            key: '2',
            title: 'Clase 2',
            periodo: 1,
            cupo: 11,
            cupoMax: 30,
            edadMin: 10,
            edadMax: 15,
        }
    ])
    return (
        <Box sx={{ textAlign: 'center', width: '100%' }}>
            <TextField label="Buscar" color='primary' sx={{ width: '70%', fontSize: '30px', bgcolor: 'lightgray', borderRadius: 1 }} variant="filled"></TextField>
            {clases.map(e => (
                <Clase title={e.title} periodo={e.periodo.toString()} cupo={e.cupo} cupoMax={e.cupoMax} edadMin={e.edadMin.toString()} edadMax={e.edadMax.toString()} />
            ))}

        </Box>
    )
}

export default RegistroClasesAlumnos
