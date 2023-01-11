import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import { Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import RegistroClasesAlumno from './Pages/RegistroClasesAlumno/RegistroClasesAlumno'
import MisClasesProfesor from './Pages/MisClasesProfesor/MisClasesProfesor'
import Profile from './Pages/ProfilePage/Profile'
import ControlPanel from './Pages/ControlPanel/ControlPanel'
import MisClases from './Pages/MisClases/MisClasesEstudiante'

function App() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('content')
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
    }
    return (
        <Box id="main" sx={{ display: 'flex'}}>
            <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent} />
            <Box sx={{
                width: '100%',
                position: 'relative',
                height: 'auto',
                overflow: 'hidden'
            }}>
                <IconButton sx={{ bgcolor: 'primary.light', height: 'fit-content', borderRadius: 1, display: { xs: 'block', sm: 'none' }, position: 'fixed', zIndex: 1000, top: '3px', left: '3px' }} onClick={() => setOpen(!open)}>

                    <MenuIcon />
                </IconButton>
                {PagesToRender[content]}
            </Box>
        </Box>
    )
}

export default App
