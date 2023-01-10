import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import { Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
// import RegistroClasesAlumnos from './Pages/RegistroClasesAlumnos/RegistroClasesAlumnos'
import Profile from './Pages/ProfilePage/Profile'
import MisClases from './Pages/MisClases/MisClases'

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
        // RegistroClasesAlumnos: <RegistroClasesAlumnos />,
        Profile: <Profile />,
        MisClases: <MisClases />,
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar open={open} changeDrawerState={changeDrawerState} changeContent={changeContent} />
            <Box sx={{
                width: 'calc(100% - 240px)',
                padding: '15px',
                height: '120vh',
                position: 'relative',
            }}>

                <IconButton sx={{ bgcolor: 'primary.light', height: 'fit-content', borderRadius: 1, display: { xs: 'block', sm: 'none' }, position: 'sticky', top: '3px' }} onClick={() => setOpen(!open)}>
                    <MenuIcon />
                </IconButton>
                {PagesToRender[content]}
            </Box>
        </Box>
    )
}

export default App