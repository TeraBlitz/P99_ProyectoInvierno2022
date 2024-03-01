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

import ClipLoader from "react-spinners/ClipLoader";


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

  const [loading, setLoading] = useState(true);

  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);

  const [openModal, setOpenModal] = useState({
    open: false,
    id: '',
    type: '',
  });

  const [consolaSeleccionada, setConsolaSeleccionada] = useState(periodoVacio);

  const [currentOperation, setCurrentOperation] = useState('');

  const [form_data, setForm_data] = useState({

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

  })


  const getClase = async () => {
    await getClasses().then((response) => response.json()).then((result) => {
      setDataClase(result);
    });
  };

  const getAllPeriodos = async () => {
    setLoading(true);
    getPeriodos().then((response) => response.json()).then((result) => {
      setData(result);
      console.log("result", result);
    setLoading(false);
    });
    
  };

  // const getAlumnoClase = async () => {
  //   const res = await axios.get('https://p99test.fly.dev/v1/alumnoClases');
  //   setDataAlumnoClase(res.data);
  // };

  useEffect(() => {
    getAllPeriodos();
    //getClase();
  }, []);

  useEffect(() => {
    if (openModal.open == false) {
      getAllPeriodos();
    }
  }, [openModal]);

  const abrirCerrarModal = (id) => {
    if (openModal.open) {
      setOpenModal({ open: false, id: id });
    } else {
      setOpenModal({ open: true, id: id });
    }
  };

  // Funcion para seleccionar el periodo a crear, eliminar o editar


  const handleChange = (e) => {
    //fill the form_data
    setForm_data({
      ...form_data,
      [e.target.name]: e.target.value
    })

  };


  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deletePeriodos({
          _id: consolaSeleccionada._id,
        });
      } else if (currentOperation === 'Crear') {
        console.log('c>>',consolaSeleccionada.fecha_inicio_insc_talleres)
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
        console.log('u>>>>',consolaSeleccionada.fecha_inicio_insc_talleres)

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

      getPeriodos().then((response) => response.json()).then((result) => {
        setData(result);

        console.log("result", result);
      });


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        zIndex: '1000'
      }}>
        <ClipLoader color="#004A98" loading={loading} size={80} />
      </div>
    );
  }


  return (
    <div>
      <h1 className="tittle">Periodos</h1>
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal({
            open: true,
            id: '',
            type: 'Crear',

          })
        }
        }
        sx={{
          marginTop: '-15px',
        }}
      >
        Nuevo Periodo
      </Button>

      <div className="card-grid"
        key={openModal}
      >


        {Array.isArray(data) ? data.map((item) => (
          <PeriodoCard
            openModal={openModal}
            setOpenModal={setOpenModal}
            item={item}
            refreshData={getAllPeriodos}
          />
        )) : null}

        <ModalPeriodo
          id={openModal.id}
          openModal={openModal}
          setOpenModal={setOpenModal}
          form_data={form_data}
          setForm_data={setForm_data}
          refreshData={getAllPeriodos}
        />
        <div className="spacer" />
      </div>
    </div>
  );
}
