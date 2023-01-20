import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import { Drawer, List } from '@mui/material'
import SidebarButton from '../Sidebar_button/SidebarButton'
import SignOutButton from '../SignOut/SignOutButton'
import {userContext} from './../../App.jsx'

function Sidebar(props) {
    // agregar un componente a la sidebar :
    // key: identificador unico (Math.random())
    // title: como va a aparecer en el boton de la sidebar
    // content: nombre del componente renderizado en PagesToRender (app.jsx)
    const userValues = useContext(userContext)
    const options = [
        {
            key: 1,
            title: 'Profile',
            content: 'Profile',
            rol: 'any'
        },
        {
            key: 2,
            title: 'Registro Clases',
            content: 'RegistroClasesAlumnos',
            rol: 'estudiante'
        },

        {
            key: 4,
            title: 'Mis Clases (Profesor)',
            content: 'MisClasesProfesor',
            rol: 'profesor'
        },
        {
            key: 5,
            title: 'Mis Clases (Estudiantes)',
            content: 'MisClases',
            rol: 'estudiante'
        },
        {
            key: 6,
            title: 'Panel de control',
            content: 'ControlPanel',
            rol: 'admin'

        },
        {
            key: 7,
            title: <SignOutButton handleSignOut={props.handleSignOut} />,
            content: '',
            rol: 'any'
        },

    ]

    const listItems = (
        <List sx={{ bgcolor: 'info.main', width: '240px', height: '100vh', spacingY: '10px' }}>
            {options.map(e => {

                if (userValues.rol == e.rol || e.rol=='any') {

                    return (
                        <SidebarButton key={e.key} content={e.content} title={e.title} setOpen={props.setOpen} changeContent={props.changeContent} changeDrawerState={props.changeDrawerState} />
                    )
                //}
            })}
        </List >
    )


    return (
        <Box>
            <Drawer variant="permanent" sx={{ width: '240px', height: '100vh', display: { xs: 'none', sm: 'block' } }}>
                {listItems}
            </Drawer>
            <Drawer variant="temporary" open={props.open} onClose={() => props.changeDrawerState()} sx={{ width: '240px', height: '100vh', display: { xs: 'block', sm: 'none' } }} >
                {listItems}
            </Drawer>
        </Box>
    )
}

export default Sidebar
