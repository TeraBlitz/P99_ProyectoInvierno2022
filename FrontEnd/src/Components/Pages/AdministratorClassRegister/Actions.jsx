import React from 'react'
import { Tooltip,Box, Button } from "@mui/material";
import {Edit,Delete}from '@mui/icons-material'
function Actions({params,handleClickOpen,editClasses, classToDelete}) {

  const handleClick = () => {
    handleClickOpen();
    classToDelete(params.row.id, params.row);
  }
  return (
    <Box>
        <Tooltip title='Editar'>
            <Button >
                <Edit color="primary"onClick={()=>editClasses(params.row.id,params.row)}/>
            </Button>
        </Tooltip>
        <Tooltip title='Eliminar'>
            <Button  color="error" onClick={handleClick} >
                <Delete />
            </Button>
        </Tooltip>
    </Box>
  )
}

export default Actions