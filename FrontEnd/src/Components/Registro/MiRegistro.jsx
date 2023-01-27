import React from 'react'
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

const MiRegistro = () => {

  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
        <Typography gutterBottom variant="body2" sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
            Clases Inscritas
            <CircleIcon sx={{ml: 2, color: 'lightgreen'}}/>
        </Typography>
        <Divider variant="middle"/>
        <Typography gutterBottom variant="body2" sx={{mt: 2, display: 'flex', alignItems: 'center'}}>
            Lista de espera
            <CircleIcon sx={{ ml: 2,color: 'lightyellow'}}/>
        </Typography>
        </CardContent>
    </Card>
  )
}

export default MiRegistro