import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import {
  traducirDate, traducirTime, encontrarAlumnos, encontrarClases, encontrarProfes,
} from '../../utils/utilFunctions';

function PeriodoCard({ dataClase, item, seleccionarConsola }) {
  const fields = [
    {
      label: 'Fecha de inicio:',
      date: traducirDate(item.fecha_inicio),
      time: traducirTime(item.fecha_inicio),
    },
    {
      label: 'Fecha de cierre:',
      date: traducirDate(item.fecha_fin),
      time: traducirTime(item.fecha_fin),
    },
    {
      label: 'Fecha de inicio de inscripciones de talleres:',
      date: traducirDate(item.fecha_inicio_insc_talleres),
      time: traducirTime(item.fecha_inicio_insc_talleres),
    },
    {
      label: 'Fecha de cierre de inscripciones de talleres:',
      date: traducirDate(item.fecha_fin_insc_talleres),
      time: traducirTime(item.fecha_fin_insc_talleres),
    },
    {
      label: 'Fecha de inicio de inscripciones de idiomas:',
      date: traducirDate(item.fecha_inicio_insc_idiomas),
      time: traducirTime(item.fecha_inicio_insc_idiomas),
    },
    {
      label: 'Fecha de cierre de inscripciones de idiomas:',
      date: traducirDate(item.fecha_fin_insc_idiomas),
      time: traducirTime(item.fecha_fin_insc_idiomas),
    },
    {
      label: 'Fecha de inicio de inscripciones de asesorias:',
      date: traducirDate(item.fecha_inicio_insc_asesorias),
      time: traducirTime(item.fecha_inicio_insc_asesorias),
    },
    {
      label: 'Fecha de cierre de inscripciones de asesorias:',
      date: traducirDate(item.fecha_fin_insc_asesorias),
      time: traducirTime(item.fecha_fin_insc_asesorias),
    },
    {
      label: 'Cursos Maximos por Alumno:',
      value: item.cursos_max_por_alumno,
    },
    {
      label: 'Idiomas Maximos por Alumno:',
      value: item.idiomas_max_por_alumno,
    },
    {
      label: 'Profesores inscritos:',
      value: encontrarProfes(dataClase, item.clave),
    },
    {
      label: 'Alumnos inscritos:',
      value: encontrarAlumnos(dataClase, item.clave),
    },
    {
      label: 'Clases inscritas:',
      value: encontrarClases(dataClase, item.clave),
    },
  ];

  return (
    <Card key={item._id} sx={{ minWidth: 275, bgcolor: 'grey.200' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.clave}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.status}
        </Typography>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <h5 className="leyendaFaltas">{field.label}</h5>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {field.date && `Fecha: ${field.date}\n`}
              {field.time && `Hora: ${field.time}\n`}
              {field.value}
            </Typography>
          </React.Fragment>
        ))}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => seleccionarConsola(item, 'Editar')}
        >
          Editar
        </Button>
        <div className="spacer-botones" />
        <Button
          variant="contained"
          color="error"
          onClick={() => seleccionarConsola(item, 'Eliminar')}
        >
          Borrar Periodo
        </Button>
      </CardActions>
    </Card>
  );
}

export default PeriodoCard;
