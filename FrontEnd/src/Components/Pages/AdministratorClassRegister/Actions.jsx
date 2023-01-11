import React from 'react'
import { Tooltip,Box, IconButton } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'
function Actions({params,deleteClass,editClasses}) {

  return (
    <Box>
        <Tooltip title='Editar'>
            <IconButton >
                <Edit onClick={()=>editClasses(params.row.id,params.row)}/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <IconButton onClick={()=>deleteClass(params.row.id)}>
                <Delete />
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default Actions