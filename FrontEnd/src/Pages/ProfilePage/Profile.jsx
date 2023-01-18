import React, {useState, useEffect} from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import StudentItem from '../../Components/Profile/StudentItem';
import StudentProfile from './StudentProfile';

// Possible function to get user data, this goes in another file
const fetchUserInfo = () => {
    //const res = await fetch(`http://localhost:3000/${userID}`);
    //const userData = res.json();
    // Cambiar 'tipo' a un valor distinto a Student para ver el perfil de administrador

    const userData = {
        'usuario': 'Username', 
        'correo': 'user@gmail.com'
    }
    return userData; 
};

const students = [
    {
        'id': '1',
        'name': 'Juan',
        'first_lastname':'Perez',
        'second_lastname': 'Lopez'
    },
    {
        'id': '2',
        'name': 'Jose',
        'first_lastname':'Perez',
        'second_lastname': 'Lopez'
    },
]

const Profile = ({userID}) =>{
    
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState(fetchUserInfo);
    const [addStudent, setAddStudent] = useState(false);

    useEffect(() => {
        const getUserInfo = () =>{
            const userData = fetchUserInfo();
            setUserInfo(userData);
        }
        getUserInfo();
    }, []);
    
    const handleChange = e => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(students)

    return (
        <Box sx={{p: 1, ml: 1}}>
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                <Box>
                    Mi perfil
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute',  bottom: 16,  right: 16}}>
                    <Fab color="primary" aria-label="add" sx={{ display: addStudent ? 'none' : ''}} 
                            onClick={() => { setAddStudent(!addStudent); }}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <Box sx={{ typography: 'subtitle2', fontWeight: 'light', fontFamily: 'default' }}>
                Datos Usuario
            </Box> 
            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', alignItems: 'center',  flexWrap: 'wrap' }}>
                <TextField name="usuario" label="Usuario" InputProps={{readOnly: true}} value={userInfo.usuario || ''} />
                <TextField name="correo" label="Correo" InputProps={{readOnly: true}} value={userInfo.correo || ''}/>
            </Box>
            <Box sx={{ fontFamily: 'default', fontSize: 'h6.fontSize', py: 2, display:'flex' }}>
                Estudiante(s)
            </Box>
   
            <Box>
                {
                    students.length === 0 ?
                    <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display:'flex' }}>
                        Registra un estudiante para poder inscribir clases!
                    </Box>
                    :
                    students.map(student =>        
                        <StudentItem
                            key={student.id}
                            name={student.name}
                            first_lastname={student.first_lastname}
                            second_lastname={student.second_lastname}

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
