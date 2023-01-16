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
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import SignUp from './Pages/SignUp/SignUp'


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

    // Example POST method implementation:
    async function postUser(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json();
    }

    const createUser = (user) => {
        //getUsers('http://127.0.0.1:3000/v1/users')
        postUser('http://127.0.0.1:3000/v1/users/create', { user })
        .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        });
    }
    
    return !isSignedIn ?
        <SignUp createUser={createUser}/>
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
                <div style={{width:'calc(100vw-240px)', height:'100vh'}}>
        {PagesToRender[content]}
        </div>
            </Box>
        </Box>

}
export default App
