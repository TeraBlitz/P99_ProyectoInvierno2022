import React, { useState, useMemo } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Actions from './ActAlumnos';

function BodyAlumnos({ data, seleccionarConsola }) {
  const [pageSize, setPageSize] = useState(5);
  const [items, setItems] = useState([]);

  const columns = useMemo(
    () => [
      {
        field: '_id', headerName: 'Id', width: 54, hide: true,
      },
      {
        field: 'clave_unica_identificacion',
        headerName: 'clave_unica_identificacion',
        width: 54,
        hide: true,
      },
      {
        field: 'curp', headerName: 'CURP', width: 200, hide: true,
      },
      { field: 'nombre', headerName: 'Nombre', width: 170 },
      { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 190 },
      { field: 'apellido_materno', headerName: 'Apellido Materno', width: 190 },
      { field: 'fecha_de_nacimiento', headerName: 'Nacimiento', width: 165 },
      {
        field: 'tutor_nombre',
        headerName: 'Tutor nombre',
        width: 124,
        hide: true,
      },
      {
        field: 'tutor_apellido_paterno',
        headerName: 'Tutor apellido paterno',
        width: 154,
        hide: true,
      },
      {
        field: 'tutor_apellido_materno',
        headerName: 'Tutor apellido materno',
        width: 160,
        hide: true,
      },
      {
        field: 'tutor_correo',
        headerName: 'Tutor correo',
        width: 154,
        hide: true,
      },
      {
        field: 'tutor_num_telefono',
        headerName: 'Tutor telefono',
        width: 104,
        hide: true,
      },
      { field: 'num_telefono', headerName: 'Telefono', width: 160 },
      {
        field: 'pais', headerName: 'Pais', width: 84, hide: true,
      },
      {
        field: 'estado', headerName: 'Estado', width: 84, hide: true,
      },
      {
        field: 'ciudad', headerName: 'Ciudad', width: 84, hide: true,
      },
      {
        field: 'colonia', headerName: 'Colonia', width: 84, hide: true,
      },
      {
        field: 'codigo_postal',
        headerName: 'codigo postal',
        width: 84,
        hide: true,
      },
      {
        field: 'escolaridad',
        headerName: 'Escolaridad',
        width: 84,
        hide: true,
      },
      {
        field: 'ultima_escuela',
        headerName: 'Ultima escuela',
        width: 104,
        hide: true,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        // type: 'actions',
        width: 200,
        getActions: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],
    [data],
  );

  return (
    <>
      <Card
        sx={{
          width: 1100,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '65px',
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
            sx={{ textAlign: 'left', fontFamily: 'arial', marginLeft: 1 }}
          >
            Filtro
          </Typography>
          <TextField
            style={{
              paddingBottom: '10px',
              fontFamily: 'arial',
              width: 1050,
              marginLeft: 7,
            }}
            label="Ingrese un nombre para buscar"
            onChange={(e) => {
              setItems([
                {
                  columnField: 'nombre',
                  operatorValue: 'contains',
                  value: e.target.value,
                },
              ]);
            }}
          />
        </CardContent>
      </Card>
      <Box
        sx={{
          width: '1130px',
          padding: '15px',
          height: '450px',
          position: 'absolute',
          marginLeft: '50px',
          marginTop: '270px',
        }}
      >
        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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

export default BodyAlumnos;
