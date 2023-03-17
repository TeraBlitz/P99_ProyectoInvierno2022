import React from 'react';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import Select from 'react-select';
import { CSVLink } from 'react-csv';

function HeaderAlumnos({ data, dataPeriodo, handleSelectChange }) {
  return (
    <>
      <Box
        sx={{
          width: 1100,
          padding: '15px',
          height: '150px',
          position: 'absolute',
          marginLeft: '50px',
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'left',
            mt: 3,
            mb: 3,
            fontFamily: 'arial',
            display: 'flex',
          }}
        >
          Alumnos Inscritos
        </Typography>
        <CSVLink data={data} filename="alumnos.csv">
          <Button
            color="primary"
            variant="contained"
            sx={{ marginLeft: '680px', marginTop: '-120px' }}
          >
            Exportar a CSV
          </Button>
        </CSVLink>
      </Box>
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

export default HeaderAlumnos;
