import React, { useState } from "react";

import './periodos.css'
import TarjetasPeriodos from "./tarjetaPeriodo";
import data from './periodos'

import Button from '@mui/material/Button';


export default function Periodos(){

    const [tarjetas, setTarjetas] = useState([
        {
            id: 18279,
            clave: 'febrero-junio',
            status: 'Activo',
            fechaInicio: 'febrero 15',
            fechaFin: 'junio 22',
            fechaInicioInscripcion: 'enero 20',
            fechaFinInscripcion: 'febrero 7',
            cursosMax: 2,
            idiomasMax: 1,
            },
            {
            id: 27836,
            clave: 'febrero-junio',
            status: 'Activo',
            fechaInicio: 'febrero 15',
            fechaFin: 'junio 22',
            fechaInicioInscripcion: 'enero 20',
            fechaFinInscripcion: 'febrero 7',
            cursosMax: 2,
            idiomasMax: 1,
            },
            {
                id: 37283,
                clave: 'febrero-junio',
                status: 'Activo',
                fechaInicio: 'febrero 15',
                fechaFin: 'junio 22',
                fechaInicioInscripcion: 'enero 20',
                fechaFinInscripcion: 'febrero 7',
                cursosMax: 2,
                idiomasMax: 1,
                }
    ])

    const agregaTarjeta= (text) =>{

        const nuevaTarjeta = {
            id : self.crypto.randomUUID(),
            clave: 'text',
            status: 'Activo',
            fechaInicio: 'febrero 15',
            fechaFin: 'junio 22',
            fechaInicioInscripcion: 'enero 20',
            fechaFinInscripcion: 'febrero 7',
            cursosMax: 2,
            idiomasMax: 1,

        }

        setTarjetas([...tarjetas, nuevaTarjeta])
    }

    const funcionTarjetas = tarjetas.map(item =>{

        return(
            <TarjetasPeriodos
                key={item.id}
                item={item}
            />
        )
    })


    return(
        <div className="container">
            <h1>Periodos</h1>
            <Button variant="contained" onClick={agregaTarjeta}>Nuevo Periodo</Button>
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

