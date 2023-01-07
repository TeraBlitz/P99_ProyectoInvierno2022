import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  TableContainer,
  TableRow,
  Table,
  Button,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { data as information} from "../../data/datosprueba";
import CreateClass from "./CreateClass";
import { useState, useEffect } from "react";


function ShowClass(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(information);
  }, [])
  
  function createClasses(datas){
    setData([ ...data , {
      id: data.length,
      coursename: datas.coursename,
      level: datas.level,
      teacher: datas.teacher,
      weeklyfrequency: datas.weeklyfrequency,
      maximumcapacity: datas.maximumcapacity,
    }])
  }

  if (data.length === 0) return <h1> No hay clases aun</h1>;


  return (
    <div>
      {/* Combinacion de colores por ver*/}
      <nav className="nav--logo">
        <img src="../proyecto_99.png" width="75px" className="nav--icon" />
        <h3 className="nav--logo_text"> Proyecto 99 </h3>
        <h4 className="nav--title"> Registro de clases: administrador</h4>
      </nav>
      <CreateClass createClasses={createClasses}/>
      {/* <div className="button--center">
        <Button variant="contained" color="primary">
          {" "}
          {<AddCircleOutlineIcon />}
        </Button>
      </div> */}

      <h3 className="body-admin--title"> Panel de modificacion clase </h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Curso </TableCell>
              <TableCell> Nivel </TableCell>
              <TableCell> Profesor </TableCell>
              <TableCell> Frecuencia semanal </TableCell>
              <TableCell> Capacidad </TableCell>
              <TableCell> Acciones </TableCell>
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
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ShowClass;
