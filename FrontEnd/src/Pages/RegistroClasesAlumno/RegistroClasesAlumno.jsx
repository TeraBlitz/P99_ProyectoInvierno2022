import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Alert, Button, Link, AlertTitle,
  Typography,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment-timezone';
import { getStudents } from '../../api/students';
import { getClasses } from '../../api/classes';
import {
  createClassStudent,
  getClassStudent,
  deleteClassStudent,
} from '../../api/classStudent';
import {
  createWaitList,
  getWaitList,
  deleteWaitList,
} from '../../api/waitList';
import { findTerm, getPeriodos } from '../../api/term';
import ConfirmationDialog from '../../Components/Dialog/ConfirmationDialog';
import { startDateDict, endDateDict } from '../../utils/constants';
import {
  compararFecha,
} from '../../utils/utilFunctions';
import RegistroClasesHeader from '../../Components/Registro/RegistroClasesHeader';
import RegistroClasesBody from '../../Components/Registro/RegistroClasesBody';

function RegistroClasesAlumnos({ changeContent }) {
  const [students, setStudents] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [error, setError] = useState(false);
  const [clases, setClases] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [claseRegistrada, setClaseRegistrada] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectAlertOpen, setSelectAlertOpen] = useState(false);
  const [filteredClasses, setFilteredClasses] = useState(null);
  const [dialogAction, setDialogAction] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [periodos, setPeriodos] = useState([]);

  const { user } = useAuth0();

  useEffect(() => {
    const getUserStudents = () => {
      getStudents()
        .then((response) => response.json())
        .then((data) => {
          const tempStudents = data.filter(
            (student) => student.idUser === user.sub,
          );
          setStudents(tempStudents);
        });
    };

    const getStudentClasses = async () => {
      const data = await getPeriodos().then((res) => res.json());
      const periodo = compararFecha(data);
      setPeriodos(data);

      const activeTerm = await findTerm({ clave: periodo }).then((res) => res.json());
      const result = await getClasses().then((res) => res.json());

      const allTermClases = result.filter(
        (item) => item.clavePeriodo === activeTerm[0].clave,
      );
      const allClassNames = allTermClases.map((item) => item.nombre_curso);
      setClassNames([...new Set(allClassNames)]);

      const currentDate = moment().tz('America/Mexico_City').format();
      const activeTermClases = allTermClases.filter(
        (item) => activeTerm[0][startDateDict[item.area]] < currentDate
          && activeTerm[0][endDateDict[item.area]] > currentDate,
      );

      setClases(activeTermClases);
      setFilteredClasses(activeTermClases);
    };

    getUserStudents();
    getStudentClasses();
  }, []);

  const handleClick = (clase) => {
    if (currentStudent == null) {
      setSelectAlertOpen(true);
      return;
    }
    switch (clase.status) {
      case 'Inscrito':
        setDialogAction('CancelarInscripcion');
        handleOpenDialog(clase);
        break;
      case 'ListaEspera':
        setDialogAction('SalirLista');
        handleOpenDialog(clase);
        break;
      case '':
        setDialogAction(
          Number(clase.cupo_actual) < Number(clase.cupo_maximo)
            ? 'Registrar' : 'ListaEspera',
        );
        handleOpenDialog(clase);
    }
  };

  const handleListaEspera = async (clase) => {
    const waitListResponse = await getWaitList();
    const lista = (await waitListResponse.json()).filter(
      (lista) => lista.idAlumno === currentStudent._id,
    );

    await createWaitList({
      idAlumno: currentStudent._id,
      idClase: clase._id,
      time_stamp: new Date().toISOString(),
      status: 'Espera',
    });
    clase.status = 'ListaEspera';
    handleCloseDialog();
  };

  const handleSalirListaEspera = async (clase) => {
    const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
    const periodo = await periodoResponse.json();

    const myWaitListResponse = await getWaitList();
    const myWaitList = (await myWaitListResponse.json()).filter(
      (aWList) => aWList.idClase === clase._id
        && aWList.idAlumno === currentStudent._id
        && aWList.idPeriodo === periodo[0]._id,
    );

    await deleteWaitList({ _id: myWaitList[0]._id });
    clase.status = '';
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

      if (data.msg.includes('Un documento fue insertado con el ID')) {
        clase.status = 'Inscrito';
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
      (aClass) => aClass.idClase === clase._id
        && aClass.idAlumno === currentStudent._id
        && aClass.idPeriodo === periodo[0]._id,
    );

    await deleteClassStudent({ _id: myClassStudent[0]._id });
    clase.status = '';
    handleCloseDialog();
  };

  const handleOpenDialog = (clase) => {
    setClaseRegistrada(clase);
    setOpenConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
  };

  if (!students || !clases) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
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
          height: '100vh',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, color: '#004a98' }}>
          Registro clases (Inscripción)
        </Typography>
        <Typography variant="h3" component="div" textAlign="center">
          No tienes alumnos registrados, ve a
          <Link
            component="button"
            onClick={() => changeContent('Profile')}
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
    <Box>
      <RegistroClasesHeader
        classNames={classNames}
        clases={clases}
        currentStudent={currentStudent}
        students={students}
        setFilteredClasses={setFilteredClasses}
        setCurrentStudent={setCurrentStudent}
      />
      <RegistroClasesBody
        handleClick={handleClick}
        filteredClasses={filteredClasses}
        classNames={classNames}
      />
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
        sx={{ overflow: 'scroll' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderRadius: 3,
            m: 2,
            p: 2,
          }}
        >
          <Alert
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {errorMsg}
            <br />
            <Button
              onClick={() => setError(!error)}
              sx={{ color: 'error.dark' }}
            >
              Cerrar
            </Button>
          </Alert>
        </Box>
      </Modal>
    </Box>
  );
}

export default RegistroClasesAlumnos;
