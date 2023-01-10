import React from "react";
import './MisClases.css'
import data from './DataClases'
import TarjetaMisC from './TarjetaMisC'




export default function MisClases(){

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
            <h1>Mis Clases</h1>
            <div className="card-container">
            {cardData}
            </div>
            </div>

        </div>
    )
}
