import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const cards = [
    {
        'id': '1',
        'title': 'Incripción',
        'body': 'Acceder a sistema de inscripciones. Crea, actualiza y elimina los cursos.',
        'color': '#4472c1'
    },
    {
        'id': '2',
        'title': 'Profesores',
        'body': 'Administrar los profesores y visualizar su información.',
        'color': '#7aa1d4'
    },
    {
        'id': '3',
        'title': 'Alumnos',
        'body': 'Administrar los alumnos y visualizar su información.',
        'color': '#b2cbf5'
    }
]

const ControlPanel = () => {
    return (
        <Box sx={{ mr: 2, pb: 2 }} >
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between' }}>
                Panel de control
            </Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {cards.map(card =>
                    <Grid item sm={12} md={6} lg={4} key={card.id}>
                        <Card sx={{ maxWidth: 345, minWidth: 345,  minHeight: 210 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    sx={{ backgroundColor: card.color }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.body}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default ControlPanel