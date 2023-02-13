import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0 } from "@auth0/auth0-react";


const SignOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button sx={{bgcolor: '#57a1f1', width: '200px', fontSize: '18px'}} variant="contained" startIcon={<LogoutIcon />} onClick={() => {
      logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });}}>
        Cerrar Sesión
    </Button>
  )
}

export default SignOutButton