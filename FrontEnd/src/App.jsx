import { IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
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


function App() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('content')
    const [isSignedIn, setIsSignedIn] = useState(false)

    const changeDrawerState = () => {
        setOpen(!open)
    }
    const changeContent = (newContent) => {
        setContent(newContent)
    }
    const PagesToRender = {
        RegistroClasesAlumnos: <RegistroClasesAlumno />,
        MisClasesProfesor: <MisClasesProfesor />,
        Profile: <Profile />,
        ControlPanel: <ControlPanel/>,
        MisClases: <MisClases />,

        Registro: <ShowClass />
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        // Mandar y validad esta informacion
        console.log('test');
        setIsSignedIn(!isSignedIn);
    }

    return !isSignedIn ?
        <SignIn handleSignIn={handleSignIn}/>
    :
        <Box  id="main" sx={{ display: 'flex'}}>
            <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent} handleSignOut={handleSignIn}/>
            <Box sx={{
                width: '100%',
                position: 'relative',
                height: 'auto',
                overflow:'scroll'
            }}>
                <IconButton sx={{ bgcolor: 'primary.light', height: 'fit-content', borderRadius: 1, display: { xs: 'block', sm: 'none' }, position: 'fixed', zIndex: 1000, top: '3px', left: '3px' }} onClick={() => setOpen(!open)}>

                    <MenuIcon />
                </IconButton>
                <div style={{width:'calc(100vw-240px)'}}>
        {PagesToRender[content]}
        </div>
            </Box>
        </Box>

}

export default App