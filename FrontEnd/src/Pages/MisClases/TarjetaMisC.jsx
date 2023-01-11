import React from "react";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';






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

  function createData(nombre, contacto) {
    return { nombre,contacto };
  }

const rows = [
  createData('Juan Alberto', 'contacto@gmail.com'),
  createData('Juan martinez', 'contacto@gmail.com'),
  createData('Juan treviño', 'contacto@gmail.com'),
  createData('Juan rodriguez', 'contacto@gmail.com'),
];

// Funcion que llama a la lista de alumnos
function ChildModal() {

  // Funcion para llamar la lista


  //setup de modal child
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //setup del modal child en si
  return (

    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* Override manual de width para hacer el child mas ancho*/}
        <Card sx = {{...style, width:'85%'}}>
          <Typography variant="h5" component="div">
              Contactos Alumnos
          </Typography>

          {/* Reneder de tabla de alumnos */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 330 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Contacto</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.nombre}
                    </TableCell>

                    <TableCell align="center">{row.contacto}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Boton para cerrar el child modal */}
          <Button onClick={handleClose}>Close Child Modal</Button>

        </Card>

      </Modal>
    </React.Fragment>
  );
}

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

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Maestro: {props.item.maestro}
                          </Typography>

                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Contacto: {props.item.contacto}
                          </Typography>

                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Link: {props.item.link}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Notas Del Profesor: {props.item.notas}
                          </Typography>
                          {/* Call a el modal child */ }
                          <ChildModal/>
                    </Card>
                </Modal>

            </CardActions>
            </Card>


    </div>



    )
}