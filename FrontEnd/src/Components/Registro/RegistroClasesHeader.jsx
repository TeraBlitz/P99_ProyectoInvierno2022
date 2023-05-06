import Box from '@mui/material/Box';
import React from 'react';
import {
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  calculateAge,
} from '../../utils/utilFunctions';
import { getWaitList } from '../../api/waitList';
import {
  getClassStudent,
} from '../../api/classStudent';

function RegistroClasesHeader({
  classNames, clases, currentStudent, students, setFilteredClasses, setCurrentStudent,
}) {
  const filterClasses = async (student) => {
    const age = calculateAge(student.fecha_de_nacimiento);
    let waitList = [];
    let myClasses = [];

    const filter = clases.filter(
      (clase) => Number(clase.edad_minima) < age
        && age < (clase.edad_maxima ? Number(clase.edad_maxima) : 99),
    ).map((aClass) => ({ ...aClass, status: '' }));

    const waitListResponse = await getWaitList();
    waitList = waitListResponse.json().filter((lista) => lista.idAlumno === student._id);

    waitList.forEach((inWaitList) => {
      const classIndex = filter.findIndex((aClass) => aClass._id === inWaitList.idClase);
      if (classIndex !== -1) {
        filter[classIndex].status = 'ListaEspera';
      }
    });

    const myClassesResponse = await getClassStudent();
    myClasses = myClassesResponse.json().filter((clase) => clase.idAlumno === student._id);

    myClasses.forEach((myClass) => {
      const classIndex = filter.findIndex((aClass) => aClass._id === myClass.idClase);
      if (classIndex !== -1) {
        filter[classIndex].status = 'Inscrito';
      }
    });

    setFilteredClasses(filter);
  };

  const handleNameFilter = (value) => {
    const filteredClasses = clases.filter(
      (clase) => clase.nombre_curso.toLowerCase().includes(value.trim().toLowerCase()),
    );
    setFilteredClasses(filteredClasses);
  };

  const handleChange = (e) => {
    if (e.target.value === '') {
      setFilteredClasses(clases);
      setCurrentStudent(null);
      return;
    }
    setCurrentStudent(e.target.value);
    filterClasses(e.target.value);
  };

  return (
    <>
      <Typography variant="h3" sx={{ m: 2, color: '#004a98' }}>
        Registro clases (Inscripción)
      </Typography>
      <Box sx={{ m: 2, position: 'sticky', top: '10px' }}>
        <FormControl fullWidth>
          <InputLabel>Estudiantes</InputLabel>
          <Select
            value={currentStudent || ''}
            label="Estudiantes"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Estudiante</em>
            </MenuItem>
            {students.map((student) => (
              <MenuItem key={student._id} value={student}>
                {`${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          options={classNames}
          onChange={(_e, newvalue) => handleNameFilter(newvalue)}
          onInputChange={(_e, newvalue) => handleNameFilter(newvalue)}
          sx={{ display: { xs: 'flex', md: 'none' }, mt: 1 }}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Curso"
              helperText="Busca tu curso"
            />
          )}
        />
      </Box>
    </>
  );
}

export default RegistroClasesHeader;
