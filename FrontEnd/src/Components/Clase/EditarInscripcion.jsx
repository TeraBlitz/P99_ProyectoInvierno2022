import React from 'react';
import {
  TextField,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {
  classAtributes, dayAtributes, niveloptions,
} from '../../utils/constants';

function EditarInscripcion({
  clase, currentProfesor, handleChange, profesorList, handleChangeProfesor,
}) {
  const textFieldStyle = {
    paddingBottom: '15px',
    fontFamily: 'arial',
    marginRight: 10,
    width: '40%',
  };
  
  const containerStyle = {
    width: '100%',
    borderTop: '1px solid gray',
    paddingTop: '5px',
  };
  
  const labelStyle = {
    textAlign: 'center',
    marginTop: '10px',
  };

  return (
    <div>
      {classAtributes.map((atribute) => (
        <TextField
          style={textFieldStyle}
          label={atribute.value}
          onChange={(e) => handleChange(e)}
          name={atribute.key}
          key={atribute.key}
          value={clase[atribute.key]}
          autoFocus
        />
      ))}
      <TextField
        style={textFieldStyle}
        label="Modalidad"
        value={clase.modalidad}
        name="modalidad"
        onChange={(e) => handleChange(e)}
        select
      >
        {['presencial', 'online'].map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={textFieldStyle}
        label="Nivel"
        value={clase.niveles}
        name="niveles"
        onChange={(e) => handleChange(e)}
        select
      >
        {niveloptions.map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <div style={containerStyle}>
        <Typography sx={labelStyle}>Horarios</Typography>
        {dayAtributes.map((atribute) => (
          <TextField
            style={textFieldStyle}
            label={atribute.value}
            onChange={(e) => handleChange(e)}
            name={atribute.key}
            key={atribute.key}
            value={clase[atribute.key]}
          />
        ))}
      </div>
      <div style={containerStyle}>
        <Typography sx={labelStyle}>Datos del profesor</Typography>
        <br />
        <TextField
          style={{
            ...textFieldStyle,
            width: '100%',
          }}
          label="Profesor"
          value={currentProfesor.nombreCompleto}
          name="nombreCompleto"
          onChange={(e) => handleChangeProfesor(e)}
          select
        >
          {profesorList.map((e) => (
            <MenuItem value={`${e.nombre} ${e.apellidos}`} key={e._id}>
              {`${e.nombre} ${e.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          style={textFieldStyle}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.matricula}
          defaultValue={currentProfesor.matricula}
          variant="filled"
          label="matricula"
        />
        <TextField
          style={textFieldStyle}
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
}

export default EditarInscripcion;
