import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';  
import Home from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Divider } from '@mui/material';

function SidebarButton(props) {
    const handleClick = () => {
        props.changeContent(props.content)
        props.changeDrawerState(false)

    }

    const iconDict = {
        'Inicio' : <Home />,
        'Perfil' : <AccountCircleIcon/>,
        'Registro Clases' : <PlaylistAddIcon/>,
        'Mis Clases' : <SchoolIcon/>,
        'Mis Clases (Profesor)' : <SchoolIcon/>,
        'Panel de control': <DashboardIcon/>
    }

    return props.order === 7 ?
        <ListItemButton onClick={() => handleClick()} sx={{position: 'absolute', bottom: '15px'}}>
            <ListItemText>{props.title}</ListItemText>
        </ListItemButton>
    :
        <ListItemButton onClick={() => handleClick()} >
            <ListItemIcon sx={{color: 'white'}}>
                {iconDict[props.title]}
            </ListItemIcon>
            <ListItemText sx={{color: 'white'}}>{props.title}</ListItemText>
        </ListItemButton>
}

export default SidebarButton