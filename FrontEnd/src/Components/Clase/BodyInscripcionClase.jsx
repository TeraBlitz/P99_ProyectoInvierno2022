import React, { useState, useMemo } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Actions from './Actions';

function BodyInscripcionClase({
  data, profesorList, getClassWaitList, seleccionarClase,
}) {
  const [pageSize, SetPageSize] = useState(5);
  const [items, setItems] = useState([]);

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
        type: 'actions',
        width: 125,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola: seleccionarClase }} />,
      },
      {
        field: 'wait_list',
        headerName: 'Lista Espera',
        type: 'actions',
        width: 150,
        renderCell: (params) => (
          <Button size="small" onClick={() => getClassWaitList(params.row)}>Lista Espera</Button>
        ),
      },
    ],
    [data, profesorList],
  );

  const createTextField = (label, columnField, operatorValue, setValue) => (
    <TextField
      style={{
        paddingBottom: '5px', fontFamily: 'arial', width: 330, marginLeft: '30px',
      }}
      label={label}
      onChange={(e) => {
        setValue([{ columnField, operatorValue, value: e.target.value }]);
      }}
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
          {createTextField('Curso', 'nombre_curso', 'contains', setItems)}
          {createTextField('Nivel', 'niveles', 'contains', setItems)}
          {createTextField('Profesor', 'nombreCompleto', 'contains', setItems)}
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
        <DataGrid
          columns={columns}
          rows={data}
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
          disableSelectionOnClick
          filterModel={{
            items,
          }}
        />
      </Box>
    </>
  );
}

export default BodyInscripcionClase;
