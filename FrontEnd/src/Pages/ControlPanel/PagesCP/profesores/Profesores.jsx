import React, { useState, useEffect } from 'react';
import {
  createProfesor, deleteProfesor, getProfesors, updateProfesor,
} from '../../../../api/profesors';
import { getClasses } from '../../../../api/classes';
import { getPeriodos } from '../../../../api/Periodos';
import HeaderProfesores from '../../../../Components/ControlPanel/Profesores/HeaderProfesores';
import ModalProfesor from '../../../../Components/ControlPanel/Profesores/ModalProfesor';
import { profesorVacio } from '../../../../utils/constants';
import BodyProfesores from '../../../../Components/ControlPanel/Profesores/BodyProfesores';

function Profesores() {
  const [profesorData, setProfesorData] = useState([]);
  const [originalProfesorData, setOriginalProfesorData] = useState([]);
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [dataClase, setDataClase] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(profesorVacio);
  const [openModal, setOpenModal] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const getProfesores = async () => {
    await getProfesors().then((response) => response.json()).then((result) => {
      setProfesorData(result);
    });
  };

  const getProfesores2 = async () => {
    await getProfesors().then((response) => response.json()).then((result) => {
      setOriginalProfesorData(result);
    });
  };

  const getClases = async () => {
    await getClasses().then((response) => response.json()).then((result) => {
      setDataClase(result);
    });
  };

  const getAllPeriodos = async () => {
    await getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  useEffect(() => {
    getProfesores();
    getProfesores2();
    getAllPeriodos();
    getClases();
  }, []);

  const abrirCerrarModal = () => {
    if (openModal) {
      setProfesorSeleccionado(profesorVacio);
    }
    setOpenModal(!openModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const seleccionarProfesor = (profesor, caso) => {
    setProfesorSeleccionado(profesor);
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deleteProfesor({
          _id: profesorSeleccionado._id,
        });
      } else if (currentOperation === 'Crear') {
        await createProfesor({
          nombre: profesorSeleccionado.nombre,
          apellidos: profesorSeleccionado.apellidos,
          matricula: profesorSeleccionado.matricula,
          correo: profesorSeleccionado.correo,
          fecha_de_nacimiento: profesorSeleccionado.fecha_de_nacimiento,
          num_telefono: profesorSeleccionado.num_telefono,
          num_cursos_impartidos: profesorSeleccionado.num_cursos_impartidos,
          idUser: profesorSeleccionado.idUser,
        });
      } else {
        await updateProfesor({
          _id: profesorSeleccionado._id,
          nombre: profesorSeleccionado.nombre,
          apellidos: profesorSeleccionado.apellidos,
          matricula: profesorSeleccionado.matricula,
          correo: profesorSeleccionado.correo,
          fecha_de_nacimiento: profesorSeleccionado.fecha_de_nacimiento,
          num_telefono: profesorSeleccionado.num_telefono,
          num_cursos_impartidos: profesorSeleccionado.num_cursos_impartidos,
          idUser: profesorSeleccionado.idUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
    abrirCerrarModal();
    getProfesores();
  };

  let array = [];
  let array2 = [];
  let array3 = [];

  const handleSelectChange = (event) => {
    array = [];
    array2 = [];
    array3 = [];
    array2.push(dataClase.filter((data) => data.clavePeriodo === event.label));
    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[i].length; j++) {
        array.push(originalProfesorData.filter(
          (data) => data.matricula === array2[i][j].matriculaProfesor,
        ));
      }
    }
    for (let i = 0; i < array.length; i++) {
      array3.push(array[i][0]);
    }
    if (array3.length > 0) {
      setProfesorData(array3);
    } else {
      getProfesores();
    }
  };

  return (
    <div>
      <HeaderProfesores
        data={profesorData}
        setOpenModal={() => { seleccionarProfesor(profesorVacio, 'Crear'); }}
        dataPeriodo={dataPeriodo}
        handleSelectChange={handleSelectChange}
      />
      <BodyProfesores
        data={profesorData}
        seleccionarConsola={seleccionarProfesor}
      />
      <ModalProfesor
        handleChange={handleChange}
        consolaSeleccionada={profesorSeleccionado}
        onSubmit={modalSubmit}
        openModal={openModal}
        abrirCerrarModal={abrirCerrarModal}
        operation={currentOperation}
      />
    </div>
  );
}

export default Profesores;
