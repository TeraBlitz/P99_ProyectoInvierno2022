import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { nivelDict } from '../../utils/constants';

function ClaseModal({ clase }) {
  const horario = [
    { dia: 'Lunes', hora: clase.lunes },
    { dia: 'Martes', hora: clase.martes },
    { dia: 'Miércoles', hora: clase.miercoles },
    { dia: 'Jueves', hora: clase.jueves },
    { dia: 'Viernes', hora: clase.viernes },
    { dia: 'Sábado', hora: clase.sabado },
  ];

  return (
    <Box
      sx={{
        '& .MuiTypography-root': { width: '35ch' },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderRadius: 3,
        m: 2,
        p: 2,
      }}
    >
      <Typography variant="h5">
        {`${clase.clave}.${clase.nombre_curso}`}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Sobre el curso</Typography>
      <Typography>
        <strong>Periodo:</strong>
        {` ${clase.clavePeriodo}`}
      </Typography>
      <Typography>
        <strong>Area:</strong>
        {` ${clase.area}`}
      </Typography>
      <Typography>
        <strong>Nivel:</strong>
        {` ${nivelDict[clase.nivel]}`}
      </Typography>
      <Typography>
        <strong>Modalidad:</strong>
        {` ${clase.modalidad}`}
      </Typography>
      <Typography>
        <strong>Horario:</strong>
        {` `}
      </Typography>
      <TableContainer component={Paper} sx={{ my: 1 }}>
        <Table size="small">
          <TableBody>
            {horario.map((h, i) => (
              <TableRow key={i} sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell align="center"><strong>{h.dia}</strong></TableCell>
                <TableCell align="center">{h.hora ? h.hora : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>
        <strong>Cupos:</strong>
        {` ¡Curso ${(Number(clase.cupo_actual) / Number(clase.cupo_maximo) * 100).toFixed()} % lleno!`}
      </Typography>
    </Box>
  );
}

export default ClaseModal;