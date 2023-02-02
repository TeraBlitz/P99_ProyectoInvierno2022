import React, {useState} from "react";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import FacebookIcon from '@mui/icons-material/Facebook';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';





// formato de estilo para los modals
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

  };




// Renderizado de tarjeta individual
export default function TarjetaMisC({ clase }){

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const nivelDict = {
        '1' : 'Desde cero',
        '2' : 'Con bases',
        '3' : 'Intermedio',
        '4' : 'Avanzado'
    }
	const getHorario = (clase) => {
        return `${clase.lunes ? `Lun: ${clase.lunes}` : ''}
                ${clase.martes ? `Mar: ${clase.martes}` : ''}
                ${clase.miercoles ? `Mierc: ${clase.miercoles}` : ''}
                ${clase.jueves ? `Juev: ${clase.jueves}` : ''}
                ${clase.viernes ? `Vier: ${clase.viernes}` : ''}
                ${clase.sabado ? `Sab: ${clase.sabado}` : ''}`
    }

    return(
      <div>
        <Card sx={{ maxWidth: 275}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                	{clase.clave}
                </Typography>
                <Typography variant="h5" component="div">
                	{clase.nombre_curso}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                	{nivelDict[clase.nivel]}
                </Typography>
                <Typography variant="body2">
					<strong>Horario:</strong>
                </Typography>
				<TableContainer component={Paper} sx={{my: 1}}>
					<Table  size="small">
						<TableBody>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Lunes</strong></TableCell>
									<TableCell align="center">{clase.lunes ? clase.lunes : '-'}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Martes</strong> </TableCell>
									<TableCell align="center">{clase.martes ? clase.martes : '-'}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Miércoles</strong></TableCell>
									<TableCell align="center">{clase.miercoles ? clase.miercoles : '-'}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Jueves</strong></TableCell>
									<TableCell align="center">{clase.jueves ? clase.jueves : '-'}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Viernes</strong></TableCell>
									<TableCell align="center">{clase.viernes ? clase.viernes : '-'}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { border: 0 } }}>
									<TableCell align="center"><strong>Sábado</strong></TableCell>
									<TableCell align="center">{clase.sabado ? clase.sabado : '-'}</TableCell>
								</TableRow>
						</TableBody>
					</Table>
            	</TableContainer>
            </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>Más Información</Button>
              {/* Empieza el modal parent*/ }
                <Modal
                    open={open}
                    onClose={handleClose}
					sx={{display: 'flex',
					alignContent: 'center', justifyContent: 'center'}}
                >
                    <Card sx={{m: 1, p: 2, height: '250px'}}>
                        <Typography variant="h5" component="div" gutterBottom>
                            Información Adicional
                        </Typography>
                        <h5 className="leyendaFaltas">Maestro: </h5>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {clase.nombreProfesor} {clase.apellidosProfesor}
						</Typography>
                        <h5 className="leyendaFaltas">Modalidad: </h5>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {clase.modalidad.charAt(0).toUpperCase() + clase.modalidad.slice(1)}
						</Typography>
						<h5 className="leyendaFaltas">Contacto: </h5>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							<Button variant="contained" startIcon={<FacebookIcon />} sx={{mt: 1}}
									href="https://www.facebook.com/proyecto99mty" target='_blank'> 
								Contactanos
							</Button>
						</Typography>

                    </Card>
                </Modal>

            </CardActions>
            </Card>


    </div>



    )
}