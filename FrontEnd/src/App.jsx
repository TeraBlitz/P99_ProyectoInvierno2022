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
import ShowClass from "./Components/Pages/AdministratorClassRegister/ShowClass";
import SignIn from './Pages/SignIn/SignIn'
import MisClases from './Pages/MisClases/MisClasesEstudiante'
import Periodos from './Pages/ControlPanel/PagesCP/Periodos'
import Alumnos from './Pages/ControlPanel/PagesCP/Alumnos/Alumnos'
import Profesores from './Pages/ControlPanel/PagesCP/profesores/Profesores'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import SignUp from './Pages/SignUp/SignUp'
import { createUser } from './api/users'
import { Password } from '@mui/icons-material'
import Inicio from './Pages/Inicio/Inicio'
import CloseIcon from '@mui/icons-material/Close'
import { getStudents } from './api/students.js'
import { Login } from './api/Login.js'



export const userContext = createContext()
function App() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('Inicio')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState({})
    const [loginError, setLoginError] = useState('none');
    const [hasAccount, sethasAccount] = useState(true);
    const [snack, setSnack] = useState(false)

    const handleUser = (params) => {
        setUser(params)
    }

    const handleStudent = async (User) => {
        if (user.rol == "estudiante") {
            getStudents().then(result => {
                const student = result.filter(s => s.idUser === User._id)
                if (student.length == 0) {
                    setSnack(true)
                }
            }
            )
        }
    }
    const changeDrawerState = () => {
        setOpen(!open)
    }
    const changeContent = (newContent) => {
        setContent(newContent)
    }
    const changeHasAccount = () => {
        sethasAccount(!hasAccount)
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

        ControlPanel: <ControlPanel changeContent={changeContent} />,
        Registro: <ShowClass />
    }

    const createUser = async (user) => {
        user.status = "10"
        user.rol = "estudiante"
        console.log(user)

        await fetch("https://p99test.fly.dev/v1/users/create", {
            method: 'POST',
            redirect: 'follow',
            body: new URLSearchParams(user)
        }
        ).then(e => {
            console.log(e)
            changeHasAccount()
        })
    }

    const handleSignOut = () => {
        setIsSignedIn(false);
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        // Mandar y validad esta informacion
        Login(user)
            .then(result => {
                if (result.msg == "Login OK") {
                    console.log(result.data_user)
                    handleUser(result.data_user)
                    handleStudent(result.data_user)
                    setIsSignedIn(true)
                }
                else {
                    setLoginError('block')
                }
            })

    }

    return !isSignedIn && hasAccount ?
        <SignIn handleSignIn={handleSignIn} handleUser={handleUser} loginError={loginError} changeHasAccount={changeHasAccount} /> || <SignUp></SignUp>
        : !isSignedIn && !hasAccount ?
            <SignUp createUser={createUser} changeHasAccount={changeHasAccount} />
            :
            <userContext.Provider value={user}>
                <Box id="main" sx={{ display: 'flex' }}>
                    <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent} handleSignOut={handleSignOut} />
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
                                    <Button color="warning" size="small" onClick={() => changeContent('Profile')}>
                                        Crear Alumno
                                    </Button>
                                </Alert>
                            </Snackbar>
                        </div>
                    </Box>
                </Box>
            </userContext.Provider>


}
export default App
