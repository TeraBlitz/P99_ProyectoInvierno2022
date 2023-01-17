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
import { data as information } from "../../../data/datosprueba";
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
import { minWidth,minHeight } from "@mui/system";
import DeleteDialog from './DeleteDialog'
export default function ShowClass() {
  //--------------------------------------------Agregar----------------
  //Agregar numeros
  const [number, setNumber] = useState(5);
  function add() {
    setNumber((prevNumber) => prevNumber + 1);
  }
//Estados de agregar
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [keys, setKey] = useState("");
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");
  const [currentRowId, setCurrentRowId] = useState(null); 

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  
  //Funcion click para abrir el modal
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  //Evento que dado un nuevos datos los agrega
  const handleClick = (e) => {
    e.preventDefault();
    if (
      keys !== "" &&
      coursename !== "" &&
      level !== "" &&
      teacher !== "" &&
      weeklyfrequency !== "" &&
      maximumcapacity !== ""
    ) {
      createClasses({
        keys,
        coursename,
        level,
        teacher,
        weeklyfrequency,
        maximumcapacity,
      });
      setKey("");
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

  //Se encarga de guardar la nueva informacion
  useEffect(() => {
    setData(information);
  }, []);

  //Actualiza las clases
  function createClasses(datas) {
    add();
    setData([
      ...data,
      {
        id: number + 1,
        keys: datas.keys,
        coursename: datas.coursename,
        level: datas.level,
        teacher: datas.teacher,
        weeklyfrequency: datas.weeklyfrequency,
        maximumcapacity: datas.maximumcapacity,
      },
    ]);
    abrirCerrarModalInsertar();
  }

  //-------------------------------Editar----------------------------------
  // Estados para editar
  const [modalEditar, setModalEditar] = useState(false);
  const claseInicial = {
    id: -1,
    keys: "",
    coursename: "",
    level: "",
    teacher: "",
    weeklyfrequency: "",
    maximumcapacity: 0,
  };
  const [claseActual, setClaseActual] = useState(claseInicial);
  //Function que abre o cierra el modal
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const editClasses = (id, clase) => {
    setClaseActual(clase);
    abrirCerrarModalEditar();
  };

  //Funcion que guarda informacion del modal
  useEffect(() => {
    setClase(claseActual);
  }, [claseActual]);

  //Estado que guarda el array modificado
  const [clase, setClase] = useState(claseActual);

  //Funcion que modifica los daors
  const handleChange = (e) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  //Funciones que actualiza los datos con las modificacioness
  const handleClick2 = (e) => {
    e.preventDefault();
    if (
      clase.keys &&
      clase.coursename &&
      clase.level &&
      clase.teacher &&
      clase.weeklyfrequency &&
      clase.maximumcapacity
    )
      updateClass(clase);
  };

  const updateClass = (nuevaClase) => {
    setData(
      data.map((datos) => (datos.id === claseActual.id ? nuevaClase : datos))
    );
    setClaseActual(claseInicial);
    abrirCerrarModalEditar();
  };

  //------------------------------------Eliminar-------------------------------------
  // Se agrego un componente de dialogo para confirmar la eliminacion de una clase
  
  const classToDelete = (id, clase) => {
    setClaseActual(clase);
  };

  function deleteClass() {
    setData(data.filter((datos) => datos.id !== claseActual.id));
    handleClose();
  }

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
        Crear una nueva clase
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Curso"
        onChange={(e) => setCoursename(e.target.value)}
        value={coursename}
        autoFocus
      />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Clave"
        onChange={(e) => setKey(e.target.value)}
        value={keys}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Nivel"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
        select
        id="filled-select-currency"
      >
        {niveles.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontFamily: "arial" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <Autocomplete
        value={teacher}
        onChange={(event, newValue) => {
          setTeacher(newValue);
        }}
        id="profesores-insertar"
        options={profes}
        renderInput={(params) => <TextField {...params} label="Profesor" />}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Frecuencia Semanal"
        onChange={(e) => setWeeklyfrequency(e.target.value)}
        value={weeklyfrequency}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Capacidad"
        type="number"
        onChange={(e) => setMaximumcapacity(e.target.value)}
        value={maximumcapacity}
      />
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={handleClick}>
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
        height: 480,
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
        Actualizar una clase
      </h3>
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Curso"
        value={clase.coursename}
        name="coursename"
        onChange={handleChange}
        autoFocus
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Nivel"
        onChange={handleChange}
        name="level"
        value={clase.level}
        select
        id="filled-select-currency"
      >
        {niveles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <TextField
        style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
        label="Nivel"
        onChange={handleChange}
        name="teacher"
        value={clase.teacher}
        select
        id="filled-select-currency"
      >
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
        name="weeklyfrequency"
        value={clase.weeklyfrequency}
        onChange={handleChange}
      />
      <br />
      <TextField
        style={{ paddingBottom: "15px", fontFamily: "arial" }}
        label="Capacidad"
        name="maximumcapacity"
        type="number"
        value={clase.maximumcapacity}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="center">
        <Button color="primary" onClick={handleClick2}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
  );

  //---------------------------------------Show--------------
  const [pageSize, SetPageSize] = useState(5);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 54, hide: true },
      { field: "keys", headerName: "Clave", width: 54 },
      { field: "coursename", headerName: "Curso", width: 90 },
      { field: "level", headerName: "Nivel", width: 151 },
      { field: "teacher", headerName: "Profesor", width: 140, sortable: false },
      { field: "weeklyfrequency", headerName: "Frecuencia", width: 85 },
      { field: "maximumcapacity", headerName: "Capacidad", width: 80 },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 95,
        renderCell: (params) => (
          <Actions {...{ params, handleClickOpen, editClasses, classToDelete}} />
        ),
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
          maxWidth: 255,
          position: "absolute",
          textAlign: "left",
          marginLeft: "5px",
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
            Filtros
          </Typography>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Curso"
            onChange={(e) => {
              setItems([
                {
                  columnField: "coursename",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}
          ></TextField>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Nivel"
            onChange={(e) => {
              setItems([
                {
                  columnField: "level",
                  operatorValue: "contains",
                  value: e.target.value,
                },
              ]);
            }}
          ></TextField>
          <TextField
            style={{ paddingBottom: "15px", fontFamily: "arial" }}
            label="Profesor"
            onChange={(e) => {
              setItems([
                {
                  columnField: "teacher",
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
          width: '740px',
          padding: "15px",
          height: '450px',
          position: "absolute",
          marginLeft: "265px",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "left", mt: 3, mb: 3, fontFamily: "arial" }}
        >
          Clases
          <Button
            sx={{ marginLeft: "350px" }}
            variant="contained"
            color="success"
            onClick={() => abrirCerrarModalInsertar()}
          >
            {<AddCircleOutlineIcon />} Crear
          </Button>
        </Typography>

        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row.id}
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
        <DeleteDialog deleteClass={deleteClass} handleClose={handleClose} open={openDeleteDialog}/>
        {/* Creacion de modales */}
        <Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
          {bodyInsertar}
        </Modal>

        <Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
          {bodyEditar}
        </Modal>
      </Box>
    </div>
  );
}
