import React from "react";

import logo from '../Inicio/p99Logo.png'
import '../Inicio/inicio.css'

export default function Inicio(){
    return(
        <div className="container">

            <img className="logo" src={logo}></img>
        </div>
    )
}