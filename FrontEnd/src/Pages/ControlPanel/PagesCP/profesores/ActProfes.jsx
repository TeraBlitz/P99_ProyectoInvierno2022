import React from 'react'
import { Tooltip,Box, Button } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'

function Actions({params,deleteClass,editClasses}) {

  return (
    <Box>
        <Tooltip title='Editar'>
            <Button >
                <Edit color="primary"onClick={()=>editClasses(params.row.id,params.row)}/>
            </Button>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <Button  color="error" onClick={()=>deleteClass(params.row.id)}>
                <Delete />
            </Button>
        </Tooltip>
    </Box>
  )
}

export default Actions