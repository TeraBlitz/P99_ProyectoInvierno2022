import { Typography, Button, CardContent} from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'


function Clase({changeClaseRegistrada, handleMoreInfo, clase}) {

    const nivelDict = {
        '1' : 'Desde cero',
        '2' : 'Con bases',
        '3' : 'Intermedio',
        '4' : 'Avanzado'
    }

    return (
        <Card sx={{ my: 2, '& .MuiTypography-root': { mb: 1 }}}>
            <CardContent>
                <Typography variant="h6">{clase.clave}. {clase.nombre_curso}</Typography>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                    <Typography variant='body1'><strong>Periodo:</strong>  {clase.clavePeriodo}</Typography>
                    <Typography variant='body1'><strong>Modalidad:</strong> {clase.modalidad}</Typography>
                    <Typography variant='body1'><strong>Nivel:</strong> {nivelDict[clase.nivel]}</Typography>
                        <Typography sx={{ color: clase.cupo_actual / clase.cupo_maximo >= 1 ? "red" : "black" }} variant='body1'>
                            { Number(clase.cupo_actual) / Number(clase.cupo_maximo)  >=1 ? <strong>Lleno</strong>
                                : <strong>Quedan  {(Number(clase.cupo_maximo) - Number(clase.cupo_actual)).toString()}  puestos!</strong> 
                            }
                        </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{backgroundColor: 'e8f0fe'}}>
                <Button size='small' onClick={() => handleMoreInfo(clase)} sx={{ width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Detalle</Button>
                <Button size='small' onClick={() => changeClaseRegistrada(clase.nombre_curso)} sx={{ width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>{ Number(clase.cupo_actual) / Number(clase.cupo_maximo) >= 1 ? "Lista de Espera" : "Registrarse"}</Button>
            </CardActions>
        </Card>
    )
}

export default Clase
