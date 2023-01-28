import React, {useState} from "react";
import datos from "./DataAlumnos"


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
					<br/>
                	{getHorario(clase)}
                </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>Mas Información</Button>
              {/* Empieza el modal parent*/ }
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Card sx={style}>
                        <Typography variant="h5" component="div">
                            Informacion Adicional
                        </Typography>
                        <div className="spacer"></div>

                        <h5 className="leyendaFaltas">Maestro: </h5>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {clase.nombreProfesor} {clase.apellidosProfesor}
                          </Typography>

                          <h5 className="leyendaFaltas">Contacto: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
								<Button variant="contained" className="btnContacto"
										href="https://es-la.facebook.com/" target='_blank' > 
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