import React from 'react'
import { Tooltip,Box, IconButton } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'
function Actions({params}) {

  return (
    <Box>
        <Tooltip title='Editar'>
            <IconButton >
                <Edit />
            </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <IconButton onClick={console.log(params.row)}>
                <Delete />
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default Actions