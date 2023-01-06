import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function SidebarButton(props) {
    const handleClick = () => {
        props.setContent(props.content)
        props.setOpen(false)

    }

    return (
        <ListItemButton onClick={() => handleClick()}>
            <ListItemText>{props.title}</ListItemText>
        </ListItemButton>
    )
}

export default SidebarButton
