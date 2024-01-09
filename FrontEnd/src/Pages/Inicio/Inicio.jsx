import React from "react";

import logo from '../Inicio/p99Logo.png'
import '../Inicio/inicio.css'


export default function Inicio(){
    return(
        <div className="index-container">

            <div className="index-header">
                <img src={logo}></img>
                <h1>"La unión hace la fuerza"</h1>
            </div>
            
            <div className="index-body">

                <div>
                    <h3>¿Quiénes somos?</h3>
                    <p>Somos un grupo de jóvenes buscando combatir, prevenir y disminuir la deserción escolar en comunidades urbano marginadas, ofreciendo  actividades extracurriculares que fomenten el talento y el desarrollo integral de las personas.</p>
                </div>

                <div>
                    <h3>¿Qué ofrecemos?</h3>
                    <p><b>Gratuidad:</b> sin cuotas de inscripción, materiales accesibles.<br/>
                        <b>Clases personalizadas:</b> cursos  adaptables a los alumnos y su ritmo de aprendizaje.<br/>
                        <b>Variedad:</b> contenido según los intereses y necesidades de los alumnos.
                    </p>
                </div>

                <div>
                    <h3>Nuestros cursos</h3>
                    <p><b>Reforzamiento académico</b> (asesorías 1 a 1 para reforzar conocimientos académicos)<br/>
                        <b>Talleres</b> (artísticos, culturales y deportivos)<br/>
                        <b>Cursos de Idiomas  </b>(variedad de lenguas extranjeras disponibles)
                    </p>
                </div>

            </div>

            <div className="index-footer">
                <p>Si tienes dudas sobre cómo usar la página para inscribirte, puedes ver el tutorial en el siguiente
                <a href="https://es-la.facebook.com/" target="_blank" rel="noopener noreferrer"> enlace</a></p>
            </div>
            
        </div>
    )
}