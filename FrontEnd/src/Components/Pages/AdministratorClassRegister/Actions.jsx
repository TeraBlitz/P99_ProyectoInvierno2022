import React from 'react'
import { Tooltip,Box, Button } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'
function Actions({params,seleccionarConsola}) {


  return (
    <Box>
        <Tooltip title='Editar'>
            <Button >
                <Edit color="primary" onClick={()=>seleccionarConsola(params.row, 'Editar')} />
            </ Button>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <Button  color="error" onClick={()=>seleccionarConsola(params.row, 'Eliminar')} >
                <Delete />
            </Button>
        </Tooltip>
    </Box>
  )
}

export default Actions
