import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Alert, IconButton, Snackbar } from '@mui/material'
import React, { useState, useEffect, createContext } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import RegistroClasesAlumno from './Pages/RegistroClasesAlumno/RegistroClasesAlumno'
import MisClasesProfesor from './Pages/MisClasesProfesor/MisClasesProfesor'
import Profile from './Pages/ProfilePage/Profile'
import ControlPanel from './Pages/ControlPanel/ControlPanel'
import ShowClass from "./Pages/AdministratorClassRegister/ShowClass";
import SignIn from './Pages/SignIn/SignIn'
import MisClases from './Pages/MisClases/MisClasesEstudiante'
import Periodos from './Pages/ControlPanel/PagesCP/Periodos'
import Alumnos from './Pages/ControlPanel/PagesCP/Alumnos/Alumnos'
import Profesores from './Pages/ControlPanel/PagesCP/profesores/Profesores'
import SignUp from './Pages/SignUp/SignUp'
import Inicio from './Pages/Inicio/Inicio'
import CloseIcon from '@mui/icons-material/Close'
import { findStudents } from './api/students.js'
import { useAuth0 } from "@auth0/auth0-react";



export const userContext = createContext()
function App() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('Inicio')
    const [hasAccount, sethasAccount] = useState(true);
    const [snack, setSnack] = useState(false)
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    console.log(isLoading)

    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            if (user.p99roles.includes('admin')) {
                setContent('ControlPanel');
            } else {
                handleStudent(user);
            }
        }
    }, [isLoading, isAuthenticated, user]);

    const handleStudent = async (userObj) => {
        if (userObj?.p99roles.length == 0) {
            findStudents({ idUser: userObj.sub })
            .then((response) => response.json())
            .then((data) => {
                if (data.length == 0) {
                    setSnack(true)
                }
            });
        }
    }

    useEffect(()=>{
        const getAccessToken =async () => {
            const token = await getAccessTokenSilently()
            sessionStorage.setItem("Authorization" , token)
        }
        getAccessToken()

    }, [getAccessTokenSilently])

    useEffect(()=>{
        handleStudent(user)
    }, [user])

    const changeDrawerState = () => {
        setOpen(!open)
    }
    const changeContent = (newContent) => {
        setContent(newContent)
    }

    const PagesToRender = {
        RegistroClasesAlumnos: <RegistroClasesAlumno changeContent={changeContent} />,

        MisClasesProfesor: <MisClasesProfesor />,

        Profile: <Profile />,
        
        ControlPanel: <ControlPanel changeContent={changeContent} />,

        MisClases: <MisClases changeContent={changeContent} />,

        inscripcion: <ShowClass />,

        Periodos: <Periodos />,

        Alumnos: <Alumnos />,

        Profesores: <Profesores />,

        Inicio: <Inicio />,

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {
                !isAuthenticated ? (
                    <SignIn /> 
                ) : (
                    <Box id="main" sx={{ display: 'flex' }}>
                        <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent}/>
                        <Box sx={{
                            width: '100%',
                            position: 'relative',
                            height: 'auto',
                            overflow: 'scroll'
                        }}>
                            <IconButton sx={{ bgcolor: 'primary.light', height: 'fit-content', borderRadius: 1, display: { xs: 'block', sm: 'none' }, position: 'fixed', zIndex: 1000, top: '3px', left: '3px' }} onClick={() => setOpen(!open)}>

                                <MenuIcon />
                            </IconButton>
                            <div style={{ width: 'calc(100vw-240px)', height: '100vh' }}>
                                {PagesToRender[content]}
                                <Snackbar open={snack}>
                                    <Alert severity='warning'>
                                        No has creado tu Alumno aun
                                        <IconButton
                                            size="small"
                                            aria-label="close"
                                            color="inherit"
                                            onClick={() => setSnack(false)}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                        <br />
                                        <Button color="warning" size="small" onClick={() => {changeContent('Profile');setSnack(!snack)}}>
                                            Crear Alumno
                                        </Button>
                                    </Alert>
                                </Snackbar>
                            </div>
                        </Box>
                    </Box>
                )
            }
        </LocalizationProvider>
    )
}
export default App
