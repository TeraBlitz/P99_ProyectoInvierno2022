import React from 'react';
import { Box } from '@mui/material';

const styles = {
  container: {
    position: 'absolute',
    width: 550,
    height: 660,
    backgroundColor: '#fefefd',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '4px solid rgb(165, 165, 180)',
    margin: 'auto',
    borderRadius: '10px',
    padding: '20px',
  },
  title: {
    paddingBottom: '15px',
    marginTop: '5px',
    fontFamily: 'arial',
    width: 500,
  },
  label: {
    align: 'justify',
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    align: 'justify',
    fontFamily: 'arial',
    fontSize: 20,
  },
  box: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 10px)',
    gap: 1,
  },
  box_tutor: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 20px)',
    gap: 1,
  },
};

function MasInformacionAlumno({ consolaSeleccionada }) {
  const labels = [
    { label: 'Nombre:', value: consolaSeleccionada.nombre, style: styles.box },
    { label: 'Apellido paterno:', value: consolaSeleccionada.apellido_paterno, style: styles.box },
    { label: 'Apellido materno:', value: consolaSeleccionada.apellido_materno, style: styles.box },
    { label: 'Fecha de Nacimiento:', value: consolaSeleccionada.fecha_de_nacimiento, style: styles.box },
    { label: 'Telefono Estudiante:', value: consolaSeleccionada.num_telefono, style: styles.box },
    { label: 'Nombre del Tutor:', value: consolaSeleccionada.tutor_nombre, style: styles.box },
    { label: 'Apellido paterno del Tutor:', value: consolaSeleccionada.tutor_apellido_paterno, style: styles.box_tutor },
    { label: 'Apellido materno del Tutor:', value: consolaSeleccionada.tutor_apellido_materno, style: styles.box_tutor },
    { label: 'Correo del Tutor:', value: consolaSeleccionada.tutor_correo, style: styles.box },
    { label: 'Telefono del Tutor:', value: consolaSeleccionada.tutor_num_telefono, style: styles.box },
    { label: 'Pais:', value: consolaSeleccionada.pais, style: styles.box },
    { label: 'Estado:', value: consolaSeleccionada.estado, style: styles.box },
    { label: 'Ciudad:', value: consolaSeleccionada.ciudad, style: styles.box },
    { label: 'Colonia:', value: consolaSeleccionada.colonia, style: styles.box },
    { label: 'Codigo Postal:', value: consolaSeleccionada.codigo_postal, style: styles.box },
    { label: 'Escolaridad:', value: consolaSeleccionada.escolaridad, style: styles.box },
    { label: 'Ultima escuela:', value: consolaSeleccionada.ultima_escuela, style: styles.box },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title} align="center">
        Informacion completa de Alumno
      </h1>
      {labels.map(({ label, value, style }) => (
        <Box sx={style}>
          <p style={styles.label}>{label}</p>
          <p style={styles.value}>{value}</p>
        </Box>
      ))}
    </div>
  );
}

export default MasInformacionAlumno;
