import React , {useState} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignUpInput from '../../Components/SignUp/SignUpInput';

const userData = {
    'user_name': '',
    'correo': '',
    'password': ''
};

const SignUp = ({createUser}) => {
    const [userInfo, setUserInfo] = useState(userData);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleChange = (e) => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value })); 

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        // Pasar esta función para añadir al usuario
        createUser(userInfo); 
    };
    
    return (
        <Container   
        sx={{ height: '100vh', display: 'flex',
        alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}
        >
            <Card sx={{px: 3, py:2, backgroundColor: '#3A4856', borderRadius: 2}}>
                <Box component='form' sx={{mx: 3, display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
                    <Typography component='h1' variant="h4" sx={{color: '#E6F4F1', mb: 1, fontWeight: '400', textAlign: 'center', width: '100%'}}>
                        Crea una cuenta
                    </Typography>
                        <SignUpInput name={'user_name'} label={'Usuario'} value={userInfo.user_name} handleChange={handleChange}/>
                        <SignUpInput name={'correo'} label={'Correo'} value={userInfo.correo} handleChange={handleChange} type={'email'}/>
                        <FormControl
                            required 
                            sx={{input: {color: 'white'}, my: 1}} variant="outlined"
                            >
                            <InputLabel htmlFor="input-contraseña" sx={{color: '#E6F4F1'}}>Contraseña</InputLabel>
                            <OutlinedInput
                                name={'password'}
                                id="input-contraseña"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color='primary'
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Contraseña"
                                onChange={handleChange} fullWidth
                                onInvalid={e => e.target.setCustomValidity(`Crea tu contraseña`)} 
                                onInput={e => e.target.setCustomValidity('')}
                            />
                        </FormControl>
                    <Box sx={{my: 1}}>
                        <Button fullWidth type='submit' sx={{backgroundColor: '#4472C4', color: 'white'}}>Crear cuenta</Button>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{color: '#E6F4F1'}}>
                        ¿Ya tienes una cuenta? 
                        <Link sx={{pl: 1, color: '#0099DF'}} underline="hover">Inicia sesión!</Link>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Container>
    )
}

export default SignUp
