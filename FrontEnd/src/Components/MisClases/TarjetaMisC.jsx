import React from "react";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';





  const theme = createTheme({

    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

  };


export default function TarjetaMisC(props){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return(

                <div>

                <Card sx={{ minWidth: 275, bgcolor: 'grey.200'}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.item.id}
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

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Maestro: {props.item.maestro}
                                 </Typography>

                                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Link: {props.item.link}
                                 </Typography>
                                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Notas Del Profesor: {props.item.notas}
                                 </Typography>


                            </Card>
                        </Modal>
                    </CardActions>
                    </Card>
                    <div className="spacer"></div>

                </div>



    )
}