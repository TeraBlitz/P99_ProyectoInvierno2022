//Importancion de datos
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Button,
    Modal,
    TextField,
    Box,
    Typography
} from "@mui/material";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo } from "react";
import Actions from "./ActProfes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "react-select";
import { createProfesor, deleteProfesor, getProfesors, updateProfesor } from "../../../../api/profesors";
import { getClasses } from "../../../../api/classes";
import { getPeriodos } from "../../../../api/Periodos";

export default function Profesores() {
    //------------------------------------Obtener info----------------
    let array = []
    let array2 = []
    let array3 = []
    const [data, setData] = useState([]);
    const [guardaData, setGuardaData] = useState([]);
    const [dataPeriodo, setDataPeriodo] = useState([]);
    const [dataClase, setDataClase] = useState([]);

    const getProfesores = async () => {
        await getProfesors().then(response => response.json()).then(result => {
            setData(result);
        })
    };

    const getClases = async () => {
        await getClasses().then(response => response.json()).then(result => {
            setDataClase(result);
        })
    };

    const getProfesores2 = async () => {
        await getProfesors().then(response => response.json()).then(result => {
            setGuardaData(result);
        })
    };

    const getAllPeriodos = async () => {
        await getPeriodos().then(response => response.json()).then(result => {
            setDataPeriodo(result);
        })
    };

    useEffect(() => {
        getProfesores();
        getProfesores2();
        getAllPeriodos();
        getClases();
    }, []);

    //----------------------Estados para el cud
    const [modalInsertar, setModalInsertar] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [matricula, setMatricula] = useState("");
    const [correo, setCorreo] = useState("");
    const [fecha_de_nacimiento, setFecha_de_nacimiento] = useState("");
    const [num_telefono, setNum_telefono] = useState("");
    const [num_cursos_impartidos, setNum_cursos_impartidos] = useState("");
    const [idUser, setIdUser] = useState("");
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        _id: "",
        nombre: "",
        apellidos: "",
        matricula: "",
        correo: "",
        fecha_de_nacimiento: "",
        num_telefono: "",
        num_cursos_impartidos: "",
        idUser: "",
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
            await createProfesor({
                nombre: nombre,
                apellidos: apellidos,
                matricula: matricula,
                correo: correo,
                fecha_de_nacimiento: fecha_de_nacimiento,
                num_telefono: num_telefono,
                num_cursos_impartidos: num_cursos_impartidos,
                idUser: idUser
            })
            abrirCerrarModalInsertar();
            getProfesores();
            setNombre("");
            setApellidos("");
            setMatricula("");
            setCorreo("");
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
                label="Apellidos"
                onChange={(e) => setApellidos(e.target.value)}
                value={apellidos}
            />
            <br />
            <TextField
                style={{ paddingBottom: "15px", fontFamily: "arial" }}
                label="Matricula"
                onChange={(e) => setMatricula(e.target.value)}
                value={matricula}
            />
            <br />
            <TextField
                style={{ paddingBottom: "15px", fontFamily: "arial" }}
                label="Correo"
                onChange={(e) => setCorreo(e.target.value)}
                value={correo}
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
            console.log(consolaSeleccionada)
            await updateProfesor({
                _id: consolaSeleccionada._id,
                nombre: consolaSeleccionada.nombre,
                apellidos: consolaSeleccionada.apellidos,
                matricula: consolaSeleccionada.matricula,
                correo: consolaSeleccionada.correo,
                fecha_de_nacimiento: consolaSeleccionada.fecha_de_nacimiento,
                num_telefono: consolaSeleccionada.num_telefono,
                num_cursos_impartidos: consolaSeleccionada.num_cursos_impartidos,
                idUser: consolaSeleccionada.idUser
            }).then(response=>console.log(response))
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
                label="Apellidos"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.apellidos}
                name="apellidos"
            />
            <br />
            <TextField
                style={{ paddingBottom: "15px", fontFamily: "arial" }}
                label="Matricula"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.matricula}
                name="matricula"
            />
            <br />
            <TextField
                style={{ paddingBottom: "15px", fontFamily: "arial" }}
                label="Correo"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.correo}
                name="correo"
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
            await deleteProfesor({
                    _id: consolaSeleccionada._id,
                })
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
            { field: "apellidos", headerName: "Apellidos", width: 180 },
            { field: "matricula", headerName: "Matricula", width: 180 },
            { field: "correo", headerName: "Correo", width: 180 },
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

    const handleSelectChange = (event) => {

        array = []
        array2 = []
        array3 = []
        console.log(guardaData)
        console.log(event);
        array2.push(dataClase.filter(data => data.clavePeriodo === event.label));
        console.log(array2[0])
        for (let i = 0; i < array2.length; i++) {
            for (let j = 0; j < array2[i].length; j++) {
                array.push(guardaData.filter(data => data.matricula === array2[i][j].matriculaProfesor))
            }
        }
        console.log(array)
        for (let i = 0; i < array.length; i++) {
            array3.push(array[i][0])
        }
        console.log(array3)
        if (array3.length > 0) {
            setData(array3)
        } else {
            getProfesores()
        }

    };


    //---------------------------------------Filter---------------------------
    const [items, setItems] = useState([]);
    return (
        <div>
            <Card
                sx={{
                    width: 1120,
                    position: "absolute",
                    textAlign: "left",
                    marginLeft: "65px",
                    marginTop: "125px",
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
                        style={{ paddingBottom: "10px", fontFamily: "arial", width: 1070, marginLeft: 7 }}
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
                    width: 250,
                    position: "absolute",
                    textAlign: "left",
                    marginLeft: "930px",
                    marginTop: "67px",
                    fontFamily: 'arial',
                    borderRadius: "8px",

                }}
            >

                <Select
                    sx={{
                        fontFamily: 'default',
                    }}
                    options={dataPeriodo.map((sup) => ({
                        label: sup.clave,
                        value: sup._id,
                    }))}
                    onChange={handleSelectChange}
                />

            </Box>

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
                        sx={{ marginLeft: "400px" }}
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
                    width: "1150px",
                    padding: "15px",
                    height: "430px",
                    position: "absolute",
                    marginLeft: "50px",
                    marginTop: "270px"
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
