import { ButtonGroup, Typography, Button } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'

function Clase(props) {
    return (
        <Box sx={{ marginTop: '20px' }}>
            <Box sx={{ bgcolor: 'lightgray', paddingX: '10px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
                <Typography variant="h6">{props.title}</Typography>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Periodo: {props.periodo}</Typography>
                    <Typography>Edades: {props.edadMin} a {props.edadMax}</Typography>
                        <Typography sx={{ color: props.cupo / props.cupoMax >= 1 ? "red" : "black" }}>{props.cupo/props.cupoMax >=1?"Lleno" :  (props.cupoMax - props.cupo).toString() +" puestos"}</Typography>
                </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ width: '100%' }}>
                <Button sx={{ width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Mas Informacion</Button>
                <Button onClick={() => props.changeClaseRegistrada(props.title)} sx={{ width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>{props.cupo / props.cupoMax >= 1 ? "Lista de Espera" : "Registrarse"}</Button>
            </ButtonGroup>
        </Box>
    )
}

export default Clase
