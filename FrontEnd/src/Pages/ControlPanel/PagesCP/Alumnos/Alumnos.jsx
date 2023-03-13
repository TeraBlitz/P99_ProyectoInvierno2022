import React, { useState, useEffect, useMemo } from 'react';
import {
  Button, Modal, TextField, Box, Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CSVLink } from 'react-csv';
import Select from 'react-select';
import Actions from '../../../../Components/ControlPanel/Alumnos/ActAlumnos';
import { deleteStudent, getStudents, updateStudent } from '../../../../api/students';
import { getPeriodos } from '../../../../api/Periodos';
import { getClassStudent } from '../../../../api/classStudent';
import { alumnoVacio } from '../../../../utils/constants';
import MasInformacionAlumno from '../../../../Components/ControlPanel/Alumnos/MasInformacionAlumno';
import HeaderAlumnos from '../../../../Components/ControlPanel/Alumnos/HeaderAlumnos';

export default function Alumnos() {
  const [studentData, setStudentData] = useState([]);
  const [originalStudentData, setOriginalStudentData] = useState([]);
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);
  const [items, setItems] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnoVacio);
  const [pageSize, SetPageSize] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const getAlumnos = async () => {
    await getStudents().then((response) => response.json()).then((result) => {
      setStudentData(result);
      setOriginalStudentData(result);
    });
  };

  const getAllPeriodos = async () => {
    await getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const getAlumnoClase = async () => {
    await getClassStudent().then((response) => response.json()).then((result) => {
      setDataAlumnoClase(result);
    });
  };

  useEffect(() => {
    getAlumnos();
    getAllPeriodos();
    getAlumnoClase();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumnoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const abrirCerrarModal = () => {
    if (openModal) {
      setAlumnoSeleccionado(alumnoVacio);
    }
    setOpenModal(!openModal);
  };

  const seleccionarConsola = (consola, caso) => {
    setAlumnoSeleccionado(consola);
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOperation === 'Eliminar') {
        await deleteStudent({
          _id: alumnoSeleccionado._id,
        });
      } else {
        await updateStudent({
          _id: alumnoSeleccionado._id,
          clave_unica_identificacion: alumnoSeleccionado.clave_unica_identificacion,
          curp: alumnoSeleccionado.curp,
          nombre: alumnoSeleccionado.nombre,
          apellido_paterno: alumnoSeleccionado.apellido_paterno,
          apellido_materno: alumnoSeleccionado.apellido_materno,
          fecha_de_nacimiento: alumnoSeleccionado.fecha_de_nacimiento,
          tutor_nombre: alumnoSeleccionado.tutor_nombre,
          tutor_apellido_paterno: alumnoSeleccionado.tutor_apellido_paterno,
          tutor_apellido_materno: alumnoSeleccionado.tutor_apellido_materno,
          tutor_correo: alumnoSeleccionado.tutor_correo,
          tutor_num_telefono: alumnoSeleccionado.tutor_num_telefono,
          num_telefono: alumnoSeleccionado.num_telefono,
          pais: alumnoSeleccionado.pais,
          estado: alumnoSeleccionado.estado,
          ciudad: alumnoSeleccionado.ciudad,
          colonia: alumnoSeleccionado.colonia,
          codigo_postal: alumnoSeleccionado.codigo_postal,
          escolaridad: alumnoSeleccionado.escolaridad,
          ultima_escuela: alumnoSeleccionado.ultima_escuela,
        });
      }
    } catch (error) {
      console.log(error);
    }
    abrirCerrarModal();
    getAlumnos();
  };

  const bodyEditar = (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: 620,
        backgroundColor: '#fefefd',
        top: '48%',
        left: '50%',
        transform: 'translate(-48%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h3
        style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
        align="center"
      >
        Actualizar Alumnos
      </h3>
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Nombre"
        onChange={handleChange}
        name="nombre"
        value={alumnoSeleccionado?.nombre}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Apellido paterno"
        onChange={handleChange}
        name="apellido_paterno"
        value={alumnoSeleccionado?.apellido_paterno}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Apellido materno"
        onChange={handleChange}
        name="apellido_materno"
        value={alumnoSeleccionado?.apellido_materno}
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Estado"
        onChange={handleChange}
        name="estado"
        value={alumnoSeleccionado?.estado}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Ciudad"
        onChange={handleChange}
        name="ciudad"
        value={alumnoSeleccionado?.ciudad}
      />
      <br />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Escolaridad"
        onChange={handleChange}
        name="escolaridad"
        value={alumnoSeleccionado?.escolaridad}
      />
      <TextField
        style={{ paddingBottom: '15px', fontFamily: 'arial' }}
        label="Ultima escuela"
        onChange={handleChange}
        name="ultima_escuela"
        value={alumnoSeleccionado?.ultima_escuela}
      />
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={modalSubmit}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModal} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div
      style={{
        position: 'absolute',
        width: 260,
        height: 280,
        backgroundColor: '#fefefd',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h3
        style={{ paddingBottom: '15px', marginTop: '5px', fontFamily: 'arial' }}
        align="center"
      >
        Eliminar alumno
      </h3>
      <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
        {`El alumno llamado ${alumnoSeleccionado?.nombre} y
        todo lo relacionado a el se va a eliminar por completo. No vas a poder
        acceder a estos datos de nuevo.`}
      </Typography>
      <br />
      <br />
      <div align="center">
        <Button color="error" onClick={modalSubmit}>
          Confirmar
        </Button>
        <Button onClick={abrirCerrarModal} color="primary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        field: '_id', headerName: 'Id', width: 54, hide: true,
      },
      {
        field: 'clave_unica_identificacion',
        headerName: 'clave_unica_identificacion',
        width: 54,
        hide: true,
      },
      {
        field: 'curp', headerName: 'CURP', width: 200, hide: true,
      },
      { field: 'nombre', headerName: 'Nombre', width: 170 },
      { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 190 },
      { field: 'apellido_materno', headerName: 'Apellido Materno', width: 190 },
      { field: 'fecha_de_nacimiento', headerName: 'Nacimiento', width: 165 },
      {
        field: 'tutor_nombre',
        headerName: 'Tutor nombre',
        width: 124,
        hide: true,
      },
      {
        field: 'tutor_apellido_paterno',
        headerName: 'Tutor apellido paterno',
        width: 154,
        hide: true,
      },
      {
        field: 'tutor_apellido_materno',
        headerName: 'Tutor apellido materno',
        width: 160,
        hide: true,
      },
      {
        field: 'tutor_correo',
        headerName: 'Tutor correo',
        width: 154,
        hide: true,
      },
      {
        field: 'tutor_num_telefono',
        headerName: 'Tutor telefono',
        width: 104,
        hide: true,
      },
      { field: 'num_telefono', headerName: 'Telefono', width: 160 },
      {
        field: 'pais', headerName: 'Pais', width: 84, hide: true,
      },
      {
        field: 'estado', headerName: 'Estado', width: 84, hide: true,
      },
      {
        field: 'ciudad', headerName: 'Ciudad', width: 84, hide: true,
      },
      {
        field: 'colonia', headerName: 'Colonia', width: 84, hide: true,
      },
      {
        field: 'codigo_postal',
        headerName: 'codigo postal',
        width: 84,
        hide: true,
      },
      {
        field: 'escolaridad',
        headerName: 'Escolaridad',
        width: 84,
        hide: true,
      },
      {
        field: 'ultima_escuela',
        headerName: 'Ultima escuela',
        width: 104,
        hide: true,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        width: 200,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],
    [studentData],
  );

  const handleSelectChange = async (event) => {
    let array = [];
    let array2 = [];
    let array3 = [];

    const arrayrepeated = [];
    array2.push(dataAlumnoClase.filter((data) => data.idPeriodo === event.value));
    array2 = array2.filter((data) => data !== undefined);
    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[i].length; j++) {
        array.push(originalStudentData.filter((data) => data._id === array2[i][j].idAlumno && !arrayrepeated.includes(array2[i][j].idAlumno)));
        arrayrepeated.push(array2[i][j].idAlumno);
      }
    }
    array = array.filter((data) => data !== []);
    for (let i = 0; i < array.length; i++) {
      array3.push(array[i][0]);
    }
    array3 = array3.filter((data) => data !== undefined);
    if (array3.length > 0) {
      setStudentData(array3);
    } else {
      getAlumnos();
    }
  };

  return (
    <div>
      <HeaderAlumnos
      data={studentData}
      dataPeriodo={dataPeriodo}
      handleSelectChange={handleSelectChange}
      />
      <Card
        sx={{
          width: 1100,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '65px',
          marginTop: '120px',
          bgcolor: 'grey.200',
          borderRadius: '8px',
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: 'left', fontFamily: 'arial', marginLeft: 1 }}
          >
            Filtro
          </Typography>
          <TextField
            style={{
              paddingBottom: '10px',
              fontFamily: 'arial',
              width: 1050,
              marginLeft: 7,
            }}
            label="Ingrese un nombre para buscar"
            onChange={(e) => {
              setItems([
                {
                  columnField: 'nombre',
                  operatorValue: 'contains',
                  value: e.target.value,
                },
              ]);
            }}
          />
        </CardContent>
      </Card>
      <Box
        sx={{
          width: '1130px',
          padding: '15px',
          height: '450px',
          position: 'absolute',
          marginLeft: '50px',
          marginTop: '270px',
        }}
      >
        <DataGrid
          columns={columns}
          rows={studentData}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => SetPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
              fontFamily: 'arial',
            },
          }}
          disableSelectionOnClick
          filterModel={{
            items,
          }}
        />
        <Modal open={openModal} onClose={abrirCerrarModal}>
          <MasInformacionAlumno consolaSeleccionada={alumnoSeleccionado} />
        </Modal>
        <Modal open={openModal} onClose={abrirCerrarModal}>
          {bodyEditar}
        </Modal>
        <Modal open={openModal} onClose={abrirCerrarModal}>
          {bodyEliminar}
        </Modal>
      </Box>
    </div>
  );
}
