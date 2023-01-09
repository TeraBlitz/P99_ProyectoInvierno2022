import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { data as information } from "../../../data/datosprueba";
import CreateClass from "./CreateClass";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EditClass from "./EditClass";
import ClassTable from "./ClassTable";

export default function ShowClass() {
  //States
  //Agregar
  const [data, setData] = useState([]);
  const [crear, setCrear] = useState(false);

  //Editar
  const [editar, setEditar] = useState(false);
  const claseInicial = {
    id: null,
    coursename: "",
    level: null,
    teacher: "",
    weeklyfrequency: "",
    maximumcapacity: "",
  };
  const [claseActual, setClaseActual] = useState(claseInicial);

  const editClasses = (id, clase) => {
    handleClick2();
    setClaseActual(clase);
  };

  const updateClass = (nuevaClase) => {
    setData(
      data.map((datos) => (datos.id === claseActual.id ? nuevaClase : datos))
    );
    setClaseActual(claseInicial);
    handleClick2();
  };

  //Function  on Click
  function handleClick() {
    setCrear((prevState) => !prevState);
  }

  function handleClick2() {
    setEditar((prevState) => !prevState);
  }

  //Save information
  useEffect(() => {
    setData(information);
  }, []);

  function createClasses(datas) {
    handleClick();
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
  }

  // Delete class
  function deleteClass(classId) {
    setData(data.filter((datos) => datos.id !== classId));
  }

  if (data.length === 0)
    return (
      <div>
        <Navbar />
        {crear && (
          <div>
            <CreateClass createClasses={createClasses} />
          </div>
        )}
        <div className="button--center">
          <Button variant="contained" color="primary" onClick={handleClick}>
            {<AddCircleOutlineIcon />}
          </Button>
        </div>
        <h1 className="body-admin--title"> No hay clases aun</h1>
      </div>
    );

  return (
    <div>
      <Navbar />
      {crear && (
        <div>
          <CreateClass createClasses={createClasses} />
        </div>
      )}

      <div className="button--center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          {<AddCircleOutlineIcon />}
        </Button>
      </div>

      <h3 className="body-admin--title"> Panel de modificacion de clases </h3>
      <ClassTable
        data={data}
        deleteClass={deleteClass}
        editClasses={editClasses}
      />
      {/* Solucion temporal en lo que linkamos, no va a hacer asi el resultado final */}

      {editar && (
        <div>
          <EditClass
            claseActual={claseActual}
            setEditar={setEditar}
            updateClass={updateClass}
          />
        </div>
      )}
    </div>
  );
}
