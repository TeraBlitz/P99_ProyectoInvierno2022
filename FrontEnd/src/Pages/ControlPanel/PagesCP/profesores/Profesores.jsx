//Importancion de datos
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo } from "react";
import Actions from "./ActProfes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import {CSVLink} from 'react-csv'


export default function Profesores() {
  //------------------------------------Obtener info----------------
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [dataPeriodo, setDataPeriodo] = useState([]);

  const  getProfesores  = async () => {
    const res = await axios.get("http://127.0.0.1:3000/v1/profesores");
    setData(res.data);
  };

  const  getPeriodos = async () => {
    const res = await axios.get("http://127.0.0.1:3000/v1/periodos");
    setDataPeriodo(res.data);
  };

  useEffect(() => {
    getProfesores();
    getPeriodos();
  }, []);

  //----------------------Estados para el cud
  const [modalInsertar, setModalInsertar] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido_paterno, setApellido_paterno] = useState("");
  const [apellido_materno, setApellido_materno] = useState("");
  const [fecha_de_nacimiento, setFecha_de_nacimiento] = useState("");
  const [num_telefono, setNum_telefono] = useState("");
  const [num_cursos_impartidos, setNum_cursos_impartidos] = useState("");
  const [idUser, setIdUser] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    _id: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_de_nacimiento: "",
    num_telefono: "",
    num_cursos_impartidos: "",
    idUser:"",
  });
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


  //procedimiento para crear datos
  const postCrea = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/profesores/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nombre: nombre,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          fecha_de_nacimiento: fecha_de_nacimiento,
          num_telefono: num_telefono,
          num_cursos_impartidos: num_cursos_impartidos,
          idUser : idUser
        }),
      });
      abrirCerrarModalInsertar();
      getProfesores();
      setNombre("");
      setApellido_paterno("");
      setApellido_materno("");
      setFecha_de_nacimiento("");
      setNum_telefono("");
      setNum_cursos_impartidos("");
      setIdUser("");
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
        height: 560,
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
        Agregar Profesor
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Nombre"
        onChange={(e) => setNombre(e.target.value)}
        value={nombre}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido paterno"
        onChange={(e) => setApellido_paterno(e.target.value)}
        value={apellido_paterno}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido materno"
        onChange={(e) => setApellido_materno(e.target.value)}
        value={apellido_materno}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Fecha de nacimiento"
        onChange={(e) => setFecha_de_nacimiento(e.target.value)}
        value={fecha_de_nacimiento}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Telefono"
        onChange={(e) => setNum_telefono(e.target.value)}
        value={num_telefono}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Cursos impartidos"
        onChange={(e) => setNum_cursos_impartidos(e.target.value)}
        value={num_cursos_impartidos}
      />
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
//-----------------Editar y eliminar--------------------------

// Nos dice que texto fue seleccionado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
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

  // Procedimiento para editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/profesores/update", {
        method: "Put",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
          nombre: consolaSeleccionada.nombre,
          apellido_paterno: consolaSeleccionada.apellido_paterno,
          apellido_materno: consolaSeleccionada.apellido_materno,
          fecha_de_nacimiento: consolaSeleccionada.fecha_de_nacimiento,
          num_telefono: consolaSeleccionada.num_telefono,
          num_cursos_impartidos: consolaSeleccionada.num_cursos_impartidos,
          idUser : consolaSeleccionada.idUser
        }),
      });
      abrirCerrarModalEditar();
      getProfesores();
    } catch (error) {
      console.log(error);
    }
  };


  //  -----------------------------Modal para editar---------------------------
    const bodyEditar = (
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 580,
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
          Actualizar Profesor
        </h3>
        <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
        name="nombre"
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido paterno"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.apellido_paterno}
        name="apellido_paterno"
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Apellido materno"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.apellido_materno}
        name="apellido_materno"
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Fecha de nacimiento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.fecha_de_nacimiento}
        name="fecha_de_nacimiento"
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Telefono"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.num_telefono}
        name="num_telefono"
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Cursos impartidos"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.num_cursos_impartidos}
        name="num_cursos_impartidos"
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
//-------------------------Modal Eliminar----------------------------------

const postDelete = async (e) => {
  try {
    await fetch("http://127.0.0.1:3000/v1/profesores/delete", {
      method: "Delete",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        _id: consolaSeleccionada._id,
      }),
    });
    abrirCerrarModalEliminar();
    getProfesores();
  } catch (error) {
    console.log(error);
  }
};


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
      El profesor de {consolaSeleccionada && consolaSeleccionada.nombre} y
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
      { field: "nombre", headerName: "Nombre", width: 120 },
      { field: "apellido_paterno", headerName: "Apellido Paterno", width: 180 },
      { field: "apellido_materno", headerName: "Apellido Materno", width: 180 },
      { field: "num_telefono", headerName: "Telefono", width: 120 },
      { field: "fecha_de_nacimiento", headerName: "Nacimiento", width: 100 },
      {
        field: "num_cursos_impartidos",
        headerName: "Cursos Impartidos",
        width: 120,
      },
      { field: "idUser", headerName: "Usuario", width: 250, hide: true },

      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 95,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }}></Actions>,
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
          width: 970,
          position: "absolute",
          textAlign: "left",
          marginLeft: "65px",
          marginTop: "150px",
          bgcolor: "grey.200",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "left", fontFamily: "arial", marginLeft:1}}
          >
            Filtro
          </Typography>
           <TextField
            style={{ paddingBottom: "10px", fontFamily: "arial" , width:920, marginLeft:7}}
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

      <Card sx={{
          width: 250,
          position: "absolute",
          textAlign: "left",
          marginLeft: "785px",
          marginTop: "45px",
          bgcolor: "grey.200",
          borderRadius: "8px",
          height: 90
        }}>
        <CardContent>
          <TextField
            style={{
              paddingBottom: "15px",
              width: "24ch",
              fontFamily: "arial",
            }}
            label="Periodo"
            onChange={(e) => setPeriodo(e.target.value)}
            value={periodo}
            select
            id="filled-select-currency"
          >
            {dataPeriodo.map((e) => {
                return (
                  <MenuItem key={e._id} value={e.clave}>
                    {e.clave}
                  </MenuItem>
                );
            })}
          </TextField>
        </CardContent>
      </Card>

      <Box
        sx={{
          width: "1000px",
          padding: "15px",
          height: "150px",
          position: "absolute",
          marginLeft: "50px",
          marginTop: '15px'
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "left", mt: 3, mb: 3, fontFamily: "arial" }}
        >
          Profesores

          <Button
            sx={{ marginLeft: "270px" }}
            variant="contained"
            color="success"
            onClick={() => abrirCerrarModalInsertar()}
          >
            {<AddCircleOutlineIcon />} Agregar Profesor
          </Button>
        </Typography>


        </Box>

        <Box
        sx={{
          width: "1000px",
          padding: "15px",
          height: "450px",
          position: "absolute",
          marginLeft: "50px",
          marginTop: "300px"
        }}>

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
