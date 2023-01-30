import React, {useState, useEffect, useContext} from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import StudentItem from '../../Components/Profile/StudentItem';
import StudentProfile from './StudentProfile';
import EditStudentProfile from './EditStudentProfile';
import DeleteDialog from '../../Components/Profile/DeleteDialog';
import { getUser } from '../../api/users';
import { getStudents, deleteStudent, findStudents } from '../../api/students';
import { postData } from '../../utils/requestUtils';
import { userContext } from './../../App.jsx'


const studentInfo = {
    'nombre': '', 'apellido_paterno': '', 'apellido_materno': '',
    'num_telefono': '', 'fecha_de_nacimiento':'',
    'escolaridad': '', 'ultima_escuela':'','estado':'', 'ciudad':'', 'colonia': '',
    'codigo_postal':'', 'pais': '', 'tutor_nombre': '', 'tutor_apellido_paterno': '',
    'tutor_apellido_materno': '', 'tutor_correo': '', 'tutor_num_telefono': ''
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Profile = () =>{

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState(null);
    const [addStudent, setAddStudent] = useState(false);
    const [students, setStudents] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(studentInfo)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false); 

    const handleOpenDialog = () => {
      setOpenDeleteDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDeleteDialog(false);
    };

    const userValues = useContext(userContext)

    useEffect(() => {
        const getUserInfo = () =>{
            getUser().then(
                (data) => {
                    const currentUser = data.find(user => user._id === userValues._id);
                    setUserInfo(currentUser);
                    //console.log(currentUser)
                });
        }
        getUserInfo();
    }, []);


    useEffect(() => {
       const getUserStudents = () =>{
            getStudents().then(
                (data) => {
                    const students = data.filter(student => student.idUser === userValues._id);
                    setStudents(students);
                    //console.log(students)
            });
        }
        getUserStudents();
    }, []);


    const editStudent = (student) => {
        setCurrentStudent(student);
        setOpenEditModal(!openEditModal);
    };

    const deleteCurrentStudent = () => {
        handleCloseDialog();
        deleteStudent(new URLSearchParams({'_id': currentStudent._id})).then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error.message);
            if (error.message.includes('Documen')){
                setAlertMessage('Estudiante eliminado correctamente.')
                setSuccessOpen(true);
            }
            else{
                setAlertMessage('Se produjo un error al eliminar al estudiante.')
                setErrorOpen(true);
            }
        })
        .finally(() => {
            findStudents(new URLSearchParams({'idUser': userValues._id})).then(
                (data) => {
                    console.log(data);
                    setStudents(data);
            });
        })

    }

    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
        setInfoOpen(false);
    };

    if (!userInfo || !students) {
        return(
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }

    
    return (
        <Box sx={{p: 1, ml: 1}}>
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                <Box>
                    Mi perfil
                </Box>
                {
                    userValues.rol === 'estudiante' ?
                    <Box sx={{ display: {xs: 'flex', md: 'none'}, flexDirection: 'column', position: 'absolute',  bottom: 16,  right: 16}}>
                        <Fab color="primary" aria-label="add" sx={{ display: addStudent ? 'none' : ''}} 
                                onClick={() => { setAddStudent(!addStudent); }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                    : null
                }
            </Box>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default' }}>
                Datos Usuario
            </Box> 
            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}>
                <TextField name="user_name" label="Usuario" InputProps={{readOnly: true}} value={userInfo.user_name || ''} />
                <TextField name="correo" label="Correo" InputProps={{readOnly: true}} value={userInfo.correo || ''}/>
            </Box>

            <Box sx={{ py: 2, display: userValues.rol === 'estudiante' ? 'flex' : 'none', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Estudiante(s)</Typography> 
                <Button sx={{display: {xs: 'none', md: 'flex'}}} onClick={() => { setAddStudent(!addStudent); }} variant="outlined">Agregar estudiante </Button>
            </Box>
   
            <Box>
                {
                    students !== null && students.length === 0 && userValues.rol === 'estudiante' ?
                    <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                        Registra un estudiante para poder inscribir clases!
                    </Box>
                    :
                    students.map(student =>        
                        <StudentItem
                            key={student._id}
                            name={student.nombre}
                            studentInfo={student}
                            first_lastname={student.apellido_paterno}
                            second_lastname={student.apellido_materno}
                            editStudent={editStudent}
                            setCurrentStudent={setCurrentStudent}
                            handleOpenDialog={handleOpenDialog}
                            setIsEditing={setIsEditing}
                        />    
                    )
                } 
            </Box>
            <Modal
                open={addStudent}
                onClose={() => setAddStudent(!addStudent)}
                sx={{overflow: 'scroll'}}
            >
                <>                
                    <StudentProfile 
                        studentInfo={studentInfo}
                        userID={userValues._id}
                        setAddStudent={setAddStudent}
                        addStudent={addStudent}
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
                sx={{overflow: 'scroll'}}
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
            <DeleteDialog deleteStudent={deleteCurrentStudent} handleClose={handleCloseDialog} open={openDeleteDialog} student={currentStudent}/>
            <Snackbar open={successOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={infoOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Profile
