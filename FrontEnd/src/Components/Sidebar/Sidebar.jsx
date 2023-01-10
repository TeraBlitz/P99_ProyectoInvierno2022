import React from 'react'
import Box from '@mui/material/Box'
import { Drawer, List } from '@mui/material'
import SidebarButton from '../Sidebar_button/SidebarButton'

import MisClases from '../MisClases/MisClases'



function Sidebar(props) {
    // Atributos Sidebar Button :
    //     Title: El nombre que va a salir en la Sidebar
    //     Content: El componente que va a salir como contenido
    //     setContent: props.setContent
    //     setOpen: props.setOpen

import RegistroClasesAlumnos from '../../Pages/RegistroClasesAlumnos/RegistroClasesAlumnos'
import Profile from '../../Pages/ProfilePage/Profile'



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
        }

    ]

    const listItems = (
        <List sx={{ bgcolor: 'primary.light', width: '240px', height: '100vh' }}>
            <SidebarButton content='Registro Clases' title='Registro Clases' setContent={props.setContent} setOpen={props.setOpen} />
            <SidebarButton content={MisClases} title='Mis Clases' setContent={props.setContent} setOpen={props.setOpen} />
            <SidebarButton content={Debug} title='prueba' setContent={props.setContent} setOpen={props.setOpen} />

            <SidebarButton title='Other Component' content='hi everyone' setContent={props.setContent} setOpen={props.setOpen} />

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
