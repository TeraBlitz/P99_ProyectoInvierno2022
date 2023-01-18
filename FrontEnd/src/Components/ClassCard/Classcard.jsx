import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'

function ClassCard(props) {
    return (
        <Card sx={{ width: '200px', height: '200px', marginX: '20px' , marginY:'20px' }}>
            <Box sx={{ width: '100%', height: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography >Imagen</Typography>
            </Box>
            <CardContent sx={{paddingY:0 , }}>
                <Typography variant="h6" sx={{ fontFamily: 'arial' }}>
                    {props.title}
                </Typography>
                <Typography  sx={{ fontFamily: 'arial', color: 'gray', fontSize:'13px' }}>
                    {props.id}
                </Typography>
                <Typography  sx={{ fontFamily: 'arial', color: 'gray', fontSize:'10px' }}>
                    {props.periodo}
                </Typography>
                <Typography  sx={{ fontFamily: 'arial', color: 'gray', fontSize:'10px' }}>
                    {props.dificultad}
                </Typography>

            </CardContent>

        </Card >
    )
}

export default ClassCard

