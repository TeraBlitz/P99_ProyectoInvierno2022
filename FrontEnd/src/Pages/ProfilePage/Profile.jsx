import React, {useState, useEffect} from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import StudentItem from '../../Components/Profile/StudentItem';
import StudentProfile from './StudentProfile';
import { getUser } from '../../api/users';
import { getStudents } from '../../api/students';


const students = [

]

const Profile = ({userID}) =>{
    
    const [isEditing, setIsEditing] = useState(true)
    const [userInfo, setUserInfo] = useState(null);
    const [addStudent, setAddStudent] = useState(false);
    const [students, setStudents] = useState(null);

    useEffect(() => {
        const getUserInfo = () =>{
            getUser().then(
                (data) => {
                    const currentUser = data.find(user => user._id === "63c85788d7f5ef2ec08b41ae");
                    setUserInfo(currentUser);
                    console.log(currentUser)
                });
        }
        getUserInfo();
    }, []);

    useEffect(() => {
        const getUserStudents = () =>{
            getStudents().then(
                (data) => {
                    const students = data.filter(student => student.idUsuario === "63c85788d7f5ef2ec08b41ae");
                    setStudents(students);
                    console.log(students)
                });
        }
        getUserStudents();
    }, []);

    
    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
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
                    userInfo.rol === 'student' ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute',  bottom: 16,  right: 16}}>
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

            <Box sx={{ fontFamily: 'default', fontSize: 'h6.fontSize', py: 2,
                     display: userInfo.rol === 'student' ? 'flex' : 'none' }}>
                Estudiante(s)
            </Box>
   
            <Box>
                {
                    students !== null && students.length === 0 && userInfo.rol === 'student' ?
                    <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                        Registra un estudiante para poder inscribir clases!
                    </Box>
                    :
                    students.map(student =>        
                        <StudentItem
                            key={student._id}
                            name={student.nombre}
                            first_lastname={student.apellido_paterno}
                            second_lastname={student.apellido_materno}

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
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        setAddStudent={setAddStudent}
                        addStudent={addStudent}
                    />
                </>
            </Modal>
        </Box>
    )
}

export default Profile
