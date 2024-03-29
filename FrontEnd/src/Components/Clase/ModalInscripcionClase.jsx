import React from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import WaitList from './WaitList';
import {
  classAtributes, dayAtributes, niveloptions,
} from '../../utils/constants';

function ModalInscripcionClase({
  clase, currentProfesor, handleChange, profesorList, handleChangeProfesor,
  modalSubmit, currentOperation, openModal, setOpenModal, currentClase, currentWaitList,
}) {
  const bodyEditar = (
    <div>
      {classAtributes.map((atribute) => (
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          label={atribute.value}
          onChange={(e) => {
            handleChange(e);
          }}
          name={atribute.key}
          key={atribute.key}
          value={clase[atribute.key]}
          autoFocus
        />
      ))}
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Modalidad"
        value={clase.modalidad}
        name="modalidad"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {['presencial', 'online'].map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Nivel"
        value={clase.niveles}
        name="niveles"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {niveloptions.map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{ textAlign: 'center', marginTop: '10px', width: '100%' }}
        >
          Horarios
        </Typography>
        {dayAtributes.map((atribute) => (
          <TextField
            style={{
              paddingBottom: '15px',
              fontFamily: 'arial',
              marginRight: 10,
            }}
            label={atribute.value}
            onChange={(e) => {
              handleChange(e);
            }}
            name={atribute.key}
            key={atribute.key}
            value={clase[atribute.key]}
            autoFocus
          />
        ))}
      </div>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
        }}
      >
        <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>
          Datos del profesor
        </Typography>
        <br />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '100%',
          }}
          label="Profesor"
          value={currentProfesor.nombreCompleto}
          name="nombreCompleto"
          onChange={(e) => {
            handleChangeProfesor(e);
          }}
          select
        >
          {profesorList.map((e) => (
            <MenuItem value={`${e.nombre} ${e.apellidos}`} key={e._id}>
              {`${e.nombre} ${e.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.matricula}
          defaultValue={currentProfesor.matricula}
          variant="filled"
          label="matricula"
        />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.correo}
          defaultValue={currentProfesor.correo}
          variant="filled"
          label="correo"
        />
      </div>
    </div>
  );

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
        {currentOperation === 'ELiminar' ? 
          'Eliminar una clase' : 
          (currentOperation === 'Editar' ? 
          'Actualizar una clase' : 'Añadir nueva clase')}
      </h3>
      { 
        currentOperation === 'Eliminar' && 
        <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
          {`Esta clase ${clase.clave} y toda su información relacionada a ella va a ser eliminada`}
        </Typography> 
      }
      {
        (currentOperation === 'Editar' || currentOperation === 'Crear') && bodyEditar
      }
      <br />
      <br />
      <div align="center">
        <Button color={currentOperation === 'Editar' || currentOperation === 'Crear'? 'primary' : 'error'} onClick={modalSubmit}>
          {currentOperation === 'Crear'? 'Agregar' : 'Confirmar'}
        </Button>
        <Button onClick={setOpenModal} color={currentOperation === 'Editar' || currentOperation === 'Crear' ? 'error' : 'primary'}>
          Cancelar
        </Button>
      </div>
    </div>
  )

  return (
    <Modal open={openModal} onClose={setOpenModal}>
      <div>
        {currentOperation === 'AbrirWaitList' ? <WaitList clase={currentClase} waitList={currentWaitList} /> : generateActionModalBody() }
      </div>
    </Modal>
  );
}

export default ModalInscripcionClase;
