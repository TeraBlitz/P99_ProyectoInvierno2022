import React , {useState} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({});
    
    const handleChange = (e) => setUserCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value })); 
    return (
        <Container   
        sx={{ height: '100vh', display: 'flex',
        alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}
        >
            <Card sx={{px: 3, py:2, backgroundColor: '#3A4856', borderRadius: 2}}>
                <Grid container spacing={2}>
                    <Grid>
                        <TextField name='usuario' required 
                        fullWidth label='Usuario'
                        sx={{my: 2, input: {color: 'white'}}}
                        InputLabelProps={{style: {color: '#E6F4F1'}}}
                        onChange={handleChange}
                        onInvalid={e => e.target.setCustomValidity('Ingresa tu usuario')} 
                        onInput={e => e.target.setCustomValidity('')}
                        />
                    </Grid>
                    <Grid>
                        <TextField name='contraseña' required
                        fullWidth label='Contraseña' type='password'
                        sx={{my: 1, input: {color: 'white'}}}
                        InputLabelProps={{style: {color: '#E6F4F1'}}}
                        onChange={handleChange}
                        onInvalid={e => e.target.setCustomValidity('Ingresa tu contraseña')} 
                        onInput={e => e.target.setCustomValidity('')}
                        /> 
                    </Grid>
                    <Grid>
                        <TextField name="matricula" label="Matricula"  onChange={handleChange}/>
                    </Grid>
                    <Grid>
                        <TextField name="matricula" label="Matricula"  onChange={handleChange}/>
                    </Grid>
                    <Grid>
                        <TextField name="nombre" label="Nombre(s)"  onChange={handleChange} required/>
                    </Grid>
                    <Grid>
                        <TextField name="apellido" label="Apellido(s)" onChange={handleChange} required/>       
                    </Grid>
                    <Grid>
                        <TextField name="correo" type="email" label="Correo" onChange={handleChange} required/> 
                    </Grid>
                </Grid>
                <Box component='form' sx={{mx: 3, display: 'flex' }} >
                    <Typography component='h1' variant="h4" sx={{color: '#E6F4F1', mb: 1, fontWeight: '400', textAlign: 'center', width: '100%'}}>
                        Crea una cuenta
                    </Typography>

               
                    <Box sx={{my: 1}}>
                        <Button fullWidth type='submit' sx={{backgroundColor: '#4472C4', color: 'white'}}>Crear</Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    )
}

export default SignUp