import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import { InsertDriveFile } from '@mui/icons-material';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import Actions from './Actions';
import WaitList from './WaitList';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import {
  createClass, deleteClasses, getClasses, updateClass,
} from '../../api/classes.js';
import { subirClases, subirProfes } from '../../api/csv';
import { classAtributes, dayAtributes, niveloptions, classTemplate } from '../../utils/constants';

export default function ShowClass() {
  let array = [];
  let array2 = [];
  let array3 = [];
  let id = '';
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [data, setData] = useState([]);
  const [guardaData, setGuardaData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
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
  const [modalEditar, setModalEditar] = useState(false);
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
  const [modalEliminar, setModalEliminar] = useState(false);
  const [openWaitList, setOpenWaitList] = useState(false);
  const [currentClase, setCurrentClase] = useState(null);
  const [currentWaitList, setCurrentWaitList] = useState(null);
  const [pageSize, SetPageSize] = useState(5);
  const [items, setItems] = useState([]);
  const [clase, setClase] = useState(claseActual);

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const handleSelectChange = (event) => {
    array = [];
    array2 = [];

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
      console.log(result);
      const newProfList = [];
      result.forEach((profesor) => {
        profesor.nombreCompleto = `${profesor.nombre} ${profesor.apellidos}`;
        newProfList.push(profesor);
      });
      setProfesorList(newProfList);
    });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const resetClases = async () => {
    let dataList = [];
    await getClasses()
      .then((response) => response.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          let fechas = '';
          let edades = '';
          let niveles = '';
          result[i].lunes != '' ? (fechas += 'lunes, ') : (fechas += '');
          result[i].martes != '' ? (fechas += 'martes, ') : (fechas += '');
          result[i].miercoles != ''
            ? (fechas += 'miercoles, ')
            : (fechas += '');
          result[i].jueves != '' ? (fechas += 'jueves, ') : (fechas += '');
          result[i].viernes != '' ? (fechas += 'viernes, ') : (fechas += '');
          result[i].sabado != '' ? (fechas += 'sabado, ') : (fechas += '');
          result[i].edad_maxima == ''
            ? (edades = `${result[i].edad_minima} en Adelante`)
            : (edades = `${result[i].edad_minima}-${result[i].edad_maxima}`);
          result[i].nivel == '1' ? (niveles = 'desde cero') : '';
          result[i].nivel == '2' ? (niveles = 'con bases') : '';
          result[i].nivel == '3' ? (niveles = 'intermedio') : '';
          result[i].nivel == '4' ? (niveles = 'avanzado') : '';

          dataList = [...dataList, {
            _id: result[i]._id,
            clave: result[i].clave,
            nombre_curso: result[i].nombre_curso,
            nivel: result[i].nivel,
            matriculaProfesor: result[i].matriculaProfesor,
            edades,
            edad_minima: result[i].edad_minima,
            edad_maxima: result[i].edad_maxima,
            cupo_maximo: result[i].cupo_maximo,
            modalidad: result[i].modalidad,
            fechas,
            lunes: result[i].lunes,
            martes: result[i].martes,
            miercoles: result[i].miercoles,
            jueves: result[i].jueves,
            viernes: result[i].viernes,
            sabado: result[i].sabado,
            clavePeriodo: result[i].clavePeriodo,
            area: result[i].area,
            cupo_actual: result[i].cupo_actual,
            niveles,
            nombreProfesor: result[i].nombreProfesor,
            apellidosProfesor: result[i].apellidosProfesor,
            nombreCompleto:
            `${result[i].nombreProfesor} ${result[i].apellidosProfesor}`,
          }];
        }
        console.log(dataList);
        setData(dataList);
      });
    getOptions();
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

  const handleClick = async (e) => {
    e.preventDefault();
    nuevaClase.nombreProfesor = currentProfesor.nombre;
    nuevaClase.apellidosProfesor = currentProfesor.apellidos;
    nuevaClase.matriculaProfesor = currentProfesor.matricula;
    delete nuevaClase.nombreCompleto;

    if (nuevaClase.niveles == 'desde cero') {
      nuevaClase.nivel = '1';
    } else if (nuevaClase.niveles == 'con bases') {
      nuevaClase.nivel = '2';
    } else if (nuevaClase.niveles == 'intermedio') {
      nuevaClase.nivel = '3';
    } else if (nuevaClase.niveles == 'avanzado') {
      nuevaClase.nivel = '4';
    }
    delete nuevaClase.niveles;

    createClass(nuevaClase).then(() => {
      abrirCerrarModalInsertar();
      resetClases();
    });
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
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

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setNuevaClase({ ...nuevaClase, [name]: value });
  };
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
    const csvArray = csv.split('\n');
    csvArray.shift();
    const clasesJson = [];
    const profesoresJson = [];
    let iterator;
    const profesorHash = [];

    const profesorFunc = (i) => {
      i = i.slice(2);
      return Number(i);
    };

    let j = 0;
    for (let i = 0; i < csvArray.length; i++) {
      iterator = csvArray[i];
      const iteratorArray = iterator.split(',');
      clasesJson[i] = {};
      clasesJson[i].clave = iteratorArray[0];
      clasesJson[i].nombre_curso = iteratorArray[1];
      clasesJson[i].nivel = iteratorArray[2];
      clasesJson[i].area = iteratorArray[3];
      clasesJson[i].modalidad = iteratorArray[4];
      clasesJson[i].clavePeriodo = iteratorArray[5];
      clasesJson[i].cupo_maximo = iteratorArray[6];
      clasesJson[i].edad_minima = iteratorArray[7];
      clasesJson[i].edad_maxima = iteratorArray[8];
      clasesJson[i].lunes = iteratorArray[9];
      clasesJson[i].martes = iteratorArray[10];
      clasesJson[i].miercoles = iteratorArray[11];
      clasesJson[i].jueves = iteratorArray[12];
      clasesJson[i].viernes = iteratorArray[13];
      clasesJson[i].sabado = iteratorArray[14];
      clasesJson[i].matriculaProfesor = iteratorArray[17];
      clasesJson[i].cupo_actual = '0';
      clasesJson[i].nombreProfesor = iteratorArray[15].trim();
      clasesJson[i].apellidosProfesor = iteratorArray[16].trim();

      if (!profesorHash[profesorFunc(iteratorArray[17])]) {
        profesoresJson[j] = {};
        profesoresJson[j].nombre = iteratorArray[15].trim();
        profesoresJson[j].apellidos = iteratorArray[16].trim();
        profesoresJson[j].matricula = iteratorArray[17];
        profesoresJson[j].correo = iteratorArray[18];
        profesoresJson[j].fecha_de_nacimiento = '';
        profesoresJson[j].num_telefono = '';
        profesoresJson[j].num_cursos_impartidos = '0';
        profesoresJson[j].idUser = '';

        profesorHash[profesorFunc(iteratorArray[17])] = true;
        j++;
      }
    }

    console.log(profesoresJson);
    await subirProfes({
      profesoresJson: JSON.stringify(profesoresJson),
    });

    await subirClases({
      clasesJson: JSON.stringify(clasesJson),
    }).then(() => {
      resetClases();
    });

  };

  const handleClick2 = (e) => {
    e.preventDefault();
    updateClase(clase);
  };
  const updateClase = (nuevaClase) => {
    delete nuevaClase.fechas;
    delete nuevaClase.edades;
    nuevaClase.nombreProfesor = currentProfesor.nombre;
    nuevaClase.matriculaProfesor = currentProfesor.matricula;
    nuevaClase.apellidosProfesor = currentProfesor.apellidos;

    delete nuevaClase.nombreCompleto;
    if (nuevaClase.niveles == 'desde cero') {
      nuevaClase.nivel = '1';
    } else if (nuevaClase.niveles == 'con bases') {
      nuevaClase.nivel = '2';
    } else if (nuevaClase.niveles == 'intermedio') {
      nuevaClase.nivel = '3';
    } else if (nuevaClase.niveles == 'avanzado') {
      nuevaClase.nivel = '4';
    }
    delete nuevaClase.niveles;
    updateClass(nuevaClase)
      .then((e) => {
        abrirCerrarModalEditar();
        resetClases();
      });
  };

  const seleccionarConsola = (consola, caso) => {
    setNuevaClase(consola);
    array3 = consola;
    id = array3._id;

    if (caso === 'Editar') {
      editClasses(consola);
    } else if (caso === 'Eliminar') {
      abrirCerrarModalEliminar();
    }
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const postDelete = async (e) => {
    console.log(array3._id);
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
            handleChange2(e);
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
          handleChange2(e);
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
          handleChange2(e);
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
              handleChange2(e);
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
        <Button color="primary" onClick={handleClick}>
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
        <Button color="primary" onClick={handleClick2}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModalEditar} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

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
        setOpenWaitList(true);
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
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }} />,
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

  return (
    <div>
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
        onClick={() => addClass()}
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
        onClick={() => importFile()}
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
        open={openWaitList}
        onClose={() => setOpenWaitList(!openWaitList)}
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
