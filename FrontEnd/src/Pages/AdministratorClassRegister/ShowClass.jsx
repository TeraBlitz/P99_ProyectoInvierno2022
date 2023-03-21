import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Actions from '../../Components/Clase/Actions';
import WaitList from '../../Components/Clase/WaitList';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import {
  createClass, deleteClasses, getClasses, updateClass,
} from '../../api/classes.js';
import {
  classAtributes, dayAtributes, niveloptions, classTemplate,
} from '../../utils/constants';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';

export default function ShowClass() {
  let id = '';
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [data, setData] = useState([]);
  const [guardaData, setGuardaData] = useState([]);
  const [profesorList, setProfesorList] = useState([
    {
      nombreProfesor: '',
      matriculaProfesor: '',
      apellidoProfesor: '',
      nombreCompleto: '',
      correo: '',
    },
  ]);
  const [currentProfesor, setCurrentProfesor] = useState({
    nombreProfesor: '',
    matriculaProfesor: '',
    apellidoProfesor: '',
    nombreCompleto: '',
    correo: '',
  });
  const [nuevaClase, setNuevaClase] = useState(classTemplate);
  const [claseActual, setClaseActual] = useState({
    _id: '',
    clave: '',
    nombre_curso: '',
    nivel: '',
    matriculaProfesor: '',
    edades: '',
    cupo_maximo: '',
    modalidad: '',
    fechas: '',
    niveles: '',
    nombreCompleto: '',
    nombreProfesor: '',
    apellidoProfesor: '',
  });
  const [currentClase, setCurrentClase] = useState(null);
  const [currentWaitList, setCurrentWaitList] = useState(null);
  const [pageSize, SetPageSize] = useState(5);
  const [items, setItems] = useState([]);
  const [clase, setClase] = useState(claseActual);

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalWaitList, setOpenModalWaitList] = useState(false);

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const handleSelectChange = (event) => {
    const array = [];
    const array2 = [];

    array2.push(data.filter((data) => data.clavePeriodo === event.label));

    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[i].length; j++) {
        array.push(array2[i][j]);
      }
    }

    if (array.length > 0) {
      setData(array);
    } else {
      resetClases();
    }
  };

  const getOptions = async () => {
    await getProfesors().then((response) => response.json()).then((result) => {
      const newProfList = [];
      result.forEach((profesor) => {
        profesor.nombreCompleto = `${profesor.nombre} ${profesor.apellidos}`;
        newProfList.push(profesor);
      });
      setProfesorList(newProfList);
    });
  };

  const resetClases = async () => {
    try {
      const response = await getClasses();
      const result = await response.json();
  
      const dataList = result.map((clase) => {
        let fechas = '';
        let edades = '';
        let niveles = '';
  
        if (clase.lunes !== '') fechas += 'lunes, ';
        if (clase.martes !== '') fechas += 'martes, ';
        if (clase.miercoles !== '') fechas += 'miercoles, ';
        if (clase.jueves !== '') fechas += 'jueves, ';
        if (clase.viernes !== '') fechas += 'viernes, ';
        if (clase.sabado !== '') fechas += 'sabado, ';
  
        edades =
          clase.edad_maxima === ''
            ? `${clase.edad_minima} en Adelante`
            : `${clase.edad_minima}-${clase.edad_maxima}`;
  
        switch (clase.nivel) {
          case '1':
            niveles = 'desde cero';
            break;
          case '2':
            niveles = 'con bases';
            break;
          case '3':
            niveles = 'intermedio';
            break;
          case '4':
            niveles = 'avanzado';
            break;
          default:
            niveles = '';
        }
  
        return {
          _id: clase._id,
          clave: clase.clave,
          nombre_curso: clase.nombre_curso,
          nivel: clase.nivel,
          matriculaProfesor: clase.matriculaProfesor,
          edades,
          edad_minima: clase.edad_minima,
          edad_maxima: clase.edad_maxima,
          cupo_maximo: clase.cupo_maximo,
          modalidad: clase.modalidad,
          fechas,
          lunes: clase.lunes,
          martes: clase.martes,
          miercoles: clase.miercoles,
          jueves: clase.jueves,
          viernes: clase.viernes,
          sabado: clase.sabado,
          clavePeriodo: clase.clavePeriodo,
          area: clase.area,
          cupo_actual: clase.cupo_actual,
          niveles,
          nombreProfesor: clase.nombreProfesor,
          apellidosProfesor: clase.apellidosProfesor,
          nombreCompleto: `${clase.nombreProfesor} ${clase.apellidosProfesor}`,
        };
      });
  
      setData(dataList);
      getOptions();
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    resetClases();
  }, []);

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleChangeProfesor = (p) => {
    profesorList.forEach((e) => {
      if (e.nombreCompleto == p.target.value) {
        setCurrentProfesor(e);
      }
    });
  };

  const editClasses = (clase) => {
    setClaseActual(clase);
    profesorList.forEach((e) => {
      if (e.nombreCompleto == clase.nombreCompleto) {
        setCurrentProfesor(e);
      }
    });

    abrirCerrarModalEditar();
  };

  useEffect(() => {
    setClase(claseActual);
    getAllPeriodos();
  }, [claseActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  const mapNiveles = (clase) => {
    const nivelesMap = {
      'desde cero': '1',
      'con bases': '2',
      'intermedio': '3',
      'avanzado': '4',
    };
  
    const claseModificada = { ...clase };
    claseModificada.nombreProfesor = currentProfesor.nombre;
    claseModificada.matriculaProfesor = currentProfesor.matricula;
    claseModificada.apellidosProfesor = currentProfesor.apellidos;
    delete claseModificada.nombreCompleto;
    delete claseModificada.fechas;
    delete claseModificada.edades;
  
    if (claseModificada.niveles in nivelesMap) {
      claseModificada.nivel = nivelesMap[claseModificada.niveles];
    }
  
    delete claseModificada.niveles;
    return claseModificada;
  };
  
  const postCrea = async (e) => {
    e.preventDefault();
    const nuevaClase = mapNiveles(nuevaClase);
    createClass(nuevaClase).then(() => {
      abrirCerrarModalInsertar();
      resetClases();
    });
  };
  
  const postEditar = (e) => {
    e.preventDefault();
    const nuevaClase = mapNiveles(clase);
    updateClass(nuevaClase).then(() => {
      abrirCerrarModalEditar();
      resetClases();
    });
  };

  const postDelete = async (e) => {
    try {
      await deleteClasses({
        _id: nuevaClase._id,
      });
      abrirCerrarModalEliminar();
      resetClases();
    } catch (error) {
      console.log(error);
    }
  };

  const seleccionarClase = (consola, caso) => {
    // setNuevaClase(consola);
    id = consola._id;
    if (caso === 'Crear') {
        
    } else if (caso === 'Editar') {
      editClasses(consola);
    } else if (caso === 'Eliminar') {
      abrirCerrarModalEliminar();
    }
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const addClass = () => {
    setCurrentProfesor({
      nombre: '',
      matricula: '',
      apellido: '',
      nombreCompleto: '',
      correo: '',
    });
    abrirCerrarModalInsertar();
  };

  const getClassWaitList = (clase) => {
    let waitList = [];
    let students = [];
    const result = [];
    getStudents().then((response) => response.json()).then((data) => {
      students = data;
    }).then(() => {
      getWaitList().then((response) => response.json()).then((data) => {
        waitList = data.filter((lista) => lista.idClase === clase._id);
        waitList.map((inWaitList) => {
          for (let i = 0; i < students.length; i++) {
            if (inWaitList.idAlumno === students[i]._id) {
              result.push({
                _id: inWaitList._id,
                studentName: `${students[i].nombre} ${students[i].apellido_paterno} ${students[i].apellido_materno}`,
                time_stamp: inWaitList.time_stamp,
              });
            }
          }
        });
        result.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        setCurrentWaitList(result);
        setCurrentClase(clase);
        setOpenModalWaitList(true);
      });
    });
  };

  const columns = useMemo(
    () => [
      { field: 'clave', headerName: 'Clave', width: 68 },
      { field: 'nombre_curso', headerName: 'Curso', width: 80 },
      { field: 'niveles', headerName: 'Nivel', width: 95 },
      {
        field: 'nombreCompleto',
        headerName: 'Profesor',
        width: 150,
        sortable: false,
      },
      { field: 'cupo_maximo', headerName: 'Capacidad', width: 90 },
      { field: 'edades', headerName: 'Edades', width: 70 },
      { field: 'fechas', headerName: 'Fechas', width: 200 },
      { field: 'modalidad', headerName: 'Modalidad', width: 88 },
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        width: 125,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola: seleccionarClase }} />,
      },
      {
        field: 'wait_list',
        headerName: 'Lista Espera',
        type: 'actions',
        width: 150,
        renderCell: (params) => (
          <Button size="small" onClick={() => getClassWaitList(params.row)}>Lista Espera</Button>
        ),
      },
    ],
    [data, profesorList],
  );

  const bodyInsertar = (
    <div
      style={{
        position: 'absolute',
        width: 520,
        height: '95vh',
        backgroundColor: '#fefefd',
        top: '48%',
        left: '50%',
        transform: 'translate(-48%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
      }}
    >
      <h3
        style={{
          paddingBottom: '15px',
          marginTop: '5px',
          fontFamily: 'arial',
          width: '100%',
        }}
        align="center"
      >
        Crear una nueva clase
      </h3>
      {classAtributes.map((atribute) => (
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          label={atribute.value}
          onChange={(e) => {
            handleChange(e);
          }}
          name={atribute.key}
          key={atribute.key}
          value={nuevaClase[atribute.key]}
          autoFocus
        />
      ))}
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Modalidad"
        value={nuevaClase.modalidad}
        name="modalidad"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {['presencial', 'online'].map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Nivel"
        value={nuevaClase.niveles}
        name="niveles"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {niveloptions.map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{ textAlign: 'center', marginTop: '10px', width: '100%' }}
        >
          Horarios
        </Typography>
        {dayAtributes.map((atribute) => (
          <TextField
            style={{
              paddingBottom: '15px',
              fontFamily: 'arial',
              marginRight: 10,
              width: '40%',
            }}
            label={atribute.value}
            onChange={(e) => {
              handleChange(e);
            }}
            name={atribute.key}
            key={atribute.key}
            value={nuevaClase[atribute.key]}
            autoFocus
          />
        ))}
      </div>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
        }}
      >
        <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>
          Datos del profesor
        </Typography>
        <br />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '100%',
          }}
          label="Profesor"
          value={currentProfesor.nombreCompleto}
          name="nombreCompleto"
          onChange={(e) => {
            handleChangeProfesor(e);
          }}
          select
        >
          {profesorList.map((e) => (
            <MenuItem value={`${e.nombre} ${e.apellidos}`} key={e._id}>
              {`${e.nombre} ${e.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          variant="filled"
          label="Matricula"
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.matricula}
          defaultValue={currentProfesor.matricula}
        />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.correo}
          defaultValue={currentProfesor.correo}
          variant="filled"
          label="Correo"
        />
      </div>
      <div align="center" style={{ width: '100%' }}>
        <Button color="primary" onClick={postCrea}>
          Insertar
        </Button>
        <Button onClick={abrirCerrarModalInsertar} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div
      style={{
        position: 'absolute',
        width: 520,
        height: '95vh',
        backgroundColor: '#fefefd',
        top: '48%',
        left: '50%',
        transform: 'translate(-48%, -50%)',
        border: '4px solid  rgb(165, 165, 180)',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
      }}
    >
      <h3
        style={{
          paddingBottom: '15px',
          marginTop: '5px',
          fontFamily: 'arial',
          width: '100%',
        }}
        align="center"
      >
        Actualizar una clase
      </h3>
      {classAtributes.map((atribute) => (
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          label={atribute.value}
          onChange={(e) => {
            handleChange(e);
          }}
          name={atribute.key}
          key={atribute.key}
          value={clase[atribute.key]}
          autoFocus
        />
      ))}
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Modalidad"
        value={clase.modalidad}
        name="modalidad"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {['presencial', 'online'].map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={{
          paddingBottom: '15px',
          fontFamily: 'arial',
          marginRight: 10,
          width: '40%',
        }}
        label="Nivel"
        value={clase.niveles}
        name="niveles"
        onChange={(e) => {
          handleChange(e);
        }}
        select
      >
        {niveloptions.map((e) => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{ textAlign: 'center', marginTop: '10px', width: '100%' }}
        >
          Horarios
        </Typography>
        {dayAtributes.map((atribute) => (
          <TextField
            style={{
              paddingBottom: '15px',
              fontFamily: 'arial',
              marginRight: 10,
            }}
            label={atribute.value}
            onChange={(e) => {
              handleChange(e);
            }}
            name={atribute.key}
            key={atribute.key}
            value={clase[atribute.key]}
            autoFocus
          />
        ))}
      </div>
      <div
        style={{
          width: '100%',
          borderTop: '1px solid gray',
          paddingTop: '5px',
        }}
      >
        <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>
          Datos del profesor
        </Typography>
        <br />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '100%',
          }}
          label="Profesor"
          value={currentProfesor.nombreCompleto}
          name="nombreCompleto"
          onChange={(e) => {
            handleChangeProfesor(e);
          }}
          select
        >
          {profesorList.map((e) => (
            <MenuItem value={`${e.nombre} ${e.apellidos}`} key={e._id}>
              {`${e.nombre} ${e.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.matricula}
          defaultValue={currentProfesor.matricula}
          variant="filled"
          label="matricula"
        />
        <TextField
          style={{
            paddingBottom: '15px',
            fontFamily: 'arial',
            marginRight: 10,
            width: '40%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={currentProfesor.correo}
          defaultValue={currentProfesor.correo}
          variant="filled"
          label="correo"
        />
      </div>
      <div align="center" style={{ width: '100%' }}>
        <Button color="primary" onClick={postEditar}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModalEditar} color="error">
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
        height: 220,
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
        Esta clase  y toda su información relacionada a ella va a ser eliminada
      </Typography>
      <br />
      <br />
      <div align="center">
        <Button color="error" onClick={postDelete}>
          Confirmar
        </Button>
        <Button onClick={abrirCerrarModalEliminar} color="primary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <div>
        <HeaderInscripcionClase 
            data={data}
            addClass={addClass}
            resetClases={resetClases}
            dataPeriodo={dataPeriodo}
            handleSelectChange={handleSelectChange}
        />
      <Card
        sx={{
          width: 1140,
          position: 'absolute',
          textAlign: 'left',
          marginLeft: '50px',
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
            sx={{ textAlign: 'left', fontFamily: 'arial', marginLeft: '15px' }}
          >
            Filtros
          </Typography>
          <TextField
            style={{
              paddingBottom: '5px', fontFamily: 'arial', marginLeft: '10px', width: 330,
            }}
            label="Curso"
            onChange={(e) => {
              setItems([
                {
                  columnField: 'nombre_curso',
                  operatorValue: 'contains',
                  value: e.target.value,
                },
              ]);
            }}
          />
          <TextField
            style={{
              paddingBottom: '5px', fontFamily: 'arial', marginLeft: '54px', width: 330,
            }}
            label="Nivel"
            onChange={(e) => {
              setItems([
                {
                  columnField: 'niveles',
                  operatorValue: 'contains',
                  value: e.target.value,
                },
              ]);
            }}
          />
          <TextField
            style={{
              paddingBottom: '5px', fontFamily: 'arial', marginLeft: '40px', width: 330,
            }}
            label="Profesor"
            onChange={(e) => {
              setItems([
                {
                  columnField: 'nombreCompleto',
                  operatorValue: 'contains',
                  value: e.target.value,
                },
              ]);
            }}
          />
        </CardContent>
      </Card>
      <Box sx={{
        position: 'absolute',
        height: '60vh',
        width: '1140px',
        marginTop: '280px',
        marginLeft: '50px',
      }}
      >
        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
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
      </Box>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
      <Modal
        open={modalWaitList}
        onClose={() => setOpenModalWaitList(!modalWaitList)}
        sx={{
          height: '100vh',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          overflowY: 'scroll',
        }}
      >
        <WaitList clase={currentClase} waitList={currentWaitList} />
      </Modal>
    </div>
  );
}
