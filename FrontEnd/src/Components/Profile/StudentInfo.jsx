import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function StudentInfo({ studentData, handleChange, underage }) {
  return (
    <>
      <Box sx={{ fontFamily: 'default', width: '100%', mt: 2 }}>
        <Typography sx={{ display: underage ? '' : 'none', typography: 'subtitle2', fontWeight: 'light' }}>
          Datos Tutor
        </Typography>
        <Typography sx={{ display: !underage ? '' : 'none', typography: 'subtitle2', fontWeight: 'light' }}>
          Contacto Emergencia
        </Typography>
      </Box>
      <TextField
        name="tutor_nombre"
        label="Nombre(s)"
        value={studentData.tutor_nombre || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="tutor_apellido_paterno"
        label="Primer Apellido"
        value={studentData.tutor_apellido_paterno || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="tutor_apellido_materno"
        label="Segundo Apellido"
        value={studentData.tutor_apellido_materno || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="tutor_correo"
        label="Correo"
        type="email"
        value={studentData.tutor_correo || ''}
        onChange={handleChange}
        helperText=" "
        required
      />
      <TextField
        name="tutor_num_telefono"
        label="Núm. Telefonico"
        value={studentData.tutor_num_telefono || ''}
        onChange={handleChange}
        helperText="LADA + 10 Digitos"
        required
      />
    </>
  );
}

export default StudentInfo;
