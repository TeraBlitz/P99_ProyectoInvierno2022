import React from 'react'
import { Tooltip,Box, Button } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'
import MoreIcon from '@mui/icons-material/More';

function Actions({params,seleccionarConsola}) {

  return (
    <Box>
        <Tooltip title='Mas Informacion'>
            <Button >
                <Edit color="primary" onClick={()=>seleccionarConsola(params.row, 'MasInfo')}/>
            </Button>
        </Tooltip>
        <Tooltip title='Editar'>
            <Button >
                <Edit color="primary" onClick={()=>seleccionarConsola(params.row, 'Editar')}/>
            </Button>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <Button  color="error" onClick={()=>seleccionarConsola(params.row, 'Eliminar')}>
                <Delete />
            </Button>
        </Tooltip>
    </Box>
  )
}

export default Actions