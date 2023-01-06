import React from 'react'
import './Sidebar.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import SidebarButton from '../Sidebar_button/SidebarButton';


function Sidebar(props) {
    const themes = {
        sidebar: {
            minWidth: { xs: '80%', sm: '50%', md: '15%', lg: '15%', xl: '100%' },
            height: '100%',
            display: 'block',
            bgcolor: 'primary.light',
        },
        noSidebar: {
            maxWidth: '0px',
            display: 'none'
        }
    }
    return (
        <Box sx={props.sidebar ? themes.sidebar : themes.noSidebar}>
            <List component="nav">
                <SidebarButton title="hello" setContent={props.setContent} />
                <SidebarButton title="world" setContent={props.setContent} />


            </List>
        </Box >
    )
}

export default Sidebar
