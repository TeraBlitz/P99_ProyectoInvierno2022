import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState('');
    
    const handleChange = (e) => setUserEmail(e.target.value);
    
    const handleSignIn = (e) => {
        e.preventDefault();
        // Mandar y validad esta informacion
        console.log(userEmail);
    }

  return (    
    <Container   
        sx={{ height: '100vh', display: 'flex',
        alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}
    >
        <Card sx={{px: 3, py:2, backgroundColor: '#3A4856', borderRadius: 2}}>
            <Box component='form' sx={{mx: 3, display: 'flex', flexDirection: 'column'}} onSubmit={handleSignIn}>
                <Typography component='h1' variant="h4" sx={{color: '#E6F4F1', my: 2, fontWeight: '400', textAlign: 'center', width: '100%'}}>
                    ¿Olvidaste tu contraseña?
                </Typography>
                    <TextField  required 
                        fullWidth label='Correo'
                        sx={{my: 2, input: {color: 'white'}}}
                        InputLabelProps={{style: {color: '#E6F4F1'}}}
                        value={userEmail}
                        onChange={handleChange}
                        onInvalid={e => e.target.setCustomValidity('Ingresa tu correo electronico')} 
                        onInput={e => e.target.setCustomValidity('')}
                     />
                <Box sx={{display: 'flex', justifyContent:'end'}}>
                    <Typography variant="body1" sx={{color: '#E6F4F1'}}>
                    ¿Tienes una cuenta? 
                    <Link sx={{pl: 1, color: '#0099DF'}} underline="hover">Inicia Sesión</Link>
                    </Typography>
                </Box>
                <Box sx={{my: 1}}>
                    <Button fullWidth type='submit' sx={{backgroundColor: '#4472C4', color: 'white'}}>Enviar instrucciones</Button>
                </Box>
            </Box>
        </Card>
    </Container>
  )
}
export default ForgotPassword