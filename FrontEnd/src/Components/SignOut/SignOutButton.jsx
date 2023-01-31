import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


const SignOutButton = ({handleSignOut}) => {
  return (
    <Button sx={{bgcolor: '#57a1f1', width: '200px', fontSize: '18px'}} variant="contained" startIcon={<LogoutIcon />} onClick={handleSignOut}>
        Cerrar Sesión
    </Button>
  )
}

export default SignOutButton