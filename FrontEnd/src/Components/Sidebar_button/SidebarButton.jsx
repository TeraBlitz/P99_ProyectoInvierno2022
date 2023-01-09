import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

function SidebarButton(props) {
    const handleClick = () => {
        props.changeContent(props.content)
        props.changeDrawerState()

    }


    return (
        <ListItemButton onClick={() => handleClick()}>
            <ListItemText sx={{ color: 'white' }}>{props.title}</ListItemText>
        </ListItemButton>
    )
}

export default SidebarButton