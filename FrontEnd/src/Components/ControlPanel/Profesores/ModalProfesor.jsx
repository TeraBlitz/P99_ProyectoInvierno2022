import React from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

function ModalProfesor({
  consolaSeleccionada, onSubmit, handleChange, openModal, abrirCerrarModal, operation,
}) {
  return (
    <Modal open={openModal} onClose={abrirCerrarModal}>
      <div
        style={{
          position: 'absolute',
          width: 260,
          height: operation === 'Eliminar' ? 280 : 620,
          backgroundColor: '#fefefd',
          top: '48%',
          left: '50%',
          transform: 'translate(-48%, -50%)',
          border: '4px solid  rgb(165, 165, 180)',
          margin: 'auto',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h3
          style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
          align="center"
        >
          {operation === 'Eliminar'
            ? 'Eliminar una clase'
            : (operation === 'Crear'
              ? 'Agregar profesor'
              : 'Actualizar profesor')}
        </h3>
        {operation === 'Eliminar' && (
        <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
          {`El profesor de ${consolaSeleccionada?.nombre} y
        todo lo relacionado a el se va a eliminar por completo. No vas a poder
        acceder a estos datos de nuevo.`}
        </Typography>
        )}
        {
          operation !== 'Eliminar'
          && (
          <>
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Nombre"
              onChange={handleChange}
              value={consolaSeleccionada?.nombre}
              name="nombre"
              autoFocus
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Apellidos"
              onChange={handleChange}
              value={consolaSeleccionada?.apellidos}
              name="apellidos"
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Matricula"
              onChange={handleChange}
              value={consolaSeleccionada?.matricula}
              name="matricula"
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Correo"
              onChange={handleChange}
              value={consolaSeleccionada?.correo}
              name="correo"
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Fecha de nacimiento"
              onChange={handleChange}
              value={consolaSeleccionada?.fecha_de_nacimiento}
              name="fecha_de_nacimiento"
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Telefono"
              onChange={handleChange}
              value={consolaSeleccionada?.num_telefono}
              name="num_telefono"
            />
            <br />
            <TextField
              style={{ paddingBottom: '15px', fontFamily: 'arial' }}
              label="Cursos impartidos"
              onChange={handleChange}
              value={consolaSeleccionada?.num_cursos_impartidos}
              name="num_cursos_impartidos"
            />
          </>
          )
        }
        <br />
        <br />
        <div align="center">
          <Button color={operation === 'Eliminar' ? 'error' : 'primary'} onClick={onSubmit}>
            { operation }
          </Button>
          <Button color={operation === 'Eliminar' ? 'primary' : 'error'} onClick={abrirCerrarModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalProfesor;
