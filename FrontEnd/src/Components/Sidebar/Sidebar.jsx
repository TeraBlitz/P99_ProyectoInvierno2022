import React from 'react'
import Box from '@mui/material/Box'
import { Drawer, List } from '@mui/material'
import SidebarButton from '../Sidebar_button/SidebarButton'


function Sidebar(props) {
    // Atributos Sidebar Button : 
    // Title: El nombre que va a salir en la Sidebar 
    // Content: El componente que va a salir como contenido 
    // setContent: props.setContent
    // setOpen: props.setOpen
    const listItems = (
        <List sx={{ bgcolor: 'primary.light', width: '240px', height: '100vh' }}>
            <SidebarButton content='Registro Clases' title='Registro Clases' setContent={props.setContent} setOpen={props.setOpen} />

            <SidebarButton title='world' content='hi everyone' setContent={props.setContent} setOpen={props.setOpen} />

        </List >
    )


    return (
        <Box>
            <Drawer variant="permanent" sx={{ width: '240px', height: '100vh', display: { xs: 'none', sm: 'block' } }}>
                {listItems}
            </Drawer>
            <Drawer variant="temporary" open={props.open} onClose={() => props.setOpen(false)} sx={{ width: '240px', height: '100vh', display: { xs: 'block', sm: 'none' } }}>
                {listItems}
            </Drawer>
        </Box>
    )
}

export default Sidebar
