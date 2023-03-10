import React, { useState, useEffect, useMemo } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import Select from 'react-select';
import { CSVLink } from 'react-csv';

function HeaderProfesores({ data, setOpenModal, dataPeriodo, handleSelectChange }) {
  return (
    <>
      <Box
        sx={{
          width: '1000px',
          padding: '15px',
          height: '150px',
          position: 'absolute',
          marginLeft: '50px',
          marginTop: '15px',
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'left', mt: 3, mb: 3, fontFamily: 'arial',
          }}
        >
          Profesores
          <Button
            sx={{ marginLeft: '400px' }}
            variant="contained"
            color="success"
            onClick={setOpenModal}
          >
            <AddCircleOutlineIcon />
            {' Agregar Profesor'}
          </Button>
        </Typography>
        <CSVLink data={data} filename="alumnos.csv">
          <Button
            color="primary"
            variant="contained"
            sx={{ marginLeft: '445px', marginTop: '-115px' }}
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
          marginLeft: '930px',
          marginTop: '67px',
          fontFamily: 'arial',
          borderRadius: '8px',

        }}
      >
        <Select
          sx={{
            fontFamily: 'default',
          }}
          options={dataPeriodo.map((sup) => ({
            label: sup.clave,
            value: sup._id,
          }))}
          onChange={handleSelectChange}
        />
      </Box>
    </>
  )
}

export default HeaderProfesores;