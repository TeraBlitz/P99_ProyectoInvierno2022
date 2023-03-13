import React, { useState, useEffect } from 'react';
import { deleteStudent, getStudents, updateStudent } from '../../../../api/students';
import { getPeriodos } from '../../../../api/Periodos';
import { getClassStudent } from '../../../../api/classStudent';
import { alumnoVacio } from '../../../../utils/constants';
import HeaderAlumnos from '../../../../Components/ControlPanel/Alumnos/HeaderAlumnos';
import BodyAlumnos from '../../../../Components/ControlPanel/Alumnos/BodyAlumnos';
import ModalAlumno from '../../../../Components/ControlPanel/Alumnos/ModalAlumno';

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
      <ModalAlumno
        handleChange={handleChange}
        openModal={openModal}
        setOpenModal={abrirCerrarModal}
        alumnoSeleccionado={alumnoSeleccionado}
        currentOperation={currentOperation}
        onSubmit={modalSubmit}
      />
    </div>
  );
}
