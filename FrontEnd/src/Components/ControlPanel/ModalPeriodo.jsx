import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

function ModalPeriodo({
  periodoActual, openModal, setOpenModal, handleChange, onSubmit, operation,
}) {
  const fields = [
    { name: 'clave', label: 'Clave' },
    { name: 'status', label: 'Status' },
    { name: 'fecha_inicio', label: 'Fecha de inicio', type: 'datetime-local' },
    { name: 'fecha_fin', label: 'Fecha de fin', type: 'datetime-local' },
    { name: 'fecha_inicio_insc_talleres', label: 'Fecha de inicio de incripciones de talleres', type: 'datetime-local' },
    { name: 'fecha_fin_insc_talleres', label: 'Fecha de fin de inscripciones de talleres', type: 'datetime-local' },
    { name: 'fecha_inicio_insc_idiomas', label: 'Fecha de inicio de incripciones de idiomas', type: 'datetime-local' },
    { name: 'fecha_fin_insc_idiomas', label: 'Fecha de fin de inscripciones de idiomas', type: 'datetime-local' },
    { name: 'fecha_inicio_insc_asesorias', label: 'Fecha de inicio de incripciones de asesorias', type: 'datetime-local' },
    { name: 'fecha_fin_insc_asesorias', label: 'Fecha de fin de inscripciones de asesorias', type: 'datetime-local' },
    { name: 'cursos_max_por_alumno', label: 'Cursos Maximos por Alumno' },
    { name: 'idiomas_max_por_alumno', label: 'Idiomas Max' },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: operation === 'Eliminar' ? '60%' : '680px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openModal}
      onClose={setOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography variant="h5" component="div">
          { operation === 'Eliminar'
            ? 'Estas seguro de borrar este periodo?'
            : 'Ingrese los nuevos datos' }
        </Typography>
        <div className="spacer" />
        <div>
          {operation !== 'Eliminar' && fields.map((field) => (
            <TextField
              key={field.name}
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label={field.label}
              name={field.name}
              defaultValue={periodoActual?.[field.name]}
              type={field.type}
              InputLabelProps={field.type && { shrink: true }}
              onChange={handleChange}
            />
          ))}
          <br />
          <Button
            color={operation === 'Eliminar' ? 'error' : 'primary'}
            variant="contained"
            onClick={onSubmit}
          >
            {operation}
          </Button>
          <div style={{ width: '30px', display: 'inline-block'}} />
          <Button
            onClick={setOpenModal}
            color={operation === 'Eliminar' ? 'primary' : 'error'}
            variant="contained"
          >
            Cancelar
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default ModalPeriodo;
