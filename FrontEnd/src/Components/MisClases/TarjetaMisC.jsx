import React from "react";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';





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


export default function TarjetaMisC(props){
    // <h4 className="card-text">{props.item.id}</h4>
    //<h4 className="card-text">{props.item.nombre}</h4>
    //<h4 className="card-text">{props.item.nivel}</h4>
    //<h4 className="card-text">{props.item.maestro}</h4>
    //<h4 className="card-text">{props.item.horario}</h4>
    //<h4 className="card-text">{props.item.faltas}</h4>

    /*
<div className="card">
                    <h4 className="card-header">Id</h4>
                    <h4 className="card-header">Nombre de clase</h4>
                    <h4 className="card-header">Nivel</h4>
                    <h4 className="card-header">Maestro</h4>
                    <h4 className="card-header">Frecuencia Semanal</h4>
                    <h4 className="card-header">Faltas</h4>

                    <h4 className="card-text">{props.item.id}</h4>
                    <h4 className="card-text">{props.item.nombre}</h4>
                    <h4 className="card-text">{props.item.nivel}</h4>
                    <h4 className="card-text">{props.item.maestro}</h4>
                    <h4 className="card-text">{props.item.horario}</h4>
                    <h4 className="card-text">{props.item.faltas}</h4>

                </div>

    */

    console.log(props)
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
                        <Button size="small">Mas Infromacion</Button>
                    </CardActions>
                    </Card>
                    <div className="spacer"></div>

                </div>



    )
}