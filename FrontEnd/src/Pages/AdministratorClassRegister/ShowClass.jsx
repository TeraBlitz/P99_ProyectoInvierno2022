import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import WaitList from '../../Components/Clase/WaitList';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import {
  createClass, deleteClasses, getClasses, updateClass,
} from '../../api/classes.js';
import {
  classAtributes, dayAtributes, niveloptions, classTemplate, nivelesMapa
} from '../../utils/constants';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';
import { mapNiveles } from '../../utils/utilFunctions';
import BodyInscripcionClase from '../../Components/Clase/BodyInscripcionClase';
import { profesorVacioInscripcion } from '../../utils/constants';

export default function ShowClass() {
  let id = '';
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [data, setData] = useState([]);
  const [profesorList, setProfesorList] = useState([profesorVacioInscripcion]);
  const [currentProfesor, setCurrentProfesor] = useState(profesorVacioInscripcion);
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
  const [clase, setClase] = useState(claseActual);
  const [openModal, setOpenModal] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');
  const [modalWaitList, setOpenModalWaitList] = useState(false);

  const getAllPeriodos = async () => {
    getPeriodos().then((response) => response.json()).then((result) => {
      setDataPeriodo(result);
    });
  };

  const handleSelectChange = (event) => {
    const filteredData = [data.filter((data) => data.clavePeriodo === event.label)].flat();

    filteredData.length > 0 ? setData(filteredData) : resetClases();
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

        edades = clase.edad_maxima === ''
          ? `${clase.edad_minima} en Adelante`
          : `${clase.edad_minima}-${clase.edad_maxima}`;
          
        niveles = nivelesMapa[clase.nivel] || '';

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

  const handleChangeProfesor = (p) => {
    profesorList.forEach((e) => {
      if (e.nombreCompleto === p.target.value) {
        setCurrentProfesor(e);
      }
    });
  };

  useEffect(() => {
    setClase(claseActual);
    getAllPeriodos();
  }, [claseActual]);

  useEffect(() => {
    resetClases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    try {
        if (currentOperation === 'Eliminar') {
            await deleteClasses({
                _id: nuevaClase._id,
            });
        } else if (currentOperation === 'Crear') {
            const nuevaClase = mapNiveles(nuevaClase);
            await createClass(nuevaClase);
        } else if (currentOperation === 'Editar') {
            const nuevaClase = mapNiveles(clase);
            await updateClass(nuevaClase);
        }   
    } catch (error) {
      console.log(error);
    }
    abrirCerrarModal();
    resetClases();
    };

  const seleccionarClase = (consola, caso) => {
    if (caso === 'Crear') {
        setCurrentProfesor(profesorVacioInscripcion);
    } else if (caso === 'Editar') {
        id = consola._id;
        setClaseActual(consola);
        profesorList.forEach((e) => {
          if (e.nombreCompleto === consola.nombreCompleto) {
            setCurrentProfesor(e);
          }
        });
    } else if (caso === 'Eliminar') {
        setClaseActual(consola);
        id = consola._id;
    }
    setCurrentOperation(caso);
    abrirCerrarModal();
  };

  const abrirCerrarModal = () => {
    if (openModal) {
        setClaseActual(classTemplate);
    }
    setOpenModal(!openModal);
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
        Eliminar clase
      </h3>
      <Typography style={{ align: 'justify', fontFamily: 'arial' }}>
        Esta clase {clase.clave} y toda su información relacionada a ella va a ser eliminada
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

  return (
    <div>
      <HeaderInscripcionClase
        data={data}
        setOpenModal={() => { seleccionarClase(classTemplate, 'Crear') }}
        resetClases={resetClases}
        dataPeriodo={dataPeriodo}
        handleSelectChange={handleSelectChange}
      />
      <BodyInscripcionClase 
        data={data}
        profesorList={profesorList}
        getClassWaitList={getClassWaitList}
        seleccionarClase={seleccionarClase}
      />
      <Modal open={openModal} onClose={abrirCerrarModal}>
        {currentOperation === 'Editar' || currentOperation === 'Crear'? bodyEditar : bodyEliminar}
      </Modal>
      <Modal
        open={modalWaitList}
        onClose={() => setOpenModalWaitList(false)}
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
