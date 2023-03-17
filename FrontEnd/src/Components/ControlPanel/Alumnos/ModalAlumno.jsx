import React from 'react';
import {
  Button, Modal, TextField, Typography,
} from '@mui/material';
import MasInformacionAlumno from './MasInformacionAlumno';

function ModalAlumno({
  handleChange, openModal, setOpenModal, alumnoSeleccionado, currentOperation, onSubmit,
}) {
  const generateActionModalBody = () => (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: currentOperation === 'Editar' ? 620 : 280,
        backgroundColor: '#fefefd',
        top: currentOperation === 'Editar' ? '48%' : '50%',
        left: '50%',
        transform: currentOperation === 'Editar' ? 'translate(-48%, -50%)' : 'translate(-50%, -50%)',
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
        { currentOperation === 'Editar' ? 'Actualizar Alumnos' : 'Eliminar alumno' }
      </h3>
      {currentOperation === 'Editar' && [
        { label: 'Nombre', name: 'nombre' },
        { label: 'Apellido paterno', name: 'apellido_paterno' },
        { label: 'Apellido materno', name: 'apellido_materno' },
        { label: 'Estado', name: 'estado' },
        { label: 'Ciudad', name: 'ciudad' },
        { label: 'Escolaridad', name: 'escolaridad' },
        { label: 'Ultima escuela', name: 'ultima_escuela' },
      ].map(({ label, name }) => (
        <TextField
          key={name}
          style={{ paddingBottom: '15px', fontFamily: 'arial' }}
          label={label}
          onChange={handleChange}
          name={name}
          value={alumnoSeleccionado?.[name]}
          autoFocus={name === 'nombre'}
        />
      ))}
      {currentOperation === 'Eliminar' && (
      <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
        {`El alumno llamado ${alumnoSeleccionado?.nombre} y
        todo lo relacionado a el se va a eliminar por completo. No vas a poder
        acceder a estos datos de nuevo.`}
      </Typography>
      )}
      <br />
      <br />
      <div align="center">
        <Button color={currentOperation === 'Editar' ? 'primary' : 'error'} onClick={onSubmit}>
          Confirmar
        </Button>
        <Button onClick={setOpenModal} color={currentOperation === 'Editar' ? 'error' : 'primary'}>
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open={openModal} onClose={setOpenModal}>
      {
        currentOperation === 'MasInfo'
          ? <MasInformacionAlumno consolaSeleccionada={alumnoSeleccionado} />
          : generateActionModalBody()
      }
    </Modal>
  );
}

export default ModalAlumno;
