import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const cards = [
    {
        'id': '1',
        'title': 'Incripción',
        'body': 'Acceder a sistema de inscripciones. Crea, actualiza y elimina los cursos.',
        'color': '#366ac3'
    },
    {
        'id': '2',
        'title': 'Profesores',
        'body': 'Administrar los profesores y visualizar su información.',
        'color': '#5F8AD4'
    },
    {
        'id': '3',
        'title': 'Alumnos',
        'body': 'Administrar los alumnos y visualizar su información.',
        'color': '#89ABE4'
    },
    {
        'id': '4',
        'title': 'Periodos',
        'body': 'Administrar el periodo escolar actual y proximos periodos.',
        'color': '#b2cbf5'
    }
]

// Possible function to get users, this goes in another file
const fetchUsers = () => {
    //const res = await fetch(`http://localhost:3000/users`);
    //const userData = res.json();
    // Se reciben todos los usuarios este array se pasa como prop al componente de Alumnos
    const users = [];
    return users; 
};

const fetchTeachers = () => {
    //const res = await fetch(`http://localhost:3000/teachers`);
    //const userData = res.json();
    // Se reciben todos los usuarios este array se pasa como prop al componente de Alumnos
    const teachers = [];
    return teachers; 
};

const ControlPanel = () => {


    const [users, setUsersInfo] = useState(fetchUsers);
    const [teachers, setTeachersInfo] = useState(fetchTeachers);


    useEffect(() => {
        const getUsersInfo = () =>{
            const users = fetchUsers();
            setUsersInfo(users);
        }

        const getTeachersInfo = () =>{
            const teachers = fetchTeachers();
            setTeachersInfo(teachers);
        }

        getUsersInfo();
        getTeachersInfo();
    }, []);

    return (
        <Box sx={{ ml: 1, p: 1 }} >
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between' }}>
                Panel de control
            </Box>
            <Grid container spacing={2} sx={{my: 2}}>
                <Grid item sm={12} md={6}>
                    <Card sx={{ minWidth: 275 }} sm={12} md={6}>
                        <CardContent sx={{backgroundColor: '#0094DF'}}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 0 }}>
                            Estudiantes inscritos
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'white'}}>{users?.length ?? 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Card sx={{ minWidth: 275 }} >
                        <CardContent sx={{backgroundColor: '#00B8D6'}}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 0 }}>
                            Profesores inscritos
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'white'}}>{teachers?.length ?? 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2}} >
                {cards.map(card =>
                    <Grid item sm={12} md={6} lg={6} key={card.id}>
                        <Card>
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