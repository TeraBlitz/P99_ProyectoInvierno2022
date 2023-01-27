//Importancioon de datos
import React from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo } from "react";
import Actions from "./ActAlumnos";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { CSVLink } from "react-csv";

import Select from "react-select";

export default function Alumnos() {



  //Encargado de guardar la data
  const [data, setData] = useState([]);
  const [guardaData, setGuardaData] = useState([]);
  const [dataPeriodo, setDataPeriodo] = useState([]);
  const [dataAlumnoClase, setDataAlumnoClase] = useState([]);
  let array = []
  let array2 = []
  let array3 = []


  const getAlumnos = async () => {
    const res = await axios.get("https://p99test.fly.dev/v1/alumnos");
    setData(res.data);

  };

  const getAlumnos2 = async () => {
    const res = await axios.get("https://p99test.fly.dev/v1/alumnos");
    setGuardaData(res.data);

  };

  const getPeriodos = async () => {
    const res = await axios.get("https://p99test.fly.dev/v1/periodos");
    setDataPeriodo(res.data);

  };

  const getAlumnoClase = async () => {
    const res = await axios.get("https://p99test.fly.dev/v1/alumnoClases");
    setDataAlumnoClase(res.data);
  };



  useEffect(() => {
    console.log("Empieza UseEfect")
    getAlumnos();
    getAlumnos2();
    getPeriodos();
    getAlumnoClase();
  }, []);

  const [periodo, setPeriodo] = useState("");

  //const [periodoReciente, setPeriodoReciente] = useState("")
  //----------------------------------Funcion para ver periodo mas reciente

  function traducirDate(raw){

    const date = raw.split("T",2);
    return(date[0])

}

  // ------------Editar---------------
  const [modalMas, setModalMas] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    _id: "",
    clave_unica_identificacion: "",
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
    pais: "",
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
  const abrirCerrarModalMas = () => {
    setModalMas(!modalMas);
  };

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
    } else if (caso === "MasInfo") {
      abrirCerrarModalMas();
    } else {
      abrirCerrarModalEliminar();
    }
  };

  // Procedimiento para editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://p99test.fly.dev/v1/alumnos/update", {
        method: "Put",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
          clave_unica_identificacion:
            consolaSeleccionada.clave_unica_identificacion,
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
          pais: consolaSeleccionada.pais,
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
      await fetch("https://p99test.fly.dev/v1/alumnos/delete", {
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

  //-----------------------------Modal Mas informacion----------------------

  const bodyMas = (
    <div
      style={{
        position: "absolute",
        width: 550,
        height: 660,
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
      <h1
        style={{
          paddingBottom: "15px",
          marginTop: "5px",
          fontFamily: "arial",
          width: 500,
        }}
        align="center"
      >
        Informacion completa de Alumno
      </h1>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Nombre:{" "}
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.nombre}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Apellido paterno:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.apellido_paterno}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Apellido materno:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.apellido_materno}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Fecha de Nacimiento:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.fecha_de_nacimiento}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Telefono Estudiante:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.num_telefono}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Nombre del Tutor:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.tutor_nombre}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 20px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Apellido paterno del Tutor:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.tutor_apellido_paterno}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 20px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Apellido materno del Tutor:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.tutor_apellido_materno}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Correo del Tutor:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.tutor_correo}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Telefono del Tutor:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.tutor_num_telefono}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Pais:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.pais}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Estado:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.estado}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Ciudad:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.ciudad}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Colonia:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.colonia}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Codigo Postal:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.codigo_postal}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Escolaridad:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.escolaridad}
        </p>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 10px)",
          gap: 1,
        }}
      >
        <p
          style={{
            align: "justify",
            fontFamily: "arial",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Ultima Escuela:
        </p>
        <p style={{ align: "justify", fontFamily: "arial", fontSize: 20 }}>
          {consolaSeleccionada.ultima_escuela}
        </p>
      </Box>
    </div>
  );

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
      {
        field: "clave_unica_identificacion",
        headerName: "clave_unica_identificacion",
        width: 54,
        hide: true,
      },
      { field: "curp", headerName: "CURP", width: 200, hide: true },
      { field: "nombre", headerName: "Nombre", width: 170 },
      { field: "apellido_paterno", headerName: "Apellido Paterno", width: 190 },
      { field: "apellido_materno", headerName: "Apellido Materno", width: 190 },
      { field: "fecha_de_nacimiento", headerName: "Nacimiento", width: 165 },
      {
        field: "tutor_nombre",
        headerName: "Tutor nombre",
        width: 124,
        hide: true,
      },
      {
        field: "tutor_apellido_paterno",
        headerName: "Tutor apellido paterno",
        width: 154,
        hide: true,
      },
      {
        field: "tutor_apellido_materno",
        headerName: "Tutor apellido materno",
        width: 160,
        hide: true,
      },
      {
        field: "tutor_correo",
        headerName: "Tutor correo",
        width: 154,
        hide: true,
      },
      {
        field: "tutor_num_telefono",
        headerName: "Tutor telefono",
        width: 104,
        hide: true,
      },
      { field: "num_telefono", headerName: "Telefono", width: 160 },
      { field: "pais", headerName: "Pais", width: 84, hide: true },
      { field: "estado", headerName: "Estado", width: 84, hide: true },
      { field: "ciudad", headerName: "Ciudad", width: 84, hide: true },
      { field: "colonia", headerName: "Colonia", width: 84, hide: true },
      {
        field: "codigo_postal",
        headerName: "codigo postal",
        width: 84,
        hide: true,
      },
      {
        field: "escolaridad",
        headerName: "Escolaridad",
        width: 84,
        hide: true,
      },
      {
        field: "ultima_escuela",
        headerName: "Ultima escuela",
        width: 104,
        hide: true,
      },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 200,
        renderCell: (params) => <Actions {...{ params, seleccionarConsola }} />,
      },
    ],
    [data]
  );

  const handleSelectChange = (event) => {

    array = []
    array2 = []
    array3 = []
    console.log(guardaData)
    console.log(event.value);

    array2.push(dataAlumnoClase.filter(data => data.idPeriodo === event.value));
    console.log(array2[0])
    for (let i=0; i< array2.length;i++){
      for (let j=0; j< array2[i].length;j++){
        array.push(guardaData.filter(data => data._id === array2[i][j].idAlumno))
      }
    }
    console.log(array)
    for (let i=0; i< array.length;i++){
      array3.push(array[i][0])
    }
    console.log(array3)
    if( array3.length > 0){
      setData(array3)
    }else{
      getAlumnos()
    }

  };

  //---------------------------------------Filter---------------------------

  const [items, setItems] = useState([]);

  return (

    <div>


      <Box
        sx={{
          width: 1100,
          padding: "15px",
          height: "150px",
          position: "absolute",
          marginLeft: "50px",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "left",
            mt: 3,
            mb: 3,
            fontFamily: "arial",
            display: "flex",
          }}
        >
          Alumnos Inscritos
        </Typography>

        <CSVLink data={data} filename="alumnos.csv">
          <Button
            color="primary"
            variant="contained"
            sx={{ marginLeft: "680px", marginTop: "-120px" }}
          >
            Exportar a CSV
          </Button>
        </CSVLink>
      </Box>

      <Box
        sx={{
          width: 250,
          position: "absolute",
          textAlign: "left",
          marginLeft: "910px",
          marginTop: "30px",
          fontFamily:'arial',
          borderRadius: "8px",

        }}
      >

          <Select
            options={dataPeriodo.map((sup) => ({
              label: sup.clave,
              value: sup._id,
            }))}
            onChange={handleSelectChange}
          />

      </Box>


      <Card
        sx={{
          width: 1100,
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
            sx={{ textAlign: "left", fontFamily: "arial", marginLeft: 1 }}
          >
            Filtro
          </Typography>
          <TextField
            style={{
              paddingBottom: "10px",
              fontFamily: "arial",
              width: 1050,
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
          width: "1130px",
          padding: "15px",
          height: "450px",
          position: "absolute",
          marginLeft: "50px",
          marginTop: "320px",
        }}
      >
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
        <Modal open={modalMas} onClose={() => abrirCerrarModalMas()}>
          {bodyMas}
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
