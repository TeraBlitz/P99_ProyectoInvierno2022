import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Autocomplete from '@mui/material/Autocomplete';
import { estadosMexico, nivelEscolaridad } from '../../utils/constants';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

function StudentInfo({
  userOriginState, setUserOriginState, userEducation, setUserEducation,
  studentData, isNewStudent, isEditing, handleChange,
}) {
  const [userEducationInput, setUserEducationInput] = useState(
    isNewStudent
      ? '' : nivelEscolaridad[nivelEscolaridad.indexOf(userEducation)],
  );
  const [userOriginStateInput, setUserOriginStateInput] = useState('');

  return (
    <>
      <Box
        sx={{
          typography: 'subtitle2',
          fontWeight: 'light',
          fontFamily: 'default',
          width: '100%',
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Datos Estudiante
      </Box>
      <TextField
        name="nombre"
        label="Nombre(s)"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.nombre || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="apellido_paterno"
        label="Primer Apellido"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.apellido_paterno || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="apellido_materno"
        label="Segundo Apellido"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.apellido_materno || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="num_telefono"
        label="Núm. Telefonico"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.num_telefono || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <FormControl sx={{ m: 1, width: '35ch' }} required>
        <InputLabel>Nacionalidad</InputLabel>
        <Select
          value={studentData.pais}
          label="Nacionalidad"
          onChange={handleChange}
          name="pais"
        >
          <MenuItem value="">
            <em>N/A</em>
          </MenuItem>
          <MenuItem value="Mexico">Mexicana</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </Select>
        <FormHelperText> </FormHelperText>
      </FormControl>
      {
        studentData.pais === 'Mexico' ? (
          <TextField
            name="curp"
            label="CURP"
            value={studentData.curp ? studentData.curp : ''}
            InputProps={{ readOnly: !isEditing }}
            onChange={handleChange}
            required
            helperText={(
              <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                &#9432; Obten tu CURP
              </Link>
              )}
          />
        ) : null
      }
      <DatePicker
        value={studentData['fecha_de_nacimiento'] ? dayjs(studentData['fecha_de_nacimiento']) : null}
        name='fecha_de_nacimiento'
        label="Fecha de nacimiento"
        onChange={(value) => {
          const day = value['$D'] < 10 ? `0${value['$D']}` : value['$D'];
          const month = value['$M']+1 < 10 ? `0${value['$M']+1}` : value['$M']+1;
          const date = `${value['$y']}-${month}-${day}`;

          handleChange({
            target: {
              name: 'fecha_de_nacimiento',
              value: date,
            }
          })

        }}
      />
      <Autocomplete
        readOnly={!isEditing}
        value={userEducation || ''}
        name="escolaridad"
        onChange={(_e, newValue) => {
          setUserEducation(newValue);
        }}
        inputValue={userEducationInput}
        onInputChange={(_event, newInputValue) => {
          setUserEducationInput(newInputValue);
        }}
        options={nivelEscolaridad}
        renderInput={(params) => <TextField {...params} name="escolaridad" label="Escolaridad" helperText="Escolaridad o equivalente" required />}
      />
      <TextField
        name="ultima_escuela"
        label="Ultima Escuela"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.ultima_escuela || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <Autocomplete
        readOnly={!isEditing}
        value={userOriginState || ''}
        name="estado"
        onChange={(_e, newValue) => { setUserOriginState(newValue); }}
        inputValue={userOriginStateInput}
        onInputChange={(_event, newInputValue) => {
          setUserOriginStateInput(newInputValue);
        }}
        options={estadosMexico}
        renderInput={(params) => <TextField {...params} name="estado" label="Estado" helperText=" " required />}
      />
      <TextField
        name="ciudad"
        label="Ciudad"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.ciudad || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="codigo_postal"
        label="Codigo Postal"
        type="number"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.codigo_postal || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="colonia"
        label="Colonia"
        InputProps={{ readOnly: !isEditing }}
        value={studentData.colonia || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
    </>
  );
}

export default StudentInfo;
