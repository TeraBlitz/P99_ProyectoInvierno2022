import React from "react";
import './MisClases.css'
import data from './DataClases'
import TarjetaMisC from './TarjetaMisC'

import { Button } from "@mui/material";


export default function MisClasesEstudiante(){

    const cardData = data.map(item =>{

        return(
          <TarjetaMisC
            key={item.id}
            item={item}
          />
        )
      })

    return(
        <div>


            <div className="caja-tarjetas">
            <h1 className="titulo">Mis Clases</h1>
            <Button variant="contained" className="btnContacto" href="https://es-la.facebook.com/">Contactanos</Button>
            <div className="card-container">
            {cardData}
            </div>
            </div>

        </div>
    )
}
