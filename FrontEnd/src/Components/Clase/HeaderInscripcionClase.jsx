import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import { subirClases, subirProfes } from '../../api/csv';
import { parseCSV } from '../../utils/utilFunctions';

function HeaderInscripcionClase({
  data, setOpenModal, dataPeriodo, handleSelectChange, resetClases
}) {
  const importFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = async (e) => {
      const { target } = e;
      if (!target.files) {
        return;
      }
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        const result = e.target?.result?.toString();
        const isCsvFile = file.name.includes('.csv');
        isCsvFile ? sendCSV(result) : alert('error: el archivo necesita ser tipo markdown o txt');
      };
    };
  };
  
  const sendCSV = async (csv) => {
    const { claseList, profesorList } = parseCSV(csv);
  
    await subirProfes({ profesoresJson: JSON.stringify(profesorList) });
    await subirClases({ clasesJson: JSON.stringify(claseList) });
    resetClases();
  };  

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
        onClick={setOpenModal}
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
