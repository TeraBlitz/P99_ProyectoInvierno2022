import React from 'react';
import {
  Button,
} from '@mui/material';

function ButtonActionsInscripcion({ params }) {
  return (Number(params.row.cupo_actual) < Number(params.row.cupo_maximo) ? (
    <Button
      size="small"
      onClick={() => handleClick(params.row)}
      variant="outlined"
    >
      {params.row.status === 'Inscrito'
        && params.row.status !== 'ListaEspera'
        ? 'Cancelar Registro'
        : 'Inscribir'}
    </Button>
  ) : (
    <Button
      size="small"
      onClick={() => handleClick(params.row)}
      variant="outlined"
    >
      {params.row.status === 'ListaEspera'
        && params.row.status !== 'Inscrito'
        ? 'Salir de Lista'
        : 'Lista Espera'}
    </Button>
  ))
}

export default ButtonActionsInscripcion;