import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TableContainer, TableRow,Table, Button , TableCell,TableHead, TableBody } from "@mui/material";
import { data } from '../../data/datosprueba'

function ShowClass(props) {
    if(data.length === 0)
        return <h1> No hay clases aun</h1>
  return (
    <div>
      {/* Combinacion de colores por ver*/}
      <nav className="nav--logo">
        <img src="../proyecto_99.png" width="75px" className="nav--icon"/>
        <h3 className="nav--logo_text"> Proyecto 99 </h3>
        <h4 className="nav--title"> Registro de clases: administrador</h4>
      </nav>
      <div className="button--center">
        <Button variant="contained" color="primary" > {<AddCircleOutlineIcon /> }</Button>
      </div>
     
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
                    {data.map((datos) =>(
                        <TableRow key={datos.id}>
                            <TableCell>{datos.coursename}</TableCell>
                            <TableCell>{datos.level}</TableCell>
                            <TableCell>{datos.teacher}</TableCell>
                            <TableCell>{datos.weeklyfrequency}</TableCell>
                            <TableCell>{datos.maximumcapacity}</TableCell>
                            <Button variant="contained" color="primary" > {<AddCircleOutlineIcon /> }</Button>
                            <Button variant="contained" color="error" > {<AddCircleOutlineIcon /> }</Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default ShowClass;
