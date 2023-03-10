import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import PanelCard from '../../Components/ControlPanel/PanelCard';
import PanelInfo from '../../Components/ControlPanel/PanelInfo';
import { controlPanelCards } from '../../utils/constants';
import {
  compararFecha, contarAlumnos, contarClases, contarProfes,
} from '../../utils/utilFunctions';

// Possible function to get users, this goes in another file

let cursosRegistrados = 0;
let profesInscritos = 0;
let alumnosInscritos = 0;

let periodoActual = 'No se encontraron Periodos';

function ControlPanel({ changeContent }) {
  const [dataAlumno, setDataAlumno] = useState([]);
  const [dataClase, setDataClase] = useState([]);
  const [dataProfesor, setDataProfesor] = useState([]);
  const [data, setData] = useState([]);
  const panelInfoCards = [
    {
      id: '1',
      title: 'Estudiantes inscritos',
      data: dataAlumno,
      color: '#0094DF',
      num: alumnosInscritos ?? 0,
    },
    {
      id: '2',
      title: 'Profesores inscritos',
      data: dataProfesor,
      color: '#00B8D6',
      num: profesInscritos ?? 0,
    },
    {
      id: '3',
      title: 'Cursos Registrados',
      data: dataClase,
      color: '#366ac3',
      num: cursosRegistrados ?? 0,
    },
  ];

  // ----------------------Obtencion de datos de la base de datos
  const getPeriodos = async () => {
    const res = await axios.get('https://p99test.fly.dev/v1/periodos');
    setData(res.data);
    // console.log('Fetch Periodos', res.data)
    periodoActual = compararFecha(res.data);
  };

  const getClase = async () => {
    const res = await axios.get('https://p99test.fly.dev/v1/clases');
    setDataClase(res.data);
    // funciones para encontrar stats
    // console.log('Fetch Clase', res.data)
    // console.log('Cursos Registrados: ',contarClases(res.data))
    cursosRegistrados = contarClases(res.data);
    // console.log('Profesores Inscritos', contarProfes(res.data))
    profesInscritos = contarProfes(res.data);
    // console.log('Alumnos Inscritos: ', contarAlumnos(res.data))
    alumnosInscritos = contarAlumnos(res.data);
  };

  useEffect(() => {
    // getAlumno();
    // getProfesor();
    getClase();
    getPeriodos();
  }, []);

  return (
    <div>
      <Box sx={{ ml: 1, p: 0 }}>
        <Box sx={{
          fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between', marginBottom: 0, marginTop: 0,
        }}
        >
          Panel de control
        </Box>
        <Box sx={{
          fontFamily: 'default', fontSize: 'h5.fontSize', py: 2, display: 'flex', justifyContent: 'space-between', textAlign: 'right', float: 'right', marginRight: 0.5,
        }}
        >
          {periodoActual}
        </Box>
        <Grid container spacing={1.5}>
          {panelInfoCards.map((infoCard) => (
            <Grid item sm={12} md={4} key={infoCard.id}>
              <PanelInfo
                title={infoCard.title}
                bgColor={infoCard.color}
                num={infoCard.num}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {controlPanelCards.map((card) => (
            <Grid item sm={12} md={6} key={card.id} onClick={() => changeContent(card.link)}>
              <PanelCard
                title={card.title}
                body={card.body}
                bgColor={card.color}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default ControlPanel;
