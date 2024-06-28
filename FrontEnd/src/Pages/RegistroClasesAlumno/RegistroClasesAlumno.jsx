/* eslint-disable no-plusplus */
import Box from "@mui/material/Box";
import React, { useState, useEffect, useContext } from "react";
import Clase from "../../Components/Clase/Clase";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Button, Link, AlertTitle, Tooltip } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";
import {
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
  get_available_classes, get_user_classes,
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
import { getAlumnoFormularioById } from "../../api/alumnoFormularios";
import { EXAMEN_SOCIOECONOMICO_ID } from "../../utils/constants";

function RegistroClasesAlumnos({ changeContent }) {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentStudentClases, setCurrentStudentClases] = useState(null);
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
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const [formularioCompleto, setFormularioCompleto] = useState(true);

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


  const getPeriodosstak = () => {
    getPeriodos()
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
        console.log("periodos", data);
        setSelectedPeriod(data[data.length - 1]);
      });

  };

  useEffect(() => {
    // const getStudentClasses = () => {
    //   get_available_classes("null")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("data>", data);
    //       setClases(data);
    //       setFilteredClasses(data);
    //     });

    //   };
    getPeriodosstak();
    setClases([]);
    setFilteredClasses([]);
    // getStudentClasses();

  }, []);

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
          <Tooltip title={formularioCompleto ? "" : "Completa el formulario socioeconómico en 'PERFIL' para inscribirte"}>
          <span>
          <Button
            size="small"
            onClick={() => handleClick(params.row)}
            variant="outlined"
            disabled={!formularioCompleto}
          >
            {params.row.status === "Inscrito" &&
              params.row.status !== "ListaEspera"
              ? "Cancelar Registro"
              : "Inscribir"}
          </Button>
          </span>
        </Tooltip>
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
    // console.log('>>>>>')
    console.log('stat', clase.status?.length)
    console.log(currentStudent)
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
      default:
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

  // const filterClasses = (student) => {
  //   const age = calculate_age(student.fecha_de_nacimiento);
  //   let waitList = [];
  //   let myClasses = [];

  //   let filter = clases.filter(
  //     (clase) =>
  //       Number(clase.edad_minima) <= age &&
  //       age <= (clase.edad_maxima ? Number(clase.edad_maxima) : 99)
  //   );

  //   filter.map((aClass) => {
  //     aClass.status = "";
  //   });

  //   getWaitList()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       waitList = data.filter((lista) => lista.idAlumno === student._id);
  //     })
  //     .then(() => {
  //       waitList.map((inWaitList) => {
  //         for (let i = 0; i < filter.length; i++) {
  //           if (inWaitList.idClase === filter[i]._id) {
  //             filter[i].status = "ListaEspera";
  //           }
  //         }
  //       });
  //     });

  //   getClassStudent()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('???', myClasses)
  //       myClasses = data.filter((clase) => clase.idAlumno === student._id);
  //     })
  //     .then(() => {
  //       myClasses.map((myClass) => {
  //         for (let i = 0; i < filter.length; i++) {
  //           if (myClass.idClase === filter[i]._id) {
  //             filter[i].status = "Inscrito";
  //           }
  //         }
  //       });
  //       console.
  //       setFilteredClasses(filter);
  //     });
  // };

  const filterClassesByAge = (prevClases) => {
    if(currentStudent){
      const age = calculate_age(currentStudent.fecha_de_nacimiento);
      const newClasses = prevClases.filter(
        (clase) => {
          // console.log('>', clase)
          // console.log(Number(clase.edad_minima),Number(clase.edad_maxima))
          // console.log(Number(clase.edad_minima) <= age, age <=Number(clase.edad_maxima))
          // console.log(Number(clase.edad_minima) <= age && age <=Number(clase.edad_maxima))
          return Number(clase.edad_minima) <= age &&
          age <= (clase.edad_maxima ? Number(clase.edad_maxima) : 99)
        }
          
      );
      // console.log(Number(newClasses[0].edad_minima) >= Number(age,newClasses[0].edad_maxima)<= age)
      // console.log(newClasses[0].edad_minima >= age &&newClasses[0].edad_maxima<= age)
      console.log('student', currentStudent, 'age: ', age);
      console.log(newClasses)
  
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
        //should not work like this fix this
        // setClases(data);
        // data = data.map((el)=})
        console.log("data><>", data);
        // setFilteredClasses(filterClassesByAge(data));
      });
  };

  const handleChangeStudent = (e) => {
    const newStudent = e.target.value;
    if (newStudent === "") {
      setCurrentStudent(null);
      return;
    }
    get_user_classes(newStudent._id).then((clases)=> {
      clases.json().then((classJson)=>{
        setCurrentStudentClases(classJson)
        setCurrentStudent(newStudent);
      })
    })
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
        return getWaitList();
      })
      .then((response) => response.json())
      .then((data) => {
        myWaitList = data.filter(
          (aWList) =>
            aWList.idClase === clase._id &&
            aWList.idAlumno === currentStudent._id &&
            aWList.idPeriodo === periodo[0]._id
        );
        console.log("Mi lista de espera filtrada:", myWaitList);
        if (myWaitList.length > 0) {
          return deleteWaitList({ _id: myWaitList[0]._id });
        } else {
          // Alertar si no se encontró la lista de espera para eliminar
          console.warn("No se encontró la lista de espera para eliminar. La lista de espera está vacía o no coincide.");
          // No lanzar un error, simplemente salir de la función
          handleCloseDialog();
          return;        }
      })
      .then(() => {
        clase.status = "Inscribir";
        handleCloseDialog(); 
      })
      .catch((error) => {
        console.error("Error en handleSalirListaEspera:", error);
        alert(error);
        handleCloseDialog();

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

  useEffect(() => {
    if (currentStudent) {
      try {
        getAlumnoFormularioById(currentStudent._id, EXAMEN_SOCIOECONOMICO_ID)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setFormularioCompleto(true);
            } else {
              setFormularioCompleto(false);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [currentStudent]);

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
    console.log('paso 3')
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
    console.log('este si')
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
    const time1 = selectedPeriod?.fecha_fin_insc_talleres
    const time2 = selectedPeriod?.fecha_fin_insc_idiomas
    const time3 = selectedPeriod?.fecha_fin_insc_asesorias

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
        get_available_classes(selectedPeriod.clave)
          .then((response) => response.json())
          .then((data) => {
            console.log("#1", data);
            setClases(data);
            setFilteredClasses(filterClassesByAge(data));
          }
          );
        setUpdator(updator + 1);
      }


    }, earliestNextOccurrence);

    //Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [selectedPeriod]);

  useEffect(() => {
    if (currentStudent) {
      //console.log(currentStudent)
      // console.log('>>',selectedPeriod)
      if(!!selectedPeriod){
        get_available_classes(selectedPeriod.clave)
          .then((response) => response.json())
          .then((data) => {
            setClases(data);
            console.log('#2>>>>>', )
            data =  data.map((classEl)=>{
              console.log(currentStudentClases,classEl._id)
              if(currentStudentClases.includes(classEl._id)){
                classEl.status="ListaEspera"
              }
              return classEl
            })
            
            setFilteredClasses(filterClassesByAge(data));
          });
      }
    }
  }, [currentStudent]);
  
console.log('?',filteredClasses)
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
          para completarlo.
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
                value={selectedPeriod || ""}
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
            options={!classNames? [{label:"Loading...", id:0}]: classNames}
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

          key={[currentStudent?._id, selectedPeriod?.clave, updator]}

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
                rows={filteredClasses?filteredClasses:[]}
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
