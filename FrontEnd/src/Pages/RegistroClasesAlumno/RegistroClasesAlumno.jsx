/* eslint-disable no-plusplus */
import Box from "@mui/material/Box";
import React, { useState, useEffect, useContext } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { 
  getClasses,
  get_available_classes,
} from "../../api/classes";
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
  const [nameFilter, setNameFilter] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [inRegistrationTime, setInRegistrationTime] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [updator, setUpdator] = useState(0);

  const [currentTerm, setCurrentTerm] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [slelectedPeriod, setSelectedPeriod] = useState(null);

  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

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

    getUserStudents();
  }, []);

  const startDateDict = {
    talleres: "fecha_inicio_insc_talleres",
    idiomas: "fecha_inicio_insc_idiomas",
    asesorias: "fecha_inicio_insc_asesorias",
  };

  const endDateDict = {
    talleres: "fecha_fin_insc_talleres",
    idiomas: "fecha_fin_insc_idiomas",
    asesorias: "fecha_fin_insc_asesorias",
  };

  const getPeriodosstak = () => {
    getPeriodos()
      .then((response) => response.json())
      .then((data) => {


        setPeriodos(data);


        console.log("periodos", data);
        setSelectedPeriod(data[data.length - 1]);
      });

  };

  const getPeriodobyperiodo = (periodo) => {
    getPeriodos(periodo)
      .then((response) => response.json())
      .then((data) => {

        setPeriodos(data);
        console.log("periodos", data);
        setSelectedPeriod(data[data.length - 1]);
      });

  };

  useEffect(() => {
    const getStudentClasses = () => {
      get_available_classes("null")
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setClases(data);
          setFilteredClasses(data);
        });

      getPeriodosstak();
    };
    getStudentClasses();

  }, []);

  function traducirDate(raw) {
    const date = raw.split("T", 2);
    return date[0];
  }

  function compararFecha(data) {
    let periodos = [];
    for (const element of data) {
      let fecha = traducirDate(element.fecha_inicio);
      let separado = fecha.split("-", 3);
      let valorA = Number(separado[0]);
      let valorM = Number(separado[1]) / 100;
      let valorD = Number(separado[2]) / 10000;
      let valorT = valorA + valorM + valorD;
      var obj = {
        id: element.clave,
        fecha: valorT,
      };
      periodos.push(obj);
    }

    periodos.sort((a, b) => b.fecha - a.fecha);
    let clave = String(periodos[0].id);
    return clave;
  }

  // Funcion para calcular edad
  const calculate_age = (dateString) => {
    const parts = dateString.split("-");
    const birthday = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const magic_number = 31557600000;
    return Math.floor((Date.now() - birthday) / magic_number);
  };

  const nivelDict = {
    '1' : 'Desde cero',
    '2' : 'Con bases',
    '3' : 'Intermedio',
    '4' : 'Avanzado'
  };

  const getNivel = (params) => {
    return nivelDict[params.row.nivel];
  };

  const getRangoEdad = (params) => {
    return `${params.row.edad_minima} - ${(params.row.edad_maxima ? Number(params.row.edad_maxima) : 99)}`;
  };

  const getHorario = (params) => {
    return `${params.row.lunes ? `Lun: ${params.row.lunes}` : ""}
                ${params.row.martes ? `Mar: ${params.row.martes}` : ""}
                ${params.row.miercoles ? `Mierc: ${params.row.miercoles}` : ""}
                ${params.row.jueves ? `Juev: ${params.row.jueves}` : ""}
                ${params.row.viernes ? `Vier: ${params.row.viernes}` : ""}
                ${params.row.sabado ? `Sab: ${params.row.sabado}` : ""}`;
  };

  const getProfesor = (params) => {
    return `${params.row.nombreProfesor} ${params.row.apellidosProfesor}`;
  };

  const getCupo = (params) => {
    return `${(
      (Number(params.row.cupo_actual) / Number(params.row.cupo_maximo)) *
      100
    ).toFixed()}%`;
  };

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
      field: "clase.edad_minima",
      headerName: "Rango de edad",
      width: 125,
      editable: false,
      valueGetter: getRangoEdad,
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
            size="small"
            onClick={() => handleClick(params.row)}
            variant="outlined"
          >
            {params.row.status === "Inscrito" &&
              params.row.status !== "ListaEspera"
              ? "Cancelar Registro"
              : "Inscribir"}
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => handleClick(params.row)}
            variant="outlined"
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

  const filterClasses = (student) => {
    const age = calculate_age(student.fecha_de_nacimiento);
    let waitList = [];
    let myClasses = [];

    let filter = clases.filter(
      (clase) =>
        Number(clase.edad_minima) <= age &&
        age <= (clase.edad_maxima ? Number(clase.edad_maxima) : 99)
    );

    filter.map((aClass) => {
      aClass.status = "";
    });

    getWaitList()
      .then((response) => response.json())
      .then((data) => {
        waitList = data.filter((lista) => lista.idAlumno === student._id);
      })
      .then(() => {
        waitList.map((inWaitList) => {
          for (let i = 0; i < filter.length; i++) {
            if (inWaitList.idClase === filter[i]._id) {
              filter[i].status = "ListaEspera";
            }
          }
        });
      });

    getClassStudent()
      .then((response) => response.json())
      .then((data) => {
        myClasses = data.filter((clase) => clase.idAlumno === student._id);
      })
      .then(() => {
        myClasses.map((myClass) => {
          for (let i = 0; i < filter.length; i++) {
            if (myClass.idClase === filter[i]._id) {
              filter[i].status = "Inscrito";
            }
          }
        });
        setFilteredClasses(filter);
      });
  };

  const filterClassesByAge = (prevClases) => {
    if(currentStudent){
      const age = calculate_age(currentStudent.fecha_de_nacimiento);
      const newClasses = prevClases.filter(
        (clase) =>
          Number(clase.edad_minima) <= age &&
          age <= (clase.edad_maxima ? Number(clase.edad_maxima) : 99)
      );
      console.log('student', currentStudent, 'age: ', age);
  
      return newClasses;
    }

    console.log('No paso');
    return prevClases;
  }

  const handleChange = (e) => {
    if (e.target.value === "") {
      // setFilteredClasses(clases);
      setSelectedPeriod(null);
      return;
    }
    setSelectedPeriod(e.target.value);
    // console.log("trae el periodo", slelectedPeriod.clave);

    get_available_classes(e.target.value.clave)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setClases(data);
        setFilteredClasses(filterClassesByAge(data));
      });
  };

  const handleChangeStudent = (e) => {
    const newStudent = e.target.value;
    if (newStudent === "") {
      setCurrentStudent(null);
      return;
    }

    setCurrentStudent(newStudent);
  };

  const handleListaEspera = (clase) => {
    let lista = [];
    getWaitList()
      .then((response) => response.json())
      .then((data) => {
        lista = data.filter((lista) => lista.idAlumno === currentStudent._id);
      })
      .then(() => {
        createWaitList({
          idAlumno: currentStudent._id,
          idClase: clase._id,
          time_stamp: new Date().toISOString(),
          status: "Espera",
        });
        clase.status = "ListaEspera";
        handleCloseDialog();
      });
  };

  const handleSalirListaEspera = (clase) => {
    let periodo = [];
    let myWaitList = [];
    findTerm({ clave: clase.clavePeriodo })
      .then((response) => response.json())
      .then((data) => {
        periodo = data;
      })
      .then(() => {
        getWaitList()
          .then((response) => response.json())
          .then((data) => {
            myWaitList = data.filter(
              (aWList) =>
                aWList.idClase === clase._id &&
                aWList.idAlumno === currentStudent._id &&
                aWList.idPeriodo === periodo[0]._id
            );
          })
          .then(() => {
            deleteWaitList({ _id: myWaitList[0]._id });
            clase.status = "";
            handleCloseDialog();
          });
      });
  };

  const handleClaseRegistrada = (clase) => {
    // Hacer validación de numero de clases disponibles por inscribir
    let periodo = [];
    findTerm({ clave: clase.clavePeriodo })
      .then((response) => response.json())
      .then((data) => {
        periodo = data;
      })
      .then(() => {
        createClassStudent({
          idClase: clase._id,
          idAlumno: currentStudent._id,
          idPeriodo: periodo[0]._id,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.msg.includes("Un documento fue insertado con el ID")) {
              clase.status = "Inscrito";
              handleCloseDialog();
            } else {
              handleCloseDialog();
              setErrorMsg(data.msg);
              setError(true);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      });
  };

  const handleCancelarClaseRegistrada = (clase) => {
    let periodo = [];
    let myClassStudent = [];
    findTerm({ clave: clase.clavePeriodo })
      .then((response) => response.json())
      .then((result) => {
        periodo = result;
      })
      .then(() => {
        getClassStudent()
          .then((response) => response.json())
          .then((result) => {
            myClassStudent = result.filter(
              (aClass) =>
                aClass.idClase === clase._id &&
                aClass.idAlumno === currentStudent._id &&
                aClass.idPeriodo === periodo[0]._id
            );
          })
          .then(() => {
            deleteClassStudent({ _id: myClassStudent[0]._id });
            clase.status = "";
            handleCloseDialog();
          });
      });
  };

  const handleOpenDialog = (clase) => {
    setClaseRegistrada(clase);
    setOpenConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleNameFilter = (value) => {
    //setNameFilter(value);

    const filteredClasses = clases.filter((clase) =>
      clase.nombre_curso.toLowerCase().includes(value.trim().toLowerCase())
    );
    setFilteredClasses(filteredClasses);

  };

  const calculateTimeDifference = (targetTime) => {

    /// new date in  time xzone mex
    const now = new Date(moment().tz("America/Mexico_City").format());
    const targetDateTime = new Date(targetTime);

    // If the target time is in the past, set it for the next day
    if (now >= targetDateTime) {
      targetDateTime.setDate(targetDateTime.getDate() + 1);
    }

    // Calculate the time difference until the target time
    return targetDateTime - now;
  };

  useEffect(() => {
    //Update the current time immediately when the component mounts
    updateCurrentTime();

    //Get the specific times from your selected period
    const time1 = slelectedPeriod?.fecha_fin_insc_talleres
    const time2 = slelectedPeriod?.fecha_fin_insc_idiomas
    const time3 = slelectedPeriod?.fecha_fin_insc_asesorias

    console.log("time1", time1)
    //Calculate the time differences for each specific time
    const timeDifference1 = calculateTimeDifference(time1);
    const timeDifference2 = calculateTimeDifference(time2);
    const timeDifference3 = calculateTimeDifference(time3);

    //Find the earliest next occurrence among all specific times
    const earliestNextOccurrence = new Date(
      Math.min(
        timeDifference1 || Infinity,
        timeDifference2 || Infinity,
        timeDifference3 || Infinity
      )
    );

    console.log("earliestNextOccurrence", earliestNextOccurrence)

    //Set up an interval to update the current time and execute your function
    const intervalId = setInterval(() => {
      updateCurrentTime();

      if (currentTime == time1 || currentTime == time2 || currentTime == time3) {
        get_available_classes(slelectedPeriod.clave)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            setClases(data);
            setFilteredClasses(filterClassesByAge(data));
          }
          );
        setUpdator(updator + 1);
      }


    }, earliestNextOccurrence);

    //Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [slelectedPeriod]);

  useEffect(() => {
    if (currentStudent) {
      //console.log(currentStudent)
      get_available_classes(slelectedPeriod.clave)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setClases(data);
          setFilteredClasses(filterClassesByAge(data));
        });
    }
  }, [currentStudent]);
  
  if (!students || !clases || !periodos) {
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
        <Typography variant="h3" sx={{ mb: 2, color: "#004a98" }}>
          Registro clases (Inscripción)
        </Typography>
        <Typography variant="h3" component="div" textAlign="center">
          No tienes alumnos registrados, ve a
          <Link
            component="button"
            onClick={() => changeContent("Profile")}
            variant="h3"
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
    <div>
      <Box>
        <Typography variant="h3" sx={{ m: 2, color: "#004a98" }}>
          Registro clases (Inscripción)
        </Typography>
        <Box sx={{ m: 2, top: "10px" }}>

          <div style={{
            display: "flex", justifyContent: "space-between",
            gap: "10px"
          }}>
            <FormControl fullWidth>
              <InputLabel>Estudiantes</InputLabel>
              <Select
                value={currentStudent || ""}
                label="Estudiantes"
                onChange={handleChangeStudent}
              >
                <MenuItem value="">
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

            <FormControl fullWidth>
              <InputLabel>Periodo</InputLabel>
              <Select
                value={slelectedPeriod || ""}
                label="Periodo"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Periodo</em>
                </MenuItem>

                {periodos.map((periodo) => (
                  <MenuItem key={periodo.clave} value={periodo}>
                    {periodo.clave}
                  </MenuItem>
                ))}
                

              </Select>
            </FormControl>
          </div>

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
                label="Curso"
                helperText="Busca tu curso"
              />
            )}
          />
        </Box>

        <div

          key={[currentStudent?._id, slelectedPeriod?.clave, updator]}

        >


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
            {

              filteredClasses ? <>

                {filteredClasses.map((e, indx) => (
                  <Clase
                    handleClick={handleClick}
                    handleMoreInfo={handleMoreInfo}
                    key={indx}
                    clase={e}
                  />
                ))
                }

              </>



                : <>
                  <Box
                    sx={{
                      height: "100vh",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h3" component="div" textAlign="center">
                      No hay clases disponibles por el momento.
                    </Typography>
                  </Box>
                </>

            }
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
              {/* <Card
              sx={{
                textAlign: "center",
                ml: 1,
                my: 2,
                display: "flex",
              }}
            >
              <SearchIcon
                color="primary"
                width="2em"
                height="2em"
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
                    <TextField {...params} label="Curso" />
                  )}
                />
                <TextField
                  style={{ fontFamily: "arial" }}
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
                  label="Periodo"
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
                  label="Modalidad"
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
            </Card> */}
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

        </div>
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
          <Alert severity="info">
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
                severity="error"
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
    </div>
  );
}

export default RegistroClasesAlumnos;
