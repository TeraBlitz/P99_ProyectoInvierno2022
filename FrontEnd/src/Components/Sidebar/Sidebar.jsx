import React from 'react'
import Box from '@mui/material/Box'
import { Drawer, List } from '@mui/material'
import SidebarButton from '../Sidebar_button/SidebarButton'
import RegistroClasesAlumnos from '../../Pages/RegistroClasesAlumnos/RegistroClasesAlumnos'



function Sidebar(props) {
    // Atributos Sidebar Button : 
    //     Title: El nombre que va a salir en la Sidebar 
    //     content: El nombre que le pusiste en Pages To Render al componente en App.jsx
    //     setContent: props.setContent
    //     setOpen: props.setOpen
    const listItems = (
        <List sx={{ bgcolor: 'info.main', width: '240px', height: '100vh', spacingY: '10px' }}>
            <SidebarButton content='RegistroClasesAlumnos' title='Registro Clases' setOpen={props.setOpen} changeContent={props.changeContent} />
        </List >
    )


    return (
        <Box>
            <Drawer variant="permanent" sx={{ width: '240px', height: '100vh', display: { xs: 'none', sm: 'block' } }}>
                {listItems}
            </Drawer>
            <Drawer variant="temporary" open={props.open} onClose={() => props.changeDrawerState()} sx={{ width: '240px', height: '100vh', display: { xs: 'block', sm: 'none' } }}>
                {listItems}
            </Drawer>
        </Box>
    )
}

export default Sidebar
