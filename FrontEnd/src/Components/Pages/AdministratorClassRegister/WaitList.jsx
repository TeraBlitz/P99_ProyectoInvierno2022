import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const WaitList = ({clase, waitList}) => {
  return (
    <Box  
      sx={{'& .MuiTypography-root': { my: 2 }, display: 'flex', 
      alignItems: 'center',  flexWrap: 'wrap', backgroundColor: 'white', 
      borderRadius: 3, m: 2, p: 2, flexDirection: 'column'}}
    >
        <Typography variant='h5'>{clase.clave}. {clase.nombre_curso}</Typography>
        {
          waitList.length === 0 ?
          <Typography variant='h6'>Lista de espera vacia</Typography>
          :
          <Box>
            <Typography variant='h6'>Nombre Completo | Lugar de espera </Typography>
            {
            waitList.map((lista) => 
              <Typography key={lista._id}>{lista.studentName} {lista.lugar_de_espera}</Typography>
            )
            }
          </Box>

        }
    </Box>
  )
}

export default WaitList