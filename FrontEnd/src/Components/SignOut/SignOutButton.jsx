import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


const SignOutButton = ({handleSignOut}) => {
  return (
    <Button variant="contained" startIcon={<LogoutIcon />} onClick={handleSignOut}>
        Cerrar Sesión
    </Button>
  )
}

export default SignOutButton