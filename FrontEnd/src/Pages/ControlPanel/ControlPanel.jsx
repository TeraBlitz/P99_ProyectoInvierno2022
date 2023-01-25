import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import PanelCard from '../../Components/ControlPanel/PanelCard';
import PanelInfo from '../../Components/ControlPanel/PanelInfo';
import axios from "axios";

// Possible function to get users, this goes in another file




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
        'color': '#366ac3',
        'link':'inscripcion'
    },
    {
        'id': '2',
        'title': 'Profesores',
        'body': 'Administrar los profesores y visualizar su información.',
        'color': '#5F8AD4',
        'link':'Profesores'
    },
    {
        'id': '3',
        'title': 'Alumnos',
        'body': 'Administrar los alumnos y visualizar su información.',
        'color': '#89ABE4',
        'link':'Alumnos'
    },
    {
        'id': '4',
        'title': 'Periodos',
        'body': 'Administrar el periodo escolar actual y proximos periodos.',
        'color': '#b2cbf5',
        'link':'Periodos'
    }
]




const ControlPanel = ({changeContent}) => {

    const [dataAlumno, setDataAlumno] = useState([]);
    const [dataClase, setDataClase] = useState([]);
    const [dataProfesor, setDataProfesor] = useState([]);
    const [data, setData] = useState([]);
    //----------------------Obtencion de datos de la base de datos

    const  getPeriodos = async () => {
      const res = await axios.get("http://127.0.0.1:3000/v1/periodos");
      setData(res.data);
      console.log('Fetch Periodos', res.data)
    };

    const  getAlumno  = async () => {
        const res = await axios.get("http://127.0.0.1:3000/v1/alumnos");
        setDataAlumno(res.data);
        console.log('Fetch Alumnos', res.data)
      };

      const  getProfesor  = async () => {
        const res = await axios.get("http://127.0.0.1:3000/v1/profesores");
        setDataProfesor(res.data);
        console.log('Fetch Profesores', res.data)
      };

      const  getClase  = async () => {
        const res = await axios.get("http://127.0.0.1:3000/v1/clases");
        setDataClase(res.data);
        console.log('Fetch Clase', res.data)
      };

    useEffect(() => {
        getAlumno();
        getProfesor ();
        getClase();
        getPeriodos();



    }, []);

    const panelInfoCards = [
        {
            'id': '1',
            'title': 'Estudiantes inscritos',
            'data': dataAlumno,
            'color': '#0094DF'
        },
        {
            'id': '2',
            'title': 'Profesores inscritos',
            'data': dataProfesor,
            'color': '#00B8D6'
        },
        {
            'id': '3',
            'title': 'Cursos Registrados',
            'data': dataClase,
            'color': '#366ac3'
        },

    ]

    return (
        <div>
        <Box sx={{ ml: 1, p: 1 }} >
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between',marginBottom:0,marginTop:2}}>
                Panel de control
            </Box>
            <Box sx={{fontFamily: 'default', fontSize: 'h5.fontSize', py: 2, display: 'flex', justifyContent: 'space-between',textAlign:'right',float:'right', marginRight:0.5}}>
                Periodo 2022</Box>
                <Grid container spacing={2} >
                {panelInfoCards.map(infoCard =>
                    <Grid item sm={12} md={4} key={infoCard.id}>
                        <PanelInfo title={infoCard.title} data={infoCard.data} bgColor={infoCard.color}/>
                    </Grid>

                )}
                </Grid>
                <Grid container spacing={2} sx={{my: 2}}>
                {cards.map(card =>

                    <Grid item sm={12} md={6} key={card.id} onClick={()=>changeContent(card.link)}>
                        <PanelCard title={card.title} body={card.body} bgColor={card.color} />

                    </Grid>
                )}
            </Grid>
        </Box>
        </div>
    )
}

export default ControlPanel
