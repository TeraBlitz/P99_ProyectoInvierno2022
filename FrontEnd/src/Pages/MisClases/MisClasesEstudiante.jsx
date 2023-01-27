import React, { useContext, useEffect } from "react";
import './MisClases.css'
import TarjetaMisC from './TarjetaMisC'
import {getClassStudent} from  './../../api/classStudent.js'
import { Button } from "@mui/material";
import { userContext } from "../../App";


export default function MisClasesEstudiante(){
    const data = [];
    const userValues = useContext(userContext)

    useEffect(()=>{
        getClassStudent().then(clase=>{
            data = clase.filter(c=> c.idAlumno===userValues.id)
        })
    


    }, [])

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
