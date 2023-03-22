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
  modalSubmit, currentOperation, openModal, abrirCerrarModal, currentClase, currentWaitList,
}) {
  const bodyEditar = (
    <div
      style={{
        position: 'absolute',
        width: 520,
        height: '95vh',
        backgroundColor: '#fefefd',
        top: '48%',
        left: '50%',
        transform: 'translate(-48%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
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
        Actualizar una clase
      </h3>
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
      <div align="center" style={{ width: '100%' }}>
        <Button color="primary" onClick={modalSubmit}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModal} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: 220,
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
      <h3
        style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
        align="center"
      >
        Eliminar clase
      </h3>
      <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
        {`Esta clase ${clase.clave} y toda su información relacionada a ella va a ser eliminada`}
      </Typography>
      <br />
      <br />
      <div align="center">
        <Button color="error" onClick={modalSubmit}>
          Confirmar
        </Button>
        <Button onClick={abrirCerrarModal} color="primary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open={openModal} onClose={abrirCerrarModal}>
      <div>
        {currentOperation === 'Editar' || currentOperation === 'Crear' ? bodyEditar : (currentOperation === 'AbrirWaitList' ? <WaitList clase={currentClase} waitList={currentWaitList} /> : bodyEliminar)}
      </div>
    </Modal>
  );
}

export default ModalInscripcionClase;
