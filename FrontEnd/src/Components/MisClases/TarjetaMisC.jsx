import React from "react";

export default function TarjetaMisC(props){
    // <h4 className="card-text">{props.item.id}</h4>
    //<h4 className="card-text">{props.item.nombre}</h4>
    //<h4 className="card-text">{props.item.nivel}</h4>
    //<h4 className="card-text">{props.item.maestro}</h4>
    //<h4 className="card-text">{props.item.horario}</h4>
    //<h4 className="card-text">{props.item.faltas}</h4>


    console.log(props)
    return(


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




    )
}