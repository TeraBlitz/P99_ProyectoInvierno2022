import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

function SidebarButton(props) {
    const handleClick = () => {
        props.setContent(props.content)
        props.setOpen(false)

    }


    return (
        <ListItemButton onClick={() => handleClick()}>
            <ListItemText sx={{ color: 'white' }}>{props.title}</ListItemText>
        </ListItemButton>
    )
}

export default SidebarButton
