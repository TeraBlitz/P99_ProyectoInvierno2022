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
import { periodosPrueba } from './../../../data/periodosprueba.js'
import { InsertDriveFile } from "@mui/icons-material";


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
    const [periodo, setPeriodo] = useState("");
    const [currentRowId, setCurrentRowId] = useState(null);

    //Funcion click para abrir el modal
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleClose = () => {
        setOpenDeleteDialog(false);
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
            maximumcapacity !== "" &&
            periodo !== ""
        ) {
            createClasses({
                keys,
                coursename,
                level,
                teacher,
                weeklyfrequency,
                maximumcapacity,
                periodo,
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
                periodo: datas.periodo
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
        periodo: "",
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
        console.log(e.target);
        const { name, value } = e.target;
        setClase({ ...clase, [name]: value });
    };

    const importFile = () => {
        var input = document.createElement('input'); // input that selects the file
        input.type = 'file';

        input.click(); // click the input to select the file

        // what to do when it gatters the file
        input.onchange = e => {
            let target = e.target;
            if (!target.files) {
                return
            }
            let file;
            file = target.files[0];

            let reader = new FileReader(); // file reader
            reader.readAsText(file) // read the file gatered
            // when it is called
            reader.onload = e => {

                if (file.name.includes(".csv")) { // check if the file is markdown or txt
                    let result = e.target?.result?.toString();
                    result !== undefined ? sendCSV(result) : alert("error");
                }
                else {
                    alert("error: el archivo necesita ser tipo markdown o txt")
                }
            }
        }

    }

    const sendCSV = (csv) => {
        const csvArray = csv.split("\n")
        csvArray.shift()
        let clasesJson = [];
        let profesoresJson = [];
        let iterator;
        for (let i = 0; i < csvArray.length; i++) {
            iterator = csvArray[i];
            let iteratorArray = iterator.split(',')
            // agregar clases
            clasesJson[i] = {};
            clasesJson[i].clave = iteratorArray[0]
            clasesJson[i].nombre_curso = iteratorArray[1]
            clasesJson[i].nivel = iteratorArray[2]
            clasesJson[i].area = iteratorArray[3]
            clasesJson[i].modalidad = iteratorArray[4]
            clasesJson[i].clavePeriodo = iteratorArray[5]
            clasesJson[i].cupo_maximo = iteratorArray[6]
            clasesJson[i].edad_minima = iteratorArray[7]
            clasesJson[i].edad_maxima = iteratorArray[8]
            clasesJson[i].lunes = iteratorArray[9]
            clasesJson[i].martes = iteratorArray[10]
            clasesJson[i].miercoles = iteratorArray[11]
            clasesJson[i].jueves = iteratorArray[12]
            clasesJson[i].viernes = iteratorArray[13]
            clasesJson[i].sabado = iteratorArray[14]
            clasesJson[i].cupo_actual = "0"

            // agregar profesores
            profesoresJson[i] = {}
            profesoresJson[i].nombre = iteratorArray[15]
            profesoresJson[i].apellidos = iteratorArray[16]
            profesoresJson[i].matricula = iteratorArray[17]
            profesoresJson[i].correo = iteratorArray[18]
            profesoresJson[i].fecha_de_nacimiento = ""
            profesoresJson[i].num_telefono = ""
            profesoresJson[i].num_cursos_impartidos = "0"
            profesoresJson[i].idUser = ""
        }
        fetch("http://localhost:3000/v1/csv/subirClases",
            {
                method:'POST',
                body:clasesJson,
            }
        ).then(e=>{

        })
        fetch("http://localhost:3000/v1/csv/subirProfesores",
            {
                method:'POST',
                body:profesoresJson,
            }
        ).then(e=>{

        })
    }


    //Funciones que actualiza los datos con las modificacioness
    const handleClick2 = (e) => {
        e.preventDefault();
        if (
            clase.keys &&
            clase.coursename &&
            clase.level &&
            clase.teacher &&
            clase.weeklyfrequency &&
            clase.maximumcapacity &&
            clase.periodo

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
            <TextField
                style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
                label="Periodo"
                onChange={(e) => setPeriodo(e.target.value)}
                value={periodo}
                select
                id="filled-select-currency"
            >
                {periodosPrueba.map(e => {
                    if (e.active == true) {
                        return <MenuItem key={e.key} value={e.value}>
                            {e.value}
                        </MenuItem>
                    }
                })}



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
            <TextField
                style={{ paddingBottom: "15px", width: "24ch", fontFamily: "arial" }}
                label="Periodo"
                onChange={handleChange}
                name="periodo"
                value={clase.periodo}
                select
                id="filled-select-currency"
            >
                {periodosPrueba.map(e => {
                    if (e.active == true) {
                        return <MenuItem key={e.key} value={e.value}>
                            {e.value}
                        </MenuItem>
                    }
                })}


            </TextField>
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
            { field: "id", headerName: "Id", width: 134, hide: true },
            { field: "clave", headerName: "Clave", width: 134 },
            { field: "nombre_curso", headerName: "Curso", width: 170 },
            { field: "nivel", headerName: "Nivel", width: 231 },
            { field: "matriculaMaestro", headerName: "Profesor", width: 220, sortable: false },
            { field: "horario", headerName: "Frecuencia", width: 165 },
            { field: "cupo_maximo", headerName: "Capacidad", width: 160 },
            {
                field: "actions",
                headerName: "Acciones",
                type: "actions",
                width: 175,
                renderCell: (params) => (
                    <Actions {...{ params, deleteClass, editClasses }} />
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
                    <div style={{ display: 'flex', width: '50%', justifyContent: 'space-evenly' }}>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => abrirCerrarModalInsertar()}
                        >
                            {<AddCircleOutlineIcon />} Crear
                        </Button>
                        <Button

                            variant="contained"
                            color="info"
                            onClick={() => importFile()}
                        >
                            <InsertDriveFile /> Importar CSV

                        </Button>

                    </div>
                </Typography>
                <Box sx={{ height: '80vh', width: '70vw' }}>

                    <DataGrid
                        columns={columns}
                        rows={data}
                        getRowId={(row) => row.id}
                        rowsPerPageOptions={[5, 10, 20]}
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
                </Box>

                {/* Creacion de modales */}
                <Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
                    {bodyInsertar}
                </Modal>
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
