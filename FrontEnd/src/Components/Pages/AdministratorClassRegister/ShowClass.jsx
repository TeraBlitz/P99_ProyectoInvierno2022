//Importancioon de datos
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Modal, TextField, Box,Typography } from "@mui/material";
import { data as information } from "../../../data/datosprueba";
import { useState, useEffect } from "react";
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useMemo } from "react";
import Actions from "./Actions";

import IdcellRender from "./IdcellRender";
export default function ShowClass() {
  //--------------------------------------------Agregar----------------
  //Estados de agregar
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");

  //Funcion click para abrir el modal
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  //Evento que dado un nuevos datos los agrega
  const handleClick = (e) => {
    e.preventDefault();
    if (
      coursename !== "" &&
      level !== "" &&
      teacher !== "" &&
      weeklyfrequency !== "" &&
      maximumcapacity !== ""
    ) {
      createClasses({
        coursename,
        level,
        teacher,
        weeklyfrequency,
        maximumcapacity,
      });
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
    abrirCerrarModalInsertar();
  }

  //-------------------------------Editar----------------------------------
  // Estados para editar
  const [modalEditar, setModalEditar] = useState(false);
  const claseInicial = {
    id: -1,
    coursename: "",
    level: 4,
    teacher: "",
    weeklyfrequency: "",
    maximumcapacity: "",
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
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  //Funciones que actualiza los datos con las modificacioness
  const handleClick2 = (e) => {
    e.preventDefault();
    if (
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

  //--------------------------------------------Eliminar--------------
  // Solo se usa un filter para eliminar
  function deleteClass(classId) {
    setData(data.filter((datos) => datos.id !== classId));
  }

  //-----------------------------Caso que no haya------------------
  // if (data.length === 0)
  //   return (
  //     <Box>
  //        <Typography variant = 'h3' component = 'h3' sx={{textAlign:'left',mt:3,mb:3}} > No hayClases <Button 
  //         variant="contained"
  //         color="success"
  //         onClick={() => abrirCerrarModalInsertar()}>
  //         {<AddCircleOutlineIcon />} Crear
  //       </Button></Typography>
  //     </Box>
  //   );

  //-------------------------------Datos de ventanas modales---------------
  const bodyInsertar = (
    <div style={{position: 'absolute', width: 200,height:440, backgroundColor: '#fefefd',top:'50%', left:'50%',transform: 'translate(-50%, -50%)',border: '4px solid  #7382f1',margin:'auto',borderRadius:'10px',padding:"8px"}}>
      <h3 style={{paddingBottom:'10px',marginTop:'5px'}} align="center">Crear una nueva clase</h3>
      <TextField style={{paddingBottom:'10px'}}
        label="Curso"
        onChange={(e) => setCoursename(e.target.value)}
        value={coursename}
        autoFocus
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Nivel"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Profesor"
        onChange={(e) => setTeacher(e.target.value)}
        value={teacher}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Frecuencia Semanal"
        onChange={(e) => setWeeklyfrequency(e.target.value)}
        value={weeklyfrequency}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Capacidad"
        type="number"
        onChange={(e) => setMaximumcapacity(e.target.value)}
        value={maximumcapacity}
      />
      <br />
      <br />
      <div align="center">
        <Button  color="primary" onClick={handleClick}>
          Insertar
        </Button> 
        <Button onClick={() => abrirCerrarModalInsertar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>

    // Show
  );

  const bodyEditar = (
    <div style={{position: 'absolute', width: 200,height:440, backgroundColor: '#fefefd',top:'50%', left:'50%',transform: 'translate(-50%, -50%)',border: '4px solid  #7382f1',margin:'auto',borderRadius:'10px',padding:"8px"}}>
      <h3 style={{paddingBottom:'10px',marginTop:'5px'}} align="center">Actualizar una clase</h3>
      <TextField style={{paddingBottom:'10px'}}
        label="Curso"
        value={ clase.coursename}
        name="coursename"
        onChange={handleChange}
        autoFocus
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Nivel"
        name="level"
        value={ clase.level}
        onChange={handleChange}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Profesor"
        name="teacher"
        value={ clase.teacher}
        onChange={handleChange}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
        label="Frecuencia Semanal"
        name="weeklyfrequency"
        value={ clase.weeklyfrequency}
        onChange={handleChange}
      />
      <br />
      <TextField style={{paddingBottom:'10px'}}
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
        <Button  onClick={() => abrirCerrarModalEditar()} color="error">
          Cancelar
        </Button>
      </div>
    </div>
    
  );
  //---------------------------------------Show--------------
  const [pageSize,SetPageSize] = useState(5);

 
  const columns = useMemo(()=>[
    {field:'id',headerName:'Clave',width:80,cellRender:IdcellRender},
    {field:'coursename',headerName:'Curso',width:130},
    {field:'level',headerName:'Nivel',width:150},
    {field:'teacher',headerName:'Profesor',width:140,sortable:false},
    {field:'weeklyfrequency',headerName:'Frecuencia',width:80},
    {field:'maximumcapacity',headerName:'Capacidad',width:70},
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 150,
      renderCell: (params) => <Actions {...{ params,deleteClass,editClasses }} />,
    }
    
  ],[data.id]);
  return (
    <Box sx={{width: 800,
    padding: '15px',
    height: 420,
    position: 'relative'}}>
      
      <Typography variant = 'h3' component = 'h3' sx={{textAlign:'left',mt:3,mb:3}} > Clases <Button 
          variant="contained"
          color="success"
          onClick={() => abrirCerrarModalInsertar()}>
          {<AddCircleOutlineIcon />} Crear
        </Button></Typography>
      <DataGrid
      columns={columns}
      rows={data}
      checkboxSelection 
      onSelectionModelChange={id => console.log(id)}
      getRowId={(row) => row.id}
      rowsPerPageOptions={[5,10]}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => SetPageSize(newPageSize)}
      
      getRowSpacing={(params) => ({
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}

      sx={{
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? grey[200] : grey[900],
        },
      }}
       />

      {/* Creacion de modales */}
       <Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
        {bodyEditar}
      </Modal>

    </Box> 
  );
}
