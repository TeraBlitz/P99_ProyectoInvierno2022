
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



export default function TarjetasPeriodos(props){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

    const [abierto2, setAbierto2] = React.useState(false);
    const handleAbierto2 =()=>{
        setAbierto2(true)
    };
    const handleCerrar2 = () =>{
        setAbierto2(false)
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

                <Button variant="contained" onClick={handleOpen}>Editar</Button>

                <div className="spacer-botones"></div>

                <Button variant="contained" onClick={handleAbierto2} color= "error">Borrar Periodo</Button>



                {/* Empieza el modal 2 */}
                <Modal
                 open={abierto2}
                 onClose={handleCerrar2}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description">

                    <Card sx={style}>
                        <Typography variant="h5" component="div">
                           Estas seguro de borrar este periodo?
                        </Typography>
                        <div className="spacer"></div>
                        <Button variant="contained" onClick={handleCerrar2}>Cancelar</Button>
                        <div className="spacer-botones"></div>
                        <Button variant="contained" color= "error" onClick={()=> props.handleDeletePer(props.item.id)}>Borrar Periodo</Button>

                    </Card>


                </Modal>


              {/* Empieza el modal 1*/ }
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
                                            defaultValue={props.item.clave}
                                            name="clave"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Status"
                                            defaultValue={props.item.status}
                                            name="status"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio"
                                            defaultValue={props.item.fechaInicio}
                                            name="fechaInicio"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="fecha de Fin"
                                            defaultValue={props.item.fechaFin}
                                            name="fechaFin"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio de incripciones"
                                            defaultValue={props.item.fechaInicioInscripcion}
                                            name="fechaInicioInscripciones"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de fin de inscripciones"
                                            defaultValue={props.item.fechaFinInscripcion}
                                            name="fechaFinInscripciones"

                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Cursos Maximos por Alumno"
                                            defaultValue={props.item.cursosMax}
                                            name="cursosMax"


                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Idiomas Max"
                                            defaultValue={props.item.idiomasMax}
                                            name="idiomasMax"

                                            autoFocus
                                        />

                                        <Button variant="contained" onClick={handleClose}>Editar Datos</Button>






                                    </div>


                    </Card>
                </Modal>

            </CardActions>
            </Card>
            <div className="spacer"></div>
        </div>
    )
}