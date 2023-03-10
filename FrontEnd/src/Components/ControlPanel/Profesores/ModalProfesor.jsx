import React from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

const campos = [
  { label: 'Nombre', name: 'nombre' },
  { label: 'Apellidos', name: 'apellidos' },
  { label: 'Matricula', name: 'matricula' },
  { label: 'Correo', name: 'correo' },
  { label: 'Fecha de nacimiento', name: 'fecha_de_nacimiento' },
  { label: 'Telefono', name: 'num_telefono' },
  { label: 'Cursos impartidos', name: 'num_cursos_impartidos' },
];

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
          && campos.map((campo) => (
            <>
              <TextField
                key={campo.name}
                style={{ paddingBottom: '15px', fontFamily: 'arial' }}
                label={campo.label}
                onChange={handleChange}
                value={consolaSeleccionada?.[campo.name]}
                name={campo.name}
              />
              <br />
            </>
          ))
        }
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
