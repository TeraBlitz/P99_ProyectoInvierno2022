import React, { useState, useEffect } from 'react';
import './periodos.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {
  createPeriodo, deletePeriodos, getPeriodos, updatePeriodo,
} from '../../../api/Periodos';
import { getClasses } from '../../../api/classes';
import { traducirDate, traducirTime } from './../../../utils/utilFunctions'

export default function Periodos() {
  useEffect(() => {
    console.log('empieza use efect');

    getAllPeriodos();
    getClase();

    console.log('Periodos: ', data);
  }, []);

  // config de modal estilo
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Datos
  const [data, setData] = useState([]);
  // ----------------------Obtencion de datos de la base de datos

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setData(result);
    });

    // console.log('fetch datos',res.data)
  };

  // Clases

  const [dataClase, setDataClase] = useState([]);

  const getClase = async () => {
    await getClasses().then((response) => response.json()).then((result) => {
      setDataClase(result);
    });
  };

  // funciones para sacar asociar datos a periodos

  function encontrarProfes(clave) {
    const listaProfes = [];
    dataClase.forEach((element) => {
      if (element.clavePeriodo === clave) {
        console.log(element);
        if (!listaProfes.includes(element.matriculaProfesor)) {
          listaProfes.push(element.matriculaProfesor);
        }
      }
    });
    return (listaProfes.length);
  }

  function encontrarAlumnos(clave) {
    let alumnosInscritos = 0;
    dataClase.forEach((element) => {
      if (element.clavePeriodo === clave) {
        alumnosInscritos += Number(element.cupo_actual);
      }
    });
    return (alumnosInscritos);
  }

  function encontrarClases(clave) {
    let clasesInscritas = 0;
    dataClase.forEach((element) => {
      if (element.clavePeriodo === clave) {
        clasesInscritas += 1;
      }
    });

    return (clasesInscritas);
  }

  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);

  const getAlumnoClase = async () => {
    const res = await axios.get('https://p99test.fly.dev/v1/alumnoClases');
    setDataAlumnoClase(res.data);
  };

  // Variables para agregar tarjeta
  const [modalInsertar, setModalInsertar] = useState(false);
  const [clave, setClave] = useState('');
  const [status, setStatus] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [fechaInicioInscTalleres, setFechaInicioInscTalleres] = useState('');
  const [fechaFinInscTalleres, setFechaFinInscTalleres] = useState('');
  const [fechaInicioInscIdiomas, setFechaInicioInscIdiomas] = useState('');
  const [fechaFinInscIdiomas, setFechaFinInscIdiomas] = useState('');
  const [fechaInicioInscAsesorias, setFechaInicioInscAsesorias] = useState('');
  const [fechaFinInscAsesorias, setFechaFinInscAsesorias] = useState('');
  const [cursosMaxPorAlumno, setCursosMaxPorAlumno] = useState('');
  const [idiomasMaxPorAlumno, setIdiomasMaxPorAlumno] = useState('');

  // Modal abrir y cerrar
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  // procedimiento para crear datos
  const postCrea = async (e) => {
    e.preventDefault();
    try {
      await createPeriodo({
        clave,
        status,
        fecha_inicio: `${fechaInicio}:00`,
        fecha_fin: `${fechaFin}:00`,
        fecha_inicio_insc_talleres: `${fechaInicioInscTalleres}:00`,
        fecha_fin_insc_talleres: `${fechaFinInscTalleres}:00`,
        fecha_inicio_insc_idiomas: `${fechaInicioInscIdiomas}:00`,
        fecha_fin_insc_idiomas: `${fechaFinInscIdiomas}:00`,
        fecha_inicio_insc_asesorias: `${fechaInicioInscAsesorias}:00`,
        fecha_fin_insc_asesorias: `${fechaFinInscAsesorias}:00`,
        cursos_max_por_alumno: cursosMaxPorAlumno,
        idiomas_max_por_alumno: idiomasMaxPorAlumno,
      });
      abrirCerrarModalInsertar();
      getAllPeriodos();
      setClave('');
      setStatus('');
      setFechaInicio('');
      setFechaFin('');
      setFechaInicioInscTalleres('');
      setFechaFinInscTalleres('');
      setFechaInicioInscIdiomas('');
      setFechaFinInscIdiomas('');
      setFechaInicioInscAsesorias('');
      setFechaFinInscAsesorias('');
      setCursosMaxPorAlumno('');
      setIdiomasMaxPorAlumno('');
    } catch (error) {
      console.log(error);
    }
    console.log('Datos Posteados: ', data);
  };

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
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
  });

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  // Funcion para eliminar o editar
  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    if (caso === 'Editar') {
      abrirCerrarModalEditar();
    } else {
      abrirCerrarModalEliminar();
    }
  };

  // Procedimiento para eliminar
  const postDelete = async () => {
    try {
      await deletePeriodos({
        _id: consolaSeleccionada._id,
      });
      abrirCerrarModalEliminar();
      getAllPeriodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,

    }));

    if (name === 'fecha_inicio') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_inicio: valor,

      }));
    }
    if (name === 'fecha_fin') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_fin: valor,

      }));
    }
    if (name === 'fecha_inicio_insc_talleres') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_inicio_insc_talleres: valor,

      }));
    }

    if (name === 'fecha_fin_insc_talleres') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_fin_insc_talleres: valor,

      }));
    }
    if (name === 'fecha_inicio_insc_idiomas') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_inicio_insc_idiomas: valor,

      }));
    }
    if (name === 'fecha_fin_insc_idiomas') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_fin_insc_idiomas: valor,

      }));
    }
    if (name === 'fecha_inicio_insc_asesorias') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_inicio_insc_asesorias: valor,

      }));
    }
    if (name === 'fecha_fin_insc_asesorias') {
      const valor = `${value}:00`;
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        fecha_fin_insc_asesorias: valor,

      }));
    }
    console.log(consolaSeleccionada.fecha_inicio);
  };
  
  // Editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
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
      abrirCerrarModalEditar();
      getAllPeriodos();
    } catch (error) {
      console.log(error);
    }
  };

  console.log('data: ', data);
  return (
    <div>
      <h1 className="tittle">Periodos</h1>
      <Button
        variant="contained"
        onClick={() => abrirCerrarModalInsertar()}
        sx={{

          marginTop: '-15px',

        }}
      >
        Nuevo Periodo
      </Button>
      <Modal
        open={modalInsertar}
        onClose={() => abrirCerrarModalInsertar()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '680px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        >
          <Typography variant="h5" component="div">
            Ingrese los nuevos datos
          </Typography>
          <div className="spacer" />

          <div>
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Clave"
              name="clave"
              onChange={(e) => setClave(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de inicio"
              name="fecha_inicio"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="fecha de Fin"
              name="fecha_fin"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaFin(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de inicio de incripciones de talleres"
              name="fecha_inicio_insc_talleres"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaInicioInscTalleres(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de fin de inscripciones de talleres"
              name="fecha_fin_insc_talleres"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaFinInscTalleres(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de inicio de incripciones de idiomas"
              name="fecha_inicio_insc_idiomas"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaInicioInscIdiomas(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de fin de inscripciones de idiomas"
              name="fecha_fin_insc_idiomas"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaFinInscIdiomas(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de inicio de incripciones de asesorias"
              name="fecha_inicio_insc_asesorias"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaInicioInscAsesorias(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label="Fecha de fin de inscripciones de asesorias"
              name="fecha_fin_insc_asesorias"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFechaFinInscAsesorias(e.target.value)}
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Cursos Maximos por Alumno"
              name="cursos_max_por_alumno"
              onChange={(e) => setCursosMaxPorAlumno(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Idiomas Max"
              name="idiomas_max_por_alumno"
              onChange={(e) => setIdiomasMaxPorAlumno(e.target.value)}
              autoFocus
            />
            <br />
            <Button color="primary" variant="contained" onClick={postCrea}>
              Insertar
            </Button>
            <Button
              variant="contained"
              onClick={() => abrirCerrarModalInsertar()}
              color="error"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      </Modal>

      <div className="card-grid">
        {Array.isArray(data) ? data.map((item) => (

          <Card key={item._id} sx={{ minWidth: 275, bgcolor: 'grey.200' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.clave}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.status}
              </Typography>
              <h5 className="leyendaFaltas">Fecha de inicio: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_inicio)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_inicio)}
              </Typography>
              <h5 className="leyendaFaltas">Fecha de cierre: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_fin)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_fin)}
              </Typography>

              <h5 className="leyendaFaltas">
                Fecha de inicio de inscripciones de talleres:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_inicio_insc_talleres)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_inicio_insc_talleres)}
              </Typography>
              <h5 className="leyendaFaltas">
                Fecha de cierre de inscripciones de talleres:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_fin_insc_talleres)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_fin_insc_talleres)}
              </Typography>

              <h5 className="leyendaFaltas">
                Fecha de inicio de inscripciones de idiomas:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_inicio_insc_idiomas)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_inicio_insc_idiomas)}
              </Typography>
              <h5 className="leyendaFaltas">
                Fecha de cierre de inscripciones de idiomas:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_fin_insc_idiomas)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_fin_insc_idiomas)}
              </Typography>

              <h5 className="leyendaFaltas">
                Fecha de inicio de inscripciones de asesorias:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_inicio_insc_asesorias)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_inicio_insc_asesorias)}
              </Typography>
              <h5 className="leyendaFaltas">
                Fecha de cierre de inscripciones de asesorias:
                {' '}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha:
                {' '}
                {traducirDate(item.fecha_fin_insc_asesorias)}
                <br />
                Hora:
                {' '}
                {traducirTime(item.fecha_fin_insc_asesorias)}
              </Typography>

              <h5 className="leyendaFaltas">Cursos Maximos por Alumno:</h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.cursos_max_por_alumno}
              </Typography>
              <h5 className="leyendaFaltas">Idiomas Maximos por Alumno: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.idiomas_max_por_alumno}
              </Typography>

              <h5 className="leyendaFaltas">Profesores inscritos: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">

                {encontrarProfes(item.clave)}
              </Typography>

              <h5 className="leyendaFaltas">Alumnos inscritos: </h5>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {encontrarAlumnos(item.clave)}

              </Typography>

              <h5 className="leyendaFaltas">Clases inscritas: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">

                {encontrarClases(item.clave)}
              </Typography>

            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => seleccionarConsola(item, 'Editar')}
              >
                Editar
              </Button>

              <div className="spacer-botones" />

              <Button
                variant="contained"
                color="error"
                onClick={() => seleccionarConsola(item, 'Eliminar')}
              >
                Borrar Periodo
              </Button>

              <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <Typography variant="h5" component="div">
                    Estas seguro de borrar este periodo?
                  </Typography>
                  <div className="spacer" />
                  <div className="spacer-botones" />
                  <Button
                    color="error"
                    variant="contained"
                    onClick={postDelete}
                  >
                    Borrar
                  </Button>
                  <Button
                    onClick={() => abrirCerrarModalEliminar()}
                    color="primary"
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                </Card>
              </Modal>

              <Modal
                open={modalEditar}
                onClose={() => abrirCerrarModalEditar()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '680px',
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}
                >
                  <Typography variant="h5" component="div">
                    Ingrese los nuevos datos
                  </Typography>
                  <div className="spacer" />

                  <div>
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Clave"
                      defaultValue={consolaSeleccionada && consolaSeleccionada.clave}
                      name="clave"
                      onChange={handleChange}
                      autoFocus
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Status"
                      defaultValue={consolaSeleccionada && consolaSeleccionada.status}
                      name="status"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de inicio"
                      name="fecha_inicio"
                      onChange={handleChange}
                      defaultValue={consolaSeleccionada && consolaSeleccionada.fecha_inicio}
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="fecha de Fin"
                      defaultValue={consolaSeleccionada && consolaSeleccionada.fecha_fin}
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de inicio de incripciones de talleres"
                      defaultValue={consolaSeleccionada
                        && consolaSeleccionada.fecha_inicio_insc_talleres}
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_inicio_insc_talleres"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de fin de inscripciones de talleres"
                      defaultValue={consolaSeleccionada
                        && consolaSeleccionada.fecha_fin_insc_talleres}
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin_insc_talleres"
                      onChange={handleChange}
                    />

                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de inicio de incripciones de idiomas"
                      defaultValue={consolaSeleccionada
                        && consolaSeleccionada.fecha_inicio_insc_idiomas}
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_inicio_insc_idiomas"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de fin de inscripciones de idiomas"
                      defaultValue={
                        consolaSeleccionada
                          && consolaSeleccionada.fecha_fin_insc_idiomas
                                            }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin_insc_idiomas"
                      onChange={handleChange}
                    />

                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de inicio de incripciones de asesorias"
                      defaultValue={
                        consolaSeleccionada
                          && consolaSeleccionada.fecha_inicio_insc_asesorias
                                            }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_inicio_insc_asesorias"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                      label="Fecha de fin de inscripciones de asesorias"
                      defaultValue={
                        consolaSeleccionada
                          && consolaSeleccionada.fecha_fin_insc_asesorias
                                            }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin_insc_asesorias"
                      onChange={handleChange}
                    />

                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial' }}
                      label="Cursos Maximos por Alumno"
                      defaultValue={
                        consolaSeleccionada
                          && consolaSeleccionada.cursos_max_por_alumno
                                            }
                      name="cursos_max_por_alumno"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: '15px', fontFamily: 'arial' }}
                      label="Idiomas Max"
                      defaultValue={
                        consolaSeleccionada
                        && consolaSeleccionada.idiomas_max_por_alumno
                                            }
                      name="idiomas_max_por_alumno"
                      onChange={handleChange}
                    />
                    <br />

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={postEditar}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => abrirCerrarModalEditar()}
                      color="error"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Card>
              </Modal>
            </CardActions>
          </Card>
        )) : null}
        <div className="spacer" />
      </div>
    </div>
  );
}
