import React, {createContext, useState} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const SignIn = ({isSignedIn, handleSignIn  , handleUser , loginError , changeHasAccount}) => {
    const [checked, setChecked] = useState([true, false]);
    
    const handleChange = (e) => {
        handleUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    } 
    
    const handleChangeCheckBox = (e) => {
        setChecked([e.target.checked, e.target.checked]);
    };
    
  return (    
    <Container   
    sx={{ height: '100vh', display: 'flex',
    alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}
    >
        <Card sx={{px: 3, py:2, backgroundColor: '#3A4856', borderRadius: 2}}>
            <Box component='form' sx={{mx: 3, display: 'flex', flexDirection: 'column'}} onSubmit={handleSignIn}>
                <Typography component='h1' variant="h4" sx={{color: '#E6F4F1', mb: 1, fontWeight: '400', textAlign: 'center', width: '100%'}}>
                    Iniciar Sesión
                </Typography>
                <Typography variant="h7" sx={{color:'red' , display: loginError , textAlign:'center'}}> usuario o contraseña incorrecta</Typography>
                    <TextField name="correo" required 
                    fullWidth label='Correo'
                    sx={{my: 2, input: {color: 'white'}}}
                    InputLabelProps={{style: {color: '#E6F4F1'}}}
                    onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Ingresa tu usuario')} 
                    onInput={e => e.target.setCustomValidity('')}
                     />
                    <TextField name='contraseña' required
                    fullWidth label='Contraseña' type='password'
                    sx={{my: 1, input: {color: 'white'}}}
                    InputLabelProps={{style: {color: '#E6F4F1'}}}
                    onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Ingresa tu contraseña')} 
                    onInput={e => e.target.setCustomValidity('')}
                    />
                <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                    <FormControlLabel
                        label={<Typography variant="body1" sx={{color: '#E6F4F1'}}>Recuerdame</Typography>}
                        color='white'
                        control={<Checkbox checked={checked[1]} onChange={handleChangeCheckBox}/>}
                    />
                    <Link
                        variant="body1"
                        underline="hover"
                        sx={{alignSelf: 'center'}}
                        >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Box>
                <Box sx={{my: 1}}>
                    <Button fullWidth type='submit' sx={{backgroundColor: '#4472C4', color: 'white'}}>Entrar</Button>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{color: '#E6F4F1'}}>
                    ¿No tienes una cuenta? 
                    <Link sx={{pl: 1, color: '#0099DF'}} underline="hover" onClick={()=> changeHasAccount()  }>Registrate!</Link>
                    </Typography>
                </Box>
            </Box>
        </Card>
    </Container>
  )
}
export default SignIn
