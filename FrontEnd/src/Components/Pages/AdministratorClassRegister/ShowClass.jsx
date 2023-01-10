//Importancioon de datos
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Modal, TextField } from "@mui/material";
import { data as information } from "../../../data/datosprueba";
import ClassTable from "./ClassTable";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function ShowClass() {
  //--------------------------------------------Agregar----------------
  //Estados de agregar
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");

  //Funcion click para abrir el modal
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  //Evento que dado un nuevos datos los agrega
  const handleClick = (e) => {
    e.preventDefault();
    if (
      coursename !== "" &&
      level !== "" &&
      teacher !== "" &&
      weeklyfrequency !== "" &&
      maximumcapacity !== ""
    ) {
      createClasses({
        coursename,
        level,
        teacher,
        weeklyfrequency,
        maximumcapacity,
      });
      setCoursename("");
      setLevel("");
      setTeacher("");
      setWeeklyfrequency("");
      setMaximumcapacity("");
      abrirCerrarModalInsertar();
    } else {
      alert("No se puede enviar, si hay algo vacio");
    }
  };

  //Se encarga de guardar la nueva informacion
  useEffect(() => {
    setData(information);
  }, []);

  //Actualiza las clases
  function createClasses(datas) {
    setData([
      ...data,
      {
        id: data.length,
        coursename: datas.coursename,
        level: datas.level,
        teacher: datas.teacher,
        weeklyfrequency: datas.weeklyfrequency,
        maximumcapacity: datas.maximumcapacity,
      },
    ]);
    abrirCerrarModalInsertar();
  }

  //-------------------------------Editar----------------------------------
  // Estados para editar
  const [modalEditar, setModalEditar] = useState(false);
  const claseInicial = {
    id: null,
    coursename: "",
    level: null,
    teacher: "",
    weeklyfrequency: "",
    maximumcapacity: "",
  };
  const [claseActual, setClaseActual] = useState(claseInicial);

  //Function que abre o cierra el modal
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const editClasses = (id, clase) => {
    setClaseActual(clase);
    abrirCerrarModalEditar();
  };

  //Funcion que guarda informacion del modal
  useEffect(() => {
    setClase(claseActual);
  }, [claseActual]);

  //Estado que guarda el array modificado
  const [clase, setClase] = useState(claseActual);

  //Funcion que modifica los daors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  //Funciones que actualiza los datos con las modificacioness
  const handleClick2 = (e) => {
    e.preventDefault();
    if (
      clase.coursename &&
      clase.level &&
      clase.teacher &&
      clase.weeklyfrequency &&
      clase.maximumcapacity
    )
      updateClass(clase);
  };

  const updateClass = (nuevaClase) => {
    setData(
      data.map((datos) => (datos.id === claseActual.id ? nuevaClase : datos))
    );
    setClaseActual(claseInicial);
    abrirCerrarModalEditar();
  };

  //--------------------------------------------Eliminar--------------
  // Solo se usa un filter para eliminar
  function deleteClass(classId) {
    setData(data.filter((datos) => datos.id !== classId));
  }

  //-----------------------------Caso que no haya------------------
  if (data.length === 0)
    return (
      <div>
        <Navbar />
        <div className="button--center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => abrirCerrarModalInsertar()}
          >
            {<AddCircleOutlineIcon />}Crear
          </Button>
        </div>
        <h1 className="body-admin--title"> No hay clases aun</h1>
      </div>
    );

  //-------------------------------Datos de ventanas modales---------------
  const bodyInsertar = (
    <div className="modal">
      <h3>Crear una nueva clase</h3>
      <TextField
        label="Curso"
        onChange={(e) => setCoursename(e.target.value)}
        value={coursename}
        autoFocus
      />
      <br />
      <TextField
        label="Nivel"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
      />
      <br />
      <TextField
        label="Profesor"
        onChange={(e) => setTeacher(e.target.value)}
        value={teacher}
      />
      <br />
      <TextField
        label="Frecuencia Semanal"
        onChange={(e) => setWeeklyfrequency(e.target.value)}
        value={weeklyfrequency}
      />
      <br />
      <TextField
        label="Capacidad"
        onChange={(e) => setMaximumcapacity(e.target.value)}
        value={maximumcapacity}
      />
      <br />
      <br />
      <div align="center">
        <Button  color="primary" onClick={handleClick}>
          Insertar
        </Button> 
        <Button onClick={() => abrirCerrarModalInsertar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className="modal">
      <h3>Actualizar una clase</h3>
      <TextField
        label="Curso"
        value={clase && clase.coursename}
        name="coursename"
        onChange={handleChange}
        autoFocus
      />
      <br />
      <TextField
        label="Nivel"
        type="number"
        name="level"
        value={clase && clase.level}
      />
      <br />
      <TextField
        label="Profesor"
        name="teacher"
        value={clase && clase.teacher}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Frecuencia Semanal"
        name="weeklyfrequency"
        value={clase && clase.weeklyfrequency}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Capacidad"
        name="maximumcapacity"
        value={clase && clase.maximumcapacity}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={handleClick2}>
          Actualizar
        </Button>
        <Button  onClick={() => abrirCerrarModalEditar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <div >
      <Navbar />
      <div >
      <div className="button--center">
        <Button
          variant="contained"
          color="success"
          onClick={() => abrirCerrarModalInsertar()}>
          {<AddCircleOutlineIcon />} Crear
        </Button>
      </div>

      <h3 className="body-admin--title"> Clases </h3>
      </div>

      {/* Paso de parametros a clases */}
      <ClassTable
        data={data}
        deleteClass={deleteClass}
        editClasses={editClasses}
      />

      {/* Creacion de modales */}
      <Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
        {bodyEditar}
      </Modal>
    </div>
  );
}
