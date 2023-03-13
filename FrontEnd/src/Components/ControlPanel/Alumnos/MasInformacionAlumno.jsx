import React from 'react';
import { Box } from '@mui/material';

function MasInformacionAlumno({consolaSeleccionada}) {
  return (<div
    style={{
      position: 'absolute',
      width: 550,
      height: 660,
      backgroundColor: '#fefefd',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '4px solid  rgb(165, 165, 180)',
      margin: 'auto',
      borderRadius: '10px',
      padding: '20px',
    }}
  >
    <h1
      style={{
        paddingBottom: '15px',
        marginTop: '5px',
        fontFamily: 'arial',
        width: 500,
      }}
      align="center"
    >
      Informacion completa de Alumno
    </h1>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Nombre:
        {' '}
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.nombre}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Apellido paterno:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.apellido_paterno}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Apellido materno:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.apellido_materno}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Fecha de Nacimiento:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.fecha_de_nacimiento}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Telefono Estudiante:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.num_telefono}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Nombre del Tutor:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.tutor_nombre}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 20px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Apellido paterno del Tutor:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.tutor_apellido_paterno}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 20px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Apellido materno del Tutor:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.tutor_apellido_materno}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Correo del Tutor:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.tutor_correo}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Telefono del Tutor:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.tutor_num_telefono}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Pais:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.pais}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Estado:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.estado}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Ciudad:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.ciudad}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Colonia:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.colonia}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Codigo Postal:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.codigo_postal}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Escolaridad:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.escolaridad}
      </p>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 10px)',
        gap: 1,
      }}
    >
      <p
        style={{
          align: 'justify',
          fontFamily: 'arial',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Ultima Escuela:
      </p>
      <p style={{ align: 'justify', fontFamily: 'arial', fontSize: 20 }}>
        {consolaSeleccionada.ultima_escuela}
      </p>
    </Box>
  </div>)
}

export default MasInformacionAlumno