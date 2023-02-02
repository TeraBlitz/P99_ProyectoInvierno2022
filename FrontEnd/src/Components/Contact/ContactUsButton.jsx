import React from 'react'
import Button from '@mui/material/Button';


const SignOutButton = ({handleSignOut}) => {
  return (
    <Button sx={{bgcolor: '#4472c1', width: '200px', textTransform: 'none', fontSize: '18px', fontWeight: '400'}} variant="contained" href='https://www.facebook.com/proyecto99mty' target='_blank'>
        Contáctanos
    </Button>
  )
}

export default SignOutButton