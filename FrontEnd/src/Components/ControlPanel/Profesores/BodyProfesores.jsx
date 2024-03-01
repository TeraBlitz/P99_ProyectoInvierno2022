import React, { useState, useMemo } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Actions from './ActProfes';

function BodyProfesores({ data, seleccionarConsola }) {
  const [pageSize, setPageSize] = useState(5);
  const [items, setItems] = useState([]);

  const columns = useMemo(
    () => [
      {
        field: '_id', headerName: 'Id', hide: true, width: 54,
      },
      { field: 'nombre', headerName: 'Nombre', width: 120 },
      { field: 'apellidos', headerName: 'Apellidos', width: 180 },
      { field: 'matricula', headerName: 'Matricula', width: 140 },
      { field: 'correo', headerName: 'Correo', width: 180 },
      { field: 'num_telefono', headerName: 'Telefono', width: 120 },
      { field: 'fecha_de_nacimiento', headerName: 'Nacimiento', width: 100 },
      { field: 'num_cursos_impartidos', headerName: 'Cursos Impartidos', width: 140 },
      {
        field: 'idUser', headerName: 'Usuario', hide: true, width: 250,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        // type: 'actions',
        width: 95,
        getActions: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],
    [data],
  );

  return (
    <>
      <Card
        sx={{
          width: 1120,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '65px',
          marginTop: '125px',
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
              paddingBottom: '10px', fontFamily: 'arial', width: 1070, marginLeft: 7,
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
          width: '1150px',
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

export default BodyProfesores;
