import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Autocomplete,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Actions from './Actions';

function BodyInscripcionClase({
  data, profesorList, getClassWaitList, seleccionarClase, selectedRows, setSelectedRows, eliminarClasesSeleccionadas
}) {
  const [pageSize, SetPageSize] = useState(5);
  const [cursoFilter, setCursoFilter] = useState('');
  const [nivelFilter, setNivelFilter] = useState('');
  const [profesorFilter, setProfesorFilter] = useState('');

  const filteredData = data.filter(item => {
    const cursoMatch = cursoFilter ? item.nombre_curso.toLowerCase().includes(cursoFilter.toLowerCase()) : true;
    const nivelMatch = nivelFilter ? item.niveles.toLowerCase().includes(nivelFilter.toLowerCase()) : true;
    const profesorMatch = profesorFilter ? item.nombreCompleto.toLowerCase().includes(profesorFilter.toLowerCase()) : true;

    return cursoMatch && nivelMatch && profesorMatch;
  });


  const columns = useMemo(
    () => [
      { field: 'clave', headerName: 'Clave', width: 68 },
      { field: 'nombre_curso', headerName: 'Curso', width: 80 },
      { field: 'niveles', headerName: 'Nivel', width: 95 },
      {
        field: 'nombreCompleto',
        headerName: 'Profesor',
        width: 150,
        sortable: false,
      },
      { field: 'cupo_maximo', headerName: 'Capacidad', width: 90 },
      { field: 'edades', headerName: 'Edades', width: 70 },
      { field: 'fechas', headerName: 'Fechas', width: 200 },
      { field: 'modalidad', headerName: 'Modalidad', width: 88 },
      {
        field: 'actions',
        headerName: 'Acciones',
        // type: 'actions',
        width: 125,
        getActions: (params) => <Actions {...{ params, seleccionarConsola: seleccionarClase }} />,
      },
      {
        field: 'wait_list',
        headerName: 'Lista Espera',
        // type: 'actions',
        width: 150,
        getActions: (params) => (
          <Button size="small" onClick={() => getClassWaitList(params.row)}>Lista Espera</Button>
        ),
      },
    ],
    [data, profesorList],
  );

  const cursoOptions = [...new Set(data.map(item => item.nombre_curso))].sort((a, b) => {
    return a.localeCompare(b);
  });
  const nivelOptions = [
    'desde cero',
    'con bases',
    'intermedio',
    'avanzado'
  ];
  const profesorOptions = [...new Set(data.map(item => item.nombreCompleto))].sort((a, b) => {
    return a.localeCompare(b);
  });

  const createAutocompleteField = (label, filterState, setFilterState, options) => (
    <Autocomplete
      style={{
        paddingBottom: '5px', fontFamily: 'arial', width: 330, marginLeft: '30px',
      }}
      value={filterState}
      onChange={(event, newValue) => setFilterState(newValue)}
      freeSolo
      options={!options? [{label:"Loading...", id:0}]: options}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );

  return (
    <>
      <Card
        sx={{
          width: 1140,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '50px',
          marginTop: '120px',
          bgcolor: 'grey.200',
          borderRadius: '8px',
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: 'left', fontFamily: 'arial', marginLeft: '15px' }}
          >
            Filtros
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {createAutocompleteField('Curso', cursoFilter, setCursoFilter, cursoOptions)}
            {createAutocompleteField('Nivel', nivelFilter, setNivelFilter, nivelOptions)}
            {createAutocompleteField('Profesor', profesorFilter, setProfesorFilter, profesorOptions)}
          </Box>
        </CardContent>
      </Card>
      <Box sx={{
        position: 'absolute',
        height: '60vh',
        width: '1140px',
        marginTop: '280px',
        marginLeft: '50px',
      }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={eliminarClasesSeleccionadas}
          disabled={selectedRows.length === 0}
        >
          Elimanar filas
        </Button>

        <DataGrid
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => SetPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[200],
              fontFamily: 'arial',
            },
          }}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectedRows(newSelectionModel);
          }}
          selectionModel={selectedRows}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
}

export default BodyInscripcionClase;
