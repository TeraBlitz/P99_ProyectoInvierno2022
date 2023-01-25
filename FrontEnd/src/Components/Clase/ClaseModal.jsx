import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const ClaseModal = ({clase}) => {

    const nivelDict = {
        '1' : 'Desde cero',
        '2' : 'Con bases',
        '3' : 'Intermedio',
        '4' : 'Avanzado'
    }

    const getHorario = (clase) => {
        return `${clase.lunes ? `Lun: ${clase.lunes} \n` : ''} 
                ${clase.martes ? `Mar: ${clase.martes} \n` : ''}
                ${clase.miercoles ? `Mierc: ${clase.miercoles} \n` : ''}
                ${clase.jueves ? `Juev: ${clase.jueves} \n` : ''}
                ${clase.viernes ? `Vier: ${clase.viernes} \n` : ''}
                ${clase.sabado ? `Sab: ${clase.sabado} \n` : ''}`
    }

    return (
        <>
        <Box
            sx={{'& .MuiTypography-root': { width: '35ch' },
            display: 'flex', alignItems: 'center',  flexWrap: 'wrap',
            backgroundColor: 'white', borderRadius: 3, m: 2, p: 2}}
        >
            <Typography variant='h5'>{clase.clave}. {clase.nombre_curso}</Typography>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>Sobre el curso</Typography>        
            <Typography><strong>Periodo:</strong> {clase.clavePeriodo}</Typography>
            <Typography><strong>Area:</strong> {clase.area}</Typography>
            <Typography><strong>Nivel:</strong> {nivelDict[clase.nivel]}</Typography>
            <Typography><strong>Modalidad:</strong> {clase.modalidad}</Typography>
            <Typography><strong>Horario:</strong> </Typography>
            <Typography> {getHorario(clase)} </Typography>
            <Typography><strong>Lugares disponibles:</strong> {(Number(clase.cupo_maximo) - Number(clase.cupo_actual)).toString()}</Typography>
        </Box>
        </>
    )
}

export default ClaseModal