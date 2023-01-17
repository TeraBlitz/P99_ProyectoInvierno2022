import React from "react";

import './periodos.css'
import TarjetasPeriodos from "./tarjetaPeriodo";
import data from './periodos'


export default function Periodos(){



    const funcionTarjetas = data.map(item =>{

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
            <div className="card-grid">
                {funcionTarjetas}

            </div>
        </div>

    )
}