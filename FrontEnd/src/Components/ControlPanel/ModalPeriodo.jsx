import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; 
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import moment from 'moment';

import {
  createPeriodo, deletePeriodos, getPeriodos, updatePeriodo,
} from '../../api/Periodos';

dayjs.locale('es'); 

function ModalPeriodo({
  openModal,
  setOpenModal,
  refreshData,

}) {
  // const fields = [
  //   { name: 'clave', label: 'Clave' },
  //   { name: 'status', label: 'Status' },
  //   { name: 'fecha_inicio', label: 'Fecha de inicio', type: 'datetime-local' },
  //   { name: 'fecha_fin', label: 'Fecha de fin', type: 'datetime-local' },
  //   { name: 'fecha_inicio_insc_talleres', label: 'Fecha de inicio de incripciones de talleres', type: 'datetime-local' },
  //   { name: 'fecha_fin_insc_talleres', label: 'Fecha de fin de inscripciones de talleres', type: 'datetime-local' },
  //   { name: 'fecha_inicio_insc_idiomas', label: 'Fecha de inicio de incripciones de idiomas', type: 'datetime-local' },
  //   { name: 'fecha_fin_insc_idiomas', label: 'Fecha de fin de inscripciones de idiomas', type: 'datetime-local' },
  //   { name: 'fecha_inicio_insc_asesorias', label: 'Fecha de inicio de incripciones de asesorias', type: 'datetime-local' },
  //   { name: 'fecha_fin_insc_asesorias', label: 'Fecha de fin de inscripciones de asesorias', type: 'datetime-local' },
  //   { name: 'cursos_max_por_alumno', label: 'Cursos Maximos por Alumno' },
  //   { name: 'idiomas_max_por_alumno', label: 'Idiomas Max' },
  // ];


  const [form_data, setForm_data] = useState({
    clave: openModal.type === 'Editar' ? openModal.item?.clave : '',
    status: openModal.type === 'Editar' ? openModal.item?.status : '',
    fecha_inicio: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio).toISOString().slice(0, 16) : '',
    fecha_fin: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin).toISOString().slice(0, 16) : '',
    fecha_inicio_insc_talleres: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_talleres).toISOString().slice(0, 16) : '',
    fecha_fin_insc_talleres: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_talleres).toISOString().slice(0, 16) : '',
    fecha_inicio_insc_idiomas: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_idiomas).toISOString().slice(0, 16) : '',
    fecha_fin_insc_idiomas: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_idiomas).toISOString().slice(0, 16) : '',
    fecha_inicio_insc_asesorias: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_asesorias).toISOString().slice(0, 16) : '',
    fecha_fin_insc_asesorias: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_asesorias).toISOString().slice(0, 16) : '',
    cursos_max_por_alumno: openModal.type === 'Editar' ? openModal.item?.cursos_max_por_alumno : '',
    idiomas_max_por_alumno: openModal.type === 'Editar' ? openModal.item?.idiomas_max_por_alumno : '',

  })

  
  function formatDateString(originalDateString) {
    return `${originalDateString}:00.000Z`;
  }

  const addPeriodo = async () => {
    console.log('>>', form_data)
    await createPeriodo({
      clave: form_data.clave,
      status: form_data.status,
      //moment(new Date(form_data.fecha_inicio)).tz('UTC').toISOString()
      fecha_inicio: formatDateString(form_data.fecha_inicio),
      fecha_fin: formatDateString(form_data.fecha_fin),
      fecha_inicio_insc_talleres: formatDateString(form_data.fecha_inicio_insc_talleres),
      fecha_fin_insc_talleres: formatDateString(form_data.fecha_fin_insc_talleres),
      fecha_inicio_insc_idiomas: formatDateString(form_data.fecha_inicio_insc_idiomas),
      fecha_fin_insc_idiomas: formatDateString(form_data.fecha_fin_insc_idiomas),
      fecha_inicio_insc_asesorias: formatDateString(form_data.fecha_inicio_insc_asesorias),
      fecha_fin_insc_asesorias: formatDateString(form_data.fecha_fin_insc_asesorias),
      cursos_max_por_alumno: form_data.cursos_max_por_alumno,
      idiomas_max_por_alumno: form_data.idiomas_max_por_alumno,

    });
    setOpenModal({ open: false, type: '' });

    setForm_data({
      clave: '',
      status: '',
      fecha_inicio: '',
      fecha_fin: '',
      fecha_inicio_insc_talleres: '',
      fecha_fin_insc_talleres: '',
      fecha_inicio_insc_idiomas: '',
      fecha_fin_insc_idiomas: '',
      fecha_inicio_insc_asesorias: '',
      fecha_fin_insc_asesorias: '',
      cursos_max_por_alumno: '',
      idiomas_max_por_alumno: '',
    })

  };

  const deletePeriodo = async (id) => {

    await deletePeriodos({
      _id: openModal.id,
    });

    setOpenModal({ open: false, type: '' });
    setForm_data({
      clave: '',
      status: '',
      fecha_inicio: '',
      fecha_fin: '',
      fecha_inicio_insc_talleres: '',
      fecha_fin_insc_talleres: '',
      fecha_inicio_insc_idiomas: '',
      fecha_fin_insc_idiomas: '',
      fecha_inicio_insc_asesorias: '',
      fecha_fin_insc_asesorias: '',
      cursos_max_por_alumno: '',
      idiomas_max_por_alumno: '',
    })
  };


  


  const updatePeriodoData = async () => {
    await updatePeriodo({
      _id: openModal.id,
      clave: form_data.clave,
      status: form_data.status,
      fecha_inicio: formatDateString(form_data.fecha_inicio),
      fecha_fin: formatDateString(form_data.fecha_fin),
      fecha_inicio_insc_talleres: formatDateString(form_data.fecha_inicio_insc_talleres),
      fecha_fin_insc_talleres: formatDateString(form_data.fecha_fin_insc_talleres),
      fecha_inicio_insc_idiomas: formatDateString(form_data.fecha_inicio_insc_idiomas),
      fecha_fin_insc_idiomas: formatDateString(form_data.fecha_fin_insc_idiomas),
      fecha_inicio_insc_asesorias: formatDateString(form_data.fecha_inicio_insc_asesorias),
      fecha_fin_insc_asesorias: formatDateString(form_data.fecha_fin_insc_asesorias),
      cursos_max_por_alumno: form_data.cursos_max_por_alumno,
      idiomas_max_por_alumno: form_data.idiomas_max_por_alumno,
    });
    setOpenModal({ open: false, type: '' });
    setForm_data({
      clave: '',
      status: '',
      fecha_inicio: '',
      fecha_fin: '',
      fecha_inicio_insc_talleres: '',
      fecha_fin_insc_talleres: '',
      fecha_inicio_insc_idiomas: '',
      fecha_fin_insc_idiomas: '',
      fecha_inicio_insc_asesorias: '',
      fecha_fin_insc_asesorias: '',
      cursos_max_por_alumno: '',
      idiomas_max_por_alumno: '',
    })
  };




  const handleChange = (e) => {
    setForm_data({
      ...form_data,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    console.log("form_data", form_data);
    console.log("openModal", openModal.item);


  }, [form_data])
  

  


  useEffect(() => {
    setForm_data({
      clave: openModal.type === 'Editar' ? openModal.item?.clave : '',
      status: openModal.type === 'Editar' ? openModal.item?.status : '',

      ///new Date(form_data?.fecha_fin_insc_idiomas).toISOString().slice(0, 16);
      fecha_inicio: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio).toISOString().slice(0, 16) : '',
      fecha_fin: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin).toISOString().slice(0, 16) : '',
      fecha_inicio_insc_talleres: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_talleres).toISOString().slice(0, 16) : '',
      fecha_fin_insc_talleres: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_talleres).toISOString().slice(0, 16) : '',
      fecha_inicio_insc_idiomas: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_idiomas).toISOString().slice(0, 16) : '',
      fecha_fin_insc_idiomas: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_idiomas).toISOString().slice(0, 16) : '',
      fecha_inicio_insc_asesorias: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_inicio_insc_asesorias).toISOString().slice(0, 16) : '',
      fecha_fin_insc_asesorias: openModal.type === 'Editar' ? new Date(openModal.item?.fecha_fin_insc_asesorias).toISOString().slice(0, 16) : '',
      cursos_max_por_alumno: openModal.type === 'Editar' ? openModal.item?.cursos_max_por_alumno : '',
      idiomas_max_por_alumno: openModal.type === 'Editar' ? openModal.item?.idiomas_max_por_alumno : '',
    })


  }, [openModal])




  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: openModal.type === 'Eliminar' ? '60%' : '680px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openModal.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        setOpenModal({ open: false, type: '' })
        setForm_data({
          clave: '',
          status: '',
          fecha_inicio: '',
          fecha_fin: '',
          fecha_inicio_insc_talleres: '',
          fecha_fin_insc_talleres: '',
          fecha_inicio_insc_idiomas: '',
          fecha_fin_insc_idiomas: '',
          fecha_inicio_insc_asesorias: '',
          fecha_fin_insc_asesorias: '',
          cursos_max_por_alumno: '',
          idiomas_max_por_alumno: '',
        })

      }}

    >
      <Card sx={style}>

 
        <Typography variant="h5" component="div">
          {openModal.type === 'Eliminar'
            ? 'Estas seguro de borrar este periodo?'
            : 'Ingrese los nuevos datos'}
        </Typography>

        <div className="spacer" />
        <div>
          {/* {operation !== 'Eliminar' && fields.map((field) => (
            <TextField
              key={field.name}
              style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
              label={field.label}
              name={field.name}
              defaultValue={periodoActual?.[field.name]}
              type={field.type}
              InputLabelProps={field.type && { shrink: true }}
              onChange={handleChange}
            />
          ))} */}

          {openModal.type !== 'Eliminar' ?

            <div
              key={openModal}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">


              <TextField
                style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 , marginRight: 20}}
                label="Clave"
                name="clave"
                value={form_data.clave}
                onChange={handleChange}
              />

              <TextField
                style={{ fontFamily: 'arial', width: 281}}
             
                select
                value={form_data?.status}
                label="Estatus"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={"Activo"}>Activo</MenuItem>
                <MenuItem value={"Inactivo"}>Inactivo</MenuItem>

              </TextField>

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                label="Fecha de inicio"
                name="fecha_inicio"
                value={form_data?.fecha_inicio ? dayjs(form_data.fecha_inicio) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_inicio: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281, marginLeft: '1.3rem' }}
                label="Fecha de fin"
                name="fecha_fin"
                value={form_data?.fecha_fin ? dayjs(form_data.fecha_fin) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_fin: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                label="Inicio incripciones talleres"
                name="fecha_inicio_insc_talleres"
                value={form_data?.fecha_inicio_insc_talleres ? dayjs(form_data.fecha_inicio_insc_talleres) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_inicio_insc_talleres: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281, marginLeft: '1.3rem'}}
                label="Fin inscripciones talleres"
                name="fecha_fin_insc_talleres"
                value={form_data?.fecha_fin_insc_talleres ? dayjs(form_data.fecha_fin_insc_talleres) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_fin_insc_talleres: formattedDate });
                }}

              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                label="Inicio incripciones idiomas"
                name="fecha_inicio_insc_idiomas"
                value={form_data?.fecha_inicio_insc_idiomas ? dayjs(form_data.fecha_inicio_insc_idiomas) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_inicio_insc_idiomas: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281, marginLeft: '1.3rem'}}
                label="Fin inscripciones idiomas"
                name="fecha_fin_insc_idiomas"
                value={form_data?.fecha_fin_insc_idiomas ? dayjs(form_data.fecha_fin_insc_idiomas) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_fin_insc_idiomas: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                label="Inicio incripciones asesorias"
                name="fecha_inicio_insc_asesorias"
                value={form_data?.fecha_inicio_insc_asesorias ? dayjs(form_data.fecha_inicio_insc_asesorias) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_inicio_insc_asesorias: formattedDate });
                }}
              />

              <DateTimePicker
                sx={{ paddingBottom: '15px', fontFamily: 'arial', width: 281, marginLeft: '1.3rem'}}
                label="Fin inscripciones asesorias"
                name="fecha_fin_insc_asesorias"
                value={form_data?.fecha_fin_insc_asesorias ? dayjs(form_data.fecha_fin_insc_asesorias) : null}
                textField={(props) => (
                  <TextField
                    {...props}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                      style: { textAlign: 'center' }, // Alinear el texto al centro
                    }}
                  />
                )}
                ampm={false}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                  setForm_data({ ...form_data, fecha_fin_insc_asesorias: formattedDate });
                }}
              />

              <TextField
                style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281  , marginRight: 20}}
                label="Cursos Maximos por Alumno"
                name="cursos_max_por_alumno"
                value={form_data?.cursos_max_por_alumno}
                onChange={handleChange}
              />

              <TextField
                style={{ paddingBottom: '15px', fontFamily: 'arial', width: 281 }}
                label="Idiomas Max"
                name="idiomas_max_por_alumno"
                value={form_data.idiomas_max_por_alumno}
                onChange={handleChange}
              />
            </ LocalizationProvider>
            </div> : null
          }
          <br />


          <Button

            color={openModal.type === 'Eliminar' ? 'primary' : 'error'}
            variant="contained"
            onClick={() => {
              setOpenModal({ open: false, type: '' })
              setForm_data({
                clave: '',
                status: '',
                fecha_inicio: '',
                fecha_fin: '',
                fecha_inicio_insc_talleres: '',
                fecha_fin_insc_talleres: '',
                fecha_inicio_insc_idiomas: '',
                fecha_fin_insc_idiomas: '',
                fecha_inicio_insc_asesorias: '',
                fecha_fin_insc_asesorias: '',
                cursos_max_por_alumno: '',
                idiomas_max_por_alumno: '',

              })

            }

            }
          >
            Cancelar
          </Button>



          <div style={{ width: '30px', display: 'inline-block' }} />

          <Button
            color={openModal.type === 'Eliminar' ? 'error' : 'primary'}
            variant="contained"

            onClick={() => {
              if (openModal.type === 'Eliminar') {
                deletePeriodo(openModal.id);
              } else if (openModal.type === 'Editar') {

                updatePeriodoData ();

              }
              else {
                addPeriodo();
              }
            }}
          >
            {openModal.type === 'Eliminar' ? 'Eliminar' : 'Guardar'}
          </Button>


        </div>
      </Card>
    </Modal>
  );
}

export default ModalPeriodo;
