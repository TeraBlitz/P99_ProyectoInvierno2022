import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Link,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

function LoadingRegisterData({ changeContent, students, clases }) {
  if (!students || !clases) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (students !== null && students.length === 0) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, color: '#004a98' }}>
          Registro clases (Inscripción)
        </Typography>
        <Typography variant="h3" component="div" textAlign="center">
          No tienes alumnos registrados, ve a
          <Link
            component="button"
            onClick={() => changeContent('Profile')}
            variant="h3"
            sx={{ mx: 2 }}
          >
            <i> Perfil </i>
          </Link>
          para agregar alumnos.
        </Typography>
      </Box>
    );
  }

  return null;
}

export default LoadingRegisterData;
