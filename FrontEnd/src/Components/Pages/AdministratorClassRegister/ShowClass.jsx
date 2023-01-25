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
    let profesores = []
    const [profesorList, setProfesorList] = useState([])
    const classAtributes = [
        { key: 'clave', value: 'Clave' },
        { key: 'nombre_curso', value: 'Curso' },
        { key: 'nivel', value: 'Nivel' },
        { key: 'matriculaMaestro', value: 'Matricula Maestro' },
        { key: 'edad_minima', value: 'Edad Minima' },
        { key: 'edad_maxima', value: 'Edad Maxima' },
        { key: 'cupo_maximo', value: 'Cupo Maximo' },
        { key: 'cupo_actual', value: 'Cupo Actual' },
        { key: 'modalidad', value: 'Modalidad' },
        { key: 'lunes', value: 'Lunes' },
        { key: 'martes', value: 'Martes' },
        { key: 'miercoles', value: 'Miercoles' },
        { key: 'jueves', value: 'Jueves' },
        { key: 'viernes', value: 'Viernes' },
        { key: 'sabado', value: 'Sabado' },
        { key: 'clavePeriodo', value: 'Clave Periodo' },
        { key: 'area', value: 'Area' },
    ]
    const classTemplate = {
        clave: '',
        nombre_curso: '',
        nivel: '',
        matriculaMaestro: '',
        edad_minima: '',
        edad_maxima: '',
        cupo_maximo: '',
        modalidad: '',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        clavePeriodo: '',
        area: '',
        cupo_actual: '',

    }
    const [nuevaClase, setNuevaClase] = useState(classTemplate)
    let edades = []

    //Funcion click para abrir el modal
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };
    const resetClases = async () => {
        await fetch("http://localhost:3000/v1/clases/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(response => response.json()).then(result => {
            setData([]);
            for (let i = 0; i < result.length; i++) {
                let fechas = ""
                let edades = ""
                let niveles=""
                result[i].lunes != "" ? fechas += "lunes, " : fechas += ""
                result[i].martes != "" ? fechas += "martes, " : fechas += ""
                result[i].miercoles != "" ? fechas += "miercoles, " : fechas += ""
                result[i].jueves != "" ? fechas += "jueves, " : fechas += ""
                result[i].viernes != "" ? fechas += "viernes, " : fechas += ""
                result[i].sabado != "" ? fechas += "sabado, " : fechas += ""
                result[i].edad_maxima ==""?edades =result[i].edad_minima + " en Adelante":edades = result[i].edad_minima + "-"+result[i].edad_maxima
                result[i].nivel == "1"?niveles="desde cero":""
                result[i].nivel == "2"?niveles="con bases":""
                result[i].nivel == "3"?niveles="intermedio":""
                result[i].nivel == "4"?niveles="avanzado":""

                setData(data => [...data, {
                    _id: result[i]._id,
                    clave: result[i].clave,
                    nombre_curso: result[i].nombre_curso,
                    nivel: result[i].nivel,
                    matriculaMaestro: result[i].matriculaMaestro,
                    edades: edades,
                    edad_minima: result[i].edad_minima,
                    edad_maxima: result[i].edad_maxima,
                    cupo_maximo: result[i].cupo_maximo,
                    modalidad: result[i].modalidad,
                    fechas: fechas,
                    lunes: result[i].lunes,
                    martes: result[i].martes,
                    miercoles: result[i].miercoles,
                    jueves: result[i].jueves,
                    viernes: result[i].viernes,
                    sabado: result[i].sabado,
                    clavePeriodo: result[i].clavePeriodo,
                    area: result[i].area,
                    cupo_actual: result[i].cupo_actual,
                    niveles:niveles
                }])
                if (!profesores.includes(result[i].matriculaMaestro)) {
                    profesores.push(result[i].matriculaMaestro)
                }
                else {
                    console.log("profeRepetido")
                }
            }
            setProfesorList(profesores)
            setEdadesList(edades)
        })
    }
    useEffect(() => { resetClases() }, [])

    const handleClose = () => {
        setOpenDeleteDialog(false);
    };



    //Evento que dado un nuevos datos los agrega
    const handleClick = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:3000/v1/clases/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(nuevaClase),

        }).then(()=>{
            abrirCerrarModalInsertar();
            resetClases();
        })
    };


    //Actualiza las clases
    function createClasses(datas) {
    }

    //-------------------------------Editar----------------------------------
    // Estados para editar
    const [modalEditar, setModalEditar] = useState(false);
    const [claseActual, setClaseActual] = useState({
        _id: '',
        clave: '',
        nombre_curso: '',
        nivel: '',
        matriculaMaestro: '',
        edades: '',
        cupo_maximo: '',
        modalidad: '',
        fechas: ''
    });
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

    const handleChange2 = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setNuevaClase({ ...nuevaClase, [name]: value });
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

    const sendCSV = async (csv) => {
        const csvArray = csv.split("\n")
        csvArray.shift()
        let clasesJson = [];
        let profesoresJson = [];
        let iterator;
        // hash table profesores ( para no mandar profesores repetidos)
        let profesorHash = [];
        const profesorFunc = (i) => {
            i = i.slice(2)
            return Number(i)

        }
        profesorFunc('a01198211')
        let j = 0;
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
            clasesJson[i].matriculaMaestro = iteratorArray[17]
            clasesJson[i].cupo_actual = "0"
            // JSON.stringify(clasesJson[i])

            // agregar profesores
            if (!profesorHash[profesorFunc(iteratorArray[17])]) {
                profesoresJson[j] = {}
                profesoresJson[j].nombre = iteratorArray[15]
                profesoresJson[j].apellidos = iteratorArray[16]
                profesoresJson[j].matricula = iteratorArray[17]
                profesoresJson[j].correo = iteratorArray[18]
                profesoresJson[j].fecha_de_nacimiento = ""
                profesoresJson[j].num_telefono = ""
                profesoresJson[j].num_cursos_impartidos = "0"
                profesoresJson[j].idUser = ""

                profesorHash[profesorFunc(iteratorArray[17])] = true
                j++
            }
        }

        //console.log(clasesJson)
        await fetch("http://localhost:3000/v1/csv/subirClases",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    clasesJson: JSON.stringify(clasesJson)
                }),
            }
        )
            .then(response => response.json())
            .then(result => {
                resetClases()
            })
            .catch(error => console.log('Error(ShowClass): ', error));

        await fetch("http://localhost:3000/v1/csv/subirProfesores",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    clasesJson: JSON.stringify(profesoresJson)
                }),
            }
        )
    }

    const seleccionarConsola = (consola, caso) => {
        if (caso === "Editar") {
            editClasses(consola._id, consola)
        } else if (caso === "Eliminar") {
            deleteClass(consola._id)
        } else {
        }
    };

    //Funciones que actualiza los datos con las modificacioness
    const handleClick2 = (e) => {
        e.preventDefault();
        updateClass(clase);
    };
    const updateClass = (nuevaClase) => {
        delete nuevaClase.fechas
        delete nuevaClase.edades
        fetch("http://localhost:3000/v1/clases/update", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(nuevaClase)

        }).then(e => {
            abrirCerrarModalEditar();
            resetClases();
        }
        )
    };

    //------------------------------------Eliminar-------------------------------------
    // Se agrego un componente de dialogo para confirmar la eliminacion de una clase


    async function deleteClass(id) {
        await fetch("http://localhost:3000/v1/clases/delete", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(
                {
                    _id: id,
                }
            )

        }).then(() => {
            resetClases()
        })
        handleClose();
    }


    //-------------------------------Datos de ventanas modales---------------
    const bodyInsertar = (
        <div
            style={{
                position: "absolute",
                width: 520,
                height: '90vh',
                backgroundColor: "#fefefd",
                top: "48%",
                left: "50%",
                transform: "translate(-48%, -50%)",
                border: "4px solid  rgb(165, 165, 180)",
                margin: "auto",
                borderRadius: "10px",
                padding: "20px",
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',

            }}
        >
            <h3
                style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial", width:'100%' }}
                align="center"
            >
                Crear una nueva clase
            </h3>

            {classAtributes.map(atribute => (
                <TextField
                    style={{ paddingBottom: "15px", fontFamily: "arial", marginRight: 10 }}
                    label={atribute.value}
                    onChange={e => {handleChange2(e)}}
                    name={atribute.key}
                    key={atribute.key}
                    value={nuevaClase[atribute.key]}
                    autoFocus
                />
            ))}
            <div align="center" style={{width:'100%'}}>
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
                width: 520,
                height: '90vh',
                backgroundColor: "#fefefd",
                top: "48%",
                left: "50%",
                transform: "translate(-48%, -50%)",
                border: "4px solid  rgb(165, 165, 180)",
                margin: "auto",
                borderRadius: "10px",
                padding: "20px",
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >

            <h3
                style={{ paddingBottom: "15px", marginTop: "5px", fontFamily: "arial" , width:'100%'}}
                align="center"
            >
                Actualizar una clase
            </h3>
            {classAtributes.map(atribute => (
                <TextField
                    style={{ paddingBottom: "15px", fontFamily: "arial", marginRight: 10 }}
                    label={atribute.value}
                    onChange={e => {handleChange(e)}}
                    name={atribute.key}
                    key={atribute.key}
                    value={clase[atribute.key]}
                    autoFocus
                />
            ))}
            <div align="center" style={{width:'100%'}}>
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
            { field: "clave", headerName: "Clave", width: 134 },
            { field: "nombre_curso", headerName: "Curso", width: 170 },
            { field: "niveles", headerName: "Nivel", width: 100 },
            { field: "matriculaMaestro", headerName: "Profesor", width: 140, sortable: false },
            { field: "cupo_maximo", headerName: "Capacidad", width: 160 },
            { field: 'edades', headerName: 'Edades', width: 160 },
            { field: 'fechas', headerName: 'Fechas', width: 160 },
            { field: 'modalidad', headerName: 'modalidad', width: 111 },
            {
                field: "actions",
                headerName: "Acciones",
                type: "actions",
                width: 175,
                renderCell: (params) => (
                    <Actions {...{ params, seleccionarConsola }} />
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
                                    columnField: "nombre_curso",
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
                                    columnField: "nivel",
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
                                    columnField: "matriculaMaestro",
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
                        getRowId={(row) => row._id}
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
