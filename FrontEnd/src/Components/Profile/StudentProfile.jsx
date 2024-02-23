import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { createStudent, updateStudent, getStudents } from '../../api/students';
import ParentInfo from './ParentInfo';
import { estadosMexico, nivelEscolaridad } from '../../utils/constants';
import { calculateAge } from '../../utils/utilFunctions';
import StudentInfo from './StudentInfo';

function StudentProfile({
  studentInfo, openStudentProfile, setOpenStudentProfile, userID,
  isEditing, setIsEditing, setStudents,
  setSuccessOpen, setErrorOpen, setAlertMessage, setInfoOpen,
}) {
  const isNewStudent = userID !== undefined;
  const [studentData, setStudentInfo] = useState(studentInfo);
  const [newStudentInfo, setNewStudentInfo] = useState(studentInfo);
  const [userOriginState, setUserOriginState] = 
    useState(isNewStudent ? estadosMexico[0] : studentInfo.estado);
  const [userEducation, setUserEducation] = useState(
    isNewStudent
      ? nivelEscolaridad[0]
      : nivelEscolaridad[nivelEscolaridad.indexOf(studentInfo.escolaridad)],
  );

  const handleChange = (e) => setStudentInfo(
    (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
  );

  const handleSubmit = (e) => {
    // Enviar esta informacion a bd
    e.preventDefault();
    studentData.escolaridad = userEducation;
    studentData.estado = userOriginState;
    if (studentData.curp === null) delete studentData.curp;
    if (isNewStudent) studentData.idUser = userID;

    setNewStudentInfo(studentData);

    if (studentData.num_telefono.length < 10 || studentData.tutor_num_telefono.length < 10) {
      setAlertMessage('Los numeros telefonicos deben tener al menos 10 digitos');
      setInfoOpen(true);
      return;
    }

    if (studentData.codigo_postal.length < 5) {
      setAlertMessage('El codigo postal contiene 5 digitos');
      setInfoOpen(true);
      return;
    }

    if (isNewStudent) {
      createStudent(studentData).then((data) => {
        if (data.status === 400) {
          return data.text();
        }
        setAlertMessage('Estudiante agregado correctamente.');
        setSuccessOpen(true);
        getStudents().then((response) => response.json()).then((data) => {
          const students = data.filter((student) => student.idUser === userID);
          setStudents(students);
        });
        setOpenStudentProfile(!openStudentProfile);
      })
      .then((r) => {
        const errorMessage = r.replace('ERROR: ', '').replaceAll('data/', '').split('\n');
        setAlertMessage(`Se produjo un error al agregar al estudiante. ${errorMessage}`);
        setErrorOpen(true);
      })
    } else {
      updateStudent(studentData).then((data) => {
        if (data.status === 400) {
          return data.text();
        }

        setAlertMessage('Información del estudiante actualizada correctamente.');
        setSuccessOpen(true);
        getStudents().then((response) => response.json()).then((data) => {
          const students = data.filter((student) => student.idUser === studentInfo.idUser);
          setStudents(students);
        });
        setIsEditing(!isEditing);
        setOpenStudentProfile(!openStudentProfile);
      })
      .then((r) => {
        const errorMessage = r.replace('ERROR: ', '').replaceAll('data/', '').split('\n');
        setAlertMessage(`Se produjo un error al actualizar al estudiante ${errorMessage}`);
        setErrorOpen(true);
      });
    }
  };

  const handleCancel = () => {
    setStudentInfo(newStudentInfo);
    setIsEditing(!isEditing);
    setOpenStudentProfile(!openStudentProfile);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderRadius: 3,
        m: 2,
        p: 2,
        position: 'relative',
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box sx={{ position: 'absolute', right: '0.5ch', top: '0.5ch' }}>
        {
        !isNewStudent
        && (
        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          onClick={() => { setIsEditing(!isEditing); }}
          size="small"
        >
          EDITAR
        </Button>
        )
      }
        <button 
          style={{ padding: 16, backgroundColor: 'transparent', border: 0, outline: 0, cursor: 'pointer' }}
          onClick={() => { setOpenStudentProfile(!openStudentProfile) }}
        >
          <CloseIcon/>
        </button>
      </Box>
      <StudentInfo
        isNewStudent={isNewStudent}
        isEditing={isEditing}
        studentData={studentData}
        handleChange={handleChange}
        userEducation={userEducation}
        setUserEducation={setUserEducation}
        userOriginState={userOriginState}
        setUserOriginState={setUserOriginState}
      />
      <ParentInfo
        studentData={studentData}
        handleChange={handleChange}
        underage={calculateAge(studentData.fecha_de_nacimiento) < 18}
        isEditing={isEditing}
      />
      <Box sx={{ width: '100%' }} />
      <Box sx={{
        display: 'flex', m: 1, p: 1, justifyContent: 'flex-end', width: '100%',
      }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ display: !isEditing ? 'none' : '', mx: 2 }}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button variant="contained" type="submit" sx={{ display: !isEditing ? 'none' : '' }} size="medium">
          Guardar
        </Button>
      </Box>
    </Box>
  );
}

export default StudentProfile;
