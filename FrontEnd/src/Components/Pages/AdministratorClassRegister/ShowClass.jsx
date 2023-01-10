import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal, TextField,  Paper, } from "@mui/material";
import { data as information } from "../../../data/datosprueba";
import ClassTable from './ClassTable'
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EditClass from "./EditClass";

export default function ShowClass() {
  //Estados de agregar 
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");

  const handleClick= (e) => {
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
    const [modalEditar, setModalEditar] = useState(false);
 



  // const editClasses = (id, clase) => {
  //   handleClick2();
  //   setClaseActual(clase);
  // };

  // const updateClass = (nuevaClase) => {
  //   setData(
  //     data.map((datos) => (datos.id === claseActual.id ? nuevaClase : datos))
  //   );
  //   setClaseActual(claseInicial);
  //   handleClick2();
  // };

  //Function  on Click
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

 
  //Save information
  useEffect(() => {
    setData(information);
  }, []);

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

  // Delete class
  function deleteClass(classId) {
    setData(data.filter((datos) => datos.id !== classId));
  }

  if (data.length === 0)
    return (
      <div>
        <Navbar />
        <div className="button--center">
        <Button variant="contained" color="primary"  onClick={abrirCerrarModalInsertar}>
          {<AddCircleOutlineIcon />} 
        </Button>
        </div>
        <h1 className="body-admin--title"> No hay clases aun</h1>
      </div>
    );

  const bodyInsertar = (
    <div className="modal">
      <h3>Crear una nueva clase</h3>
      <TextField   label="Curso" onChange={(e) => setCoursename(e.target.value)}
            value={coursename}
            autoFocus/>
      <br />
      <TextField  label="Nivel"   
            onChange={(e) => setLevel(e.target.value)}
            value={level}/>
      <br />
      <TextField  label="Profesor" 
            onChange={(e) => setTeacher(e.target.value)}
            value={teacher}/>
      <br />
      <TextField   label="Frecuencia Semanal" 
            onChange={(e) => setWeeklyfrequency(e.target.value)}
            value={weeklyfrequency}/>
      <br />
      <TextField  label="Capacidad"  
            onChange={(e) => setMaximumcapacity(e.target.value)}
            value={maximumcapacity}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={handleClick}> Insertar</Button>
        <Button onClick={abrirCerrarModalInsertar}color="error"> Cancelar</Button>
      </div>
    </div>
  );
  return (
    <div >
          <Navbar />
      <div className="button--center">
        <Button variant="contained" color="primary"  onClick={abrirCerrarModalInsertar}>
          {<AddCircleOutlineIcon />} 
        </Button>
      </div>

       <h3 className="body-admin--title"> Panel de modificacion de clases </h3>
      <ClassTable
        data={data}
        deleteClass={deleteClass}
        //editClasses={editClasses}
      />

      {/* createClasses={createClasses} */}
      <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>


    </div>
  );
}
