import Box from '@mui/material/Box';
import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import MiRegistro from './MiRegistro';

function RegistroClasesSearchbar({ setItems, classNames }) {
  return (
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
  );
}

export default RegistroClasesSearchbar;
