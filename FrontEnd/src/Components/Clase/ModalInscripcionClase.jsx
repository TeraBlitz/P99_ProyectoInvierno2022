import React from 'react';
import {
  Button,
  Modal,
  Typography,
} from '@mui/material';
import WaitList from './WaitList';
import EditarInscripcion from './EditarInscripcion';

function ModalInscripcionClase({
  clase, currentProfesor, handleChange, profesorList, handleChangeProfesor,
  modalSubmit, currentOperation, openModal, setOpenModal, currentClase, currentWaitList,
}) {
  const generateActionModalBody = () => (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#fefefd',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        ...(currentOperation === 'Editar' || currentOperation === 'Crear'
          ? {
            width: 520,
            height: '95vh',
            top: '48%',
          }
          : {
            width: 260,
            height: 220,
          }),
      }}
    >
      <h3
        style={{
          paddingBottom: '15px',
          marginTop: '5px',
          fontFamily: 'arial',
          width: '100%',
        }}
        align="center"
      >
        {currentOperation === 'ELiminar'
          ? 'Eliminar una clase'
          : (currentOperation === 'Editar'
            ? 'Actualizar una clase' : 'Añadir nueva clase')}
      </h3>
      {
        currentOperation === 'Eliminar'
        && (
        <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
          {`Esta clase ${clase.clave} y toda su información relacionada a ella va a ser eliminada`}
        </Typography>
        )
      }
      {
        (currentOperation === 'Editar' || currentOperation === 'Crear') && <EditarInscripcion currentProfesor={currentProfesor} handleChange={handleChange} profesorList={profesorList} handleChangeProfesor={handleChangeProfesor} clase={clase} />
      }
      <br />
      <br />
      <div align="center">
        <Button color={currentOperation === 'Editar' || currentOperation === 'Crear' ? 'primary' : 'error'} onClick={modalSubmit}>
          {currentOperation === 'Crear' ? 'Agregar' : 'Confirmar'}
        </Button>
        <Button onClick={setOpenModal} color={currentOperation === 'Editar' || currentOperation === 'Crear' ? 'error' : 'primary'}>
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open={openModal} onClose={setOpenModal}>
      <div>
        {currentOperation === 'AbrirWaitList' ? <WaitList clase={currentClase} waitList={currentWaitList} /> : generateActionModalBody() }
      </div>
    </Modal>
  );
}

export default ModalInscripcionClase;
