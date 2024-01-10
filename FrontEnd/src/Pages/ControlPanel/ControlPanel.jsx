import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Select from 'react-select';
import PanelCard from '../../Components/ControlPanel/PanelCard';
import PanelInfo from '../../Components/ControlPanel/PanelInfo';
import { controlPanelCards } from '../../utils/constants';
import {
  contarAlumnos, contarClases, contarProfes,
} from '../../utils/utilFunctions';
import { host } from '../../utils/requestUtils';
import { getClasses } from '../../api/classes';
import { getPeriodos } from '../../api/Periodos';
import { getClassStudent } from '../../api/classStudent';
import { FitScreen } from '@mui/icons-material';

function ControlPanel({ changeContent }) {
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [alumnosInscritos, setAlumnosInscritos] = useState(0);
  const [profesInscritos, setProfesInscritos] = useState(0);
  const [cursosRegistrados, setCursosRegistrados] = useState(0);
  const [panelInfoCards, setPanelInfoCards] = useState([]);

  const getAllPeriodos = async () => {
    const res = await getPeriodos();
    const response = await res.json();

    setDataPeriodo(response);
  };

  const getNumeroAlumnos = async () => {
    const res = await getClassStudent();
    const response = await res.json();
  
    setAlumnosInscritos(contarAlumnos(response, selectedPeriod.id));
  };

  const getNumeroProfesores = async () => {
    const res = await getClasses();
    const response = await res.json();

    setProfesInscritos(contarProfes(response, selectedPeriod.clave));

  };

  const getNumeroClases = async () => {
    const res = await getClasses();
    const response = await res.json();
    
    setCursosRegistrados(contarClases(response, selectedPeriod.clave));
  };

  const handleSelectChange = (event) => {
    const obj = {
      id: event.value,
      clave: event.label,
    };
  
    setSelectedPeriod(obj);
  };

  useEffect(() => {
    getAllPeriodos();
  }, []);

  useEffect(() => {
    if (selectedPeriod && selectedPeriod.id) {
      getNumeroAlumnos();
      getNumeroProfesores();
      getNumeroClases();
    }
  }, [selectedPeriod]);
  

  useEffect(() => {
    setPanelInfoCards([
      {
        id: '1',
        title: 'Estudiantes inscritos',
        color: '#0094DF',
        num: alumnosInscritos,
      },
      {
        id: '2',
        title: 'Profesores inscritos',
        color: '#00B8D6',
        num: profesInscritos,
      },
      {
        id: '3',
        title: 'Cursos Registrados',
        color: '#366ac3',
        num: cursosRegistrados,
      },
    ]);
  }, [alumnosInscritos, profesInscritos, cursosRegistrados]);

  return (
    <div>
      <Box sx={{ ml: 1, p: 0 }}>
        <Box sx={{
          fontFamily: 'default', 
          fontSize: 'h3.fontSize', 
          py: 2, display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: 0, marginTop: 0,
        }}
        >
          Panel de control
          <Box
              sx={{
                fontFamily: 'arial',
                fontSize: 'h6.fontSize', 
                py: 2, 
                display: 'flex', 
                justifyContent: 'space-between', 
                textAlign: 'left', 
                float: 'right', 
                marginRight: 0.5,
                '.my-select': {
                  minWidth: 150, // Tamaño mínimo por defecto
                  '@media (min-width: 600px)': {
                    minWidth: 200, // Tamaño mínimo para pantallas más grandes
                  },
                },
              }}
            >
            <Select
              className="my-select"

              options={dataPeriodo.map((sup) => ({
                label: sup.clave,
                value: sup._id,
              }))}

              onChange={handleSelectChange}
            />
          </Box>
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
