import React, { useState, useEffect, useMemo } from 'react';
import {
  Button, Modal, TextField, Box, Typography,
} from '@mui/material';
import { deleteStudent, getStudents, updateStudent } from '../../../../api/students';
import { getPeriodos } from '../../../../api/Periodos';
import { getClassStudent } from '../../../../api/classStudent';
import { alumnoVacio } from '../../../../utils/constants';
import MasInformacionAlumno from '../../../../Components/ControlPanel/Alumnos/MasInformacionAlumno';
import HeaderAlumnos from '../../../../Components/ControlPanel/Alumnos/HeaderAlumnos';
import BodyAlumnos from '../../../../Components/ControlPanel/Alumnos/BodyAlumnos';

export default function Alumnos() {
  const [studentData, setStudentData] = useState([]);
  const [originalStudentData, setOriginalStudentData] = useState([]);
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnoVacio);
  const [openModal, setOpenModal] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const getAlumnos = async () => {
    await getStudents().then((response) => response.json()).then((result) => {
      setStudentData(result);
      setOriginalStudentData(result);
    });
  };

  const getAllPeriodos = async () => {
    await getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const getAlumnoClase = async () => {
    await getClassStudent().then((response) => response.json()).then((result) => {
      setDataAlumnoClase(result);
    });
  };

  useEffect(() => {
    getAlumnos();
    getAllPeriodos();
    getAlumnoClase();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumnoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const abrirCerrarModal = () => {
    if (openModal) {
      setAlumnoSeleccionado(alumnoVacio);
    }
    setOpenModal(!openModal);
  };

  const seleccionarAlumno = (consola, caso) => {
    setAlumnoSeleccionado(consola);
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deleteStudent({
          _id: alumnoSeleccionado._id,
        });
      } else {
        await updateStudent({
          _id: alumnoSeleccionado._id,
          clave_unica_identificacion: alumnoSeleccionado.clave_unica_identificacion,
          curp: alumnoSeleccionado.curp,
          nombre: alumnoSeleccionado.nombre,
          apellido_paterno: alumnoSeleccionado.apellido_paterno,
          apellido_materno: alumnoSeleccionado.apellido_materno,
          fecha_de_nacimiento: alumnoSeleccionado.fecha_de_nacimiento,
          tutor_nombre: alumnoSeleccionado.tutor_nombre,
          tutor_apellido_paterno: alumnoSeleccionado.tutor_apellido_paterno,
          tutor_apellido_materno: alumnoSeleccionado.tutor_apellido_materno,
          tutor_correo: alumnoSeleccionado.tutor_correo,
          tutor_num_telefono: alumnoSeleccionado.tutor_num_telefono,
          num_telefono: alumnoSeleccionado.num_telefono,
          pais: alumnoSeleccionado.pais,
          estado: alumnoSeleccionado.estado,
          ciudad: alumnoSeleccionado.ciudad,
          colonia: alumnoSeleccionado.colonia,
          codigo_postal: alumnoSeleccionado.codigo_postal,
          escolaridad: alumnoSeleccionado.escolaridad,
          ultima_escuela: alumnoSeleccionado.ultima_escuela,
        });
      }
    } catch (error) {
      console.log(error);
    }
    abrirCerrarModal();
    getAlumnos();
  };

  const bodyEditar = (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: 620,
        backgroundColor: '#fefefd',
        top: '48%',
        left: '50%',
        transform: 'translate(-48%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h3
        style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
        align="center"
      >
        Actualizar Alumnos
      </h3>
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Nombre"
        onChange={handleChange}
        name="nombre"
        value={alumnoSeleccionado?.nombre}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Apellido paterno"
        onChange={handleChange}
        name="apellido_paterno"
        value={alumnoSeleccionado?.apellido_paterno}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Apellido materno"
        onChange={handleChange}
        name="apellido_materno"
        value={alumnoSeleccionado?.apellido_materno}
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Estado"
        onChange={handleChange}
        name="estado"
        value={alumnoSeleccionado?.estado}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Ciudad"
        onChange={handleChange}
        name="ciudad"
        value={alumnoSeleccionado?.ciudad}
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Escolaridad"
        onChange={handleChange}
        name="escolaridad"
        value={alumnoSeleccionado?.escolaridad}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Ultima escuela"
        onChange={handleChange}
        name="ultima_escuela"
        value={alumnoSeleccionado?.ultima_escuela}
      />
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={modalSubmit}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModal} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: 280,
        backgroundColor: '#fefefd',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h3
        style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
        align="center"
      >
        Eliminar alumno
      </h3>
      <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
        {`El alumno llamado ${alumnoSeleccionado?.nombre} y
        todo lo relacionado a el se va a eliminar por completo. No vas a poder
        acceder a estos datos de nuevo.`}
      </Typography>
      <br />
      <br />
      <div align="center">
        <Button color="error" onClick={modalSubmit}>
          Confirmar
        </Button>
        <Button onClick={abrirCerrarModal} color="primary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const handleSelectChange = async (event) => {
    let array = [];
    let array2 = [];
    let array3 = [];

    const arrayrepeated = [];
    array2.push(dataAlumnoClase.filter((data) => data.idPeriodo === event.value));
    array2 = array2.filter((data) => data !== undefined);
    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[i].length; j++) {
        array.push(originalStudentData.filter((data) => data._id === array2[i][j].idAlumno && !arrayrepeated.includes(array2[i][j].idAlumno)));
        arrayrepeated.push(array2[i][j].idAlumno);
      }
    }
    array = array.filter((data) => data !== []);
    for (let i = 0; i < array.length; i++) {
      array3.push(array[i][0]);
    }
    array3 = array3.filter((data) => data !== undefined);
    if (array3.length > 0) {
      setStudentData(array3);
    } else {
      getAlumnos();
    }
  };

  return (
    <div>
      <HeaderAlumnos
        data={studentData}
        dataPeriodo={dataPeriodo}
        handleSelectChange={handleSelectChange}
      />
      <BodyAlumnos
        data={studentData}
        seleccionarConsola={seleccionarAlumno}
      />
      <Modal open={openModal} onClose={abrirCerrarModal}>
        <MasInformacionAlumno consolaSeleccionada={alumnoSeleccionado} />
      </Modal>
      <Modal open={openModal} onClose={abrirCerrarModal}>
        {bodyEditar}
      </Modal>
      <Modal open={openModal} onClose={abrirCerrarModal}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}
