import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

function SidebarButton(props) {
    const handleClick = () => {
        props.changeContent(props.content)
        props.changeDrawerState(false)

    }

    return props.order === 7 ?
        <ListItemButton onClick={() => handleClick()} sx={{position: 'absolute', bottom: '15px'}}>
            <ListItemText>{props.title}</ListItemText>
        </ListItemButton>
    :
        <ListItemButton onClick={() => handleClick()}>
            <ListItemText>{props.title}</ListItemText>
        </ListItemButton>
}

export default SidebarButton