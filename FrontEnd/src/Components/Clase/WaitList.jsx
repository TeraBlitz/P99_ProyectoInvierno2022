import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function WaitList({ clase, waitList }) {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '35vw',
    }}
    >
      <Box
        sx={{
          '& .MuiTypography-root': { my: 2 },
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          borderRadius: 3,
          m: 2,
          p: 2,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">
          {clase.clave}
          .
          {' '}
          {clase.nombre_curso}
        </Typography>
        {
          waitList.length === 0
            ? <Typography variant="h6">Lista de espera vacia</Typography>
            : (
              <Box>
                <Typography variant="h6">Alumnos</Typography>
                <Typography variant="body2" color="grey">Ordenados en orden de registro</Typography>
                <ol>
                  {
              waitList.map((lista) => (
                <li>
                  <Typography key={lista._id}>{lista.studentName}</Typography>
                </li>
              ))
              }
                </ol>
              </Box>
            )

        }
      </Box>
    </div>
  );
}

export default WaitList;
