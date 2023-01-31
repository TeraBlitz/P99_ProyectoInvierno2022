import React from "react";

import logo from '../Inicio/p99Logo.png'
import '../Inicio/inicio.css'
import { Box } from "@mui/system";

export default function Inicio(){
    return(
        <div className="container">
            <div className="container2">

                <img className="logo" src={logo}></img>
                <h2 className="headerText">"La unión hace la fuerza"</h2>
            </div>
            <br></br>
            <div className="containerBody">

                <div className="textColumn">
                    <h3>¿Quiénes somos?</h3>
                    <p>Somos un grupo de jóvenes buscando combatir, prevenir y disminuir la deserción escolar en comunidades urbano marginadas, ofreciendo  actividades extracurriculares que fomenten el talento y el desarrollo integral de las personas.</p>
                </div>

                <div className="textColumn">
                    <h3>¿Qué ofrecemos?</h3>
                    <p>Gratuidad: sin cuotas de inscripción, materiales accesibles.
                        Clases personalizadas: cursos  adaptables a los alumnos y su ritmo de aprendizaje.
                        Variedad: contenido según los intereses y necesidades de los alumnos.
                    </p>
                </div>

                <div className="textColumn">
                    <h3>Nuestros cursos</h3>
                    <p>Reforzamiento académico (asesorías 1 a 1 para reforzar conocimientos académicos)
                        Talleres (artísticos, culturales y deportivos)
                        Cursos de Idiomas  (variedad de lenguas extranjeras disponibles)
                    </p>
                </div>

            </div>

            <div className="footerContainer">
                <p className="footerText">Si tienes dudas sobre cómo usar la página para inscribirte, puedes ver el tutorial en el siguiente
                <a href="https://es-la.facebook.com/" target="_blank" rel="noopener noreferrer"> enlace</a></p>
            </div>
        </div>
    )
}