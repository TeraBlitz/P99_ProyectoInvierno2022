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

function HeaderInscripcionClase({
  data, addClass, dataPeriodo, handleSelectChange, resetClases
}) {
  const importFile = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.click();

    input.onchange = (e) => {
      const { target } = e;
      if (!target.files) {
        return;
      }
      let file;
      file = target.files[0];

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        if (file.name.includes('.csv')) {
          const result = e.target?.result?.toString();
          result !== undefined ? sendCSV(result) : alert('error');
        } else {
          alert('error: el archivo necesita ser tipo markdown o txt');
        }
      };
    };
  };

  const sendCSV = async (csv) => {
    const csvArray = csv.split('\n').slice(1);
    const clasesJson = [];
    const profesoresJson = [];
    const profesorHash = {};
    
    csvArray.forEach((iterator, i) => {
      const iteratorArray = iterator.split(',');
      const clavePeriodo = iteratorArray[5];
  
      clasesJson[i] = {
        clave: iteratorArray[0],
        nombre_curso: iteratorArray[1],
        nivel: iteratorArray[2],
        area: iteratorArray[3],
        modalidad: iteratorArray[4],
        clavePeriodo,
        cupo_maximo: iteratorArray[6],
        edad_minima: iteratorArray[7],
        edad_maxima: iteratorArray[8],
        lunes: iteratorArray[9],
        martes: iteratorArray[10],
        miercoles: iteratorArray[11],
        jueves: iteratorArray[12],
        viernes: iteratorArray[13],
        sabado: iteratorArray[14],
        matriculaProfesor: iteratorArray[17],
        cupo_actual: '0',
        nombreProfesor: iteratorArray[15].trim(),
        apellidosProfesor: iteratorArray[16].trim(),
      };
  
      const profesorMatricula = iteratorArray[17];
      if (!profesorHash[profesorMatricula]) {
        profesorHash[profesorMatricula] = true;
        profesoresJson.push({
          nombre: iteratorArray[15].trim(),
          apellidos: iteratorArray[16].trim(),
          matricula: profesorMatricula,
          correo: iteratorArray[18],
          fecha_de_nacimiento: '',
          num_telefono: '',
          num_cursos_impartidos: '0',
          idUser: '',
        });
      }
    });
  
    await subirProfes({ profesoresJson: JSON.stringify(profesoresJson) });
    await subirClases({ clasesJson: JSON.stringify(clasesJson) });
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
