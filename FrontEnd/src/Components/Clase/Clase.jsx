import { Typography, Button, CardContent} from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider';


function Clase({handleClick, handleMoreInfo, clase}) {

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
                {
                    clase.status === "Inscrito" ? 
                        <Typography variant='body2'><i>Ya estas inscrito</i></Typography>
                    :
                        null
                }
                {
                    clase.status === "ListaEspera" ? 
                        <Typography variant='body2'><i>Estas en lista de espera</i></Typography>
                    :
                        null
                }
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                    <Typography variant='body1'><strong>Periodo:</strong>  {clase.clavePeriodo}</Typography>
                    <Typography variant='body1'><strong>Modalidad:</strong> {clase.modalidad}</Typography>
                    <Typography variant='body1'><strong>Nivel:</strong> {nivelDict[clase.nivel]}</Typography>
                    <Typography><strong>Rango de edad:</strong> {`${clase.edad_minima} - ${clase.edad_maxima === '' ? '99' : clase.edad_maxima}`}</Typography>
                        <Typography sx={{ color: clase.cupo_actual / clase.cupo_maximo >= 1 ? "red" : "black" }} variant='body1'>
                            { Number(clase.cupo_actual) / Number(clase.cupo_maximo)  >=1 ? <strong>Lleno</strong>
                                : <strong>¡Curso  {(Number(clase.cupo_actual) / Number(clase.cupo_maximo) * 100).toFixed()}% lleno!</strong> 
                            }
                        </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{backgroundColor: 'e8f0fe'}}>
                <Button size='small' onClick={() => handleMoreInfo(clase)}
                    sx={{ width: '50%'}}
                >
                    Detalle
                </Button>
                { Number(clase.cupo_actual) < Number(clase.cupo_maximo) ?
                <Button size='small' onClick={() => handleClick(clase)}>
                    {clase.status === "Inscrito" && clase.status !== 'ListaEspera'
                        ? 'Cancelar Registro' : 'Inscribir'}
                </Button>  :
                <Button size='small' onClick={() => handleClick(clase)}>
                    {clase.status === "ListaEspera" && clase.status !== 'Inscrito'
                        ? 'Salir de Lista' : 'Lista Espera'}
                </Button> }
            </CardActions>
        </Card>
    )
}

export default Clase
