import React, { useState, useEffect} from "react";

import './periodos.css'
import TarjetasPeriodos from "./tarjetaPeriodo";


import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';

import { tarjetas as information } from "./tarjetas";


export default function Periodos(){

    // config de modal estilo
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

    //arreglo de objetos previo
    const [tarjetas, setTarjetas] = useState([])

    useEffect(() => {
        setTarjetas(information);
      }, []);

    // genera objetos nuevos con valores predeterminados a la listay los renderiza
    const agregaTarjeta= () =>{

        const nuevaTarjeta = {
            id : self.crypto.randomUUID(),
            clave: clave,
            status: status,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            fechaInicioInscripcion: fechaII,
            fechaFinInscripcion: fechaFI ,
            cursosMax: cursosMax,
            idiomasMax: idiomasMax,

        }
        console.log('agregaTarjeta')
        console.log(clave)

        setTarjetas([...tarjetas, nuevaTarjeta])
    }

    // Variables para agregar tarjeta

    const [clave, setClave] = useState("");
    const [status, setStatus] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [fechaII, setFechaII] = useState("");
    const [fechaFI, setFechaFI]= useState("");
    const [cursosMax, setCursosMax] = useState("");
    const [idiomasMax, setIdiomasMax] = useState("");

    const mandarDatos = (e) =>{
        agregaTarjeta(
            clave,
            status,
            fechaInicio,
            fechaFin,
            fechaII,
            fechaFI,
            cursosMax,
            idiomasMax,
        )
        console.log(clave)
        setClave("");
        setStatus("");
        setFechaInicio("");
        setFechaFin("");
        setFechaII("");
        setFechaFI("");
        setCursosMax("");
        setIdiomasMax("");

        handleClose();
    }



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

    const debug = 'debug'
    return(
        <div className="container">
            <h1>Periodos</h1>

            <Button variant="contained" onClick={handleOpen}>Nuevo Periodo</Button>
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

                                            name="clave"
                                            onChange={(e) => setClave(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Status"

                                            name="status"
                                            onChange={(e) => setStatus(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio"

                                            name="fechaInicio"
                                            onChange={(e) => setFechaInicio(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="fecha de Fin"

                                            name="fechaFin"
                                            onChange={(e) => setFechaFin(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de inicio de incripciones"

                                            name="fechaInicioInscripciones"
                                            onChange={(e) => setFechaII(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Fecha de fin de inscripciones"

                                            name="fechaFinInscripciones"
                                            onChange={(e) => setFechaFI(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Cursos Maximos por Alumno"

                                            name="cursosMax"

                                            onChange={(e) => setCursosMax(e.target.value)}
                                            autoFocus
                                        />
                                        <TextField
                                            style={{ paddingBottom: "15px", fontFamily: "arial" }}
                                            label="Idiomas Max"

                                            name="idiomasMax"
                                            onChange={(e) => setIdiomasMax(e.target.value)}
                                            autoFocus
                                        />
                                        <Button variant="contained" onClick={mandarDatos}>Agregar Periodo</Button>






                                    </div>


                    </Card>
                </Modal>

            <div className="card-grid">


                {tarjetas.map(item=>(
                   <TarjetasPeriodos
                   key={item.id}
                   item={item}
                     />
                ))}
            </div>
        </div>

    )
}

