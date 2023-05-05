import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment-timezone';
import { getStudents } from '../../api/students';
import { getClasses } from '../../api/classes';
import { findTerm, getPeriodos } from '../../api/term';
import ConfirmationDialog from '../../Components/Dialog/ConfirmationDialog';
import { startDateDict, endDateDict } from '../../utils/constants';
import {
  compararFecha,
} from '../../utils/utilFunctions';
import RegistroClasesHeader from '../../Components/Registro/RegistroClasesHeader';
import RegistroClasesBody from '../../Components/Registro/RegistroClasesBody';
import RegistroClasesError from '../../Components/Registro/RegistroClasesError';
import LoadingRegisterData from '../../Components/Registro/LoadingRegisterData';

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

  const handleOpenDialog = (clase) => {
    setClaseRegistrada(clase);
    setOpenConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <>
      {LoadingRegisterData({ changeContent, students, clases })? (
        <LoadingRegisterData 
          students={students}
          changeContent={changeContent}
          clases={clases}
        />
      ) : (
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
            setError={setError}
            setErrorMsg={setErrorMsg}
          />
          <RegistroClasesError 
            error={error}
            selectAlertOpen={selectAlertOpen}
            setSelectAlertOpen={setSelectAlertOpen}
            setError={setError}
            errorMsg={errorMsg}
          />
        </Box>
      )}
    </>
  );  
}

export default RegistroClasesAlumnos;
