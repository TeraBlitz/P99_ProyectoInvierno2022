import React, { useState, useEffect } from 'react';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import { getClasses } from '../../api/classes.js';
import {
  classTemplate, claseActualDefault, profesorVacioInscripcion,
} from '../../utils/constants';
import { mapClaseToData } from '../../utils/utilFunctions';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';
import BodyInscripcionClase from '../../Components/Clase/BodyInscripcionClase';
import ModalInscripcionClase from '../../Components/Clase/ModalInscripcionClase';

export default function ShowClass() {
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [data, setData] = useState([]);
  const [profesorList, setProfesorList] = useState([profesorVacioInscripcion]);
  const [currentProfesor, setCurrentProfesor] = useState(profesorVacioInscripcion);
  const [claseActual, setClaseActual] = useState(claseActualDefault);
  const [currentClase, setCurrentClase] = useState(null);
  const [currentWaitList, setCurrentWaitList] = useState(null);
  const [clase, setClase] = useState(claseActual);
  const [openModal, setOpenModal] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const handleSelectChange = (event) => {
    const filteredData = [data.filter((data) => data.clavePeriodo === event.label)].flat();
    filteredData.length > 0 ? setData(filteredData) : resetClases();
  };

  const getOptions = async () => {
    await getProfesors().then((response) => response.json()).then((result) => {
      const newProfList = [];
      result.forEach((profesor) => {
        profesor.nombreCompleto = `${profesor.nombre} ${profesor.apellidos}`;
        newProfList.push(profesor);
      });
      setProfesorList(newProfList);
    });
  };
  
  const resetClases = async () => {
    try {
      const response = await getClasses();
      const result = await response.json();
      const dataList = result.map(mapClaseToData);
  
      setData(dataList);
      getOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeProfesor = (p) => {
    profesorList.forEach((e) => {
      if (e.nombreCompleto === p.target.value) {
        setCurrentProfesor(e);
      }
    });
  };

  useEffect(() => {
    setClase(claseActual);
    getAllPeriodos();
  }, [claseActual]);

  useEffect(() => {
    resetClases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  const seleccionarClase = (consola, caso) => {
    if (caso === 'Crear') {
      setCurrentProfesor(profesorVacioInscripcion);
    } else if (caso === 'Editar') {
      setClaseActual(consola);
      profesorList.forEach((e) => {
        if (e.nombreCompleto === consola.nombreCompleto) {
          setCurrentProfesor(e);
        }
      });
    } else if (caso === 'Eliminar') {
      setClaseActual(consola);
    }
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const abrirCerrarModal = () => {
    if (openModal) {
      setClaseActual(classTemplate);
    }
    setOpenModal(!openModal);
  };

  const getClassWaitList = async (clase) => {
    try {
      const studentsList = await getStudents();
      const students = await studentsList.json();
      const studentsById = students.reduce((obj, student) => {
        obj[student._id] = student;
        return obj;
      }, {});
  
      const responseWaitList = await getWaitList();
      const waitList = await responseWaitList.json();
      const result = [];
  
      waitList.forEach((inWaitList) => {
        if (inWaitList.idClase === clase._id && studentsById[inWaitList.idAlumno]) {
          const student = studentsById[inWaitList.idAlumno];
          result.push({
            _id: inWaitList._id,
            studentName: `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`,
            time_stamp: inWaitList.time_stamp,
          });
        }
      });
  
      result.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
      setCurrentWaitList(result);
      setCurrentClase(clase);
      seleccionarClase(clase, 'AbrirWaitList');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <HeaderInscripcionClase
        data={data}
        setOpenModal={() => { seleccionarClase(classTemplate, 'Crear'); }}
        resetClases={resetClases}
        dataPeriodo={dataPeriodo}
        handleSelectChange={handleSelectChange}
      />
      <BodyInscripcionClase
        data={data}
        profesorList={profesorList}
        getClassWaitList={getClassWaitList}
        seleccionarClase={seleccionarClase}
      />
      <ModalInscripcionClase
        resetClases={resetClases}
        clase={clase}
        currentProfesor={currentProfesor}
        handleChange={handleChange}
        profesorList={profesorList}
        setOpenModal={abrirCerrarModal}
        currentOperation={currentOperation}
        openModal={openModal}
        currentClase={currentClase}
        currentWaitList={currentWaitList}
        handleChangeProfesor={handleChangeProfesor}
      />
    </div>
  );
}
