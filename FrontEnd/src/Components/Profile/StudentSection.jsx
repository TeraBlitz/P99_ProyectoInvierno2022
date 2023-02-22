import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import StudentItem from './StudentItem';
import StudentProfile from '../../Pages/ProfilePage/StudentProfile';
import EditStudentProfile from '../../Pages/ProfilePage/EditStudentProfile';
import DeleteDialog from './DeleteDialog';
import { deleteStudent, findStudents } from '../../api/students';
import { defaultStudentInfo } from '../../utils/constants';

function StudentSection({
  user, students, setStudents, setSuccessOpen, setErrorOpen, setInfoOpen, setAlertMessage,
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(defaultStudentInfo);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addStudent, setAddStudent] = useState(false);

  const handleOpenDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setOpenEditModal(!openEditModal);
  };

  const handleDeleteCurrentStudent = () => {
    handleCloseDialog();
    deleteStudent({ _id: currentStudent._id })
      .then((data) => {
        console.log(data);
        if (data.status === 400) {
          setAlertMessage('Se produjo un error al eliminar al estudiante.');
          setErrorOpen(true);
        } else {
          setAlertMessage('Estudiante eliminado correctamente.');
          setSuccessOpen(true);
        }
      })
      .finally(() => {
        findStudents({ idUser: user.sub })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStudents(data);
          });
      });
  };

  return (
    <>
      <Box
        sx={{
          pt: 2,
          display: user?.p99roles.length === 0 ? 'flex' : 'none',
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <Typography variant="h6">Estudiante(s)</Typography>
      </Box>
      <Box>
        {students !== null
        && students.length === 0
        && user?.p99roles.length === 0 ? (
          <Box
            sx={{
              fontFamily: 'default',
              fontSize: 'h3.fontSize',
              py: 2,
              display: 'flex',
            }}
          >
            Registra un estudiante para poder inscribir clases!
          </Box>
          ) : (
            students.map((student) => (
              <StudentItem
                key={student._id}
                name={student.nombre}
                studentInfo={student}
                first_lastname={student.apellido_paterno}
                second_lastname={student.apellido_materno}
                editStudent={handleEditStudent}
                setCurrentStudent={setCurrentStudent}
                handleOpenDialog={handleOpenDialog}
                setIsEditing={setIsEditing}
              />
            ))
          )}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: user?.p99roles.length === 0 ? 'flex' : 'none',
              justifyContent: 'flex-end',
            },
          }}
        >
          <Button
            sx={{
              textTransform: 'none',
              backgroundColor: '#57a1f1',
              fontSize: '18px',
            }}
            onClick={() => {
              setAddStudent(!addStudent);
            }}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Agregar estudiante
          </Button>
        </Box>
      </Box>

      <Modal
        open={addStudent}
        onClose={() => setAddStudent(!addStudent)}
        sx={{ overflow: 'scroll' }}
      >
        <>
          <StudentProfile
            studentInfo={defaultStudentInfo}
            setAddStudent={setAddStudent}
            addStudent={addStudent}
            userID={user.sub}
            setStudents={setStudents}
            setSuccessOpen={setSuccessOpen}
            setErrorOpen={setErrorOpen}
            setAlertMessage={setAlertMessage}
            setInfoOpen={setInfoOpen}
          />
        </>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(!openEditModal)}
        sx={{ overflow: 'scroll' }}
      >
        <>
          <EditStudentProfile
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            studentInfo={currentStudent}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setStudents={setStudents}
            setSuccessOpen={setSuccessOpen}
            setErrorOpen={setErrorOpen}
            setAlertMessage={setAlertMessage}
            setInfoOpen={setInfoOpen}
          />
        </>
      </Modal>

      <DeleteDialog
        deleteStudent={handleDeleteCurrentStudent}
        handleClose={handleCloseDialog}
        open={openDeleteDialog}
        student={currentStudent}
      />
    </>
  );
}

export default StudentSection;
