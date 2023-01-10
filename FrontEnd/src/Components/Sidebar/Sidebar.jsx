import React from 'react'
import Box from '@mui/material/Box'
import { Drawer, List } from '@mui/material'
import SidebarButton from '../Sidebar_button/SidebarButton'


function Sidebar(props) {
    // agregar un componente a la sidebar : 
    // key: identificador unico (Math.random())
    // title: como va a aparecer en el boton de la sidebar
    // content: nombre del componente renderizado en PagesToRender (app.jsx)
    const options = [
        {
            key: 1,
            title: 'Registro Clases',
            content: 'RegistroClasesAlumnos'
        },
        {
            key: 2,
            title: 'Profile',
            content: 'Profile'
        },
        {
            Key:3,
            title: 'Mis Clases',
            content: 'MisClases'
        }

    ]
    const listItems = (
        <List sx={{ bgcolor: 'info.main', width: '240px', height: '100vh', spacingY: '10px' }}>
            {options.map(e => (

                <SidebarButton key={e.key} content={e.content} title={e.title} setOpen={props.setOpen} changeContent={props.changeContent} changeDrawerState={props.changeDrawerState} />
            ))}
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