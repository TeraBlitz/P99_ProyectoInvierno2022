import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import PanelCard from '../../Components/ControlPanel/PanelCard';
import PanelInfo from '../../Components/ControlPanel/PanelInfo';

import Periodos from './PagesCP/Periodos.jsx';


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

const panelInfoCards = [
    {
        'id': '1',
        'title': 'Estudiantes inscritos',
        'data': fetchUsers,
        'color': '#0094DF'
    },
    {
        'id': '2',
        'title': 'Profesores inscritos',
        'data': fetchTeachers,
        'color': '#00B8D6'
    }
]


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

    const [display, setDisplay ]= useState(true);

    return (
        <div>
        <Box sx={{ ml: 1, p: 1 }} >
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between' }}>
                Panel de control
            </Box>
            <Grid container spacing={2} sx={{my: 2}}>
                {panelInfoCards.map(infoCard =>
                    <Grid item sm={12} md={6} key={infoCard.id}>
                        <PanelInfo title={infoCard.title} data={infoCard.data} bgColor={infoCard.color} />
                    </Grid>
                )}
                {cards.map(card =>
                    <Grid item sm={12} md={6} key={card.id}>
                        <PanelCard title={card.title} body={card.body} bgColor={card.color} />
                    </Grid>
                )}
            </Grid>
        </Box>
        <button onClick={() => setDisplay(!display)}>Periodos</button>
        {display && <Periodos/>}

        </div>
    )
}

export default ControlPanel