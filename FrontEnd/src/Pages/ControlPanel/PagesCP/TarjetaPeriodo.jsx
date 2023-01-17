
import React from "react";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';


// formato de estilo para los modals
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

  //Funcion que modifica los daors
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

export default function TarjetasPeriodos(props){

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
                {props.item.id}
                </Typography>
                <Typography variant="h5" component="div">
                {props.item.clave}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.item.status}
                </Typography>
                <h5 className="leyendaFaltas">Fecha de inicio: </h5>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.fechaInicio}
                          </Typography>

                          <h5 className="leyendaFaltas">Fecha de cierre: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.fechaFin}
                          </Typography>

                          <h5 className="leyendaFaltas">Fecha de inicio de Inscripciones: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.item.fechaInicioInscripcion}
                          </Typography>

                          <h5 className="leyendaFaltas">Fecha de cierre de inscripciones: </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                             {props.item.fechaFinInscripcion}
                          </Typography>
                          <h5 className="leyendaFaltas">Cursos Maximos por Alumno </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                             {props.item.cursosMax}
                          </Typography>
                          <h5 className="leyendaFaltas">Idiomas Maximos por Alumno </h5>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                             {props.item.idiomasMax}
                          </Typography>

            </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>Editar</Button>
              {/* Empieza el modal parent*/ }
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card sx={style}>
                        <Typography variant="h5" component="div">
                           Ingrese los nuevos datos
                        </Typography>
                        <div className="spacer"></div>

                                <div>


                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Clave"
                                            value={props.item.clave}
                                            name="clave"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Status"
                                            value={props.item.status}
                                            name="status"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio"
                                            value={props.item.fechaInicio}
                                            name="fechaInicio"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="fecha de Fin"
                                            value={props.item.fechaFin}
                                            name="fechaFin"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio de incripciones"
                                            value={props.item.fechaInicioInscripcion}
                                            name="fechaInicioInscripciones"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de fin de inscripciones"
                                            value={props.item.fechaFinInscripcion}
                                            name="fechaFinInscripciones"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Cursos Maximos por Alumno"
                                            value={props.item.cursosMax}
                                            name="cursosMax"


                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Idiomas Max"
                                            value={props.item.idiomasMax}
                                            name="idiomasMax"

                                            autoFocus
                                        />







                                    </div>


                    </Card>
                </Modal>

            </CardActions>
            </Card>
            <div className="spacer"></div>
        </div>
    )
}