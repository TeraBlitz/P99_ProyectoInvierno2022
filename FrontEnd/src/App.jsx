import { IconButton } from '@mui/material'
import React, { useState, useEffect, createContext } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import { Box } from '@mui/material'
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





export const userContext = createContext()
function App() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('content')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState({})
    const [loginError, setLoginError] = useState('none');
    const [hasAccount, sethasAccount] = useState(true);

    const handleUser = (params) => {
        setUser(params)
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

        MisClases: <MisClases />,

        inscripcion: <ShowClass />,

        Periodos: <Periodos />,

        Alumnos: <Alumnos />,

        Profesores: <Profesores />,


    }

    const createUser = async (user) =>{
        user.status = "10"
        user.rol = "estudiante"
        console.log(user)

        await fetch("https://p99test.fly.dev/v1/users/create" , {
                method: 'POST',
                redirect: 'follow',
                body: new URLSearchParams(user)
            }
        ).then(e=>{
            console.log(e)
            changeHasAccount()
        })    }


    const handleSignIn = (e) => {
        e.preventDefault();
        // Mandar y validad esta informacion


        fetch(`https://p99test.fly.dev/v1/auth/login`,
            {
                method: 'POST',
                body: new URLSearchParams(
                    {
                        correo: user.correo,
                        password: user.contraseña
                    }
                )
            })
            .then(response => response.json())
            .then(result => {
                if (result.msg == "Login OK") {
                    handleUser(result.data_user)
                    setIsSignedIn(true)
                }
                else {
                    setLoginError('block')
                }
            })

            .catch(error => console.log('error', error));
    }

    return !isSignedIn && hasAccount ?
        <SignIn handleSignIn={handleSignIn} handleUser={handleUser} loginError={loginError} changeHasAccount ={changeHasAccount}/> || <SignUp></SignUp>
        : !isSignedIn && !hasAccount ?
            <SignUp createUser={createUser} changeHasAccount={changeHasAccount}/>
            :
            <userContext.Provider value={user}>
                <Box id="main" sx={{ display: 'flex' }}>
                    <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent} handleSignOut={handleSignIn} />
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
                        </div>
                    </Box>
                </Box>
            </userContext.Provider>

}
export default App
