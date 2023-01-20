//Importancioon de datos
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import { niveles } from "../../../data/numerosprueba";
import { profes } from "../../../data/profesprueba";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo } from "react";
import Actions from "./Actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function ShowClass() {
  //Encargado de guardar la data
  const [data, setData] = useState([]);
  //-----------------------------------Obtener la data------------
  const getClases = () => {
    axios
      .get("http://127.0.0.1:3000/v1/clases")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClases();
  }, []);

  //Estados de creacion, actualizacion y eliminacion
  const [modalInsertar, setModalInsertar] = useState(false);
  const [clavePeriodo, setClavePeriodo] = useState("");
  const [nombre_curso, setNombreCurso] = useState("");
  const [nivel, setNivel] = useState("");
  const [idMaestro, setIdMaestro] = useState("");
  const [frecuencia_semanal, setFrecuencia_semanal] = useState("");
  const [cupo_maximo, setCupo_maximo] = useState("");
  const [cupo_actual, setCupo_actual] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    _id: "",
    nombre_curso: "",
    nivel: "",
    frecuencia_semanal: "",
    cupo_maximo: "",
    cupo_actual: "",
    idMaestro: "",
    clavePeriodo: "",
  });

  // Nos dice que texto fue seleccionado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
  };

  // Funcion para abrir y cerra ventanas modales
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  // Funcion para eliminar o editar
  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    } else {
      abrirCerrarModalEliminar();
    }
  };

  //procedimiento para crear datos
  const postCrea = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/clases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nombre_curso: nombre_curso,
          nivel: nivel,
          frecuencia_semanal: frecuencia_semanal,
          cupo_maximo: cupo_maximo,
          cupo_actual: cupo_actual,
          idMaestro: idMaestro,
          clavePeriodo: clavePeriodo,
        }),
      });
      abrirCerrarModalInsertar();
      getClases();
      setClavePeriodo("");
      setNombreCurso("");
      setNivel("");
      setIdMaestro("");
      setFrecuencia_semanal("");
      setCupo_maximo("");
      setCupo_actual("");
    } catch (error) {
      console.log(error);
    }
  };

  // Procedimiento para editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/clases/update", {
        method: "Put",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
          nombre_curso: consolaSeleccionada.nombre_curso,
          nivel: consolaSeleccionada.nivel,
          frecuencia_semanal: consolaSeleccionada.frecuencia_semanal,
          cupo_maximo: consolaSeleccionada.cupo_maximo,
          cupo_actual: consolaSeleccionada.cupo_actual,
          idMaestro: consolaSeleccionada.idMaestro,
          clavePeriodo: consolaSeleccionada.clavePeriodo,
        }),
      });
      abrirCerrarModalEditar();
      getClases();
    } catch (error) {
      console.log(error);
    }
  };

  // Procedimiento para eliminar
  const postDelete = async (e) => {
    try {
      await fetch("http://127.0.0.1:3000/v1/clases/delete", {
        method: "Delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
        }),
      });
      abrirCerrarModalEliminar();
      getClases();
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------------------Datos de ventanas modales---------------
  const bodyInsertar = (
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 630,
        backgroundColor: "#fefefd",
        top: "48%",
        left: "50%",
        transform: "translate(-48%, -50%)",
        border: "4px solid  rgb(165, 165, 180)",
        margin: "auto",
        borderRadius: "10px",
        padding: "20px",
      }}>
      <h3
        style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" }}
        align="center">
        Crear una nueva clase
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Clave"
        onChange={(e) => setClavePeriodo(e.target.value)}
        value={clavePeriodo}
        autoFocus/>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Curso"
        onChange={(e) => setNombreCurso(e.target.value)}
        value={nombre_curso}
        autoFocus/>
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Nivel"
        onChange={(e) => setNivel(e.target.value)}
        value={nivel}
        select
        id="filled-select-currency">
        {niveles.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontFamily: "arial" }}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Autocomplete
        value={idMaestro}
        onChange={(event, newValue) => {
          setIdMaestro(newValue);
        }}
        id="profesores-insertar"
        options={profes}
        renderInput={(params) => <TextField {...params} label="Profesor" />}/>
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Frecuencia Semanal"
        onChange={(e) => setFrecuencia_semanal(e.target.value)}
        value={frecuencia_semanal}/>
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Capacidad"
        onChange={(e) => setCupo_maximo(e.target.value)}
        value={cupo_maximo}/>
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Cupo Actual"
        onChange={(e) => setCupo_actual(e.target.value)}
        value={cupo_actual}/>
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={postCrea}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );
  // -----------------------------Modal para editar---------------------------
  const bodyEditar = (
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 580,
        backgroundColor: "#fefefd",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "4px solid  rgb(165, 165, 180)",
        margin: "auto",
        borderRadius: "10px",
        padding: "20px",
      }}>
      <h3
        style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" }}
        align="center">
        Actualizar una clase
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Curso"
        value={consolaSeleccionada && consolaSeleccionada.nombre_curso}
        name="nombre_curso"
        onChange={handleChange}
        autoFocus/>
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Nivel"
        onChange={handleChange}
        name="nivel"
        value={consolaSeleccionada && consolaSeleccionada.nivel}
        select
        id="filled-select-currency">
        {niveles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Profesor"
        onChange={handleChange}
        name="idMaestro"
        value={consolaSeleccionada && consolaSeleccionada.idMaestro}
        select
        id="filled-select-currency">
        {profes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Frecuencia Semanal"
        name="frecuencia_semanal"
        value={consolaSeleccionada && consolaSeleccionada.frecuencia_semanal}
        onChange={handleChange}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Capacidad"
        name="cupo_maximo"
        value={consolaSeleccionada && consolaSeleccionada.cupo_maximo}
        onChange={handleChange}/>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Capacidad"
        name="cupo_actual"
        value={consolaSeleccionada && consolaSeleccionada.cupo_actual}
        onChange={handleChange}/>
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={postEditar}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );
  //----------Modal Eliminar----------------
  const bodyEliminar = (
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 280,
        backgroundColor: "#fefefd",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "4px solid  rgb(165, 165, 180)",
        margin: "auto",
        borderRadius: "10px",
        padding: "20px",
      }}>
      <h3
        style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" }}
        align="center">
        Eliminar una clase
      </h3>
      <Typography style={{ align: "justify", fontFamily: "arial" }}>
        El curso de {consolaSeleccionada && consolaSeleccionada.nombre_curso} y
        todo lo relacionado a el se va a eliminar por completo. No vas a poder
        acceder a estos datos de nuevo.
      </Typography>
      <br />
      <br />
      <div align="center">
        <Button color="error" onClick={postDelete}>
          Confirmar
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()} color="primary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  //---------------------------------------Show--------------
  const [pageSize, SetPageSize] = useState(10);

  const columns = useMemo(() => [
      { field: "_id", headerName: "Id", width: 4, hide: true },
      { field: "clavePeriodo", headerName: "Clave", width: 84 },
      { field: "nombre_curso", headerName: "Curso", width: 80 },
      { field: "nivel", headerName: "Nivel", width: 141 },
      {
        field: "idMaestro",
        headerName: "Profesor",
        width: 140,
        sortable: false,
      },
      { field: "frecuencia_semanal", headerName: "Frecuencia", width: 100 },
      { field: "cupo_maximo", headerName: "Capacidad", width: 100 },
      { field: "cupo_actual", headerName: "Cupo actual", width: 100 },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 85,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],[data]);

// Filter 
const [items, setItems] = useState([]);

  return (
    <div>
      <Card
        sx={{
          maxWidth: 255,
          position: "absolute",
          textAlign: "left",
          marginLeft: "5px",
          marginTop: "120px",
          border: "2px solid  rgb(165, 165, 180)",
          borderRadius: "8px",
        }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontFamily: "arial" }}>
            Filtros
          </Typography>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Curso"
            onChange={(e) => {
              setItems([
                {
                  columnField: "nombre_curso",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}></TextField>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Nivel"
            onChange={(e) => {
              setItems([
                {
                  columnField: "nivel",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}></TextField>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Profesor"
            onChange={(e) => {
              setItems([
                {
                  columnField: "idMaestro",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}></TextField>
        </CardContent>
      </Card>

      <Box
        sx={{
          width: "740px",
          padding: "15px",
          height: "450px",
          position: "absolute",
          marginLeft: "265px",
        }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "left", mt: 3, mb: 3, fontFamily: "arial" }}>
          Clases
          <Button
            sx={{ marginLeft: "350px" }}
            variant="contained"
            color="success"
            onClick={() => abrirCerrarModalInsertar()}>
            {<AddCircleOutlineIcon />} Crear
          </Button>
        </Typography>
        <Box sx={{ height: "80vh", width: "70vw" }}>
          <DataGrid
            columns={columns}
            rows={data}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => SetPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 10,
              bottom: params.isLastVisible ? 0 : 10,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
                fontFamily: "arial",
              },
            }}
            disableSelectionOnClick={true}

            filterModel={{
              items: items,
            }}

          />
        </Box>
        <Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
          {bodyInsertar}
        </Modal>

        <Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
          {bodyEditar}
        </Modal>

        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </Box>
    </div>
  );
}
