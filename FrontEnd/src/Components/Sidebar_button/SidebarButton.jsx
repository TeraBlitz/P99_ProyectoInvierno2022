import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function SidebarButton(props) {
    const handleClick = () => {
        props.changeContent(props.content)
        props.changeDrawerState(false)

    }

    return props.order === 7 || props.order === 8 ?
        <ListItemButton onClick={() => handleClick()} sx={{position: 'absolute', bottom: props.order === 7 ? '170px' : '100px'}}>
            <ListItemText>{props.title}</ListItemText>
        </ListItemButton>
    :
        <ListItemButton onClick={() => handleClick()} sx={{fontSize: '18px'}}>
            <ListItemText sx={{color: 'white', '& .MuiTypography-root': { fontSize: '1.4rem'}}}>{props.title}</ListItemText>
        </ListItemButton>
}

export default SidebarButton