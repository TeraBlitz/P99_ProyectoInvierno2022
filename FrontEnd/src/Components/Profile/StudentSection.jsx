import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import StudentItem from './StudentItem';
import StudentProfile from '../../Pages/ProfilePage/StudentProfile';
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

  const handleOpenDeleteDialogState = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setOpenEditModal(!openEditModal);
  };

  const handleDeleteCurrentStudent = () => {
    handleOpenDeleteDialogState();
    deleteStudent({ _id: currentStudent._id })
      .then((data) => {
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
            setStudents(data);
          });
      });
  };

  const handleCloseStudentModal = () => {
    if (addStudent) setAddStudent(!addStudent);
    else {
      setOpenEditModal(!openEditModal);
      setIsEditing(false);
    }
  }

  const canAddStudents = user?.p99roles.length === 0;

  return (
    <>
      <Box
        sx={{
          pt: 2,
          display: canAddStudents ? 'flex' : 'none',
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <Typography variant="h6">Estudiante(s)</Typography>
      </Box>
      <Box>
        {students !== null
        && students.length === 0
        && canAddStudents ? (
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
                handleOpenDialog={handleOpenDeleteDialogState}
                setIsEditing={setIsEditing}
              />
            ))
          )}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: canAddStudents ? 'flex' : 'none',
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
              setIsEditing(!isEditing);
            }}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Agregar estudiante
          </Button>
        </Box>
      </Box>

      <Modal
        open={addStudent || openEditModal}
        onClose={handleCloseStudentModal}
        sx={{ overflow: 'scroll' }}
      >
        <StudentProfile
          studentInfo={(addStudent ? defaultStudentInfo : currentStudent)}
          openStudentProfile={(addStudent || openEditModal)}
          setOpenStudentProfile={(addStudent ? setAddStudent : setOpenEditModal)}
          userID={(addStudent ? user.sub : undefined)}
          setStudents={setStudents}
          isEditing={(addStudent ? true : isEditing)}
          setIsEditing={(addStudent ? () => {} : setIsEditing)}
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
          setAlertMessage={setAlertMessage}
          setInfoOpen={setInfoOpen}
        />
      </Modal>

      <DeleteDialog
        deleteStudent={handleDeleteCurrentStudent}
        handleClose={handleOpenDeleteDialogState}
        open={openDeleteDialog}
        student={currentStudent}
      />
    </>
  );
}

export default StudentSection;
