//Importacion de clases
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  TableContainer,
  TableRow,
  Table,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";

const ClassTable = (props) => {
  // Metodo de creacion de botones
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
    // Creacion de la tabla
    // Parametros: datos, funciones de eliminar y editar
    <TableContainer sx={{maxHeight:'300px'}}>
      <Table stickyHeader>
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
          {props.data.map((datos) => (
            <TableRow key={datos.id}>
              <TableCell>{datos.coursename}</TableCell>
              <TableCell>{datos.level}</TableCell>
              <TableCell>{datos.teacher}</TableCell>
              <TableCell>{datos.weeklyfrequency}</TableCell>
              <TableCell>{datos.maximumcapacity}</TableCell>
              <TableCell>
                <i
                style={{cursor:"pointer"}}
                  className="button--edit"
                  onMouseOver={BlueMouseOver}
                  onMouseOut={BlueMouseOut}
                  onClick={() => props.editClasses(datos.id, datos)}
                >
                  {<ModeEditIcon />}
                </i>
              </TableCell>
              <TableCell>
                <i
                style={{cursor:"pointer"}}
                  className="button--delete"
                  onMouseOver={RedMouseOver}
                  onMouseOut={RedMouseOut}
                  onClick={() => props.deleteClass(datos.id)}
                >
                  {<DeleteForeverIcon />}
                </i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;
