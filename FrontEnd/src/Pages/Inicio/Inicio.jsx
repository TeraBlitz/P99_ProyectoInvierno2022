import React from "react";

import logo from '../Inicio/p99Logo.png'
import '../Inicio/inicio.css'
import { Box } from "@mui/system";

export default function Inicio(){
    return(
        <div className="container">
            <div className="container2">
                <h1 className="tittle">Proyecto 99</h1>
                <img className="logo" src={logo}></img>
            </div>

        </div>
    )
}