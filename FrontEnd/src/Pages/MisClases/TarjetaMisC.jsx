import React from "react";
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
export default function TarjetaMisC(props){

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


    return(
      <div>
        <Card sx={{ minWidth: 275, bgcolor: 'grey.200' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.item.claveCurso}
                </Typography>
                <Typography variant="h5" component="div">
                {props.item.nombre}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.item.nivel}
                </Typography>
                <Typography variant="body2">
                {props.item.horario}

                </Typography>
                <h5 className="leyendaFaltas">Faltas: {props.item.faltas}</h5>
            </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>Mas Infromacion</Button>
              {/* Empieza el modal parent*/ }
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card sx={style}>
                        <Typography variant="h5" component="div">
                            Informacion Adicional
                        </Typography>
                        <div className="spacer"></div>

                        <h5 className="leyendaFaltas">Maestro: </h5>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.maestro}
                          </Typography>

                          <h5 className="leyendaFaltas">Contacto: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.contacto}
                          </Typography>

                          <h5 className="leyendaFaltas">Link: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.link}
                          </Typography>

                          <h5 className="leyendaFaltas">Notas del profesor: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                             {props.item.notas}
                          </Typography>


                    </Card>
                </Modal>

            </CardActions>
            </Card>


    </div>



    )
}