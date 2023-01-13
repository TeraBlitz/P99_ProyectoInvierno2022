import React , {useState} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import SignUpInput from '../../Components/SignUp/SignUpInput';

const userData = {
    'nombre': '', 'apellido': '', 'usuario': '',
    'correo': '', 'telefono': '', 'lada':'', 'tipo': 'Student',
    'curp': '', 'fecha_nacimiento':'','escolaridad': '', 'ultima_escuela':'',
    'estado':'', 'ciudad':'', 'colonia': '', 'tutor': '', 'contraseña': ''
};


const SignUp = () => {
    const [userInfo, setUserInfo] = useState(userData);
    
    const handleChange = (e) => setUserInfo(prevState => ({ ...prevState, [e.target.name]: e.target.value })); 

    const handleSubmit = (e) => {
        // Enviar esta informacion a bd
        e.preventDefault();
        console.log(userInfo);
    };
    
    // Funcion para calcular edad si es menor de 18 se pide
    //  un nombre de Tutor al estudiante
    const calculate_age = (dateString) => {
        var birthday = +new Date(dateString);
        // The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000, which is the length of a year
        const magic_number = 31557600000;
        return ~~((Date.now() - birthday) / (magic_number));
      }

    return (
        <Container   
            sx={{ display: 'flex', alignContent: 'center',
            justifyContent: 'center', flexWrap: 'wrap',
            backgroundColor: 'lightblue'}}
        >
            <Grid component='form' sx={{px: 3, py:2}} container spacing={1} onSubmit={handleSubmit}>
                    <Typography component='h1' variant="h4" sx={{color: '#3a4856',fontWeight: '400', textAlign: 'center', width: '100%'}}>
                        Crea una cuenta
                    </Typography>

                    <Grid xs={12}>
                    <Typography variant='body1' color={'3a4856'}>Credenciales</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <SignUpInput name={'usuario'} label={'Usuario'} value={userInfo.usuario} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={6}>
                        <SignUpInput name={'contraseña'} label={'Contraseña'} type={'password'} value={userInfo.contraseña} handleChange={handleChange}/>
                    </Grid>

                    <Grid xs={12}>
                        <Typography variant='body1' color={'3a4856'}>Datos Personales</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'nombre'} label={'Nombre(s)'} value={userInfo.nombre} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'apellido'} label={'Apellido(s)'} value={userInfo.apellido} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'fecha_nacimiento'} label={'Fecha Nacimiento'} type={'date'} value={userInfo.fecha_nacimiento} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'curp'} label={'CURP'} value={userInfo.curp} handleChange={handleChange}/>
                        <FormHelperText id="component-helper-text">
                            <Link href="https://www.gob.mx/curp/" underline="hover" target="_blank">
                                &#9432; Obten tu CURP
                            </Link>
                        </FormHelperText>
                    </Grid>
                    {calculate_age(userInfo.fecha_nacimiento) < 18 ? 
                    <Grid xs={12}>
                        <SignUpInput name={'tutor'} label={'Tutor'} value={userInfo.tutor} handleChange={handleChange}/>
                    </Grid> : null}
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'escolaridad'} label={'Escolaridad'} value={userInfo.escolaridad} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <SignUpInput name={'ultima_escuela'} label={'Última Escuela'} value={userInfo.ultima_escuela} handleChange={handleChange}/>
                    </Grid>

                    <Grid xs={12}>
                        <Typography variant='body1' color={'3a4856'}>Dirección</Typography>
                    </Grid>
                    <Grid xs={6} sm={4}>
                        <SignUpInput name={'estado'} label={'Estado'} value={userInfo.estado} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={6} sm={4}>
                        <SignUpInput name={'ciudad'} label={'Ciudad'} value={userInfo.ciudad} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12}sm={4} >
                        <SignUpInput name={'colonia'} label={'Colonia'} value={userInfo.colonia} handleChange={handleChange}/>
                    </Grid>
                    
                    <Grid xs={12}>
                        <Typography variant='body1' color={'3a4856'}>Contacto</Typography>
                    </Grid>
                    <Grid xs={4} md={2}>
                        <SignUpInput name={'lada'} label={'LADA'} value={userInfo.lada} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={8} md={4}>
                        <SignUpInput name={'telefono'} label={'Núm. Telefonico'} value={userInfo.telefono} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} >
                        <SignUpInput name={'correo'} label={'Correo'} type={'email'} value={userInfo.correo} handleChange={handleChange}/>
                    </Grid>
                    <Grid xs={12}>
                        <Box sx={{my: 1}}>
                            <Button fullWidth type='submit' sx={{backgroundColor: '#4472C4', color: 'white'}}>Crear</Button>
                        </Box>
                    </Grid>
            </Grid>
        </Container>
    )
}

export default SignUp