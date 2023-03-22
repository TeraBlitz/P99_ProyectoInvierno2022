import React, { useState, useEffect } from 'react';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import {
  createClass, deleteClasses, getClasses, updateClass,
} from '../../api/classes.js';
import {
  classTemplate, nivelesMapa, claseActualDefault, profesorVacioInscripcion,
} from '../../utils/constants';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';
import { mapNiveles } from '../../utils/utilFunctions';
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

      const dataList = result.map((clase) => {
        let fechas = '';
        let edades = '';
        let niveles = '';

        if (clase.lunes !== '') fechas += 'lunes, ';
        if (clase.martes !== '') fechas += 'martes, ';
        if (clase.miercoles !== '') fechas += 'miercoles, ';
        if (clase.jueves !== '') fechas += 'jueves, ';
        if (clase.viernes !== '') fechas += 'viernes, ';
        if (clase.sabado !== '') fechas += 'sabado, ';

        edades = clase.edad_maxima === ''
          ? `${clase.edad_minima} en Adelante`
          : `${clase.edad_minima}-${clase.edad_maxima}`;

        niveles = nivelesMapa[clase.nivel] || '';

        return {
          _id: clase._id,
          clave: clase.clave,
          nombre_curso: clase.nombre_curso,
          nivel: clase.nivel,
          matriculaProfesor: clase.matriculaProfesor,
          edades,
          edad_minima: clase.edad_minima,
          edad_maxima: clase.edad_maxima,
          cupo_maximo: clase.cupo_maximo,
          modalidad: clase.modalidad,
          fechas,
          lunes: clase.lunes,
          martes: clase.martes,
          miercoles: clase.miercoles,
          jueves: clase.jueves,
          viernes: clase.viernes,
          sabado: clase.sabado,
          clavePeriodo: clase.clavePeriodo,
          area: clase.area,
          cupo_actual: clase.cupo_actual,
          niveles,
          nombreProfesor: clase.nombreProfesor,
          apellidosProfesor: clase.apellidosProfesor,
          nombreCompleto: `${clase.nombreProfesor} ${clase.apellidosProfesor}`,
        };
      });

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

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deleteClasses({
          _id: clase._id,
        });
      } else if (currentOperation === 'Crear') {
        const claseACrear = mapNiveles(classTemplate);
        await createClass(claseACrear);
      } else if (currentOperation === 'Editar') {
        const claseAModificar = mapNiveles(clase);
        await updateClass(claseAModificar);
      }
    } catch (error) {
      console.log(error);
    }
    abrirCerrarModal();
    resetClases();
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
    console.log(caso);
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
        clase={clase}
        currentProfesor={currentProfesor}
        handleChange={handleChange}
        profesorList={profesorList}
        modalSubmit={modalSubmit}
        currentOperation={currentOperation}
        openModal={openModal}
        abrirCerrarModal={abrirCerrarModal}
        currentClase={currentClase}
        currentWaitList={currentWaitList}
        handleChangeProfesor={handleChangeProfesor}
      />
    </div>
  );
}
