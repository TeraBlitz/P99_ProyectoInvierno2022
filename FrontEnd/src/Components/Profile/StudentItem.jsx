/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Modal from '@mui/material/Modal';
import CardActionArea from '@mui/material/CardActionArea';
import ExamenSocioeconomico from '../Formularios/ExamenSocioeconomico';
import { getAlumnoFormularioById } from '../../api/alumnoFormularios';
import { EXAMEN_SOCIOECONOMICO_ID } from '../../utils/constants';
import { CircularProgress } from '@mui/material';

function StudentItem({
  studentInfo, name, first_lastname, second_lastname, editStudent, setCurrentStudent, handleOpenDialog, setIsEditing,
}) {
  const [successCreateOpen, setSuccessCreateOpen] = useState(false);
  const [formularioCompleto, setFormularioCompleto] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFormulario = async () => {
      try {
        setLoading(true);
        getAlumnoFormularioById(studentInfo._id, EXAMEN_SOCIOECONOMICO_ID)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setFormularioCompleto(true);
            }
            setLoading(false);
          });
      } catch (error) {
        console.error('Error fetching formulario:', error);
      }
    };
    getFormulario();
  }, []);
  const openDelete = () => {
    setCurrentStudent(studentInfo);
    handleOpenDialog();
  };

  const openEdit = () => {
    setIsEditing(true);
    editStudent(studentInfo);
  };

  return (
    <Card sx={{
      my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    }}
    >
      <Box>
        <CardActionArea onClick={() => editStudent(studentInfo)}>
          <CardContent>
            <Typography variant="body2" component="div">
              {name}
              {' '}
              {first_lastname}
              {' '}
              {second_lastname}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
      <Box>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress /> : formularioCompleto ? <TaskAltIcon /> : <HighlightOffIcon />}
          onClick={() => setSuccessCreateOpen(true)}
          size="small"
          color={formularioCompleto ? 'success' : 'warning'}
          disabled={formularioCompleto || loading}
          sx={{ mx: 1 }}
        >
          Examen Socioeconomico
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => openEdit()}
          size="small"
        >
          EDITAR
        </Button>
        <IconButton aria-label="delete" color="error" onClick={() => openDelete()}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Modal
        open={successCreateOpen}
        onClose={() => setSuccessCreateOpen(false)}
        sx={{ overflow: 'scroll' }}
      >
        <ExamenSocioeconomico setSuccessCreateOpen={setSuccessCreateOpen} idAlumno={studentInfo._id} setFormularioCompleto={setFormularioCompleto}/>
      </Modal>
    </Card>
  );
}

export default StudentItem;
