import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Clase from "../../Components/Clase/Clase";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Button, Link, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { getStudents } from "../../api/students";
import { getClasses } from "../../api/classes";
import { useAuth0 } from "@auth0/auth0-react";
import {
  createClassStudent,
  getClassStudent,
  deleteClassStudent,
} from "../../api/classStudent";
import {
  createWaitList,
  getWaitList,
  deleteWaitList,
} from "../../api/waitList";
import { findTerm, getPeriodos } from "../../api/term";
import ConfirmationDialog from "../../Components/Dialog/ConfirmationDialog";
import ClaseModal from "../../Components/Clase/ClaseModal";
import MiRegistro from "../../Components/Registro/MiRegistro";
import moment from "moment-timezone";
import { startDateDict, endDateDict } from "../../utils/constants";
import { getNivel, getHorario, getProfesor, getCupo, calculateAge, compararFecha } from "../../utils/utilFunctions";

function RegistroClasesAlumnos({ changeContent }) {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [error, setError] = useState(false);
  const [clases, setClases] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [claseRegistrada, setClaseRegistrada] = useState([]); // esto se obtendria de la base de datos
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [currentClase, setCurrentClase] = useState();
  const [selectAlertOpen, setSelectAlertOpen] = useState(false);
  const [filteredClasses, setFilteredClasses] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [periodos, setPeriodos] = useState([]);

  const { user } = useAuth0();

  useEffect(() => {
    const getUserStudents = () => {
      getStudents()
        .then((response) => response.json())
        .then((data) => {
          const students = data.filter(
            (student) => student.idUser === user.sub
          );
          setStudents(students);
        });
    };
  
    const getStudentClasses = async () => {
      const data = await getPeriodos().then((res) => res.json());
      const periodo = compararFecha(data);
      setPeriodos(data);
  
      const activeTerm = await findTerm({ clave: periodo }).then((res) =>
        res.json()
      );
      const result = await getClasses().then((res) => res.json());
  
      const allTermClases = result.filter(
        (item) => item.clavePeriodo === activeTerm[0].clave
      );
      const allClassNames = allTermClases.map((item) => item.nombre_curso);
      setClassNames([...new Set(allClassNames)]);
  
      const currentDate = moment().tz("America/Mexico_City").format();
      const activeTermClases = allTermClases.filter(
        (item) =>
          activeTerm[0][startDateDict[item.area]] < currentDate &&
          activeTerm[0][endDateDict[item.area]] > currentDate
      );
  
      setClases(activeTermClases);
      setFilteredClasses(activeTermClases);
    };
  
    getUserStudents();
    getStudentClasses();
  }, []);

  const columns = [
    {
      field: "clavePeriodo",
      headerName: "Periodo",
      width: 110,
      editable: false,
    },
    {
      field: "clave",
      headerName: "Clave",
      width: 90,
    },
    {
      field: "nombre_curso",
      headerName: "Curso",
      width: 90,
      editable: false,
    },
    {
      field: "nivel",
      headerName: "Nivel",
      width: 100,
      editable: false,
      valueGetter: getNivel,
    },
    {
      field: "area",
      headerName: "Area",
      width: 110,
      editable: false,
    },
    {
      field: "modalidad",
      headerName: "Modalidad",
      width: 110,
      editable: false,
    },
    {
      field: "horario",
      headerName: "Horario",
      width: 150,
      editable: false,
      valueGetter: getHorario,
    },
    {
      field: "profesor",
      headerName: "Profesor",
      width: 140,
      editable: "false",
      valueGetter: getProfesor,
    },
    ,
    {
      field: "cupos",
      headerName: "% curso lleno",
      width: 100,
      editable: "false",
      valueGetter: getCupo,
    },
    {
      field: "actions",
      headerName: "Inscripción",
      type: "actions",
      width: 115,
      renderCell: (params) =>
        Number(params.row.cupo_actual) < Number(params.row.cupo_maximo) ? (
          <Button
            size='small'
            onClick={() => handleClick(params.row)}
            variant='outlined'
          >
            {params.row.status === "Inscrito" &&
            params.row.status !== "ListaEspera"
              ? "Cancelar Registro"
              : "Inscribir"}
          </Button>
        ) : (
          <Button
            size='small'
            onClick={() => handleClick(params.row)}
            variant='outlined'
          >
            {params.row.status === "ListaEspera" &&
            params.row.status !== "Inscrito"
              ? "Salir de Lista"
              : "Lista Espera"}
          </Button>
        ),
    },
  ];

  const handleClick = (clase) => {
    if (currentStudent == null) {
      setSelectAlertOpen(true);
      return;
    }
    switch (clase.status) {
      case "Inscrito":
        setDialogAction("CancelarInscripcion");
        handleOpenDialog(clase);
        break;
      case "ListaEspera":
        setDialogAction("SalirLista");
        handleOpenDialog(clase);
        break;
      case "":
        Number(clase.cupo_actual) < Number(clase.cupo_maximo)
          ? setDialogAction("Registrar")
          : setDialogAction("ListaEspera");
        handleOpenDialog(clase);
    }
  };

  const handleMoreInfo = (clase) => {
    setCurrentClase(clase);
    setOpenMoreInfo(!openMoreInfo);
  };

  const filterClasses = async (student) => {
    const age = calculateAge(student.fecha_de_nacimiento);
    let waitList = [];
    let myClasses = [];
    
    const filter = clases.filter(
      (clase) =>
        Number(clase.edad_minima) < age &&
        age < (clase.edad_maxima ? Number(clase.edad_maxima) : 99)
    ).map((aClass) => ({ ...aClass, status: "" }));
  
    const waitListResponse = await getWaitList();
    waitList = waitListResponse.json().filter((lista) => lista.idAlumno === student._id);
  
    waitList.forEach((inWaitList) => {
      const classIndex = filter.findIndex((aClass) => aClass._id === inWaitList.idClase);
      if (classIndex !== -1) {
        filter[classIndex].status = "ListaEspera";
      }
    });
  
    const myClassesResponse = await getClassStudent();
    myClasses = myClassesResponse.json().filter((clase) => clase.idAlumno === student._id);
  
    myClasses.forEach((myClass) => {
      const classIndex = filter.findIndex((aClass) => aClass._id === myClass.idClase);
      if (classIndex !== -1) {
        filter[classIndex].status = "Inscrito";
      }
    });
  
    setFilteredClasses(filter);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setFilteredClasses(clases);
      setCurrentStudent(null);
      return;
    }
    setCurrentStudent(e.target.value);
    filterClasses(e.target.value);
  };

  const handleListaEspera = async (clase) => {
    const waitListResponse = await getWaitList();
    const lista = (await waitListResponse.json()).filter(
      (lista) => lista.idAlumno === currentStudent._id
    );
  
    await createWaitList({
      idAlumno: currentStudent._id,
      idClase: clase._id,
      time_stamp: new Date().toISOString(),
      status: "Espera",
    });
    clase.status = "ListaEspera";
    handleCloseDialog();
  };

  const handleSalirListaEspera = async (clase) => {
    const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
    const periodo = await periodoResponse.json();
  
    const myWaitListResponse = await getWaitList();
    const myWaitList = (await myWaitListResponse.json()).filter(
      (aWList) =>
        aWList.idClase === clase._id &&
        aWList.idAlumno === currentStudent._id &&
        aWList.idPeriodo === periodo[0]._id
    );
  
    await deleteWaitList({ _id: myWaitList[0]._id });
    clase.status = "";
    handleCloseDialog();
  };

  const handleClaseRegistrada = async (clase) => {
    try {
      const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
      const periodo = await periodoResponse.json();
  
      const response = await createClassStudent({
        idClase: clase._id,
        idAlumno: currentStudent._id,
        idPeriodo: periodo[0]._id,
      });
  
      const data = await response.json();
  
      if (data.msg.includes("Un documento fue insertado con el ID")) {
        clase.status = "Inscrito";
        handleCloseDialog();
      } else {
        handleCloseDialog();
        setErrorMsg(data.msg);
        setError(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCancelarClaseRegistrada = async (clase) => {
    const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
    const periodo = await periodoResponse.json();
  
    const myClassStudentResponse = await getClassStudent();
    const myClassStudent = (await myClassStudentResponse.json()).filter(
      (aClass) =>
        aClass.idClase === clase._id &&
        aClass.idAlumno === currentStudent._id &&
        aClass.idPeriodo === periodo[0]._id
    );
  
    await deleteClassStudent({ _id: myClassStudent[0]._id });
    clase.status = "";
    handleCloseDialog();
  };

  const handleOpenDialog = (clase) => {
    setClaseRegistrada(clase);
    setOpenConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleNameFilter = (value) => {
    const filteredClasses = clases.filter((clase) =>
      clase.nombre_curso.toLowerCase().includes(value.trim().toLowerCase())
    );
    setFilteredClasses(filteredClasses);
  };

  if (!students || !clases) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (students.length === 0 && students !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant='h3' sx={{ mb: 2, color: "#004a98" }}>
          Registro clases (Inscripción)
        </Typography>
        <Typography variant='h3' component='div' textAlign='center'>
          No tienes alumnos registrados, ve a
          <Link
            component='button'
            onClick={() => changeContent("Profile")}
            variant='h3'
            sx={{ mx: 2 }}
          >
            <i> Perfil </i>
          </Link>
          para agregar alumnos.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Typography variant='h3' sx={{ m: 2, color: "#004a98" }}>
          Registro clases (Inscripción)
        </Typography>
        <Box sx={{ m: 2, position: "sticky", top: "10px" }}>
          <FormControl fullWidth>
            <InputLabel>Estudiantes</InputLabel>
            <Select
              value={currentStudent || ""}
              label='Estudiantes'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>Estudiante</em>
              </MenuItem>
              {students.map((student) => (
                <MenuItem key={student._id} value={student}>
                  {student.nombre} {student.apellido_paterno}{" "}
                  {student.apellido_materno}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            disablePortal
            options={classNames}
            onChange={(e, newvalue) => handleNameFilter(newvalue)}
            onInputChange={(e, newvalue) => handleNameFilter(newvalue)}
            sx={{ display: { xs: "flex", md: "none" }, mt: 1 }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Curso'
                helperText='Busca tu curso'
              />
            )}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            paddingX: "20px",
            paddingBottom: "10px",
            overflowY: "scroll",
            display: { xs: "block", md: "none" },
          }}
        >
          {filteredClasses.length !== 0 ? (
            filteredClasses.map((e) => (
              <Clase
                handleClick={handleClick}
                handleMoreInfo={handleMoreInfo}
                key={e._id}
                clase={e}
              />
            ))
          ) : (
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography variant='h3' component='div' textAlign='center'>
                No hay clases disponibles por el momento.
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Card
              sx={{
                textAlign: "center",
                ml: 1,
                my: 2,
                display: "flex",
              }}
            >
              <SearchIcon
                color='primary'
                width='2em'
                height='2em'
                sx={{ alignSelf: "center", ml: 0.5 }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  p: 1,
                }}
              >
                <Autocomplete
                  disablePortal
                  options={classNames}
                  onChange={(e, newvalue) => {
                    setItems([
                      {
                        columnField: "nombre_curso",
                        operatorValue: "contains",
                        value: newvalue,
                      },
                    ]);
                  }}
                  onInputChange={(e, newvalue) => {
                    setItems([
                      {
                        columnField: "nombre_curso",
                        operatorValue: "contains",
                        value: newvalue,
                      },
                    ]);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='Curso' />
                  )}
                />
                <TextField
                  style={{ fontFamily: "arial" }}
                  label='Nivel'
                  onChange={(e) => {
                    setItems([
                      {
                        columnField: "nivel",
                        operatorValue: "contains",
                        value: e.target.value,
                      },
                    ]);
                  }}
                  select
                >
                  {[
                    "",
                    "Desde cero",
                    "Con bases",
                    "Intermedio",
                    "Avanzado",
                  ].map((e) => (
                    <MenuItem value={e} key={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  style={{ fontFamily: "arial" }}
                  label='Periodo'
                  onChange={(e) => {
                    setItems([
                      {
                        columnField: "clavePeriodo",
                        operatorValue: "contains",
                        value: e.target.value,
                      },
                    ]);
                  }}
                ></TextField>
                <TextField
                  style={{ fontFamily: "arial" }}
                  label='Modalidad'
                  onChange={(e) => {
                    setItems([
                      {
                        columnField: "modalidad",
                        operatorValue: "contains",
                        value: e.target.value,
                      },
                    ]);
                  }}
                ></TextField>
              </CardContent>
            </Card>
            <MiRegistro />
          </Box>
          <Box
            sx={{
              m: 2,
              display: "flex",
              width: "90%",
              height: 600,
              minWidth: "548px",
              "& .theme--ListaEspera": {
                bgcolor: "lightyellow",
              },
              "& .theme--Inscrito": {
                bgcolor: "lightgreen",
              },
            }}
          >
            <DataGrid
              sx={{ flexGrow: 1 }}
              rows={filteredClasses}
              columns={columns}
              disableSelectionOnClick={true}
              getRowId={(row) => row._id}
              getRowHeight={() => "auto"}
              filterModel={{
                items: items,
              }}
              getRowClassName={(params) => `theme--${params.row.status}`}
            />
          </Box>
          <Modal
            open={openMoreInfo}
            onClose={() => setOpenMoreInfo(!openMoreInfo)}
            sx={{ overflowY: "scroll" }}
          >
            <>
              <ClaseModal clase={currentClase} />
            </>
          </Modal>
        </Box>
        <ConfirmationDialog
          action={dialogAction}
          clase={claseRegistrada}
          handleClose={handleCloseDialog}
          open={openConfirmationDialog}
          handleClaseRegistrada={handleClaseRegistrada}
          handleCancelarClaseRegistrada={handleCancelarClaseRegistrada}
          handleListaEspera={handleListaEspera}
          handleSalirListaEspera={handleSalirListaEspera}
        />
        <Snackbar
          open={selectAlertOpen}
          autoHideDuration={8000}
          onClose={() => setSelectAlertOpen(false)}
        >
          <Alert severity='info'>
            Selecciona un alumno para inscribir clases o entrar a la lista de
            espera
          </Alert>
        </Snackbar>
        <Modal
          open={error}
          onClose={() => setError(!error)}
          sx={{ overflow: "scroll" }}
        >
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                borderRadius: 3,
                m: 2,
                p: 2,
              }}
            >
              <Alert
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                severity='error'
              >
                <AlertTitle>Error</AlertTitle>
                {errorMsg}
                <br />
                <Button
                  onClick={() => setError(!error)}
                  sx={{ color: "error.dark" }}
                >
                  Cerrar
                </Button>
              </Alert>
            </Box>
          </>
        </Modal>
      </Box>
    </>
  );
}

export default RegistroClasesAlumnos;
