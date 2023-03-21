import React, { useState, useEffect, useMemo } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';
import Select from 'react-select';
import { CSVLink } from 'react-csv';

function HeaderInscripcionClase({
  data, addClass, importFile, dataPeriodo, handleSelectChange,
}) {
  return (
    <>
      <Box
        sx={{
          width: '740px',
          padding: '15px',
          height: '100px',
          position: 'absolute',
          marginLeft: '40px',
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'left', mt: 3, mb: 3, fontFamily: 'arial',
          }}
        >
          Clases
        </Typography>
      </Box>
      <CSVLink data={data} filename="alumnos.csv">
        <Button
          color="primary"
          variant="contained"
          sx={{ position: 'absolute', marginLeft: '400px', marginTop: '52px' }}
        >
          Exportar a CSV
        </Button>
      </CSVLink>
      <Button
        variant="contained"
        color="success"
        onClick={addClass}
        sx={{
          position: 'absolute',
          marginTop: '52px',
          marginLeft: '580px',
        }}
      >
        <AddCircleOutlineIcon />
        Crear
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={importFile}
        sx={{
          position: 'absolute',
          marginTop: '52px',
          marginLeft: '700px',
          marginRight: '30px',
        }}
      >
        <InsertDriveFile />
        Importar CSV
      </Button>
      <Box
        sx={{
          width: 250,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '910px',
          marginTop: '50px',
          fontFamily: 'arial',
          borderRadius: '8px',
        }}
      >
        <Select
          options={dataPeriodo.map((sup) => ({
            label: sup.clave,
            value: sup._id,
          }))}
          onChange={handleSelectChange}
        />
      </Box>
    </>
  );
}

export default HeaderInscripcionClase;
