import React from 'react';
import {
  getNivel, getHorario, getProfesor, getCupo,
} from '../../utils/utilFunctions';
import ButtonActionsInscripcion from './ButtonActionsInscripcion';
import RegistroClasesTable from './RegistroClasesTable';

function RegistroClasesBody({
  handleClick, filteredClasses, classNames,
}) {
  const columns = [
    {
      field: 'clavePeriodo',
      headerName: 'Periodo',
      width: 110,
      editable: false,
    },
    {
      field: 'clave',
      headerName: 'Clave',
      width: 90,
    },
    {
      field: 'nombre_curso',
      headerName: 'Curso',
      width: 90,
      editable: false,
    },
    {
      field: 'nivel',
      headerName: 'Nivel',
      width: 100,
      editable: false,
      valueGetter: getNivel,
    },
    {
      field: 'area',
      headerName: 'Area',
      width: 110,
      editable: false,
    },
    {
      field: 'modalidad',
      headerName: 'Modalidad',
      width: 110,
      editable: false,
    },
    {
      field: 'horario',
      headerName: 'Horario',
      width: 150,
      editable: false,
      valueGetter: getHorario,
    },
    {
      field: 'profesor',
      headerName: 'Profesor',
      width: 140,
      editable: 'false',
      valueGetter: getProfesor,
    },
    {
      field: 'cupos',
      headerName: '% curso lleno',
      width: 100,
      editable: 'false',
      valueGetter: getCupo,
    },
    {
      field: 'actions',
      headerName: 'Inscripción',
      type: 'actions',
      width: 115,
      renderCell: (params) => <ButtonActionsInscripcion {...{params}} />,
    },
  ];

  return (
    <RegistroClasesTable 
      handleClick={handleClick}
      filteredClasses={filteredClasses}
      classNames={classNames}
      columns={columns}
    />
  );
}

export default RegistroClasesBody;
