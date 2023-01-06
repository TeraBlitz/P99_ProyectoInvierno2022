import React from 'react'
import './SidebarButton.css'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function SidebarButton(props) {
    return (
        <div className='SidebarButton'>
            <ListItemButton onClick={() => props.setContent(props.title)}>
                <ListItemText>{props.title}</ListItemText>
            </ListItemButton>
            <Divider />
        </div>
    )
}

export default SidebarButton
