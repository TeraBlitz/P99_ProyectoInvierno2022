import Box from '@mui/material/Box';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import ClaseModal from '../Clase/ClaseModal';
import MiRegistro from './MiRegistro';
import Clase from '../Clase/Clase';
import {
  getNivel, getHorario, getProfesor, getCupo,
} from '../../utils/utilFunctions';

function RegistroClasesBody({
  handleClick, filteredClasses, classNames,
}) {
  const [items, setItems] = useState([]);
  const [currentClase, setCurrentClase] = useState();
  const [openMoreInfo, setOpenMoreInfo] = useState(false);

  const handleMoreInfo = (clase) => {
    setCurrentClase(clase);
    setOpenMoreInfo(!openMoreInfo);
  };

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
      renderCell: (params) => (Number(params.row.cupo_actual) < Number(params.row.cupo_maximo) ? (
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
      )),
    },
  ];

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          paddingX: '20px',
          paddingBottom: '10px',
          overflowY: 'scroll',
          display: { xs: 'block', md: 'none' },
        }}
      >
        {filteredClasses.length !== 0 ? (
          filteredClasses.map((e) => (
            <Clase
              handleClick={handleClick}
              handleMoreInfo={handleMoreInfo}
              key={e._id}
              clase={e}
            />
          ))
        ) : (
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h3" component="div" textAlign="center">
              No hay clases disponibles por el momento.
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Card
            sx={{
              textAlign: 'center',
              ml: 1,
              my: 2,
              display: 'flex',
            }}
          >
            <SearchIcon
              color="primary"
              width="2em"
              height="2em"
              sx={{ alignSelf: 'center', ml: 0.5 }}
            />
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                p: 1,
              }}
            >
              <Autocomplete
                disablePortal
                options={classNames}
                onChange={(_e, newvalue) => {
                  setItems([
                    {
                      columnField: 'nombre_curso',
                      operatorValue: 'contains',
                      value: newvalue,
                    },
                  ]);
                }}
                onInputChange={(_e, newvalue) => {
                  setItems([
                    {
                      columnField: 'nombre_curso',
                      operatorValue: 'contains',
                      value: newvalue,
                    },
                  ]);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Curso" />
                )}
              />
              <TextField
                style={{ fontFamily: 'arial' }}
                label="Nivel"
                onChange={(e) => {
                  setItems([
                    {
                      columnField: 'nivel',
                      operatorValue: 'contains',
                      value: e.target.value,
                    },
                  ]);
                }}
                select
              >
                {[
                  '',
                  'Desde cero',
                  'Con bases',
                  'Intermedio',
                  'Avanzado',
                ].map((e) => (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ fontFamily: 'arial' }}
                label="Periodo"
                onChange={(e) => {
                  setItems([
                    {
                      columnField: 'clavePeriodo',
                      operatorValue: 'contains',
                      value: e.target.value,
                    },
                  ]);
                }}
              />
              <TextField
                style={{ fontFamily: 'arial' }}
                label="Modalidad"
                onChange={(e) => {
                  setItems([
                    {
                      columnField: 'modalidad',
                      operatorValue: 'contains',
                      value: e.target.value,
                    },
                  ]);
                }}
              />
            </CardContent>
          </Card>
          <MiRegistro />
        </Box>
        <Box
          sx={{
            m: 2,
            display: 'flex',
            width: '90%',
            height: 600,
            minWidth: '548px',
            '& .theme--ListaEspera': {
              bgcolor: 'lightyellow',
            },
            '& .theme--Inscrito': {
              bgcolor: 'lightgreen',
            },
          }}
        >
          <DataGrid
            sx={{ flexGrow: 1 }}
            rows={filteredClasses}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            getRowHeight={() => 'auto'}
            filterModel={{
              items,
            }}
            getRowClassName={(params) => `theme--${params.row.status}`}
          />
        </Box>
        <Modal
          open={openMoreInfo}
          onClose={() => setOpenMoreInfo(!openMoreInfo)}
          sx={{ overflowY: 'scroll' }}
        >
          <ClaseModal clase={currentClase} />
        </Modal>
      </Box>
    </>
  );
}

export default RegistroClasesBody;
