//Importancioon de datos
import React from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo } from "react";
import Actions from "./ActAlumnos";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";

export default function Alumnos() {
  //Encargado de guardar la data
  const [data, setData] = useState([]);

  const getAlumnos = () => {
    axios
      .get("http://127.0.0.1:3000/v1/alumnos")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  // ------------Editar---------------
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    _id: "",
    idUsuario: "",
    curp: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_de_nacimiento: "",
    tutor_nombre: "",
    tutor_apellido_paterno: "",
    tutor_apellido_materno: "",
    tutor_correo: "",
    tutor_num_telefono: "",
    num_telefono: "",
    estado: "",
    ciudad: "",
    colonia: "",
    codigo_postal: "",
    escolaridad: "",
    ultima_escuela: "",
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

  // Abrir y cerra modales
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    } else {
      abrirCerrarModalEliminar();
    }
  };

  // Procedimiento para editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/alumnos/update", {
        method: "Put",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
          idUsuario: consolaSeleccionada.idUsuario,
          curp: consolaSeleccionada.curp,
          nombre: consolaSeleccionada.nombre,
          apellido_paterno: consolaSeleccionada.apellido_paterno,
          apellido_materno: consolaSeleccionada.apellido_materno,
          fecha_de_nacimiento: consolaSeleccionada.fecha_de_nacimiento,
          tutor_nombre: consolaSeleccionada.tutor_nombre,
          tutor_apellido_paterno: consolaSeleccionada.tutor_apellido_paterno,
          tutor_apellido_materno: consolaSeleccionada.tutor_apellido_materno,
          tutor_correo: consolaSeleccionada.tutor_correo,
          tutor_num_telefono: consolaSeleccionada.tutor_num_telefono,
          num_telefono: consolaSeleccionada.num_telefono,
          estado: consolaSeleccionada.estado,
          ciudad: consolaSeleccionada.ciudad,
          colonia: consolaSeleccionada.colonia,
          codigo_postal: consolaSeleccionada.codigo_postal,
          escolaridad: consolaSeleccionada.escolaridad,
          ultima_escuela: consolaSeleccionada.ultima_escuela,
        }),
      });
      abrirCerrarModalEditar();
      getAlumnos();
    } catch (error) {
      console.log(error);
    }
  };

  // Procedimiento para eliminar
  const postDelete = async (e) => {
    try {
      await fetch("http://127.0.0.1:3000/v1/alumnos/delete", {
        method: "Delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
        }),
      });
      abrirCerrarModalEliminar();
      getAlumnos();
    } catch (error) {
      console.log(error);
    }
  };
  //-------------------------------Datos de ventanas modales---------------

  // -----------------------------Modal para editar---------------------------
  const bodyEditar = (
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 620,
        backgroundColor: "#fefefd",
        top: "48%",
        left: "50%",
        transform: "translate(-48%, -50%)",
        border: "4px solid  rgb(165, 165, 180)",
        margin: "auto",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h3
        style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" }}
        align="center"
      >
        Actualizar Alumnos
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Nombre"
        onChange={handleChange}
        name="nombre"
        value={consolaSeleccionada && consolaSeleccionada.nombre}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido paterno"
        onChange={handleChange}
        name="apellido_paterno"
        value={consolaSeleccionada && consolaSeleccionada.apellido_paterno}
      />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido materno"
        onChange={handleChange}
        name="apellido_materno"
        value={consolaSeleccionada && consolaSeleccionada.apellido_materno}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Estado"
        onChange={handleChange}
        name="estado"
        value={consolaSeleccionada && consolaSeleccionada.estado}
      />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Ciudad"
        onChange={handleChange}
        name="ciudad"
        value={consolaSeleccionada && consolaSeleccionada.ciudad}
      />
      <br />
      
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Escolaridad"
        onChange={handleChange}
        name="escolaridad"
        value={consolaSeleccionada && consolaSeleccionada.escolaridad}
      />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Ultima escuela"
        onChange={handleChange}
        name="ultima_escuela"
        value={consolaSeleccionada && consolaSeleccionada.ultima_escuela}
      />
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
      }}
    >
      <h3
        style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" }}
        align="center"
      >
        Eliminar alumno
      </h3>
      <Typography style={{ align: "justify", fontFamily: "arial" }}>
        El alumno llamado {consolaSeleccionada && consolaSeleccionada.nombre} y
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
  const [pageSize, SetPageSize] = useState(5);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "Id", width: 54, hide: true },
      { field: "idUsuario", headerName: "idUsuario", width: 54, hide: true },
      { field: "curp", headerName: "CURP", width: 200 },
      { field: "nombre", headerName: "Nombre", width: 80 },
      { field: "apellido_paterno", headerName: "Apellido Paterno", width: 120 },
      { field: "apellido_materno", headerName: "Apellido Materno", width: 120 },
      { field: "fecha_de_nacimiento", headerName: "Nacimiento", width: 100 },
      { field: "tutor_nombre", headerName: "Tutor nombre", width: 124 },
      {
        field: "tutor_apellido_paterno",
        headerName: "Tutor apellido paterno",
        width: 154,
      },
      {
        field: "tutor_apellido_materno",
        headerName: "Tutor apellido materno",
        width: 160,
      },
      { field: "tutor_correo", headerName: "Tutor correo", width: 154 },
      { field: "tutor_num_telefono", headerName: "Tutor telefono", width: 104 },
      { field: "num_telefono", headerName: "Telefono", width: 100 },
      { field: "estado", headerName: "Estado", width: 84 },
      { field: "ciudad", headerName: "Ciudad", width: 84 },
      { field: "colonia", headerName: "Colonia", width: 84 },
      { field: "codigo_postal", headerName: "codigo postal", width: 84 },
      { field: "escolaridad", headerName: "Escolaridad", width: 84 },
      { field: "ultima_escuela", headerName: "Ultima escuela", width: 104 },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 95,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],
    [data]
  );

  //---------------------------------------Filter---------------------------
  const [items, setItems] = useState([]);
  return (
    <div>
      <Card
        sx={{
          width: 350,
          position: "absolute",
          textAlign: "left",
          marginLeft: "20px",
          marginTop: "120px",
          border: "2px solid  rgb(165, 165, 180)",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontFamily: "arial" }}
          >
            Filtro
          </Typography>
          <TextField
            style={{
              paddingBottom: "15px",
              fontFamily: "arial",
              width: 300,
              marginLeft: 7,
            }}
            label="Ingrese un nombre para buscar"
            onChange={(e) => {
              setItems([
                {
                  columnField: "nombre",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}
          ></TextField>
        </CardContent>
      </Card>

      <Box
        sx={{
          
          padding: "15px",
          height: "450px",
          position: "absolute",
          marginLeft: "400px",
          width: 800
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "left", mt: 3, mb: 3, fontFamily: "arial" }}
        >
          Alumnos Inscritos
        </Typography>
        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => SetPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
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
        {/* Creacion de modales */}
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
