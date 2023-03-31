import React, { useState, useEffect } from 'react';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import { getClasses } from '../../api/classes.js';
import {
  classTemplate, claseActualDefault, profesorVacioInscripcion,
} from '../../utils/constants';
import { mapClaseToData } from '../../utils/utilFunctions';
import InscripcionClase from '../../Components/Clase/InscripcionClase';

export default function ShowClass() {
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [data, setData] = useState([]);
  const [profesorList, setProfesorList] = useState([profesorVacioInscripcion]);
  const [currentProfesor, setCurrentProfesor] = useState(profesorVacioInscripcion);
  const [claseActual, setClaseActual] = useState(claseActualDefault);
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
  
  return (
    <InscripcionClase 
      data={data}
      abrirCerrarModal={abrirCerrarModal}
      resetClases={resetClases}
      dataPeriodo={dataPeriodo}
      handleSelectChange={handleSelectChange}
      profesorList={profesorList}
      seleccionarClase={seleccionarClase}
      clase={clase}
      currentProfesor={currentProfesor}
      handleChange={handleChange}
      handleChangeProfesor={handleChangeProfesor}
      currentOperation={currentOperation}
      openModal={openModal}
    />
  );
}
