import React, { useState, useEffect } from 'react';
import './periodos.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import ModalPeriodo from '../../../Components/ControlPanel/ModalPeriodo';
import PeriodoCard from '../../../Components/ControlPanel/PeriodoCard';
import {
  createPeriodo, deletePeriodos, getPeriodos, updatePeriodo,
} from '../../../api/Periodos';
import { getClasses } from '../../../api/classes';

const periodoVacio = {
  _id: '',
  clave: '',
  status: '',
  fecha_inicio: '',
  fecha_fin: '',
  fecha_inicio_insc_talleres: '',
  fecha_fin_insc_talleres: '',
  fecha_inicio_insc_idiomas: '',
  fecha_fin_insc_idiomas: '',
  fecha_inicio_insc_asesorias: '',
  fecha_fin_insc_asesorias: '',
  cursos_max_por_alumno: '',
  idiomas_max_por_alumno: '',
};

export default function Periodos() {
  const [data, setData] = useState([]);
  const [dataClase, setDataClase] = useState([]);
  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState(periodoVacio);
  const [currentOperation, setCurrentOperation] = useState('');

  const getClase = async () => {
    await getClasses().then((response) => response.json()).then((result) => {
      setDataClase(result);
    });
  };

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setData(result);
    });
  };

  // const getAlumnoClase = async () => {
  //   const res = await axios.get('https://p99test.fly.dev/v1/alumnoClases');
  //   setDataAlumnoClase(res.data);
  // };

  useEffect(() => {
    getAllPeriodos();
    getClase();
  }, []);

  const abrirCerrarModal = () => {
    if (openModal) {
      setConsolaSeleccionada(periodoVacio);
    }
    setOpenModal(!openModal);
  };

  // Funcion para seleccionar el periodo a crear, eliminar o editar
  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: name.includes('fecha') ? `${value}:00` : value,
    }));
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deletePeriodos({
          _id: consolaSeleccionada._id,
        });
      } else if (currentOperation === 'Crear') {
        await createPeriodo({
          clave: consolaSeleccionada.clave,
          status: consolaSeleccionada.status,
          fecha_inicio: consolaSeleccionada.fecha_inicio,
          fecha_fin: consolaSeleccionada.fecha_fin,
          fecha_inicio_insc_talleres: consolaSeleccionada.fecha_inicio_insc_talleres,
          fecha_fin_insc_talleres: consolaSeleccionada.fecha_fin_insc_talleres,
          fecha_inicio_insc_idiomas: consolaSeleccionada.fecha_inicio_insc_idiomas,
          fecha_fin_insc_idiomas: consolaSeleccionada.fecha_fin_insc_idiomas,
          fecha_inicio_insc_asesorias: consolaSeleccionada.fecha_inicio_insc_asesorias,
          fecha_fin_insc_asesorias: consolaSeleccionada.fecha_fin_insc_asesorias,
          cursos_max_por_alumno: consolaSeleccionada.cursos_max_por_alumno,
          idiomas_max_por_alumno: consolaSeleccionada.idiomas_max_por_alumno,
        });
      } else {
        updatePeriodo({
          _id: consolaSeleccionada._id,
          clave: consolaSeleccionada.clave,
          status: consolaSeleccionada.status,
          fecha_inicio: consolaSeleccionada.fecha_inicio,
          fecha_fin: consolaSeleccionada.fecha_fin,
          fecha_inicio_insc_talleres: consolaSeleccionada.fecha_inicio_insc_talleres,
          fecha_fin_insc_talleres: consolaSeleccionada.fecha_fin_insc_talleres,
          fecha_inicio_insc_idiomas: consolaSeleccionada.fecha_inicio_insc_idiomas,
          fecha_fin_insc_idiomas: consolaSeleccionada.fecha_fin_insc_idiomas,
          fecha_inicio_insc_asesorias: consolaSeleccionada.fecha_inicio_insc_asesorias,
          fecha_fin_insc_asesorias: consolaSeleccionada.fecha_fin_insc_asesorias,
          cursos_max_por_alumno: consolaSeleccionada.cursos_max_por_alumno,
          idiomas_max_por_alumno: consolaSeleccionada.idiomas_max_por_alumno,
        });
      }
      abrirCerrarModal();
      getAllPeriodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="tittle">Periodos</h1>
      <Button
        variant="contained"
        onClick={() => { seleccionarConsola(periodoVacio, 'Crear'); }}
        sx={{
          marginTop: '-15px',
        }}
      >
        Nuevo Periodo
      </Button>
      <div className="card-grid">
        {Array.isArray(data) ? data.map((item) => (
          <PeriodoCard
            dataClase={dataClase}
            item={item}
            seleccionarConsola={seleccionarConsola}
          />
        )) : null}
        <ModalPeriodo
          periodoActual={consolaSeleccionada}
          openModal={openModal}
          setOpenModal={abrirCerrarModal}
          handleChange={handleChange}
          onSubmit={modalSubmit}
          operation={currentOperation}
        />
        <div className="spacer" />
      </div>
    </div>
  );
}
