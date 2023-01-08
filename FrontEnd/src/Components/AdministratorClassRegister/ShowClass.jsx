import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TableContainer, TableRow, Table, Button, TableCell, TableHead,TableBody } from "@mui/material";
import { data as information } from "../../data/datosprueba";
import CreateClass from "./CreateClass";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EditClass from "./EditClass";

export default function ShowClass() {
  //States
  //Agregar 
  const [data, setData] = useState([]);
  const [crear, setCrear] = useState(false);

  //Editar
  const [editar, setEditar] = useState(false);
  const claseInicial = {
    id: null,
    coursename: '',
    level: null,
    teacher: '',
    weeklyfrequency: '',
    maximumcapacity: '',
   }
 const [claseActual, setClaseActual] = useState(claseInicial)

 const editClasses = (id, clase) => {
  handleClick2()
  setClaseActual(clase);
 }
 
 const updateClass = (nuevaClase) => {
  setData(data.map(datos => (datos.id === claseActual.id ? nuevaClase : datos)))
  setClaseActual(claseInicial);
  handleClick2();
 }

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
    handleClick()
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

  function RedMouseOver(event) {
    event.target.style.background = "rgb(248 113 113 / var(--tw-bg-opacity)";
  }

  function RedMouseOut(event) {
    event.target.style.background = "rgb(239 68 68 / var(--tw-bg-opacity)";
  }

  function BlueMouseOver(event) {
    event.target.style.background = " rgb(31, 31, 228)";
  }

  function BlueMouseOut(event) {
    event.target.style.background = "rgb(25, 25, 189)";
  }

  return (
    <div>
      <Navbar />
      {crear && (
        <div>
          <CreateClass createClasses={createClasses} />
        </div>
      )}

      <div className="button--center">
        <Button variant="contained" color="primary" onClick={(handleClick)}>
          {<AddCircleOutlineIcon />}
        </Button>
      </div>

      <h3 className="body-admin--title"> Panel de modificacion de clases </h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Curso </TableCell>
              <TableCell> Nivel </TableCell>
              <TableCell> Profesor </TableCell>
              <TableCell> Frecuencia semanal </TableCell>
              <TableCell> Capacidad </TableCell>
              <TableCell> Editar </TableCell>
              <TableCell> Eliminar </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((datos) => (
              <TableRow key={datos.id}>
                <TableCell>{datos.coursename}</TableCell>
                <TableCell>{datos.level}</TableCell>
                <TableCell>{datos.teacher}</TableCell>
                <TableCell>{datos.weeklyfrequency}</TableCell>
                <TableCell>{datos.maximumcapacity}</TableCell>
                <TableCell>
                  <i
                    className="button--edit"
                    onMouseOver={BlueMouseOver}
                    onMouseOut={BlueMouseOut}
                    onClick={()=> editClasses(datos.id,datos)}>
                    {<ModeEditIcon />}
                  </i>
                </TableCell>
                <TableCell>
                  <i
                    className="button--delete"
                    onMouseOver={RedMouseOver}
                    onMouseOut={RedMouseOut}
                    onClick={() => deleteClass(datos.id)}>
                    {<DeleteForeverIcon />}
                  </i>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

   {/* Solucion temporal en lo que linkamos, no va a hacer asi el resultado final */}

   {editar && (
          <div>
            <EditClass claseActual = { claseActual } setEditar = { setEditar } updateClass = { updateClass }/>
          </div>
        
        )}
        
    </div>
  );
}
