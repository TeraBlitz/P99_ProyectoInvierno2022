import React, { useState } from 'react';
import {
  classTemplate,
} from '../../utils/constants';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';
import BodyInscripcionClase from '../../Components/Clase/BodyInscripcionClase';
import ModalInscripcionClase from '../../Components/Clase/ModalInscripcionClase';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';

function InscripcionClase({
  data, abrirCerrarModal, resetClases, dataPeriodo, handleSelectChange, 
  profesorList, seleccionarClase, clase, currentProfesor,
  handleChange, handleChangeProfesor, currentOperation, openModal
}) {
  const [currentClase, setCurrentClase] = useState(null);
  const [currentWaitList, setCurrentWaitList] = useState(null);

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

export default InscripcionClase;