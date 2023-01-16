import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Clase from '../../Components/Clase/Clase'
import { Alert, Button } from '@mui/material'
import { AlertTitle } from '@mui/material'
import { display } from '@mui/system'


function RegistroClasesAlumnos() {
    const [claseRegistrada, setClaseRegistrada] = useState([]) // esto se obtendria de la base de datos
    const changeClaseRegistrada = (classId) => {
        if (claseRegistrada[0]) {
            setError('block')
        } else {
            setClaseRegistrada([classId])
        }
    }
    const [error, setError] = useState('none')
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
        <Box sx={{ textAlign: 'center', width: '100%'  , paddingX:'20px'}}>
            <Box sx={{ display: error, bgcolor: 'rgba(50, 50, 50, 0.60)', zIndex: '1000', width: { xs: '100vw', sm: '86vw' }, height: '100%', position: 'absolute', top: 0, left: 0 }}>
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
            {
                clases.map(e => (
                    <Clase changeClaseRegistrada={changeClaseRegistrada} key={e.key} title={e.title} periodo={e.periodo.toString()} cupo={e.cupo} cupoMax={e.cupoMax} edadMin={e.edadMin.toString()} edadMax={e.edadMax.toString()} />
                ))
            }
        </Box >
    )
}

export default RegistroClasesAlumnos
